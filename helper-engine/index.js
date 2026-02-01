const express = require("express");
require("dotenv").config();
const { connectMongoDB } = require("./connection/connect");
const integratedRouter = require("./routes/integrated");
const intShopeRouter = require("./routes/integratedData");
const dateRouter = require("./routes/endDate");
const userRouter = require("./routes/user");
const workerRouter = require("./routes/worker");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());

connectMongoDB(`mongodb://${process.env.DATA_BASE_URL}`).then(() =>
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
