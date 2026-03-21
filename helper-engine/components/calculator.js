const { FieldWorker, Harvest } = require("../models/otherexpense");

function calculateAutoInterst(amount, startDate, rate, endDate) {
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
  console.log(ids.laborId, upComingTrans);
  const workerDetails = await FieldWorker.findById(ids.laborId);
  if (!workerDetails) return {};
  if (ids.transactionId) {
    const getTransaction = workerDetails.filter((labor) => {
      return labor.transactions.some(
        (transaction) => transaction._id === ids.transactionId,
      );
    });
    if (!getTransaction) {
      return {};
    }
    if (getTransaction[0].total > 0 || upComingTrans.pay > 0) {
      const total = upComingTrans.duration
        ? upComingTrans.duration * upComingTrans.salary
        : upComingTrans.measurment
          ? upComingTrans.measurment * upComingTrans.salary
          : getTransaction[0].total;

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
    let bodyTotal = transTotal + total - pay;
    return {
      ...upComingTrans,
      total: bodyTotal,
    };
  }

  return {
    ...upComingTrans,
    total: total,
  };
}

module.exports = { calculateAutoInterst, autoTotalForOtherExpense };
