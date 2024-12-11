const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401).json({ message: 'Unauthorization' });

  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token jwt' });
    }
    req.email = decoded.email;
    next();
  });
};

module.exports = { authenticateToken };
