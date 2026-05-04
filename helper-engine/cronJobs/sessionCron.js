const cron = require("node-cron");
const Session = require("../models/session"); // apna path adjust karo

const sessionExpireJob = () => {
  cron.schedule("0 0 * * *", async () => {
    const today = new Date();

    await Session.updateMany(
      {
        $or: [
          { endDate: { $lt: today } }, // end date cross ho gayi
          { startDate: { $gt: today } }, // abhi start hi nahi hui
        ],
        isActive: true,
      },
      { $set: { isActive: false } },
    );

    // Active wale bhi update kar do (optional but best)
    await Session.updateMany(
      {
        startDate: { $lte: today },
        endDate: { $gte: today },
      },
      { $set: { isActive: true } },
    );

    console.log("Session status updated");
  });
};

module.exports = sessionExpireJob;
