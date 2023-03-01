const md5 = require('md5');
const { User } = require('../database/models');
const tokenUtil = require('../auth/tokenUtil');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  const encreptePassword = md5(password);

  if (!user || user.password !== encreptePassword) {
     return { error: true, message: 'Incorrect username or password' };
  }

  const token = await tokenUtil.createToken(email);
  return { error: false, message: token };
};

module.exports = {
    login,
};