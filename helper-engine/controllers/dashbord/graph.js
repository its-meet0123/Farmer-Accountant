const Industries = require("../../models/integratedData");

async function monthlyTurnover(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const Ind = await Industries.find({ userId: currentUserId });

    const monthlyTurnover = Ind.map((shopes) => {
      return shopes?.shopeAccount.reduce((acc, curr) => {
        const date = new Date(curr.startDate);

        if (isNaN(date.getTime())) return acc;

        const month = date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });

        if (!acc[month]) {
          acc[month] = {
            totalLoan: 0,
            totalBuy: 0,
            totalSell: 0,
            totalDiesel: 0,
            grandTotal: 0,
          };
        }

        ((acc[month].totalLoan += curr?.loan?.totalAmount || 0),
          (acc[month].totalBuy += curr?.loan?.totalAmount || 0),
          (acc[month].totalSell += curr?.indSell?.totalAmount || 0),
          (acc[month].totalDiesel += curr?.diesel?.totalAmount || 0),
          (acc[month].grandTotal +=
            (curr?.loan?.totalAmount || 0) +
            (curr?.loan?.totalAmount || 0) +
            (curr?.indSell?.totalAmount || 0) +
            (curr?.diesel?.totalAmount || 0)));

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
