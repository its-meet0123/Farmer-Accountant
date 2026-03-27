function overAllTotalOfAllShopes(data) {
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
  const grandTotal = Number(oAT).toFixed(2);
  return grandTotal;
}

module.exports = { overAllTotalOfAllShopes };
