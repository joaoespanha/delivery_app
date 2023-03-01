const registerService = require('../services/register.service');

const register = async (req, res) => {
    const userFind = await registerService.findUser(req.body);
    if (userFind) return res.status(409).json({ message: 'User already exist' });
    const result = await registerService.register(req.body);
    return res.status(201).json({ ...result });
};

module.exports = {
  register,
};