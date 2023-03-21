const { validateToken } = require('../auth/tokenUtil');

const validateTokenMiddle = async (req, res, next) => {
  const { authorization } = req.headers;
  const validateTokenResult = await validateToken(authorization);

    if (validateTokenResult.error) {
        return res.status(401).json({ message: validateTokenResult.error });
    }

  res.header('Access-Control-Allow-Headers', 'Authorization'); // adiciona o cabeçalho "Access-Control-Allow-Headers" com o valor "Authorization"
  next();
};

module.exports = {
  validateTokenMiddle,
};
