const MarketTaxs = require("../models/marketTax");

const marketTaxsCalculatingFunction = (rfe, rfc, tosc, em, com) => {
  const eightMiti = Number(((tosc * rfe) / 100).toFixed(2));
  const commission = Number(((tosc * rfc) / 100).toFixed(2));
  const rateForEightMiti = Number(((em / tosc) * 100).toFixed(2));
  const rateForCommission = Number(((com / tosc) * 100).toFixed(2));

  if (em > 0 && com > 0) {
    return {
      eightMiti: em,
      commission: com,
      rateForEightMiti: rateForEightMiti,
      rateForCommission: rateForCommission,
    };
  }

  if (em > 0) {
    return {
      eightMiti: em,
      commission: 0,
      rateForEightMiti: rateForEightMiti,
      rateForCommission: 0,
    };
  }

  if (com > 0) {
    return {
      eightMiti: 0,
      commission: com,
      rateForEightMiti: 0,
      rateForCommission: rateForCommission,
    };
  }
  if (rfe > 0 && rfc > 0) {
    return {
      eightMiti: eightMiti,
      commission: commission,
      rateForEightMiti: rfe,
      rateForCommission: rfc,
    };
  }
  if (rfe > 0) {
    return {
      eightMiti: eightMiti,
      commission: 0,
      rateForEightMiti: rfe,
      rateForCommission: 0,
    };
  }
  if (rfc > 0) {
    return {
      eightMiti: 0,
      commission: commission,
      rateForEightMiti: 0,
      rateForCommission: rfc,
    };
  }
};

async function handlePostDataForMarketTaxCalculating(req, res) {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      status: "Error",
      message: "All fields are required",
    });
  }

  if (body.rfe <= 0 && body.rfc <= 0 && body.em <= 0 && body.com <= 0) {
    return res.status(204).end();
  }

  try {
    const { eightMiti, commission, rateForEightMiti, rateForCommission } =
      marketTaxsCalculatingFunction(
        body.rfe,
        body.rfc,
        body.tosc,
        body.em,
        body.com,
      );

    await MarketTaxs.create({
      userId: body.userId,
      sessionId: body.sessionId,
      shopeId: body.shopeId,
      rateForEightMiti: rateForEightMiti,
      rateForCommission: rateForCommission,
      totalOfSellCrop: body.tosc,
      eightMiti: eightMiti,
      commission: commission,
    });
    return res.status(201).json({
      status: "Success",
      message: "Market Tax Calculated and Data Saved Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handleGetDataForMarketTaxCalculating(req, res) {
  const decoded = req.user;
  const currentUserId = decoded.id;
  const { sessionId, shopeId } = req.params;

  if (!sessionId || !shopeId) {
    return res.status(400).json({
      status: "Error",
      message: "Session ID and Shope ID are required",
    });
  }

  try {
    const marketTaxData = await MarketTaxs.findOne({
      userId: currentUserId,
      sessionId: sessionId,
      shopeId: shopeId,
    });

    return res.status(200).json({
      status: "Success",
      data: marketTaxData,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function handleUpdateDataForMarketTaxCalculating(req, res) {
  const decoded = req.user;
  const currentUserId = decoded.id;
  const { sessionId, shopeId, dataId } = req.params;

  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      status: "Error",
      message: "All fields are required",
    });
  }

  try {
    const { eightMiti, commission, rateForEightMiti, rateForCommission } =
      marketTaxsCalculatingFunction(
        body.rfe,
        body.rfc,
        body.tosc,
        body.em,
        body.com,
      );

    const updateBody = {
      rateForEightMiti: rateForEightMiti,
      rateForCommission: rateForCommission,
      totalOfSellCrop: body.tosc,
      eightMiti: eightMiti,
      commission: commission,
    };

    const updatedMarketTaxData = await MarketTaxs.findOneAndUpdate(
      {
        _id: dataId,
        userId: currentUserId,
        sessionId: sessionId,
        shopeId: shopeId,
      },
      updateBody,
      { new: true },
    );

    return res.status(200).json({
      status: "Success",
      data: updatedMarketTaxData,
      message: "Market Tax Data Updated Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
    console.log("Market tax update error :", err.message);
  }
}

module.exports = {
  handlePostDataForMarketTaxCalculating,
  handleGetDataForMarketTaxCalculating,
  handleUpdateDataForMarketTaxCalculating,
};
