const express = require("express");
const {
  handleAddWorker,
  handleGetAllWorkers,
  handleEditWorkerById,
  handleDeleteWorkerById,
  handlePushWorkerTransactionById,
  handleDeleteWorkerTransactionById,
  handleUpdateWorkerTransactionById,
  handleGetWorkerById,
  handleGetWorkerTransactionById,
} = require("../controllers/worker");
const authMiddleware = require("../middleware/checkAuth");
const {
  autoInterestCalculationForWorker,
} = require("../middleware/autoInterestCalculation");

const router = express.Router();
router.post("/", handleAddWorker);
router.get("/:sessionId", authMiddleware, handleGetAllWorkers);
router
  .route("/:sessionId/:id")
  .patch(authMiddleware, handleEditWorkerById)
  .get(authMiddleware, handleGetWorkerById)
  .delete(authMiddleware, handleDeleteWorkerById);
router.put(
  "/:sessionId/:id/push",
  authMiddleware,
  autoInterestCalculationForWorker,
  handlePushWorkerTransactionById,
);
router
  .route("/:sessionId/:workerId/account/:accountId")
  .patch(
    authMiddleware,
    autoInterestCalculationForWorker,
    handleUpdateWorkerTransactionById,
  );
router.post(
  "/:sessionId/:workerId/delete",
  authMiddleware,
  handleDeleteWorkerTransactionById,
);
router.get(
  "/:sessionId/:workerId/account",
  authMiddleware,
  handleGetWorkerTransactionById,
);

module.exports = router;
