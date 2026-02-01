require("dotenv").config();
const express = require("express");
const { connectMongoDB } = require("./connection/connect");
const integratedRouter = require("./routes/integrated");
const intShopeRouter = require("./routes/integratedData");
const dateRouter = require("./routes/endDate");
const userRouter = require("./routes/user");
const workerRouter = require("./routes/worker");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

connectMongoDB(`${process.env.MONGO_URI}`).then(() =>
  console.log("Connected to MongoDB"),
);

app.use(
  cors({
    origin: ["http://10.61.113.103:5173", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use("/user", userRouter);
app.use("/int", integratedRouter);
app.use("/intshope", intShopeRouter);
app.use("/intdate", dateRouter);
app.use("/worker", workerRouter);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on Port ${PORT}`);
});
