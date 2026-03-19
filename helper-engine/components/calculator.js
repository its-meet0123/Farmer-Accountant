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

async function autoTotalForOtherExpense(id, duration, measurment, salary, pay) {
  const workerDetails = await FieldWorker.findById(id);

  if (!workerDetails) return 0;

  const transaction = workerDetails.transactions || [];

  const transTotal = transaction.length
    ? transaction[transaction.length - 1].total
    : 0;

  const total = duration
    ? duration * salary
    : measurment
      ? measurment * salary
      : 0;

  if (total > 0 && pay > 0) {
    return total - pay;
  }

  if (transTotal > 0 && pay > 0) {
    return transTotal - pay;
  }

  return total;
}

module.exports = { calculateAutoInterst, autoTotalForOtherExpense };
