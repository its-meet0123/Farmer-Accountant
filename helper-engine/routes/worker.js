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

const router = express.Router();
router
  .route("/")
  .post(handleAddWorker)
  .get(authMiddleware, handleGetAllWorkers);
router
  .route("/:id")
  .patch(authMiddleware, handleEditWorkerById)
  .get(authMiddleware, handleGetWorkerById)
  .delete(authMiddleware, handleDeleteWorkerById);
router.put("/:id/push", handlePushWorkerTransactionById);
router
  .route("/:workerId/account/:accountId")
  .patch(authMiddleware, handleUpdateWorkerTransactionById);
router.post(
  "/:workerId/delete",
  authMiddleware,
  handleDeleteWorkerTransactionById,
);
router.get(
  "/:workerId/account",
  authMiddleware,
  handleGetWorkerTransactionById,
);

module.exports = router;
