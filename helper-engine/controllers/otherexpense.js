const {
  autoTotalForOtherExpense,
  autoTotalForHarvesterData,
} = require("../components/calculator");
const { FieldWorker, Harvest } = require("../models/otherexpense");

// 1. get worker list
async function handleGetAllAdditionalWorkers(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const allAdditionalWorker = await FieldWorker.find({
      userId: currentUserId,
    });
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
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: "Error", Code: "CL.FW.GAWSEM", message: err.message });
  }
}

// 1. get harvest data
async function handleGetAllHarvestList(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const harvestList = await Harvest.find({ userId: currentUserId });

    return res.status(200).json({
      status: "Success",
      Code: "CL.HL.GHLSM",
      data: harvestList,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "CL.HL.GHLSEM",
      message: err.message,
    });
  }
}

// 2. update harvest data by id
async function handleUpdateHarvestDataById(req, res) {
  const { id } = req.params;
  const body = req.body;

  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const harvestData = await Harvest.findOneAndUpdate(
      { _id: id, userId: currentUserId },
      { $set: body },
      { new: true },
    );

    return res.status(200).json({
      status: "Success",
      Code: "CL.HL.UHLBIDSM",
      data: harvestData,
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: "Error", Code: "CL.HL.UHLBIDSEM", message: err.message });
  }
}

// 2. update worker by id
async function handleUpdateAdditionalWorkerById(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const decoded = req.user;
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
  const id = req.params.id;

  try {
    const decoded = req.user;
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
      worker: deleteAdditionalWorker,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
      Code: "CL.FW.DWSEM",
    });
  }
}

// 3. delete harvest data by id
async function handleDeleteHarvestDataById(req, res) {
  const { id } = req.params;

  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const harvestData = await Harvest.findOneAndDelete({
      _id: id,
      userId: currentUserId,
    });

    return res.status(200).json({
      status: "Success",
      Code: "CL.HL.HDDSM",
      data: harvestData,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "CL.HL.HDDSEM",
      message: err.message,
    });
  }
}

// 4. add additional worker transaction by id
async function handleAddAdditionalWorkerTransactionById(req, res) {
  const id = req.params.id;
  const upcomingTrans = req.body;
  if (!id || !upcomingTrans) {
    return res.status(400).json({
      status: "Error",
      Code: "CL.FW.AWTEM",
    });
  }
  const ids = { iD: id, transactionId: "" };
  const body = await autoTotalForOtherExpense(ids, upcomingTrans);
  if (!body) {
    return res.status(500).json({
      status: "Error",
      Code: "CL.CTEM",
      Message: "Total not define",
      trans: body,
    });
  }
  try {
    const decoded = req.user;
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

// 4. add Harvester transaction by id
async function handleAddHarvesterTransactionById(req, res) {
  const { id } = req.params;
  const upComingTrans = req.body;

  const ids = { iD: id, transactionId: "" };

  const body = await autoTotalForHarvesterData(ids, upComingTrans);
  if (!body) {
    return res.status(500).json({
      status: "Error",
      Code: "",
      Message:
        "Body not find from middleware autoTotalForHarvesterData function.",
    });
  }

  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const addTransaction = await Harvest.findOneAndUpdate(
      { _id: id, userId: currentUserId },
      {
        $push: { transactions: body },
      },
    );

    return res.status(200).json({
      status: "Success",
      Code: "CL.HL.ATHLSM",
      data: addTransaction,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "CL.HL.ATHLSEM",
      message: err.message,
    });
  }
}

// 5. update additional worker transaction by id
async function updateAdditionalWorkerTransactionByIds(req, res) {
  const { workerId, transactionId } = req.params;
  const ids = { iD: workerId, transactionId: transactionId };
  const upcomingTrans = req.body;
  if (!workerId && !transactionId && !upcomingTrans) {
    return res.status(400).json({
      status: "Error",
      Code: "CL.FW.UWTEM",
    });
  }
  try {
    const body = await autoTotalForOtherExpense(ids, upcomingTrans);
    if (!body) {
      return res.status(500).json({
        status: "Error",
        Code: "CL.CTEM",
        Message: "Total not define",
        trnas: body,
      });
    }
    const decoded = req.user;
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

// 5. update harvester data transaction
async function updateHarvesterTransactionByIds(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const { harvesterId, transactionId } = req.params;
    const upComingTrans = req.body;

    const ids = { iD: harvesterId, transactionId: transactionId };

    const body = await autoTotalForHarvesterData(ids, upComingTrans);

    const harvestData = await Harvest.updateOne(
      {
        _id: harvesterId,
        userId: currentUserId,
        "transactions._id": transactionId,
      },
      { $set: { "transactions.$": body } },
    );

    return res.status(200).json({
      status: "Success",
      Code: "CL.HL.UHLTBIDSM",
      data: harvestData,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "CL.HL.UHTBIDSEM",
      message: err.message,
    });
  }
}

// 6. delete additional worker transaction by id
async function deleteAdditionalWorkerTransactionByIds(req, res) {
  const { workerId, transactionId } = req.params;
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    if (!workerId && !transactionId && !currentUserId) {
      return res.status(400).json({
        status: "Error",
        Code: "CL.FW.DWTEM",
      });
    }
    const deleteAdditionalWorkerTransaction = await FieldWorker.updateOne(
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
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "CL.FW.DWTBIDSEM",
      workerTrans: null,
      Message: err.message,
    });
  }
}

// 6. delete Harvester transaction
async function deleteHavresterTransactionByIds(req, res) {
  const { harvestId, transactionId } = req.params;
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;

    const deleteHarvestTransaction = await Harvest.updateOne(
      { _id: harvestId, userId: currentUserId },
      {
        $pull: { transactions: { _id: transactionId } },
      },
    );

    return res.status(200).json({
      status: "Success",
      Code: "CL.HL.DHTSM",
      data: deleteHarvestTransaction,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      status: "Error",
      Code: "CL.HL.DHLTSEM",
      message: err.message,
    });
  }
}

// 7. post additional worker
async function postAdditionalWorker(req, res) {
  try {
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
      typeOfWork: body.typeOfWork,
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
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      message: err.message,
      worker: null,
      Code: "CL.FW.PDSEM",
    });
  }
}

// 7. post havrest data
async function postHavrestData(req, res) {
  try {
    const body = req.body;
    const harvestDB = Harvest.create({
      userId: body.userId,
      date: body.date,
      serviceProvider: {
        firstName: body.firstName,
        lastName: body.lastName,
        nickName: body.nickName,
        address: body.address,
        contact: body.contact,
        idProof: body.idProof,
      },
      vehicalDetails: body.vehicalDetails,
      transactions: body.transactions,
    });

    return res.status(200).json({
      status: "Success",
      Code: "CL.HL.PHDSM",
      data: harvestDB,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "CL.HL.PHDSEM",
      message: err.message,
    });
  }
}

module.exports = {
  handleGetAllAdditionalWorkers,
  handleGetAllHarvestList,
  handleUpdateAdditionalWorkerById,
  handleUpdateHarvestDataById,
  handleDeleteAdditionalWorkerById,
  handleDeleteHarvestDataById,
  handleAddAdditionalWorkerTransactionById,
  handleAddHarvesterTransactionById,
  updateAdditionalWorkerTransactionByIds,
  updateHarvesterTransactionByIds,
  deleteAdditionalWorkerTransactionByIds,
  deleteHavresterTransactionByIds,
  postAdditionalWorker,
  postHavrestData,
};
