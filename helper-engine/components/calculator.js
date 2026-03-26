const { FieldWorker, Harvest } = require("../models/otherexpense");

function calculateAutoInterst(amount, startDate, rate, endDate) {
  if (amount === 0 || !amount) return {};
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
    interst: interest.toFixed(2),
    totalAmount: (amount + interest).toFixed(2),
  };
}

async function autoTotalForOtherExpense(ids, upComingTrans) {
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

module.exports = { calculateAutoInterst, autoTotalForOtherExpense };
