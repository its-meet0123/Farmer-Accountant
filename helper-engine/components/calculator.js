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

function autoTotalForOtherExpense(id, duration, measurment, salary, pay) {
  const workerDetails = FieldWorker.findById(id);
  console.log("Models", workerDetails);
  const transaction = workerDetails.transactions;
  console.log("Transactions", transaction);
  const numOfTrans = transaction.length;
  console.log("Num of trans", numOfTrans);
  const existTrans = numOfTrans - 1;
  console.log("exist trans", existTrans);
  const transTotal = transaction[existTrans]?.total;
  console.log("last transaction total", transTotal);
  const total = duration * salary || measurment * salary;
  if (total > 0 && pay > 0) {
    const remainsTotal = total - pay;
    return remainsTotal;
  }
  if (transTotal > 0 && pay > 0) {
    const remainsTransTotal = transTotal - pay;
    return remainsTransTotal;
  }
  return total;
}

module.exports = { calculateAutoInterst, autoTotalForOtherExpense };
