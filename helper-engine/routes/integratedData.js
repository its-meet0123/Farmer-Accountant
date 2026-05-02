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
router.post("/", handleCreateIndData);
router.get("/:sessionId", authMiddleware, handleGetAllIndData);
router
  .route("/:sessionId/:id")
  .get(authMiddleware, handleGetIndShopeAccountById)
  .put(
    authMiddleware,
    autoInterestCalculationForShopes,
    handlePushIndShopeAccountById,
  )
  .patch(authMiddleware, handleUpdateIndDataById);
router.put(
  "/:sessionId/:shopeId/account/:accountId",
  authMiddleware,
  autoInterestCalculationForShopes,
  handleUpdateIndShopeAccountTransactionById,
);

router.post("/:sessionId/delete-many", authMiddleware, handleDeleteManyIndData);
router.patch(
  "/:sessionId/:id/delete-many",
  authMiddleware,
  handleDeleteManyIndShopeTransaction,
);

module.exports = router;
