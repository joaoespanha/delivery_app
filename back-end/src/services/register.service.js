const crypto = require('crypto');
const { Op: { or } } = require('sequelize');
const { createToken } = require('../auth/jwt');
const { User } = require('../database/models');

const secret = 'zooFunction';
const algorithm = 'md5'; 

const register = async (user) => {
  let userCreated;
  if (!user.role) {
    const uncryptedPassword = user.password;
    const hasher = crypto.createHmac(algorithm, secret);
    const userCrypted = { ...user, password: hasher.update(uncryptedPassword).digest('hex') };
    userCreated = await User.create({ ...userCrypted, role: 'customer' });
  }
  const { email, role, name } = userCreated.dataValues;
  const token = await createToken(email, role);
  return { token, email, role, name };
};

const findUser = async (user) => {
  const { email, name } = user;
  return User.findOne({ where: { [or]: [{ email }, { name }] } });
};

module.exports = {
  register,
  findUser,
};