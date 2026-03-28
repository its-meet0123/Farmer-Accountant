function calculateAutoInterestForTakeAmount(amount, startDate, rate, endDate) {
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
    interst: interest,
    totalAmount: amount + interest,
  };
}
function calculateAutoInterestForBuyBillAmount(
  amount,
  startDate,
  rate,
  endDate,
) {
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
    interst: interest,
    totalAmount: amount + interest,
  };
}

function calculateAutoInterestForGiveAmount(amount, startDate, rate, endDate) {
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
    interst: interest,
    totalAmount: amount + interest,
  };
}

function calculateAutoInterestDieselBillAmount(
  amount,
  startDate,
  rate,
  endDate,
) {
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
    interst: interest,
    totalAmount: amount + interest,
  };
}

module.exports = {
  calculateAutoInterestForTakeAmount,
  calculateAutoInterestForBuyBillAmount,
  calculateAutoInterestDieselBillAmount,
  calculateAutoInterestForGiveAmount,
};
