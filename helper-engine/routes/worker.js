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

const router = express.Router();
router.route("/").post(handleAddWorker).get(handleGetAllWorkers);
router
  .route("/:id")
  .patch(handleEditWorkerById)
  .get(handleGetWorkerById)
  .delete(handleDeleteWorkerById);
router.put("/:id/push", handlePushWorkerTransactionById);
router
  .route("/:workerId/account/:accountId")
  .patch(handleUpdateWorkerTransactionById);
router.post("/:workerId/delete", handleDeleteWorkerTransactionById);
router.get("/:workerId/account", handleGetWorkerTransactionById);

module.exports = router;
