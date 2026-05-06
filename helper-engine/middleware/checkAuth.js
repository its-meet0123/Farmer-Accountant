require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("Decoded JWT :", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = authMiddleware;
