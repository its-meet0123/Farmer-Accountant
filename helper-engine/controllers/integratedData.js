require("dotenv").config();
const { calculateAutoInterst } = require("../components/calculator");
const Industries = require("../models/integratedData");
const InterestDate = require("../models/endDate");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

async function handleGetAllIndData(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const indAllData = await Industries.find({ userId: currentUserId });
  if (!indAllData) {
    return res.status(404).json({
      status: "Error",
      Message: "Data not found",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: indAllData,
  });
}

async function handleGetIndShopeAccountById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "fail",
        message: "ID is required",
      });
    }
    const indDataBySNo = await Industries.findById({
      _id: id,
      userId: currentUserId,
    });
    const dates = await InterestDate.find({ userId: currentUserId });
    const endDate = dates[0]?.endDate;

    if (!indDataBySNo) {
      return res
        .status(404)
        .json({ status: "Error", msg: "Ind Data not found" });
    }
    const updateIndData = {
      shopeNumber: indDataBySNo.shopeNumber,
      shopeAccount: indDataBySNo?.shopeAccount?.map((account) => {
        const loanAmount = account.loan.amount;
        const buyBillAmount = account.indBuy.billAmount;
        const sellBillAmount = account.indSell.billAmount;
        const dieselBillAmount = account.diesel.billAmount;
        const rate = account.rate;
        const startDate = account.startDate;

        const loanAmountResult = calculateAutoInterst(
          loanAmount,
          startDate,
          rate,
          endDate,
        );
        const buyBillAmountResult = calculateAutoInterst(
          buyBillAmount,
          startDate,
          rate,
          endDate,
        );
        const sellBillAmountResult = calculateAutoInterst(
          sellBillAmount,
          startDate,
          rate,
          endDate,
        );
        const dieselBillAmountResult = calculateAutoInterst(
          dieselBillAmount,
          startDate,
          rate,
          endDate,
        );
        return {
          startDate: account.startDate,
          loan: {
            amount: account.loan.amount,
            amountType: account.loan.amountType,
            interest: Number(loanAmountResult.interst),
            totalAmount: Number(loanAmountResult.totalAmount),
            days: loanAmountResult.days,
            months: loanAmountResult.months,
          },
          indBuy: {
            billAmount: account.indBuy.billAmount,
            bill: account.indBuy.bill,
            interest: Number(buyBillAmountResult.interst),
            brief: account.indBuy.brief,
            totalAmount: Number(buyBillAmountResult.totalAmount),
            days: buyBillAmountResult.days,
            months: buyBillAmountResult.months,
          },
          indSell: {
            crop: account.indSell.crop,
            brief: account.indSell.brief,
            billAmount: account.indSell.billAmount,
            bill: account.indSell.bill,
            interest: Number(sellBillAmountResult.interst),
            days: sellBillAmountResult.days,
            months: sellBillAmountResult.months,
            totalAmount: Number(sellBillAmountResult.totalAmount),
          },
          diesel: {
            qty: account.diesel.qty,
            billAmount: account.diesel.billAmount,
            rate: account.diesel.rate,
            bill: account.diesel.bill,
            interest: Number(dieselBillAmountResult.interst),
            totalAmount: Number(dieselBillAmountResult.totalAmount),
            days: dieselBillAmountResult.days,
            months: dieselBillAmountResult.months,
          },
        };
      }),
    };
    return res.status(200).json({
      status: "Success",
      message: "Ind Data founded",
      data: updateIndData,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function handleUpdateIndDataById(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const { id } = req.params;
  const body = req.body;
  const indDataById = await Industries.findOneAndUpdate(
    { _id: id, userId: currentUserId },
    body,
    {
      new: true,
    },
  );
  if (!indDataById) {
    return res.status(404).json({ status: "Error", msg: "Data not found" });
  }
  return res.json({
    status: "Success",
    msg: "Ind. Data updated successfully",
    data: indDataById,
  });
}

async function handleDeleteManyIndData(req, res) {
  const ids = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Ids required" });
  }
  const indDataById = await Industries.deleteMany({
    _id: { $in: ids },
    userId: currentUserId,
  });
  if (!indDataById) {
    return res.status(404).json({ status: "Error", msg: "Ind Data not found" });
  }
  return res
    .status(200)
    .json({ status: "Success", msg: "Ind. Datas Deleted successfully" });
}

async function handlePushIndShopeAccountById(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const id = req.params.id;
  const body = req.body;
  if (!id || !body) {
    return res.status(400).json({
      status: "Error",
      msg: "Id and all fields are required",
    });
  }
  const indDataBySNo = await Industries.findOneAndUpdate(
    { _id: id, userId: currentUserId },
    {
      $push: {
        shopeAccount: body,
      },
    },
    { new: true },
  );
  if (!indDataBySNo) {
    return res.status(400).json({
      status: "Error",
      msg: "Please enter the Id correctly",
    });
  }

  return res.status(200).json({
    status: "Success",
    msg: "Shop account pushed successfully",
    data: indDataBySNo,
  });
}

async function handleUpdateIndShopeAccountTransactionById(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  try {
    const { shopeId, accountId } = req.params;
    const updateData = req.body;

    const updatedShopeAccount = await Industries.findOneAndUpdate(
      {
        userId: currentUserId,
        _id: shopeId,
        "shopeAccount._id": accountId, // 👈 array object match
      },
      {
        $set: {
          "shopeAccount.$": updateData, // 👈 pura object replace
        },
      },
      { new: true },
    );

    res.status(200).json({ status: "success", data: updatedShopeAccount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleDeleteManyIndShopeTransaction(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const { id } = req.params;
  const ids = req.body;
  if (ids.length === 0) {
    return res.status(400).json({ message: "Ids required" });
  }
  const indDataById = await Industries.updateOne(
    { _id: id, userId: currentUserId },
    {
      $pull: { shopeAccount: { _id: { $in: ids } } },
    },
  );
  if (!indDataById) {
    return res.status(404).json({ status: "Error", msg: "Ind Data not found" });
  }
  return res
    .status(200)
    .json({ status: "Success", msg: "Ind. Datas Deleted successfully" });
}

async function handleCreateIndData(req, res) {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res
      .status(404)
      .json({ status: "Error", msg: "All fields are required" });
  }

  const result = await Industries.insertMany(
    body.map((item) => ({
      userId: item.userId,
      nameInd: item.nameInd,
      shopeNumber: item.shopeNumber,
      shopeAccount: item.shopeAccount,
    })),
  );

  return res.status(201).json({
    status: "Success",
    msg: `Ind. Data created successfully for ${result._id} id`,
  });
}

module.exports = {
  handleCreateIndData,
  handlePushIndShopeAccountById,
  handleGetIndShopeAccountById,
  handleGetAllIndData,
  handleUpdateIndDataById,
  handleDeleteManyIndData,
  handleUpdateIndShopeAccountTransactionById,
  handleDeleteManyIndShopeTransaction,
};
