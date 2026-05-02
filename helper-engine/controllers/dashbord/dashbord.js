// Dashboard controller imports
const WorkerData = require("../../models/worker");
const { FieldWorker, Harvest } = require("../../models/otherexpense");
const Industries = require("../../models/integratedData");
const Sessions = require("../../models/session");
const { calculateAccountDuration } = require("./dashbordInterestCalc");
const {
  overAllTotalOfAllShopes,
  overAllTotalOfAllWorkers,
} = require("./calculation");

// Dashboard controller functions using map method

async function dashBordData(req, res) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };

  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const session = await Sessions.findOne({
      userId: currentUserId,
      isActive: true,
    });
    if (!session && !req.params.sessionId) {
      return res.status(404).json({
        status: "Error",
        Code: "No active session found",
        data: null,
        message: "Please create and activate a session to view dashboard data",
      });
    }
    const sessionId = req.params.sessionId || session._id;
    const [Ind, workers, allCasualLabor, allHarvests] = await Promise.all([
      Industries.find({ userId: currentUserId, sessionId: sessionId }),
      WorkerData.find({ userId: currentUserId, sessionId: sessionId }),
      FieldWorker.find({ userId: currentUserId, sessionId: sessionId }),
      Harvest.find({ userId: currentUserId, sessionId: sessionId }),
    ]);

    const allShopes = Ind.map((shopes) => {
      if (!shopes?.shopeAccount) return null;
      const shopeNumber = shopes?.shopeNumber;
      const effectiveDate =
        shopes?.shopeAccount?.at(0)?.startDate || new Date();
      const shopeData = shopes.shopeAccount.map((transaction) => {
        return transaction;
      });

      const shopesTotal = overAllTotalOfAllShopes(shopeData);
      const duration = calculateAccountDuration(effectiveDate);
      return {
        shopeNumber: shopeNumber,
        overAllTotal: shopesTotal,
        accountAge: duration,
      };
    }).filter((item) => item !== null);

    const workersList = workers
      .map((worker) => {
        if (!worker?.account) return null;
        const workerName = worker?.workerDetail?.workerName?.nickName;
        const effectiveDate = worker?.account?.at(0)?.date || new Date();
        const workerAccounts = worker?.account.map((transactions) => {
          return transactions;
        });
        const Returns = overAllTotalOfAllWorkers(workerAccounts);
        const duration = calculateAccountDuration(effectiveDate);
        return {
          workerName: workerName,
          overAllTotal: Returns,
          accountAge: duration,
        };
      })
      .filter((item) => item !== null);

    const casualLaborList = allCasualLabor
      .map((labors) => {
        const laborName = labors?.serviceProvider?.nickName;
        const effectiveDate =
          labors?.transactions?.at(0)?.startDate || new Date();
        const lastTransaction = labors?.transactions.at(-1);
        const oAt = formatCurrency(lastTransaction?.remaining || 0);
        const duration = calculateAccountDuration(effectiveDate);
        return {
          laborName: laborName,
          pending: oAt,
          accountAge: duration,
        };
      })
      .filter((item) => item !== null);

    const harvestList = allHarvests
      .map((harvester) => {
        const opratorName = harvester?.serviceProvider?.nickName;
        const effectiveDate =
          harvester?.transactions?.at(0)?.startDate || new Date();
        const lastTransaction = harvester?.transactions.at(-1);
        const oAt = formatCurrency(lastTransaction?.remaining || 0);
        const duration = calculateAccountDuration(effectiveDate);
        return {
          opratorName: opratorName,
          pending: oAt,
          accountAge: duration,
        };
      })
      .filter((item) => item !== null);

    const getTotalOfDiesel = Ind.reduce((total, shopes) => {
      if (!shopes?.shopeAccount) return total;
      const shopeDieselSum = shopes.shopeAccount.reduce(
        (sum, entry) => sum + (entry?.diesel?.totalAmount || 0),
        0,
      );

      return total + shopeDieselSum;
    }, 0);

    const getTotalOfSeedsFertilizer = Ind.reduce((total, shopes) => {
      if (!shopes?.shopeAccount) return total;
      const seedsFertilizerSum = shopes?.shopeAccount.reduce(
        (sum, entry) => sum + (entry?.indBuy?.totalAmount || 0),
        0,
      );

      return total + seedsFertilizerSum;
    }, 0);

    const getAllTotalOfPermanentWorkers = workers.reduce((total, worker) => {
      if (!worker?.account) return total;
      const workerAccountSum = worker.account.reduce(
        (sum, transaction) =>
          sum +
          ((transaction?.take?.totalAmount || 0) -
            (transaction?.give?.totalAmount || 0)),
        0,
      );

      return total + workerAccountSum;
    }, 0);

    const getTotalOfCasualLabor = allCasualLabor.reduce((total, labor) => {
      if (!labor?.transactions) return total;
      const laborSum = labor.transactions.reduce(
        (sum, transaction) => sum + (transaction?.total || 0),
        0,
      );

      return total + laborSum;
    }, 0);

    const getTotalOfHarvest = allHarvests.reduce((total, harvest) => {
      if (!harvest?.transactions) return total;

      const harvestSum = harvest.transactions.reduce(
        (sum, transaction) => sum + (transaction?.total || 0),
        0,
      );

      return total + harvestSum;
    }, 0);

    const totalExpense =
      getTotalOfDiesel +
      getTotalOfSeedsFertilizer +
      getAllTotalOfPermanentWorkers +
      getTotalOfCasualLabor +
      getTotalOfHarvest;

    if (
      allShopes.length > 0 ||
      workersList.length > 0 ||
      casualLaborList.length > 0 ||
      harvestList.length > 0
    ) {
      const allCalculateData = {
        shopes: allShopes,
        workers: workersList,
        casualLabors: casualLaborList,
        harvesters: harvestList,
        totalOfDiesel: formatCurrency(getTotalOfDiesel || 0),
        totalOfSeedsAndFertilizer: formatCurrency(
          getTotalOfSeedsFertilizer || 0,
        ),
        totalOfPermanentWorker: formatCurrency(
          getAllTotalOfPermanentWorkers || 0,
        ),
        totalOfHarvest: formatCurrency(getTotalOfHarvest || 0),
        totalOfCasualLabor: formatCurrency(getTotalOfCasualLabor || 0),
        totalExpense: formatCurrency(totalExpense || 0),
      };

      return res.status(200).json({
        status: "Success",
        data: allCalculateData,
        Code: "DB.SM",
      });
    } else {
      return res.status(204).json({
        status: "No Content",
        data: null,
        Code: "Dashbord data is not available",
      });
    }
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
