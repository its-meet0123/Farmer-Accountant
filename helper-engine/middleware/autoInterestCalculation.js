const { calculateAutoInterst } = require("../components/calculator");
const InterestDate = require("../models/endDate");

//const endDate = Dates[1]?.endDate;
async function autoInterestCalculationForShopes(req, res, next) {
  try {
    const body = req.body;
    const decoded = req.user;
    const currentUserId = decoded.id;
    console.log(
      "auto interest middleware for add and edit shope transaction :",
      body,
    );
    if (!body) {
      return res
        .status(404)
        .json({ status: "Error", msg: "All fields are required" });
    }
    const Dates = await InterestDate.find({ userId: currentUserId });

    if (!Dates) {
      res.status(500).json({
        status: "fail",
        message: "Data not found in DB",
      });
    }

    const startDate = body?.startDate;
    const rate = body?.rate || 0;
    const endDate = Dates[0]?.endDate || new Date();
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
    if (!body) {
      return res.status(400).json({
        status: "Error",
        Code: "Transaction not find",
        data: null,
      });
    }

    const Dates = InterestDate.find({ userId: currentUserId });
    if (!Dates) {
      return res.status(400).json({
        status: "Fail",
        message: "Date not found in DB",
      });
    }
    const startDate = body?.date;
    const rate = body?.interestRate || 0;
    const endDate = Dates[1]?.endDate || new Date();
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
