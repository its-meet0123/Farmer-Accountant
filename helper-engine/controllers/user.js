const User = require("../models/user");
const EntData = require("../models/integrated");
const IndData = require("../models/integratedData");
const EndDate = require("../models/endDate");
const WorkerData = require("../models/worker");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const JWT_SECRET = process.env.SECRET_KEY;

async function handleUserSignUp(req, res) {
  const { userName, userId, password } = req.body;
  const existingUser = await User.findOne({ userId, password });
  if (existingUser) {
    const token = jwt.sign(
      { id: existingUser.userId, password: existingUser.password },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        status: "success",
        message: "User already exists",
        isSignedUp: true,
        isLoggedIn: true,
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
    message: "User created successfully",
    isSignedUp: true,
  });
}

async function handleUserLogin(req, res) {
  const { userId, password } = req.body;
  const user = await User.findOne({
    userId,
    password,
  });
  if (!user) {
    return res.json({
      status: "fail",
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign({ id: userId, password: password }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    .json({
      status: "success",
      message: "Login successful",
      isLoggedIn: true,
      user: user,
    });
}

async function handleCheckAuthStatus(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      status: "fail",
      isLoggedIn: false,
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({
      userId: decoded.id,
      password: decoded.password,
    });

    if (!user) {
      return res.json({
        status: "fail",
        isLoggedIn: false,
      });
    }
    return res.status(200).json({
      status: "success",
      isLoggedIn: true,
      user: user,
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: err.message,
      isLoggedIn: false,
    });
  }
}

async function handleUserLogOut(req, res) {
  return res.clearCookie("token").json({
    status: "success",
    message: "Logged out successfully",
    isLoggedIn: false,
  });
}

async function handleUserDeshbordData(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const [entData, indData, workerData, endDate] = await Promise.all([
    EntData.findOne({ userId: currentUserId }),
    IndData.findOne({ userId: currentUserId }),
    WorkerData.findOne({ userId: currentUserId }),
    EndDate.findOne({ userId: currentUserId }),
  ]);

  res.json({ entData, indData, workerData, endDate });
}

async function handleGetSignUpUserData(req, res) {
  const userId = req.body.id;
  console.log(userId);
  const user = await User.findOne({ userId: userId });
  if (!user) {
    return res.json({
      status: "fail",
      message: "User not found",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "User found",
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
      message: "User not found",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "Password updated successfully",
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
      message: "User account deleted successfully",
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
  handleCheckAuthStatus,
  handleUserLogOut,
  handleUserDeshbordData,
  handleGetSignUpUserData,
  handleSignUpUserUpdatePassword,
  handleSignUpUserDeleteAccount,
};
