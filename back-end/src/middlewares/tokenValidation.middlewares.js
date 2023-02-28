const { validateToken } = require('../auth/jwt');

const validateTokenMiddle = async (req, res, next) => {
  const { authorization } = req.headers;
  const validateTokenResult = await validateToken(authorization);

    if (validateTokenResult.error) {
        return res.status(401).json({ message: validateTokenResult.error });
    }
    next();
};

module.exports = {
    validateTokenMiddle,
};