const express = require("express");
const router = express.Router();

const {
  handlePostDataForMarketTaxCalculating,
  handleGetDataForMarketTaxCalculating,
  handleUpdateDataForMarketTaxCalculating,
} = require("../controllers/marketTax");

router.post("/", handlePostDataForMarketTaxCalculating);
router.get("/:sessionId/:shopeId", handleGetDataForMarketTaxCalculating);
router.patch(
  "/:sessionId/:shopeId/:dataId",
  handleUpdateDataForMarketTaxCalculating,
);
module.exports = router;
