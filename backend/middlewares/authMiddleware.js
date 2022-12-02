const jwt = require('jsonwebtoken');
const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(req.headers.authorization);

    if (!req.headers.authorization)
      return res.status(401).send('Unauthorised! Please login Again');

    // console.log('HERE');
    // console.log(token);
    const { id } = jwt.verify(token, 'JWTSECRETKEY');
    // console.log(jwt.verify(token, 'JWTSECRETKEY'));
    req.userId = id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
};

module.exports = checkAuth;
