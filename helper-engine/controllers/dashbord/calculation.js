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

module.exports = {
  overAllTotalOfAllShopes,
  overAllTotalOfAllWorkers,
};
