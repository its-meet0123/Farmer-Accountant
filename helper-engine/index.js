require("dotenv").config();
const express = require("express");
const { connectMongoDB } = require("./connection/connect");
const integratedRouter = require("./routes/integrated");
const intShopeRouter = require("./routes/integratedData");
const dateRouter = require("./routes/endDate");
const userRouter = require("./routes/user");
const workerRouter = require("./routes/worker");
const otherExpenseRouter = require("./routes/otherexpense");
const dashBordRouter = require("./routes/dashbord");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cookieParser());
app.use(express.json());

connectMongoDB(`${process.env.MONGO_URI}`).then(() =>
  console.log("Connected to MongoDB"),
);

const corsOptions = {
  origin: "https://farmer-accoutant.onrender.com",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "chache-control",
    "pragma",
  ],
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use("/user", userRouter);
app.use("/int", integratedRouter);
app.use("/intshope", intShopeRouter);
app.use("/intdate", dateRouter);
app.use("/worker", workerRouter);
app.use("/other", otherExpenseRouter);
app.use("/dashbord", dashBordRouter);

app.get("/health-check", (req, res) => {
  res.status(200).send("Server is Up and Running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on Port ${PORT}`);
});
