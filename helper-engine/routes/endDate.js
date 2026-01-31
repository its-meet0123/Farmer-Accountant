const express = require("express");
const {
  handlePostInterestDate,
  handleGetInterestDate,
  handleDeleteInterestDate,
  handleUpdateInterestDate,
} = require("../controllers/endDate");

const router = express.Router();

router.route("/").post(handlePostInterestDate).get(handleGetInterestDate);
router
  .route("/:id")
  .patch(handleUpdateInterestDate)
  .delete(handleDeleteInterestDate);

module.exports = router;
