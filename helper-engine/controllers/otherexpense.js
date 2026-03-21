require("dotenv").config();
const { autoTotalForOtherExpense } = require("../components/calculator");
const { FieldWorker, Harvest } = require("../models/otherexpense");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

// for field workers

// 1. get worker list
async function handleGetAllAdditionalWorkers(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const allAdditionalWorker = await FieldWorker.find({ userId: currentUserId });
  if (!allAdditionalWorker) {
    return res.status(404).json({
      status: "Error",
      Code: "CL.FW.WNF",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: allAdditionalWorker,
    Code: "CL.FW.WF",
  });
}

// 2. update worker by id
async function handleUpdateAdditionalWorkerById(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    if (!id || !body) {
      return res.status(400).json({
        status: "Error",
        Code: "CL.FW.UWDEM",
      });
    }
    console.log(body);
    const updateAdditionalWorker = await FieldWorker.findOneAndUpdate(
      { _id: id, userId: currentUserId },
      { $set: body },
      { new: true },
    );
    if (!updateAdditionalWorker) {
      return res.status(404).json({
        status: "Error",
        Code: "CL.FW.WNF",
      });
    }
    return res.status(200).json({
      status: "Success",
      worker: updateAdditionalWorker,
      Code: "CL.FW.UWDSM",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
      Code: "CL.FW.UWDSE",
    });
  }
}

// 3. delete additional worker
async function handleDeleteAdditionalWorkerById(req, res) {
  try {
    const id = req.params.id;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    if (!id) {
      return res.status(400).json({
        status: "Error",
        Code: "CL.FW.DWEM",
      });
    }
    const deleteAdditionalWorker = await FieldWorker.findOneAndDelete({
      _id: id,
      userId: currentUserId,
    });
    if (!deleteAdditionalWorker) {
      return res.status(404).json({
        status: "Error",
        Code: "CL.FW.WNF",
      });
    }
    return res.status(200).json({
      status: "Success",
      Code: "CL.FW.DWSM",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
      Code: "CL.FW.DWSEM",
    });
  }
}

// 4. update additional worker transaction by id
async function handleAddAdditionalWorkerTransactionById(req, res) {
  try {
    const id = req.params.id;
    const upcomingTrans = req.body;
    if (!id || !upcomingTrans) {
      return res.status(400).json({
        status: "Error",
        Code: "CL.FW.AWTEM",
      });
    }
    const ids = { laborId: id, transactionId: "" };
    const body = await autoTotalForOtherExpense(ids, upcomingTrans);
    if (!body) {
      return res.status(500).json({
        status: "Error",
        Code: "CL.CTEM",
        Message: "Total not define",
        trans: body,
      });
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    const addAdditionalWorkerTransaction = await FieldWorker.findOneAndUpdate(
      {
        _id: id,
        userId: currentUserId,
      },
      {
        $push: {
          transactions: body,
        },
      },
    );
    if (!addAdditionalWorkerTransaction) {
      return res.status(400).json({
        status: "Error",
        Code: "CL.FW.WNF",
      });
    }
    return res.status(200).json({
      status: "Success",
      Code: "CL.FW.AWTSM",
      worker: addAdditionalWorkerTransaction,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "CL.FW.AWTSEM",
      message: err.message,
    });
  }
}

// 5. update additional worker transaction by id
async function updateAdditionalWorkerTransactionByIds(req, res) {
  try {
    const { workerId, transactionId } = req.params;
    const ids = { laborId: workerId, transactionId: transactionId };
    const upcomingTrans = req.body;
    console.log("workerId:", workerId, "transactionId:", transactionId);
    if (!workerId && !transactionId && !upcomingTrans) {
      return res.status(400).json({
        status: "Error",
        Code: "CL.FW.UWTEM",
      });
    }
    const body = await autoTotalForOtherExpense(ids, upcomingTrans);
    if (!body) {
      return res.status(500).json({
        status: "Error",
        Code: "CL.CTEM",
        Message: "Total not define",
        trnas: body,
      });
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    const updateAdditionalWorkerTransaction = await FieldWorker.updateOne(
      {
        _id: workerId,
        userId: currentUserId,
        "transactions._id": transactionId,
      },
      {
        $set: {
          "transactions.$": body,
        },
      },
    );
    if (updateAdditionalWorkerTransaction.modifiedCount === 0) {
      return res.status(404).json({
        status: "Error",
        Code: "CL.FW.UWTNF",
      });
    }
    return res.status(200).json({
      status: "Success",
      Code: "CL.FW.UWTBIDSM",
      workerTrans: updateAdditionalWorkerTransaction,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "Error",
      Code: "CL.FW.UWTBIDSEM",
      worker: null,
      Message: err.message,
    });
  }
}

// 6. delete additional worker transaction by id
async function deleteAdditionalWorkerTransactionByIds(req, res) {
  try {
    const { workerId, transactionId } = req.params;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;

    if (!workerId && !transactionId) {
      return res.status(400).json({
        status: "Error",
        Code: "CL.FW.DWTEM",
      });
    }
    const deleteAdditionalWorkerTransaction = await FieldWorker.updateMany(
      {
        _id: workerId,
        userId: currentUserId,
      },
      {
        $pull: { transactions: { _id: transactionId } },
      },
    );

    if (deleteAdditionalWorkerTransaction.modifiedCount === 0) {
      return res.status(404).json({
        status: "Error",
        Code: "Transaction not found or already deleted",
      });
    }
    return res.status(200).json({
      status: "Success",
      Code: "CL.FW.DWTBIDSM",
      workerTrans: deleteAdditionalWorkerTransaction,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      Code: "CL.FW.DWTBIDSEM",
      workerTrans: null,
    });
  }
}

// 7. post additional worker
async function postAdditionalWorker(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      status: "Error",
      Code: "CL.FW.PDEM",
    });
  }
  const casualLaborDB = FieldWorker.create({
    userId: body.userId,
    date: body.date,
    serviceProvider: {
      firstName: body.firstName,
      lastName: body.lastName,
      nickName: body.nickName,
      contact: body.contact,
      address: body.address,
      idProof: body.idProof,
    },
    transactions: body.transactions,
  });

  if (!casualLaborDB) {
    return res.status(400).json({
      status: "Error",
      Code: "CL.FW.WNF",
    });
  }
  return res.status(201).json({
    status: "Success",
    worker: casualLaborDB,
    Code: "CL.FW.PDSM",
  });
}

module.exports = {
  handleGetAllAdditionalWorkers,
  handleUpdateAdditionalWorkerById,
  handleDeleteAdditionalWorkerById,
  handleAddAdditionalWorkerTransactionById,
  updateAdditionalWorkerTransactionByIds,
  deleteAdditionalWorkerTransactionByIds,
  postAdditionalWorker,
};
