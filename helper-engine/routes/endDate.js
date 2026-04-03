const express = require("express");
const {
  handlePostInterestDate,
  handleGetInterestDate,
  handleDeleteInterestDate,
  handleUpdateInterestDate,
} = require("../controllers/endDate");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router
  .route("/")
  .post(handlePostInterestDate)
  .get(authMiddleware, handleGetInterestDate);
router
  .route("/:id")
  .patch(authMiddleware, handleUpdateInterestDate)
  .delete(authMiddleware, handleDeleteInterestDate);

module.exports = router;
