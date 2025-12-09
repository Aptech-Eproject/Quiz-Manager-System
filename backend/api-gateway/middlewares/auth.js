import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header)
      return res.status(401).json({ message: "Missing Authorization Header" });

    const token = header.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Token not provided" });

    // Verify Access Token bằng secret của Access Token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Đính kèm user vào request để forward xuống service
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
