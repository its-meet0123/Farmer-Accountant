const express = require("express");
const router = express.Router();

const {
  handlePostDataForMarketTaxCalculating,
  handleGetDataForMarketTaxCalculating,
  handleUpdateDataForMarketTaxCalculating,
} = require("../controllers/marketTax");
const authMiddleware = require("../middleware/checkAuth");

router.post("/", handlePostDataForMarketTaxCalculating);
router.get(
  "/:sessionId/:shopeId",
  authMiddleware,
  handleGetDataForMarketTaxCalculating,
);
router.patch(
  "sessionId/:sessionId/shopeId/:shopeId/dataId/:dataId",
  authMiddleware,
  handleUpdateDataForMarketTaxCalculating,
);
module.exports = router;
