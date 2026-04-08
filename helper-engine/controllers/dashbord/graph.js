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
          acc[month] = 0;
        }
        const currentTotal =
          (curr?.indSell?.totalAmount || 0) -
          ((curr?.loan?.totalAmount || 0) +
            (curr?.indBuy?.totalAmount || 0) +
            (curr?.diesel?.totalAmount || 0));

        acc[month] += currentTotal;

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
