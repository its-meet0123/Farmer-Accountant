const Industries = require("../../models/integratedData");
const Sessions = require("../../models/session");

async function monthlyTurnover(req, res) {
  try {
    const decoded = req.user;
    const currentUserId = decoded.id;
    const session = await Sessions.findOne({
      userId: currentUserId,
      isActive: true,
    });
    if (!session && !req.params.sessionId) {
      return res.status(404).json({
        status: "Fail",
        data: null,
        message:
          "No active session found. Please provide a session ID or start a new session.",
      });
    }
    const Ind = await Industries.find({ userId: currentUserId });

    const monthlyTurnover = Ind.reduce((acc, shopes) => {
      shopes?.shopeAccount.forEach((curr) => {
        const date = new Date(curr.startDate);

        if (isNaN(date.getTime())) return null;

        const month = date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });

        const currentTotal =
          (curr?.indSell?.totalAmount || 0) -
          ((curr?.loan?.totalAmount || 0) +
            (curr?.indBuy?.totalAmount || 0) +
            (curr?.diesel?.totalAmount || 0));

        const existingMonth = acc.find((item) => item.month == month);

        if (existingMonth) {
          existingMonth.grandTotal += currentTotal;
        } else {
          acc.push({
            month: month,
            grandTotal: currentTotal,
          });
        }
      });
      return acc;
    }, []);

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
