const { createToken } = require('../auth/jwt');
const { User } = require('../database/models');

const register = async (user) => {
  if(!user.role){
   const userCreated = await User.create({...user, role:'customer'});
  }
  const { password: _, name: __,  ...userToken } = userCreated.dataValues;
  const token = createToken(userToken);
  return token;
};

module.exports = {
  register,
};