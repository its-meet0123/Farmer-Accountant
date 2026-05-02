const express = require("express");
const {
  handlePostInterestDate,
  handleGetInterestDate,
  handleDeleteInterestDate,
  handleUpdateInterestDate,
} = require("../controllers/endDate");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.post("/", handlePostInterestDate);
router.get("/:sessionId", authMiddleware, handleGetInterestDate);
router
  .route("/:sessionId/:id")
  .patch(authMiddleware, handleUpdateInterestDate)
  .delete(authMiddleware, handleDeleteInterestDate);

module.exports = router;
