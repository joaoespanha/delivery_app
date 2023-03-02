const md5 = require('md5');
const { Op: { or } } = require('sequelize');
const { createToken } = require('../auth/tokenUtil');
const { User } = require('../database/models');

const register = async (user) => {
  let userCreated;
  if (!user.role) {
    const encryptedPassword = md5(user.password);
    const userCrypted = { ...user, password: encryptedPassword };
    userCreated = await User.create({ ...userCrypted, role: 'customer' });
  }
  const { email, role, name, id } = userCreated.dataValues;
  const token = await createToken(email, role);
  return { token, email, role, name, id };
};

const findUser = async (user) => {
  const { email, name } = user;
  return User.findOne({ where: { [or]: [{ email }, { name }] } });
};

module.exports = {
  register,
  findUser,
};