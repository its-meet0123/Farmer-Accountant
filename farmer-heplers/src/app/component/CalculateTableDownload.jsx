import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import autoTable from "jspdf-autotable";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
  }).format(amount);
};

const DownloadTable1 = ({ isModalOpen, setIsModalOpen, shope, endDate }) => {
  const [data, setData] = useState([]);
  const accounts = shope.shopeAccount ? shope.shopeAccount : [];
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    const sortedData = [...accounts].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setData(sortedData);
  };

  useEffect(() => {
    handleSort();
  }, [shope, sortOrder]);

  let totalOfLoanAmount = 0;
  let totalOfLoanAmountInterest = 0;
  let totalOfReturnLoanAmount = 0;

  let totalOfBuyBillAmount = 0;
  let totalOfBuyBillAmountInterest = 0;
  let totalOfReturnBuyBillAmount = 0;

  let totalOfSellBillAmount = 0;
  let totalOfSellBillAmountInterest = 0;
  let totalOfReturnSellBillAmount = 0;

  let totalOfDieselBillAmount = 0;
  let totalOfDieselBillAmountInterest = 0;
  let totalOfReturnDieselBillAmount = 0;

  data.forEach(({ loan, indBuy, indSell, diesel }) => {
    totalOfLoanAmount += Number(loan.amount || 0);
    totalOfLoanAmountInterest += Number(loan.interest || 0);
    totalOfReturnLoanAmount += Number(loan.totalAmount || 0);

    totalOfSellBillAmount += Number(indSell.billAmount || 0);
    totalOfSellBillAmountInterest += Number(indSell.interest || 0);
    totalOfReturnSellBillAmount += Number(indSell.totalAmount || 0);

    totalOfBuyBillAmount += Number(indBuy.billAmount || 0);
    totalOfBuyBillAmountInterest += Number(indBuy.interest || 0);
    totalOfReturnBuyBillAmount += Number(indBuy.totalAmount || 0);

    totalOfDieselBillAmount += Number(diesel.billAmount || 0);
    totalOfDieselBillAmountInterest += Number(diesel.interest || 0);
    totalOfReturnDieselBillAmount += Number(diesel.totalAmount || 0);
  });

  const amount = Number(
    totalOfSellBillAmount -
      (totalOfLoanAmount + totalOfBuyBillAmount + totalOfDieselBillAmount),
  ).toFixed(2);
  const interest = Number(
    totalOfSellBillAmountInterest -
      (totalOfLoanAmountInterest +
        totalOfBuyBillAmountInterest +
        totalOfDieselBillAmountInterest),
  ).toFixed(2);
  const oAt =
    totalOfReturnSellBillAmount -
    (totalOfReturnLoanAmount +
      totalOfReturnBuyBillAmount +
      totalOfReturnDieselBillAmount);

  const grandTotal = formatCurrency(oAt);

  const formattedDate = (date) => {
    const rawDate = date ? new Date(date) : new Date();
    const DateTimeFormat = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(rawDate);

    return DateTimeFormat;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const downloadPDF = async () => {
    const input = document.getElementById("hidden-pdf-table");

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    const pageHeightPx = (canvas.width / pdfWidth) * pdfHeight;

    let y = 0;

    while (y < canvas.height) {
      const pageCanvas = document.createElement("canvas");
      const context = pageCanvas.getContext("2d");

      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeightPx;

      context.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        pageHeightPx,
        0,
        0,
        canvas.width,
        pageHeightPx,
      );

      const pageImg = pageCanvas.toDataURL("image/png");

      if (y > 0) pdf.addPage();

      pdf.addImage(pageImg, "PNG", 0, 0, imgWidth, pdfHeight);

      y += pageHeightPx;
    }

    window.open(pdf.output("bloburl"), "_blank");

    //pdf.save(`Table_View_of_${worker?.workerName?.nickName}.pdf`);
  };

  // const downloadPDF = () => {
  //   const input = document.getElementById("hidden-pdf-table");

  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save(`Table_View_of ${shope.shopeNumber}`);
  //   });
  // };
  return (
    <>
      <Modal
        width="fit-content"
        title={`Calculation of ${shope.shopeNumber}`}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={downloadPDF}
        onCancel={handleCancel}>
        <div style={{ width: "100%", overflow: "auto" }}>
          <table id="hidden-pdf-table" border="1" title={shope.shopeNumber}>
            <thead>
              <tr style={{ backgroundColor: "#213C51", color: "#fff" }}>
                <th>Sr.No</th>
                <th
                  style={{ padding: "5px" }}
                  // onClick={() =>
                  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  // }
                >
                  Date ({sortOrder === "desc" ? "🔼" : "🔽"})
                </th>
                <th style={{ padding: "5px" }}>Amount</th>
                <th style={{ padding: "5px" }}>Type</th>
                <th style={{ padding: "5px" }}>Days</th>
                <th style={{ padding: "5px" }}>Months</th>
                <th style={{ padding: "5px" }}>Interest</th>
                <th style={{ padding: "5px" }}>TotalReturn</th>
                <th style={{ padding: "5px" }}>End Date</th>
              </tr>
            </thead>
            {data.map((account, index) => (
              <tbody key={account._id}>
                {account.loan.amount > 0 && (
                  <tr style={{ color: "#9e3b3b" }} key={account._id}>
                    <td style={{ padding: "5px" }}>{index + 1}</td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(account.startDate)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.loan.amount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {account.loan.amountType}
                    </td>
                    <td style={{ padding: "5px" }}>{account.loan.days}</td>
                    <td style={{ padding: "5px" }}>{account.loan.months}</td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.loan.interest)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.loan.totalAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate?.endDate)}
                    </td>
                  </tr>
                )}

                {account.indBuy.billAmount > 0 && (
                  <tr style={{ color: "#9e3b3b" }} key={account._id}>
                    <td style={{ padding: "5px" }}>{index + 1}</td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(account.startDate)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.indBuy.billAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>{account.indBuy.brief}</td>
                    <td style={{ padding: "5px" }}>{account.indBuy.days}</td>
                    <td style={{ padding: "5px" }}>{account.indBuy.months}</td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.indBuy.interest)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.indBuy.totalAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate?.endDate)}
                    </td>
                  </tr>
                )}
                {account.diesel.billAmount > 0 && (
                  <tr style={{ color: "#296374" }} key={account._id}>
                    <td style={{ padding: "5px" }}>{index + 1}</td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(account.startDate)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.diesel.billAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>diesel</td>
                    <td style={{ padding: "5px" }}>{account.diesel.days}</td>
                    <td style={{ padding: "5px" }}>{account.diesel.months}</td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.diesel.interest)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.diesel.totalAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate?.endDate)}
                    </td>
                  </tr>
                )}
                {account.indSell.billAmount > 0 && (
                  <tr style={{ color: "#84944f" }} key={account._id}>
                    <td style={{ padding: "5px" }}>{index + 1}</td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(account.startDate)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.indSell.billAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>{account.indSell?.brief}</td>
                    <td style={{ padding: "5px" }}>{account.indSell.days}</td>
                    <td style={{ padding: "5px" }}>{account.indSell.months}</td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.indSell.interest)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.indSell.totalAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate?.endDate)}
                    </td>
                  </tr>
                )}
              </tbody>
            ))}
            <tfoot>
              <tr
                style={{
                  backgroundColor: "#2b2a2a",
                  fontWeight: "bold",
                  color: "#fff",
                }}>
                <td style={{ padding: "5px" }}>Total</td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}>{formatCurrency(amount)}</td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}>{formatCurrency(interest)}</td>
                <td
                  style={{ padding: "5px", color: "#4da3ff", fontWeight: 600 }}>
                  {grandTotal}
                </td>
                <td style={{ padding: "5px", color: "#ffff" }}>
                  {shope.shopeNumber}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </>
  );
};
const DownloadTable2 = ({ modelOpen, setModelOpen, worker, endDate }) => {
  const accounts = worker.account ? worker.account : [];
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  let totalOfAmount = 0;
  let totalOfAmountInterest = 0;
  let totalOfReturnAmount = 0;

  let totalOfPayment = 0;
  let totalOfPaymentInterest = 0;
  let totalOfReturnPayment = 0;

  data.forEach(({ give, take }) => {
    totalOfAmount += Number(give.amount || 0);
    totalOfAmountInterest += Number(give.interest || 0);
    totalOfReturnAmount += Number(give.totalAmount || 0);
    totalOfPayment += Number(take.payment || 0);
    totalOfPaymentInterest += Number(take.interest || 0);
    totalOfReturnPayment += Number(take.totalAmount || 0);
  });

  const amount = totalOfPayment - totalOfAmount;
  const amountTex = totalOfPayment * (1 / 100);
  const interest = totalOfPaymentInterest - (totalOfAmountInterest + amountTex);

  const oAt = totalOfReturnPayment - (totalOfReturnAmount + amountTex);

  const grandTotal = formatCurrency(oAt);

  const formattedDate = (date) => {
    const rawDate = date ? new Date(date) : new Date();
    const DateTimeFormat = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(rawDate);

    return DateTimeFormat;
  };

  const handleSort = () => {
    const sortedData = [...accounts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setData(sortedData);
  };

  const handleCancel = () => {
    setModelOpen(false);
  };
  const downloadPDF = async () => {
    const input = document.getElementById("hidden-table");

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    const pageHeightPx = (canvas.width / pdfWidth) * pdfHeight;

    let y = 0;

    while (y < canvas.height) {
      const pageCanvas = document.createElement("canvas");
      const context = pageCanvas.getContext("2d");

      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeightPx;

      context.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        pageHeightPx,
        0,
        0,
        canvas.width,
        pageHeightPx,
      );

      const pageImg = pageCanvas.toDataURL("image/png");

      if (y > 0) pdf.addPage();

      pdf.addImage(pageImg, "PNG", 0, 0, imgWidth, pdfHeight);

      y += pageHeightPx;
    }

    window.open(pdf.output("bloburl"), "_blank");

    //pdf.save(`Table_View_of_${worker?.workerName?.nickName}.pdf`);
  };

  // const downloadPDF = () => {
  //   const pdf = new jsPDF();

  //   autoTable(pdf, {
  //     html: "#hidden-table", // directly table id
  //     startY: 10,
  //     theme: "grid",
  //     headStyles: { fillColor: [22, 160, 133] },
  //     styles: { fontSize: 8 },
  //   });

  //   pdf.save(`Table_View_of_${worker?.workerName?.nickName}.pdf`);
  // };
  // table mai rkm ka format set nhi ho rhaa hai

  useEffect(() => {
    handleSort();
  }, [accounts, sortOrder]);
  return (
    <>
      <Modal
        width="fit-content"
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={modelOpen}
        onOk={downloadPDF}
        onCancel={handleCancel}>
        <div style={{ width: "100%", overflow: "auto" }}>
          <table
            id="hidden-table"
            border="1"
            title={worker?.workerName?.nickName}>
            <thead>
              <tr style={{ backgroundColor: "#213C51", color: "#fff" }}>
                <th>Sr.No</th>
                <th
                  style={{ padding: "5px" }}
                  // onClick={() =>
                  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  // }
                >
                  Date {sortOrder === "desc" ? "🔼" : "🔽"}
                </th>
                <th style={{ padding: "5px" }}>Amount</th>
                <th style={{ padding: "5px" }}>Brief</th>
                <th style={{ padding: "5px" }}>Days</th>
                <th style={{ padding: "5px" }}>Months</th>
                <th style={{ padding: "5px" }}>Interest</th>
                <th style={{ padding: "5px" }}>TotalReturn</th>
                <th style={{ padding: "5px" }}>End Date</th>
              </tr>
            </thead>
            {data.map((account, index) => (
              <tbody key={account._id}>
                {account.give.amount > 0 && (
                  <tr style={{ color: "#9e3b3b" }} key={account._id}>
                    <td style={{ padding: "5px" }}>{index + 1}</td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(account.date)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.give.amount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {account.give.amountType}
                    </td>
                    <td style={{ padding: "5px" }}>{account.give.days}</td>
                    <td style={{ padding: "5px" }}>{account.give.months}</td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.give.interest)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.give.totalAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate?.endDate)}
                    </td>
                  </tr>
                )}

                {account.take.payment > 0 && (
                  <tr style={{ color: "#84944f" }} key={account._id}>
                    <td style={{ padding: "5px" }}>{index + 1}</td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(account.date)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.take.payment)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {account.take.paymentType}
                    </td>
                    <td style={{ padding: "5px" }}>{account.take.days}</td>
                    <td style={{ padding: "5px" }}>{account.take.months}</td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.take.interest)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formatCurrency(account.take.totalAmount)}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate?.endDate)}
                    </td>
                  </tr>
                )}
              </tbody>
            ))}
            <tfoot>
              <tr
                style={{
                  backgroundColor: "#2b2a2a",
                  fontWeight: "bold",
                  color: "#fff",
                }}>
                <td style={{ padding: "5px" }}>Total</td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}>{formatCurrency(amount)}</td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}>{formatCurrency(amountTex)}</td>
                <td style={{ padding: "5px" }}>{formatCurrency(interest)}</td>

                <td
                  style={{ padding: "5px", color: "#4da3ff", fontWeight: 600 }}>
                  {grandTotal}
                </td>

                <td style={{ padding: "5px", color: "#ffff" }}>
                  {worker?.workerDetail?.workerName?.nickName}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </>
  );
};

export { DownloadTable1, DownloadTable2 };
