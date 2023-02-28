const loginService = require('../services/login.services');

const login = async (req, res) => {
  const { email, password } = req.body;
 
  const token = await loginService.login(email, password);

  if (token.error) return res.status(401).json(token.message);
;
  return res.status(200).json({ token: token.message });
}

module.exports = {
    login,
};