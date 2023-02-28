
const registerService = require('../services/register.service');

const register = async (req, res) => {
  try {
    const token = await registerService.register(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
};

module.exports = {
  register,
};