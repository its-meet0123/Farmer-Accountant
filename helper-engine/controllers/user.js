require("dotenv").config();
const User = require("../models/user");
const EntData = require("../models/integrated");
const IndData = require("../models/integratedData");
const Sessions = require("../models/session");
const EndDate = require("../models/endDate");
const WorkerData = require("../models/worker");
const { FieldWorker, Harvest } = require("../models/otherexpense");
const MarketTax = require("../models/marketTax");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

async function handleUserSignUp(req, res) {
  try {
    const { userName, userId, password } = req.body;
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      res.json({
        status: "success",
        code: "USER_EXISTS",
        isSignedUp: true,
        isLoggedIn: false,
        user: existingUser,
      });
    }

    const hashedPassword = password;

    await User.create({
      userName,
      userId,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: "success",
      code: "USER_CREATED",
      isSignedUp: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({
      userId,
    });

    const isMatch = user ? (password == user.password ? true : false) : false;

    if (!user || !isMatch) {
      return res.status(401).json({
        status: "fail",
        code: "INVALID_CREDENTIALS",
        message: isMatch,
      });
    }
    // 30d to 15m
    const accessToken = jwt.sign({ id: user.userId }, JWT_SECRET, {
      expiresIn: "1d",
    });
    // refresh accessToken for 7d
    const refreshToken = jwt.sign({ id: user.userId }, REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
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

async function handleUserLogOut(req, res) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
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
  try {
    const { userId, newPassword } = req.body;

    // const user = await User.findOneAndUpdate(
    //   { userId: userId },
    //   { password: newPassword },
    // );
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        code: "USER_NOT_FOUND",
      });
    }

    const hashedPassword = newPassword;
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      status: "success",
      code: "PASSWORD_UPDATED",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function handleSignUpUserDeleteAccount(req, res) {
  try {
    const { userId, password } = req.body;

    await Promise.all([
      IndData.deleteMany({ userId: userId }),
      EntData.deleteMany({ userId: userId }),
      EndDate.deleteMany({ userId: userId }),
      WorkerData.deleteMany({ userId: userId }),
      FieldWorker.deleteMany({ userId: userId }),
      Harvest.deleteMany({ userId: userId }),
      Sessions.deleteMany({ userId: userId }),
      MarketTax.deleteMany({ userId: userId }),
    ]);

    await User.findOneAndDelete({
      userId: userId,
      password: password,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      expires: new Date(0),
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

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogOut,
  handleGetSignUpUserData,
  handleSignUpUserUpdatePassword,
  handleSignUpUserDeleteAccount,
};
