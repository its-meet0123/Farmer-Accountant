const cron = require("node-cron");
const Shopes = require("../models/integratedData");
const Workers = require("../models/worker");
const Season = require("../models/session");
const EndDate = require("../models/endDate");
const { calculateAutoInterst } = require("../components/calculator");

const getEndDate = (insertdate, seasondate, today) => {
  if (insertdate) {
    return new Date(insertdate);
  }
  if (seasondate) {
    const seasonEnd = new Date(seasondate);
    if (isNaN(seasonEnd.getTime())) {
      return today;
    }
    return seasonEnd > today ? today : seasonEnd;
  }
  return today;
};

const autoCalculationJob = async () => {
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
        const [seasondate, insertdate] = await Promise.all([
          Season.findOne({
            userId: shope?.userId,
            _id: shope?.sessionId,
          }),
          await EndDate.findOne({
            userId: shope?.userId,
            dataId: shope?._id,
          }),
        ]);

        shope.shopeAccount.forEach((transaction) => {
          const startDate = transaction?.startDate;
          const loanAmount = transaction?.loan?.amount || 0;
          const rate = transaction?.rate || 0;
          const endDate = getEndDate(
            insertdate?.endDate,
            seasondate?.endDate,
            today,
          );

          // console.log(
          //   "for shopes",
          //   "sessionEnd Date :",
          //   seasondate?.endDate,
          //   "setEnd Date :",
          //   insertdate?.endDate,
          //   "find with logic :",
          //   endDate,
          // );

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
        const [insertDate, seasonEndDate] = await Promise.all([
          EndDate.findOne({
            userId: worker?.userId,
            dataId: worker?._id,
          }),
          await Season.findOne({
            userId: worker?.userId,
            sessionId: worker?.sessionId,
          }),
        ]);

        worker.account.forEach((trans, index) => {
          const startDate = trans?.date;
          const rate = trans?.rate || 0;
          const endDate = getEndDate(
            insertDate?.endDate,
            seasonEndDate?.endDate,
            today,
          );

          // console.log(
          //   "for worker",
          //   "sessionEnd Date :",
          //   seasonEndDate?.endDate,
          //   "setEnd Date :",
          //   insertDate?.endDate,
          //   "find with logic :",
          //   endDate,
          // );

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
