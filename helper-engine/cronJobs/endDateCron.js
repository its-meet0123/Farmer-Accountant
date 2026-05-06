const cron = require("node-cron");
const Shopes = require("../models/integratedData");
const Workers = require("../models/worker");
const { calculateAutoInterst } = require("../components/calculator");

const autoCalculationJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = new Date();
      const [shopes, workers] = await Promise.all([
        Shopes.find({}),
        Workers.find({}),
      ]);

      for (let shope of shopes) {
        shope.shopeAccount.forEach((transaction, index) => {
          const startDate = new Date(transaction?.startDate);
          const loanAmount = transaction?.loan?.amount || 0;
          const rate = transaction?.rate;
          const endDate = today;

          const loanCalculation = calculateAutoInterst(
            loanAmount,
            startDate,
            rate,
            endDate,
          );

          const indBuyBillAmount = transaction?.indBuy?.billAmount || 0;

          const indBuyCalculation = calculateAutoInterst(
            indBuyBillAmount,
            startDate,
            rate,
            endDate,
          );

          const indSellBillAmount = transaction?.indSell?.billAmount || 0;

          const indSellCalculation = calculateAutoInterst(
            indSellBillAmount,
            startDate,
            rate,
            endDate,
          );

          const dieselBillAmount = transaction?.diesel?.billAmount || 0;

          const dieselCalculation = calculateAutoInterst(
            dieselBillAmount,
            startDate,
            rate,
            endDate,
          );

          const newTransaction = {
            startDate: transaction.startDate,
            loan: {
              amount: loanAmount,
              amountType: transaction?.loan?.amountType,
              handOver: transaction?.loan?.handOver,
              ...loanCalculation,
            },
            indBuy: {
              billAmount: indBuyBillAmount,
              bill: transaction?.indBuy?.bill,
              brief: transaction?.indBuy?.brief,
              handOver: transaction?.indBuy?.handOver,
              ...indBuyCalculation,
            },
            indSell: {
              crop: transaction?.indSell?.crop || [],
              billAmount: indSellBillAmount,
              bill: transaction?.indSell?.bill,
              brief: transaction?.indSell?.brief,
              handOver: transaction?.indSell?.handOver,
              ...indSellCalculation,
            },
            diesel: {
              billAmount: dieselBillAmount,
              qty: transaction?.diesel?.qty,
              rate: transaction?.diesel?.rate,
              handOver: transaction?.diesel?.handOver,
              ...dieselCalculation,
            },
            rate: rate,
          };

          shope.shopeAccount[index] = newTransaction;
        });

        shope.markModified("shopeAccount");
        await shope.save();
      }

      for (let worker of workers) {
        worker.account.forEach((trans, index) => {
          const startDate = new Date(trans?.date);
          const endDate = today;
          const rate = trans?.rate || 0;

          const giveAmount = trans?.give?.amount || 0;
          const giveCalculation = calculateAutoInterst(
            giveAmount,
            startDate,
            rate,
            endDate,
          );

          const takeAmount = trans?.take?.payment || 0;
          const takeCalculation = calculateAutoInterst(
            takeAmount,
            startDate,
            rate,
            endDate,
          );

          const newTransaction = {
            date: startDate,
            give: {
              crop: trans?.give?.crop || [],
              amount: giveAmount,
              brief: trans?.give?.brief || "",
              amountType: trans?.give?.amountType || "",
              ...giveCalculation,
            },
            take: {
              payment: takeAmount,
              paymentType: trans?.take?.paymentType || "",
              crop: trans?.take?.crop || [],
              ...takeCalculation,
            },
            rate: rate,
          };

          worker.account[index] = newTransaction;
        });

        worker.markModified("account");
        await worker.save();
      }
    } catch (err) {
      console.error("Cron Job Error of end date : ", err.message);
    }
  });
};

module.exports = autoCalculationJob;

// for (let record of records) {
//   record.transactions.forEach((trans, index) => {
//     const startDate = new Date(trans.startDate);
//     const today = new Date();

//     // Din calculate karein
//     const diffDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));

//     // Direct 'trans' object ki fields ko update karein
//     trans.totalCalculated = diffDays * 50;
//     trans.lastSync = today; // Aap extra field bhi update kar sakte hain

//     // Agar aap pura object hi replace karna chahte hain:
//     // record.transactions[index] = { ...trans, someNewField: 'value' };
//   });

//   // CRITICAL STEP: Mongoose ko batayein ki array ke andar changes huye hain
//   record.markModified('transactions');

//   // Ab save karein
//   await record.save();
// }
