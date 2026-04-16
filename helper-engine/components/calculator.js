const { FieldWorker, Harvest } = require("../models/otherexpense");

function calculateAutoInterst(amount, startDate, rate, endDate) {
  if (amount === 0 || !amount)
    return {
      interest: 0,
      totalAmount: 0,
    };
  const start = new Date(startDate);
  const today = endDate ? new Date(endDate) : new Date();

  const diffTime = today - start;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

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
  console.log("IDS:", ids, "upComingTrans: ", upComingTrans);
  const workerDetails = await FieldWorker.findById(ids.iD);
  console.log("form casual labor :", workerDetails);
  if (!workerDetails) return {};
  if (ids.transactionId) {
    const getTransaction = workerDetails.transactions.find((transaction) => {
      return transaction._id.toString() === ids.transactionId.toString();
    });
    console.log("from Shema trans", getTransaction);
    if (!getTransaction) {
      return {};
    }

    const transTotal = getTransaction?.total || 0;
    if (transTotal > 0 || upComingTrans?.pay > 0) {
      const total = upComingTrans?.duration
        ? upComingTrans.duration * upComingTrans.salary
        : upComingTrans.measurment
          ? upComingTrans.measurment * upComingTrans.salary
          : transTotal;

      const bodyTotal = total - upComingTrans.pay;

      return {
        ...upComingTrans,
        total: bodyTotal,
      };
    }
  }

  const transaction = workerDetails.transactions || [];

  const transTotal = transaction.length
    ? transaction[transaction.length - 1].total
    : 0;

  const total = upComingTrans.duration
    ? upComingTrans.duration * upComingTrans.salary
    : upComingTrans.measurment
      ? upComingTrans.measurment * upComingTrans.salary
      : 0;

  if (upComingTrans.pay > 0) {
    let bodyTotal = transTotal + total - upComingTrans.pay;
    return {
      ...upComingTrans,
      total: bodyTotal,
    };
  }

  const bodyTotal = transTotal + total;
  return {
    ...upComingTrans,
    total: bodyTotal,
  };
}

async function autoTotalForHarvesterData(ids, upComingTrans) {
  console.log("IDS:", ids, "upComingTrans: ", upComingTrans);
  const harvesterDB = await Harvest.findById(ids.iD);
  console.log("form harvester data :", harvesterDB);

  if (!harvesterDB) return {};

  if (ids.transactionId && upComingTrans.transactionNumber) {
    const getTransaction = harvesterDB.transactions.find((transaction) => {
      //return transaction._id.toString() === ids.transactionId.toString();
      return (
        transaction.transactionNumber === upComingTrans.transactionNumber - 1
      );
    });

    console.log("from Shema trans", getTransaction);
    if (!getTransaction) {
      return {};
    }

    const transTotal = getTransaction?.total || 0;
    if (transTotal > 0 || upComingTrans?.pay > 0) {
      const total = upComingTrans?.duration
        ? upComingTrans.duration * upComingTrans.salary
        : upComingTrans.measurment
          ? upComingTrans.measurment * upComingTrans.salary
          : 0;

      const bodyTotal = transTotal + total - upComingTrans.pay;

      return {
        ...upComingTrans,
        transactionNumber: getTransaction.transactionNumber + 1,
        total: bodyTotal,
      };
    }
  }

  const transactions = harvesterDB.transactions || [];

  const transaction = transactions.length
    ? transactions[transactions.length - 1]
    : {};

  const total = upComingTrans.duration
    ? upComingTrans.duration * upComingTrans.salary
    : upComingTrans.measurment
      ? upComingTrans.measurment * upComingTrans.salary
      : 0;

  let bodyTotal = transaction?.total + total - (upComingTrans.pay || 0);
  return {
    ...upComingTrans,
    transactionNumber: transaction?.transactionNumber + 1 || 1,
    total: bodyTotal,
  };

  // const bodyTotal = transTotal + total;
  // return {
  //   ...upComingTrans,
  //   total: bodyTotal,
  // };
}

module.exports = {
  calculateAutoInterst,
  autoTotalForCasualWorker,
  autoTotalForHarvesterData,
};
