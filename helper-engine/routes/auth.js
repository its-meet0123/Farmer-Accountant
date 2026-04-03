const express = require("express");
const {
  handleCheckAuthStatus,
  handleRefreshToken,
} = require("../middleware/auth");

const router = express.Router;

router.get("/status", handleCheckAuthStatus);
router.post("/refresh-token", handleRefreshToken);

module.exports = router;
