require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;
// Dashboard controller imports
const WorkerData = require("../../models/worker");
const {
  FieldWorker,
  Harvest: Harvester,
} = require("../../models/otherexpense");
const Industries = require("../../models/integratedData");
const {
  calculateAutoInterestForTakeAmount,
  calculateAutoInterestForBuyBillAmount,
  calculateAutoInterestForGiveAmount,
  calculateAutoInterestDieselBillAmount,
} = require("./dashbordInterestCalc");
const { overAllTotalOfAllShopes } = require("./calculation");

// Dashboard controller functions using map method

async function dashBordData(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    const Ind = await Industries.find({ userId: currentUserId });
    if (!Ind) {
      return res.status(400).json({
        status: "Error",
        message: "Ind data not found",
      });
    }

    const allShopes = Ind.map((shopes) => {
      const shopeNumber = shopes?.shopeNumber;
      const shopeData = shopes.shopeAccount.map((transaction) => {
        const startDate = transaction?.startDate || "";
        const rate = transaction?.rate || 24;
        const endDate = new Date();

        const loanAmount = transaction?.loan?.amount || 0;
        const buyAmount = transaction?.indBuy?.billAmount || 0;
        const sellAmount = transaction?.indSell?.billAmount || 0;
        const dieselAmount = transaction?.diesel?.billAmount || 0;
        //loan
        if (
          loanAmount > 0 ||
          buyAmount > 0 ||
          sellAmount > 0 ||
          dieselAmount > 0
        ) {
          const loanInterest = calculateAutoInterestForTakeAmount(
            loanAmount,
            startDate,
            rate,
            endDate,
          );
          //buy item

          const buyInterest = calculateAutoInterestForBuyBillAmount(
            buyAmount,
            startDate,
            rate,
            endDate,
          );
          //sellItem

          const sellInterest = calculateAutoInterestForGiveAmount(
            sellAmount,
            startDate,
            rate,
            endDate,
          );
          //dieselAmount

          const dieselInterest = calculateAutoInterestDieselBillAmount(
            dieselAmount,
            startDate,
            rate,
            endDate,
          );

          return {
            loan: loanInterest,
            buy: buyInterest,
            sell: sellInterest,
            diesel: dieselInterest,
          };
        } else {
          return null;
        }
      });

      const shopesTotal = overAllTotalOfAllShopes(shopeData);
      return {
        shopeNumber: shopeNumber,
        overAllTotal: shopesTotal,
      };
    }).filter((item) => item !== null);

    return res.status(200).json({
      status: "Success",
      data: allShopes,
      Code: "dashbord fetched successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      Code: "",
      message: err.message,
    });
  }
}

module.exports = { dashBordData };
