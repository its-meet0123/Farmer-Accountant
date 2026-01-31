const WorkerData = require("../models/worker");
const InterestDate = require("../models/endDate");
const jwt = require("jsonwebtoken");
const { calculateAutoInterst } = require("../components/calculator");
const JWT_SECRET = "#96%meet$kaur@2026";

async function handleAddWorker(req, res) {
  try {
    const workerInfo = req.body;
    const newWorker = await WorkerData.create(workerInfo);
    return res.status(201).json({
      status: "success",
      message: "Worker added sucessfully",
      data: newWorker,
    });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
}

async function handleGetAllWorkers(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    const workers = await WorkerData.find({ userId: currentUserId });

    if (workers) {
      return res.status(200).json({
        status: "success",
        data: workers,
        message: "Workers fetched successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function handleEditWorkerById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    const { id } = req.params;
    const body = req.body;

    if (!id || !body) {
      return res.status(400).json({
        status: "fail",
        message: "Id and body are required",
      });
    }
    const updatedWorker = await WorkerData.findOneAndUpdate(
      {
        _id: id,
        userId: currentUserId,
      },
      body,
      { new: true },
    );

    if (updatedWorker) {
      return res.status(200).json({
        status: "success",
        message: "Worker updated successfully",
        data: updatedWorker,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function handleDeleteWorkerById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    const { id } = req.params;

    if (!id || !currentUserId) {
      return res.status(400).json({
        status: "fail",
        message: "Id is required",
      });
    }

    const deletedWorker = await WorkerData.findOneAndDelete({
      _id: id,
      userId: currentUserId,
    });

    if (deletedWorker) {
      return res.status(200).json({
        status: "success",
        message: "Worker deleted successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function handleGetWorkerById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    const { id } = req.params;

    if (!id || !currentUserId) {
      return res.status(404).json({
        status: "fail",
        message: "Id is required",
      });
    }

    const worker = await WorkerData.findOne({
      userId: currentUserId,
      _id: id,
    });

    if (worker) {
      return res.status(200).json({
        status: "success",
        message: "Worker fetched successfully",
        data: worker,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function handlePushWorkerTransactionById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    const { id } = req.params;
    const body = req.body;

    if (!id || !body) {
      return res.status(400).json({
        status: "fail",
        message: "Id and body are required",
      });
    }
    const workerById = await WorkerData.findOneAndUpdate(
      { _id: id, userId: currentUserId },
      {
        $push: {
          account: body,
        },
      },
      { new: true },
    );
    if (workerById) {
      res.status(200).json({
        status: "success",
        message: "Transaction pushed successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function handleGetWorkerTransactionById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    const { workerId } = req.params;
    if (!workerId || !currentUserId) {
      return res.status(400 || 500).json({
        status: "fail",
        message: "WorkerId, DecodedId not found",
      });
    }
    const worker = await WorkerData.findOne({
      _id: workerId,
      userId: currentUserId,
    });
    const Dates = await InterestDate.find({ userId: currentUserId });
    if (!worker || !Dates) {
      res.status(500).json({
        status: "fail",
        message: "Data not found in DB",
      });
    }

    const endDate = Dates[1]?.endDate;
    const workerTransactionWithInterest = {
      workerName: worker.workerDetail.workerName,
      account: worker?.account?.map((ac) => {
        const amount = ac.give.amount;
        const payment = ac.take.payment;
        const rate = ac.rate;
        const startDate = ac.date;

        const amountResult = calculateAutoInterst(
          amount,
          startDate,
          rate,
          endDate,
        );
        const paymentResult = calculateAutoInterst(
          payment,
          startDate,
          rate,
          endDate,
        );

        return {
          date: startDate,
          give: {
            amount: amount,
            interest: Number(amountResult.interst).toFixed(2),
            totalAmount: Number(amountResult.totalAmount).toFixed(2),
            amountType: ac.give.amountType,
            brief: ac.give.brief,
            days: amountResult.days,
            months: amountResult.months,
          },
          take: {
            payment: payment,
            paymentType: ac.take.paymentType,
            interest: Number(paymentResult.interst).toFixed(2),
            totalPayment: Number(paymentResult.totalAmount).toFixed(2),
            days: paymentResult.days,
            months: paymentResult.months,
          },
          rate: rate,
        };
      }),
    };

    return res.status(200).json({
      status: "success",
      message: "Worker account get successfully",
      data: workerTransactionWithInterest,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message:
        "Data not fetched internal sever problem in get worker transaction",
    });
  }
}

async function handleUpdateWorkerTransactionById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    const { workerId, accountId } = req.params;

    const updateData = req.body;
    const updatedWorkerAccount = await WorkerData.findOneAndUpdate(
      {
        userId: currentUserId,
        _id: workerId,
        "account._id": accountId,
      },
      {
        $set: {
          "account.$": updateData,
        },
      },
      { new: true },
    );

    if (updatedWorkerAccount) {
      res.status(200).json({
        status: "success",
        message: "Worker account updated successfully",
        data: updatedWorkerAccount,
      });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
}

async function handleDeleteWorkerTransactionById(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    const { workerId } = req.params;
    const ids = req.body;

    if (!workerId || !ids) {
      return res.status(400).json({
        status: "fail",
        message: "Worker Id is required",
      });
    }

    const deletedWorkerAccount = await WorkerData.updateOne(
      {
        userId: currentUserId,
        _id: workerId,
      },
      {
        $pull: {
          account: { _id: { $in: ids } },
        },
      },
    );

    res.status(200).json({
      status: "success",
      message: "Worker account transactions deleted successfully",
      data: deletedWorkerAccount,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
}

module.exports = {
  handleAddWorker,
  handleGetAllWorkers,
  handleEditWorkerById,
  handleDeleteWorkerById,
  handleGetWorkerById,
  handlePushWorkerTransactionById,
  handleGetWorkerTransactionById,
  handleUpdateWorkerTransactionById,
  handleDeleteWorkerTransactionById,
};
