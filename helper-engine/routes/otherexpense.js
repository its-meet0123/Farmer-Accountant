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

const router = express.Router();

// labor routes
router
  .route("/labor")
  .get(handleGetAllAdditionalWorkers)
  .post(postAdditionalWorker);
router
  .route("/labor/:id")
  .patch(handleUpdateAdditionalWorkerById)
  .delete(handleDeleteAdditionalWorkerById);
router
  .route("/labor/:workerId/transaction/:transactionId")
  .patch(updateAdditionalWorkerTransactionByIds)
  .delete(deleteAdditionalWorkerTransactionByIds);
router.put("/labor/:id/transaction", handleAddAdditionalWorkerTransactionById);

// harvest router
router.route("/harvester").get(handleGetAllHarvestList).post(postHavrestData);
router
  .route("/harvester/:id")
  .patch(handleUpdateHarvestDataById)
  .delete(handleDeleteHarvestDataById)
  .put(handleAddHarvesterTransactionById);
router
  .route("/harvester/:harvestId/transaction/:transactionId")
  .patch(updateHarvesterTransactionByIds)
  .delete(deleteHavresterTransactionByIds);

module.exports = router;
