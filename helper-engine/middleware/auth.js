require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

async function handleCheckAuthStatus(req, res) {
  console.log("cookies :", req.cookies);
  console.log("headers : ", req.headers);
  // const token = req.cookies.token;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "No token provided",
      isLoggedIn: false,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({
      userId: decoded.id,
    });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        isLoggedIn: false,
        user: null,
      });
    }
    return res.status(200).json({
      status: "success",
      isLoggedIn: true,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
      isLoggedIn: false,
    });
  }
}

async function handleRefreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      status: "fail",
      message: "No refresh token provided",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findOne({ userId: decoded.id });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    const newAccessToken = jwt.sign({ id: user.userId }, JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.status(200).json({
      status: "success",
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({
      status: "fail",
      message: "Invalid or expired refresh token" + err.message,
    });
  }
}

module.exports = { handleCheckAuthStatus, handleRefreshToken };
