const { User } = require('../database/models');
const jwt = require('../auth/jwt');
const md5 = require('md5');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  // const encreptePassword = md5(password);

  if (!user || user.password !== password) return { error: true, message: 'Incorrect username or password' };

  const token = await jwt.createToken(email);
  return { error: false, message: token };
}

module.exports = {
  login,
};