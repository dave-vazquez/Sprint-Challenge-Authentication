const jwt = require('jsonwebtoken');
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  console.log(tokenHeader);
  if (tokenHeader) {
    const [bearer, token] = tokenHeader.split(' ');

    console.log(bearer);
    console.log(token);

    if (bearer.toUpperCase() === 'BEARER' && token) {
      jwt.verify(
        token,
        process.env.LOGIN_SECRET || 'sooperdoopersecret',
        (err, decodedToken) => {
          if (err) {
            res
              .status(401)
              .json({ message: 'error verifying token', error: err.message });
          } else {
            req.decodedJWT = decodedToken;
            next();
          }
        }
      );
    } else {
      res
        .status(401)
        .json({ message: 'invalid scheme, or not token after scheme name.' });
    }
  } else {
    res.status(401).json({ message: 'missing authorization header' });
  }
};
