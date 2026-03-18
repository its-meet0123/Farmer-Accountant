const { accountSchemaFW } = require("../models/otherexpense");

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

function autoTotalForOtherExpense(duration, measurment, salary, pay) {
  const transTotal = accountSchemaFW.total;
  const total = duration * salary || measurment * salary;
  if (total > 0 && pay > 0) {
    const remainsTotal = total - pay;
    return remainsTotal;
  }
  if (transTotal > 0 && pay > 0) {
    const remainsTransTotal = transTotal - pay;
    return remainsTransTotal;
  }
}

module.exports = { calculateAutoInterst, autoTotalForOtherExpense };
