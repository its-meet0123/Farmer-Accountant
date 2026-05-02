const WorkerData = require("../models/worker");

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
    const decoded = req.user;
    const currentUserId = decoded.id;
    const { sessionId } = req.params;
    const workers = await WorkerData.find({
      userId: currentUserId,
      sessionId: sessionId,
    });

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
    const decoded = req.user;
    const currentUserId = decoded.id;

    const { sessionId, id } = req.params;
    const body = req.body;

    if (!id || !body || !sessionId) {
      return res.status(400).json({
        status: "fail",
        message: "Id, body, and sessionId are required",
      });
    }
    const updatedWorker = await WorkerData.findOneAndUpdate(
      {
        _id: id,
        userId: currentUserId,
        sessionId: sessionId,
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
    const decoded = req.user;
    const currentUserId = decoded.id;
    const { sessionId, id } = req.params;

    if (!id || !currentUserId || !sessionId) {
      return res.status(400).json({
        status: "fail",
        message: "Id, userId, and sessionId are required",
      });
    }

    const deletedWorker = await WorkerData.findOneAndDelete({
      _id: id,
      userId: currentUserId,
      sessionId: sessionId,
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
    const decoded = req.user;
    const currentUserId = decoded.id;
    const { sessionId, id } = req.params;

    if (!id || !currentUserId || !sessionId) {
      return res.status(404).json({
        status: "fail",
        message: "Id, userId, and sessionId are required",
      });
    }

    const worker = await WorkerData.findOne({
      userId: currentUserId,
      _id: id,
      sessionId: sessionId,
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
    const decoded = req.user;
    const currentUserId = decoded.id;

    const { sessionId, id } = req.params;
    const body = req.body;

    if (!id || !body || !sessionId) {
      return res.status(400).json({
        status: "fail",
        message: "Id, body, and sessionId are required",
      });
    }
    const workerById = await WorkerData.findOneAndUpdate(
      { _id: id, userId: currentUserId, sessionId: sessionId },
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
    const decoded = req.user;
    const currentUserId = decoded.id;
    const { sessionId, workerId } = req.params;
    if (!workerId || !currentUserId || !sessionId) {
      return res.status(400 || 500).json({
        status: "fail",
        message: "WorkerId, DecodedId, and SessionId not found",
      });
    }
    const worker = await WorkerData.findOne({
      _id: workerId,
      userId: currentUserId,
      sessionId: sessionId,
    });
    if (!worker) {
      res.status(500).json({
        status: "fail",
        message: "Data not found in DB",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Worker account get successfully",
      data: worker,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message:
        "Data not fetched internal sever problem in get worker transaction" +
        err.message,
    });
  }
}

async function handleUpdateWorkerTransactionById(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const { sessionId, workerId, accountId } = req.params;

    const updateData = req.body;
    const updatedWorkerAccount = await WorkerData.findOneAndUpdate(
      {
        userId: currentUserId,
        _id: workerId,
        sessionId: sessionId,
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
    const decoded = req.user;
    const currentUserId = decoded.id;

    const { sessionId, workerId } = req.params;
    const ids = req.body;

    if (!workerId || !ids || !sessionId) {
      return res.status(400).json({
        status: "fail",
        message: "Worker Id and session Id is required",
      });
    }

    const deletedWorkerAccount = await WorkerData.updateOne(
      {
        userId: currentUserId,
        sessionId: sessionId,
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
