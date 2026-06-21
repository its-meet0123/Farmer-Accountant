const { calculateAutoInterst } = require("../components/calculator");
const Session = require("../models/session");
const FinalDate = require("../models/endDate");

async function autoInterestCalculationForShopes(req, res, next) {
  try {
    const body = req.body;
    const decoded = req.user;
    const currentUserId = decoded.id;
    const shopeId = req.params.id ? req.params.id : req.params.shopeId;

    if (Object.keys(body).length === 0 || !shopeId) {
      return res
        .status(404)
        .json({ status: "Error", msg: "All fields are required" });
    }
    console.log("shopeId ya dataId in middleware for shopes : ", shopeId);
    const date = await FinalDate.findOne({
      userId: currentUserId,
      dataId: shopeId,
    });

    console.log(
      "end date set krne ke baad fetch in middleware for shopes :",
      date,
    );

    const today = new Date();
    const startDate = body?.startDate;
    const rate = body?.rate || 0;
    let endDate;
    if (date?.endDate) {
      endDate = date.endDate;
    } else {
      endDate = today;
    }
    console.log("End date in middleware for shopes : ", endDate);
    const loanAmount = body?.amount || 0;
    const buyBillAmount = body?.bBillAmount || 0;
    const sellBillAmount = body?.sBillAmount || 0;
    const dieselBillAmount = body?.dBillAmount || 0;

    const interestOfLoanAmount = calculateAutoInterst(
      loanAmount,
      startDate,
      rate,
      endDate,
    );
    const interestOfBuyBillAmount = calculateAutoInterst(
      buyBillAmount,
      startDate,
      rate,
      endDate,
    );
    const interestOfSellBillAmount = calculateAutoInterst(
      sellBillAmount,
      startDate,
      rate,
      endDate,
    );
    const interestOfDieselBillAmount = calculateAutoInterst(
      dieselBillAmount,
      startDate,
      rate,
      endDate,
    );

    const newBody = {
      startDate: startDate,
      rate: rate,
      loan: {
        amount: loanAmount,
        ...interestOfLoanAmount,
        amountType: body?.amountType || "",
        handOver: body?.handOver || "",
      },
      indBuy: {
        billAmount: buyBillAmount,
        ...interestOfBuyBillAmount,
        bill: body?.bBill || "",
        brief: body?.bBrief || "",
        handOver: body?.bHandOver || "",
      },
      indSell: {
        crop: body?.crops || body?.crop || [],
        billAmount: sellBillAmount,
        ...interestOfSellBillAmount,
        bill: body?.sBill || "",
        brief: body?.sBrief || "",
        handOver: body?.sHandOver || "",
      },
      diesel: {
        billAmount: dieselBillAmount,
        ...interestOfDieselBillAmount,
        bill: body?.dBill || "",
        qty: body?.dOty || "",
        rate: body?.dRate || "",
        handOver: body?.dHandOver || "",
      },
    };

    req.body = newBody || {};

    next();
  } catch (err) {
    return res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
}

async function autoInterestCalculationForWorker(req, res, next) {
  try {
    const body = req.body;
    const decoded = req.user;
    const currentUserId = decoded.id;
    const workerId = req.params.id || req.params.workerId;

    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "Error",
        Code: "Transaction not find",
        data: null,
      });
    }

    const date = await FinalDate.findOne({
      userId: currentUserId,
      dataId: workerId,
    });

    const startDate = body?.date;
    const rate = body?.interestRate || 0;
    let endDate;
    const today = new Date();
    if (date?.endDate) {
      endDate = date.endDate > today ? today : date.endDate;
    } else {
      endDate = today;
    }
    const giveAmount = body?.amount || 0;
    const takePayment = body?.payment || 0;

    const interestOfGiveAmount = calculateAutoInterst(
      giveAmount,
      startDate,
      rate,
      endDate,
    );
    const interestOfTakePayment = calculateAutoInterst(
      takePayment,
      startDate,
      rate,
      endDate,
    );

    const transactionBody = {
      date: startDate,
      rate: rate,
      give: {
        amount: giveAmount,
        brief: body?.brief || "",
        amountType: body?.amountType || "",
        ...interestOfGiveAmount,
        crop: body?.cropG || [],
      },
      take: {
        payment: takePayment,
        paymentType: body?.paymentType || "",
        ...interestOfTakePayment,
        crop: body?.cropT || [],
      },
    };

    req.body = transactionBody;

    next();
  } catch (err) {
    return res.status(500).json({
      status: "Fail",
      message: err.message,
      data: null,
    });
  }
}

module.exports = {
  autoInterestCalculationForShopes,
  autoInterestCalculationForWorker,
};
