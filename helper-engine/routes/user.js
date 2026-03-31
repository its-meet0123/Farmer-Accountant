const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
  handleCheckAuthStatus,
  handleUserLogOut,
  handleGetSignUpUserData,
  handleSignUpUserUpdatePassword,
  handleSignUpUserDeleteAccount,
} = require("../controllers/user");

const router = express.Router();
router.post("/", handleGetSignUpUserData);
router.get("/status", handleCheckAuthStatus);
router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogOut);
router.post("/update-password", handleSignUpUserUpdatePassword);
router.post("/delete-account", handleSignUpUserDeleteAccount);

module.exports = router;
