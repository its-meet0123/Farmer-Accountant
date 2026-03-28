require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;
// Dashboard controller imports
const WorkerData = require("../../models/worker");
const { FieldWorker, Harvest } = require("../../models/otherexpense");
const Industries = require("../../models/integratedData");
const {
  calculateAutoInterestForTakeAmount,
  calculateAutoInterestForBuyBillAmount,
  calculateAutoInterestForGiveAmount,
  calculateAutoInterestDieselBillAmount,
} = require("./dashbordInterestCalc");
const {
  overAllTotalOfAllShopes,
  overAllTotalOfAllWorkers,
} = require("./calculation");

// Dashboard controller functions using map method

async function dashBordData(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserId = decoded.id;
    const Ind = await Industries.find({ userId: currentUserId });
    const workers = await WorkerData.find({ userId: currentUserId });
    const allCasualLabor = await FieldWorker.find({ userId: currentUserId });
    const allHarvests = await Harvest.find({ userId: currentUserId });

    const allShopes = Ind.map((shopes) => {
      const shopeNumber = shopes?.shopeNumber;
      const shopeData = shopes.shopeAccount.map((transaction) => {
        const startDate = transaction?.startDate || new Date();
        const rate = transaction?.rate || 0;
        const endDate = new Date();

        const loanAmount = transaction?.loan?.amount || 0;
        const buyAmount = transaction?.indBuy?.billAmount || 0;
        const sellAmount = transaction?.indSell?.billAmount || 0;
        const dieselAmount = transaction?.diesel?.billAmount || 0;
        //loan

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
          loan: {
            ...transaction?.loan,
            ...loanInterest,
          },
          indBuy: {
            ...transaction?.indBuy,
            ...buyInterest,
          },
          indSell: {
            ...transaction?.indSell,
            ...sellInterest,
          },
          diesel: {
            ...transaction?.diesel,
            ...dieselInterest,
          },
        };
      });

      const shopesTotal = overAllTotalOfAllShopes(shopeData);
      return {
        shopeNumber: shopeNumber,
        overAllTotal: shopesTotal,
      };
    }).filter((item) => item !== null);

    const workersList = workers
      .map((worker) => {
        const workerName = worker?.workerDetail?.workerName?.nickName;
        const workerAccounts = worker?.account.map((transactions) => {
          const startDate = transactions?.date;
          const rate = transactions?.rate || 24;
          const endDate = new Date();

          const giveAmount = transactions?.give?.amount;
          const takeAmount = transactions?.take?.payment;

          const giveInterest = calculateAutoInterestForGiveAmount(
            giveAmount,
            startDate,
            rate,
            endDate,
          );
          const takeInterest = calculateAutoInterestForTakeAmount(
            takeAmount,
            startDate,
            rate,
            endDate,
          );

          return {
            give: {
              ...transactions?.give,
              ...giveInterest,
            },
            take: {
              ...transactions?.take,
              ...takeInterest,
            },
          };
        });
        const Returns = overAllTotalOfAllWorkers(workerAccounts);
        return {
          workerName: workerName,
          overAllTotal: Returns,
        };
      })
      .filter((item) => item !== null);

    const casualLaborList = allCasualLabor
      .map((labors) => {
        const laborName = labors?.serviceProvider?.nickName;
        const lastTransaction = labors?.transactions.at(-1);

        return {
          laborName: laborName,
          pending: lastTransaction?.total,
        };
      })
      .filter((item) => item !== null);

    const harvestList = allHarvests
      .map((harvester) => {
        const opratorName = harvester?.serviceProvider?.nickName;
        const lastTransaction = harvester?.transactions.at(-1);

        return {
          opratorName: opratorName,
          pending: lastTransaction?.total,
        };
      })
      .filter((item) => item !== null);

    const allCalculateData = {
      shopes: allShopes,
      workers: workersList,
      casualLabors: casualLaborList,
      harvesters: harvestList,
    };

    return res.status(200).json({
      status: "Success",
      data: allCalculateData,
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
