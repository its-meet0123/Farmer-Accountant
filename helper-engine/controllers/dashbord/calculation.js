function overAllTotalOfAllShopes(data) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };
  let totalOfReturnLoanAmount = 0;
  let totalOfReturnBuyBillAmount = 0;
  let totalOfReturnSellBillAmount = 0;
  let totalOfReturnDieselBillAmount = 0;

  data.forEach(({ loan, indBuy, indSell, diesel }) => {
    totalOfReturnLoanAmount += Number(loan.totalAmount || 0);
    totalOfReturnSellBillAmount += Number(indSell.totalAmount || 0);
    totalOfReturnBuyBillAmount += Number(indBuy.totalAmount || 0);
    totalOfReturnDieselBillAmount += Number(diesel.totalAmount || 0);
  });

  const oAT =
    totalOfReturnSellBillAmount -
    totalOfReturnLoanAmount -
    totalOfReturnBuyBillAmount -
    totalOfReturnDieselBillAmount;
  const grandTotal = formatCurrency(oAT);
  return grandTotal;
}

function calculateAllDieselExpense(data) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };
  let totalOfReturnDieselBillAmount = 0;

  data.forEach(({ diesel }) => {
    totalOfReturnDieselBillAmount += Number(diesel.totalAmount || 0);
  });

  const oAT = totalOfReturnDieselBillAmount;
  const grandTotal = formatCurrency(oAT);
  return grandTotal;
}

function calculateSeedsFertilizerExpense(data) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };

  let totalOfReturnBuyBillAmount = 0;

  data.forEach(({ indBuy }) => {
    totalOfReturnBuyBillAmount += Number(indBuy.totalAmount || 0);
  });

  const oAT = totalOfReturnBuyBillAmount;
  const grandTotal = formatCurrency(oAT);
  return grandTotal;
}

function overAllTotalOfAllWorkers(data) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };

  console.log("workerTransactions :", data);
  let totalOfReturnAmount = 0;
  let totalOfReturnPayment = 0;

  data.forEach(({ give, take }) => {
    totalOfReturnAmount += Number(give.totalAmount || 0);
    totalOfReturnPayment += Number(take.totalAmount || 0);
  });
  const oAT = totalOfReturnPayment - totalOfReturnAmount || 0;
  const grandTotal = formatCurrency(oAT);

  return grandTotal;
}

function caculateTotalOfCasualLabor(data) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };
  let totalOfTotalAmount = 0;

  data.forEach(({ total }) => {
    totalOfTotalAmount += Number(total || 0);
  });

  const oAT = totalOfTotalAmount;
  const grandTotal = formatCurrency(oAT);
  return grandTotal;
}

function calculateTotalOfHarvest(data) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };
  let totalOfReturnLoanAmount = 0;

  data.forEach(({ total }) => {
    totalOfReturnLoanAmount += Number(total || 0);
  });

  const oAT = totalOfReturnLoanAmount;
  const grandTotal = formatCurrency(oAT);
  return grandTotal;
}

module.exports = {
  overAllTotalOfAllShopes,
  overAllTotalOfAllWorkers,
  calculateAllDieselExpense,
  calculateSeedsFertilizerExpense,
  caculateTotalOfCasualLabor,
  calculateTotalOfHarvest,
};
