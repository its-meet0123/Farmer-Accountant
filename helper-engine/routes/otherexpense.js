const express = require("express");
const {
  handleGetAllAdditionalWorkers,
  handleDeleteAdditionalWorkerById,
  handleUpdateAdditionalWorkerById,
  postAdditionalWorker,
  updateAdditionalWorkerTransactionByIds,
  deleteAdditionalWorkerTransactionByIds,
  handleAddAdditionalWorkerTransactionById,
  handleGetAllHarvestList,
  postHavrestData,
  handleUpdateHarvestDataById,
  handleDeleteHarvestDataById,
  handleAddHarvesterTransactionById,
  updateHarvesterTransactionByIds,
  deleteHavresterTransactionByIds,
} = require("../controllers/otherexpense");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

// labor routes
router.get("/:sessionId/labor", authMiddleware, handleGetAllAdditionalWorkers);
router.post("/labor", postAdditionalWorker);
router
  .route("/:sessionId/labor/:id")
  .patch(authMiddleware, handleUpdateAdditionalWorkerById)
  .delete(authMiddleware, handleDeleteAdditionalWorkerById);
router
  .route("/:sessionId/labor/:workerId/transaction/:transactionId")
  .patch(authMiddleware, updateAdditionalWorkerTransactionByIds)
  .delete(authMiddleware, deleteAdditionalWorkerTransactionByIds);
router.put(
  "/:sessionId/labor/:id/transaction",
  authMiddleware,
  handleAddAdditionalWorkerTransactionById,
);

// harvest router
router.get("/:sessionId/harvester", authMiddleware, handleGetAllHarvestList);
router.post("/harvester", postHavrestData);
router
  .route("/:sessionId/harvester/:id")
  .patch(authMiddleware, handleUpdateHarvestDataById)
  .delete(authMiddleware, handleDeleteHarvestDataById)
  .put(authMiddleware, handleAddHarvesterTransactionById);
router
  .route("/:sessionId/harvester/:harvesterId/transaction/:transactionId")
  .patch(authMiddleware, updateHarvesterTransactionByIds)
  .delete(authMiddleware, deleteHavresterTransactionByIds);

module.exports = router;
