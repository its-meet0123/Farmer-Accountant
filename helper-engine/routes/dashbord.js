const express = require("express");
const { dashBordData } = require("../controllers/dashbord/dashbord");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", authMiddleware, dashBordData);

module.exports = router;
