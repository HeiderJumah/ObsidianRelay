const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key_change_this"; // Same as in authController

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  console.log("Token received:", token.substring(0, 50) + "..."); // Debug
  console.log("JWT_SECRET used:", JWT_SECRET); // Debug

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token valid, user:", decoded); // Debug
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message); // Debug
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = authMiddleware;
