const { verifyAccessToken } = require('../lib/jwt');

const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }

    const token = header.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Verify Access Token
    const decoded = verifyAccessToken(token);

    // Attach decoded user info
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authenticate };
