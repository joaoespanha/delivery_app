const loginService = require('../services/login.services');

const login = async (req, res) => {
  const { email, password } = req.body;
 
  const token = await loginService.login(email, password);

  if (token.error) return res.status(404).json({ message: token.message });

  return res.status(200).json({ ...token.message, email });
};

module.exports = {
    login,
};