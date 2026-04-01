require("dotenv").config();
const User = require("../models/user");
const EntData = require("../models/integrated");
const IndData = require("../models/integratedData");
const EndDate = require("../models/endDate");
const WorkerData = require("../models/worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

async function handleUserSignUp(req, res) {
  const { userName, userId, password } = req.body;
  const existingUser = await User.findOne({ userId, password });
  if (existingUser) {
    res.json({
      status: "success",
      code: "USER_EXISTS",
      isSignedUp: true,
      isLoggedIn: false,
      user: existingUser,
    });
  }
  await User.create({
    userName,
    userId,
    password,
  });
  return res.status(201).json({
    status: "success",
    code: "USER_CREATED",
    isSignedUp: true,
  });
}

async function handleUserLogin(req, res) {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({
      userId,
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(401).json({
        status: "fail",
        code: "INVALID_CREDENTIALS",
      });
    }
    // 30d to 15m
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: "15m",
    });
    // refresh accessToken for 7d
    const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        partitioned: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        status: "success",
        accessToken: accessToken,
        code: "USER_LOGIN",
        isLoggedIn: true,
        user: user,
      });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

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

async function handleUserLogOut(req, res) {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      partitioned: true,
      expires: new Date(0),
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      partitioned: true,
      expires: new Date(0),
    });

    return res.json({
      status: "success",
      code: "USER_LOGOUT",
      isLoggedIn: false,
      user: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handleGetSignUpUserData(req, res) {
  const userId = req.body.id;
  console.log(userId);
  const user = await User.findOne({ userId: userId });
  if (!user) {
    return res.json({
      status: "fail",
      code: "USER_NOT_FOUND",
    });
  }
  return res.status(200).json({
    status: "success",
    code: "USER_FOUND",
    user: user,
  });
}

async function handleSignUpUserUpdatePassword(req, res) {
  const { userId, newPassword } = req.body;

  const user = await User.findOneAndUpdate(
    { userId: userId },
    { password: newPassword },
  );
  if (!user) {
    return res.status(404).json({
      status: "fail",
      code: "USER_NOT_FOUND",
    });
  }
  return res.status(200).json({
    status: "success",
    code: "PASSWORD_UPDATED",
  });
}

async function handleSignUpUserDeleteAccount(req, res) {
  try {
    const { userId, password } = req.body;

    await IndData.deleteMany({ userId: userId });
    await EntData.deleteMany({ userId: userId });
    await EndDate.deleteMany({ userId: userId });
    await WorkerData.deleteMany({ userId: userId });
    await User.findOneAndDelete({
      userId: userId,
      password: password,
    });

    return res.status(200).json({
      status: "success",
      code: "USER_DELETED",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
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

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleCheckAuthStatus,
  handleUserLogOut,
  handleGetSignUpUserData,
  handleSignUpUserUpdatePassword,
  handleSignUpUserDeleteAccount,
  handleRefreshToken,
};
