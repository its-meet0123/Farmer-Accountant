const cron = require("node-cron");
const Shopes = require("../models/integratedData");
const Workers = require("../models/worker");
const { calculateAutoInterst } = require("../components/calculator");

const autoCalculationJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const today = new Date();
      const [shopes, workers] = await Promise.all([
        Shopes.find({
          userId: { $exists: true, $ne: null },
          sessionId: { $exists: true, $ne: null },
        }),
        Workers.find({
          userId: { $exists: true, $ne: null },
          sessionId: { $exists: true, $ne: null },
        }),
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

          transaction.loan = {
            ...transaction?.loan,
            ...loanCalculation,
          };

          const indBuyBillAmount = transaction?.indBuy?.billAmount || 0;

          const indBuyCalculation = calculateAutoInterst(
            indBuyBillAmount,
            startDate,
            rate,
            endDate,
          );

          transaction.indBuy = {
            ...transaction?.indBuy,
            ...indBuyCalculation,
          };

          const indSellBillAmount = transaction?.indSell?.billAmount || 0;

          const indSellCalculation = calculateAutoInterst(
            indSellBillAmount,
            startDate,
            rate,
            endDate,
          );

          transaction.indSell = {
            ...transaction?.indSell,
            ...indSellCalculation,
          };

          const dieselBillAmount = transaction?.diesel?.billAmount || 0;

          const dieselCalculation = calculateAutoInterst(
            dieselBillAmount,
            startDate,
            rate,
            endDate,
          );

          transaction.diesel = {
            ...transaction?.diesel,
            ...dieselCalculation,
          };
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

          trans.give = {
            ...trans?.give,
            ...giveCalculation,
          };

          const takeAmount = trans?.take?.payment || 0;
          const takeCalculation = calculateAutoInterst(
            takeAmount,
            startDate,
            rate,
            endDate,
          );
          trans.take = {
            ...trans?.take,
            ...takeCalculation,
          };
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
