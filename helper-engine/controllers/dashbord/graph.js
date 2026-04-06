const Industries = require("../../models/integratedData");

async function monthlyTurnover(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const Ind = await Industries.find({ userId: currentUserId });

    const monthlyTurnover = Ind.map((shopes) => {
      return shopes?.shopeAccount.reduce((acc, curr) => {
        const month = curr.startDate.substring(0, 7);

        if (!acc[month]) {
          acc[month] = {
            totalLoan: 0,
            totalBuy: 0,
            totalSell: 0,
            totalDiesel: 0,
            grandTotal: 0,
          };
        }

        ((acc[month].totalLoan += curr?.loan?.amount || 0),
          (acc[month].totalBuy += curr?.loan?.amount || 0),
          (acc[month].totalSell += curr?.indSell?.billAmount || 0),
          (acc[month].totalDiesel += curr?.diesel?.billAmount || 0),
          (acc[month].grandTotal +=
            (curr?.loan?.amount || 0) +
            (curr?.loan?.amount || 0) +
            (curr?.indSell?.billAmount || 0) +
            (curr?.diesel?.billAmount || 0)));

        return acc;
      }, {});
    });

    return res.status(200).json({
      status: "Success",
      data: monthlyTurnover,
      Code: "monthly turnover calculate successfully.",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "Fail",
      message: err.message,
      data: null,
    });
  }
}

module.exports = monthlyTurnover;
