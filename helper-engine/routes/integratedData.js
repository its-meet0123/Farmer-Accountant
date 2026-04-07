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
const authMiddleware = require("../middleware/checkAuth");
const {
  autoInterestCalculationForShopes,
} = require("../middleware/autoInterestCalculation");

const router = express.Router();
router
  .route("/")
  .post(handleCreateIndData)
  .get(authMiddleware, handleGetAllIndData);
router
  .route("/:id")
  .get(authMiddleware, handleGetIndShopeAccountById)
  .put(
    authMiddleware,
    autoInterestCalculationForShopes,
    handlePushIndShopeAccountById,
  )
  .patch(authMiddleware, handleUpdateIndDataById);
router.put(
  "/:shopeId/account/:accountId",
  authMiddleware,
  autoInterestCalculationForShopes,
  handleUpdateIndShopeAccountTransactionById,
);

router.post("/delete-many", authMiddleware, handleDeleteManyIndData);
router.patch(
  "/:id/delete-many",
  authMiddleware,
  handleDeleteManyIndShopeTransaction,
);

module.exports = router;
