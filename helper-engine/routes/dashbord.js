const express = require("express");
const { dashBordData } = require("../controllers/dashbord/dashbord");
const authMiddleware = require("../middleware/checkAuth");
const monthlyTurnover = require("../controllers/dashbord/graph");

const router = express.Router();

router.get("/:sessionId", authMiddleware, dashBordData);
router.get("/monthly-turnover/:sessionId", authMiddleware, monthlyTurnover);

module.exports = router;
