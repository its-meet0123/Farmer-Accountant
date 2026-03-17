const express = require("express");
const {
  handleGetAllAdditionalWorkers,
  handleDeleteAdditionalWorkerById,
  handleUpdateAdditionalWorkerById,
  postAdditionalWorker,
  updateAdditionalWorkerTransactionByIds,
  deleteAdditionalWorkerTransactionByIds,
  handleAddAdditionalWorkerTransactionById,
} = require("../controllers/otherexpense");

const router = express.Router();

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
  .put(updateAdditionalWorkerTransactionByIds)
  .post(deleteAdditionalWorkerTransactionByIds);
router.put("/labor/:id/transaction", handleAddAdditionalWorkerTransactionById);

module.exports = router;
