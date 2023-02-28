const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret_key';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

// testando email

const createToken = async (email) => {
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

const validateToken = async (token) => {
  try {
    if (!token) return { error: 'Token not found' };
    const validation = jwt.verify(token, secret);
    if (!jwtConfig.expiresIn) return { error: 'Expired or invalid token' };
    return validation;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = {
  createToken,
  validateToken,
};
