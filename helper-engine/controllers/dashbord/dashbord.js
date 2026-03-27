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

// Dashboard controller functions using map method

async function dashBordData(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserId = decoded.id;
  const Ind = await Industries.find({ userId: currentUserId });

  const allShopes = Ind.flatMap((shopes) => {
    const shopeNumber = shopes?.shopeNumber;
    const shopeData = shopes.shopeAccount.map((transaction) => {
      const startDate = transaction?.startDate || "";
      const rate = transaction?.rate || 24;
      const endDate = new Date();
      const loanAmount = transaction?.loan?.amount || 0;
      //loan
      const loanInterest = calculateAutoInterestForTakeAmount(
        loanAmount,
        startDate,
        rate,
        endDate,
      );
      //buy item
      const buyAmount = transaction?.indBuy?.billAmount || 0;
      const buyInterest = calculateAutoInterestForBuyBillAmount(
        buyAmount,
        startDate,
        rate,
        endDate,
      );
      //sellItem
      const sellAmount = transaction?.indSell?.billAmount || 0;
      const sellInterest = calculateAutoInterestForGiveAmount(
        sellAmount,
        startDate,
        rate,
        endDate,
      );
      //dieselAmount
      const dieselAmount = transaction?.diesel?.billAmount || 0;
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
    });
    return {
      shopeNumber: shopeNumber,
      transactions: shopeData,
    };
  });

  console.log(allShopes);
}

module.exports = { dashBordData };
