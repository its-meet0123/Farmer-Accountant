const express = require("express");
const {
  handleCreateIndData,
  handlePushIndShopeAccountById,
  handleGetIndShopeAccountById,
  handleGetAllIndData,
  handleUpdateIndDataById,
  handleUpdateIndShopeAccountTransactionById,
  handleDeleteManyIndData,
  handleDeleteManyIndShopeTransaction,
} = require("../controllers/integratedData");
const router = express.Router();
router.route("/").post(handleCreateIndData).get(handleGetAllIndData);
router
  .route("/:id")
  .get(handleGetIndShopeAccountById)
  .put(handlePushIndShopeAccountById)
  .patch(handleUpdateIndDataById);
router.put(
  "/:shopeId/account/:accountId",
  handleUpdateIndShopeAccountTransactionById
);

router.post("/delete-many", handleDeleteManyIndData);
router.patch("/:id/delete-many", handleDeleteManyIndShopeTransaction);

module.exports = router;
