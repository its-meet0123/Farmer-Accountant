require("dotenv").config();
const entData = require("../models/integrated");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;

async function handleGetAllEntData(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const entDataDB = await entData.find({ userId: currentUserId });

  if (!entDataDB) {
    return res.status(404).json({
      status: "Error",
      msg: "Ent Data not found",
    });
  }

  return res.status(200).json({
    status: "Success",
    data: entDataDB,
  });
}

async function handleGetEntDataById(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      msg: "ID required",
    });
  }
  const entDataDB = await entData.findById({ _id: id, userId: currentUserId });

  if (!entDataDB) {
    return res.status(404).json({
      status: "Error",
      msg: `data not found from this ${id} `,
    });
  }

  return res.status(200).json({
    status: "Success",
    data: entDataDB,
  });
}

async function handleUpdateEntDataById(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const { id } = req.params;
  const body = req.body;

  if (!id && !body) {
    return res.status(400).json({
      status: "Error",
      msg: "Please id and fields are required",
    });
  }
  const entDataDB = await entData.findByIdAndUpdate(
    { _id: id, userId: currentUserId },
    body,
    { new: true },
  );

  if (!entDataDB) {
    return res.status(404).json({
      status: "Error",
      msg: "Ent Data not found",
    });
  }

  return res.status(200).json({
    status: "Success",
    data: entDataDB,
  });
}

async function handleDeleteEntDataById(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      msg: "ID required",
    });
  }
  const entDataDB = await entData.findByIdAndDelete({
    _id: id,
    userId: currentUserId,
  });

  if (!entDataDB) {
    return res.status(404).json({
      status: "Error",
      msg: `data not found from this ${id} `,
    });
  }

  return res.status(200).json({
    status: "Success",
    msg: `data deleted successfully from ${entDataDB._id}`,
  });
}

async function handlePostEntData(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      status: "Error",
      msg: "All fields are required",
    });
  }
  const entDataDB = entData.create({
    userId: body.userId,
    startDate: body.startDate,
    nameInd: body.nameInd,
    indFounder: {
      firstName: body.firstName,
      lastName: body.lastName,
    },
    indContact: body.contact,
    shopes: body.shopes,
  });

  return res.status(201).json({
    status: "Success",
    msg: `Ent data create successfully for ${entDataDB._id} id`,
  });
}

module.exports = {
  handlePostEntData,
  handleGetAllEntData,
  handleGetEntDataById,
  handleUpdateEntDataById,
  handleDeleteEntDataById,
};
