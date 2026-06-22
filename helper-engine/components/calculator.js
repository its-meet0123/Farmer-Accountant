const { FieldWorker, Harvest } = require("../models/otherexpense");

function calculateAutoInterst(amount, startDate, rate, endDate) {
  console.log(
    "calculation ke liye aayi huyi dates : ",
    "startDate : ",
    startDate,
    "endDate :",
    endDate,
  );
  if (amount === 0 || !amount)
    return {
      days: 0,
      months: 0,
      interest: 0,
      totalAmount: 0,
    };
  const start = startDate ? new Date(startDate) : new Date();
  const today = endDate ? new Date(endDate) : new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  console.log(
    "data ke liye end date logic in calculation",
    "start date : ",
    start,
    "end date : ",
    today,
  );

  const diffTime = today.getTime() - start.getTime() + 1;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());

  const interest = (amount * rate * days) / (100 * 365);

  return {
    days,
    months,
    interest: interest,
    totalAmount: amount + interest,
  };
}

async function autoTotalForCasualWorker(ids, upComingTrans) {
  //console.log("IDS:", ids, "upComingTrans: ", upComingTrans);
  const workerDetails = await FieldWorker.findById(ids.iD);
  //console.log("form casual labor :", workerDetails);
  if (!workerDetails) return null;
  if (ids.transactionId && upComingTrans.transactionNumber) {
    const getTransaction = workerDetails.transactions.find((transaction) => {
      if (upComingTrans.transactionNumber > 1) {
        return (
          transaction.transactionNumber === upComingTrans.transactionNumber - 1
        );
      }
      return transaction._id.toString() === ids.transactionId.toString();
    });
    //console.log("from Shema trans", getTransaction);
    if (!getTransaction) {
      return upComingTrans;
    }

    const transTotal =
      upComingTrans.transactionNumber > 1 ? getTransaction?.remaining : 0;

    const total = upComingTrans?.duration
      ? upComingTrans.duration * upComingTrans.salary
      : upComingTrans.measurment
        ? upComingTrans.measurment * upComingTrans.salary
        : 0;

    const bodyTotal = transTotal + total - (upComingTrans.pay || 0);
    const transactionNumber =
      upComingTrans.transactionNumber > 1
        ? getTransaction.transactionNumber + 1
        : getTransaction.transactionNumber;

    return {
      ...upComingTrans,
      transactionNumber: transactionNumber,
      total: total,
      remaining: bodyTotal,
    };
  }

  const transactions = workerDetails.transactions || [];

  const transaction = transactions.length
    ? transactions[transactions.length - 1]
    : { remaining: 0, transactionNumber: 0 };

  const total = upComingTrans.duration
    ? upComingTrans.duration * upComingTrans.salary
    : upComingTrans.measurment
      ? upComingTrans.measurment * upComingTrans.salary
      : 0;

  let bodyTotal = transaction.remaining + total - (upComingTrans.pay || 0);
  return {
    ...upComingTrans,
    transactionNumber: transaction.transactionNumber + 1,
    total: total,
    remaining: bodyTotal,
  };
}

async function autoTotalForHarvesterData(ids, upComingTrans) {
  console.log("IDS:", ids, "upComingTrans: ", upComingTrans);
  const harvesterDB = await Harvest.findById(ids.iD);
  console.log("form harvester data :", harvesterDB);

  if (!harvesterDB) return null;

  if (ids.transactionId && upComingTrans.transactionNumber) {
    const getTransaction = harvesterDB.transactions.find((transaction) => {
      if (upComingTrans.transactionNumber > 1) {
        return (
          transaction.transactionNumber === upComingTrans.transactionNumber - 1
        );
      }
      return transaction._id.toString() === ids.transactionId.toString();
    });

    console.log("from Shema trans", getTransaction);
    if (!getTransaction) {
      return upComingTrans;
    }

    const transTotal =
      upComingTrans.transactionNumber > 1 ? getTransaction?.remaining : 0;

    const total = upComingTrans?.duration
      ? upComingTrans.duration * upComingTrans.salary
      : upComingTrans.measurment
        ? upComingTrans.measurment * upComingTrans.salary
        : 0;

    const bodyTotal = transTotal + total - (upComingTrans.pay || 0);

    const transactionNumber =
      upComingTrans.transactionNumber > 1
        ? getTransaction.transactionNumber + 1
        : getTransaction.transactionNumber;

    return {
      ...upComingTrans,
      transactionNumber: transactionNumber,
      total: total,
      remaining: bodyTotal,
    };
  }

  const transactions = harvesterDB.transactions || [];

  const transaction = transactions.length
    ? transactions[transactions.length - 1]
    : { remaining: 0, transactionNumber: 0 };

  const total = upComingTrans.duration
    ? upComingTrans.duration * upComingTrans.salary
    : upComingTrans.measurment
      ? upComingTrans.measurment * upComingTrans.salary
      : 0;

  let bodyTotal = transaction?.remaining + total - (upComingTrans.pay || 0);
  return {
    ...upComingTrans,
    transactionNumber: transaction?.transactionNumber + 1,
    total: total,
    remaining: bodyTotal,
  };
}

module.exports = {
  calculateAutoInterst,
  autoTotalForCasualWorker,
  autoTotalForHarvesterData,
};
