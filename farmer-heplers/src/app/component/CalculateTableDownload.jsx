import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Modal } from "antd";
const DownloadTable1 = ({ isModalOpen, setIsModalOpen, shope, endDate }) => {
  const data = shope.shopeAccount ? shope.shopeAccount : [];

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
  const grandTotal = Number(
    totalOfReturnSellBillAmount -
      (totalOfReturnLoanAmount +
        totalOfReturnBuyBillAmount +
        totalOfReturnDieselBillAmount),
  ).toFixed(2);

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
  const downloadPDF = () => {
    const input = document.getElementById("hidden-pdf-table");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Table_View_of ${shope.shopeNumber}`);
    });
  };
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
                <th style={{ padding: "5px" }}>Date</th>
                <th style={{ padding: "5px" }}>Amount</th>
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
                    <td style={{ padding: "5px" }}>{account.loan.amount}</td>
                    <td style={{ padding: "5px" }}>{account.loan.days}</td>
                    <td style={{ padding: "5px" }}>{account.loan.months}</td>
                    <td style={{ padding: "5px" }}>{account.loan.interest}</td>
                    <td style={{ padding: "5px" }}>
                      {account.loan.totalAmount}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate[0]?.endDate)}
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
                      {account.indBuy.billAmount}
                    </td>
                    <td style={{ padding: "5px" }}>{account.indBuy.days}</td>
                    <td style={{ padding: "5px" }}>{account.indBuy.months}</td>
                    <td style={{ padding: "5px" }}>
                      {account.indBuy.interest}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {account.indBuy.totalAmount}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate[0]?.endDate)}
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
                      {account.diesel.billAmount}
                    </td>
                    <td style={{ padding: "5px" }}>{account.diesel.days}</td>
                    <td style={{ padding: "5px" }}>{account.diesel.months}</td>
                    <td style={{ padding: "5px" }}>
                      {account.diesel.interest}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {account.diesel.totalAmount}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate[0]?.endDate)}
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
                      {account.indSell.billAmount}
                    </td>
                    <td style={{ padding: "5px" }}>{account.indSell.days}</td>
                    <td style={{ padding: "5px" }}>{account.indSell.months}</td>
                    <td style={{ padding: "5px" }}>
                      {account.indSell.interest}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {account.indSell.totalAmount}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate[0]?.endDate)}
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
                <td style={{ padding: "5px" }}>{amount}</td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}>{interest}</td>
                {grandTotal > 0 ? (
                  <td style={{ padding: "5px", color: "#84994f" }}>
                    {grandTotal}
                  </td>
                ) : (
                  <td style={{ padding: "5px", color: "#9e3b3b" }}>
                    {grandTotal}
                  </td>
                )}
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
  const data = worker.account ? worker.account : [];

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
    totalOfReturnPayment += Number(take.totalPayment || 0);
  });

  const amount = Number(totalOfPayment - totalOfAmount).toFixed(2);
  const interest = Number(
    totalOfPaymentInterest - totalOfAmountInterest,
  ).toFixed(2);
  const grandTotal = Number(totalOfReturnPayment - totalOfReturnAmount).toFixed(
    2,
  );

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
    setModelOpen(false);
  };
  const downloadPDF = () => {
    const input = document.getElementById("hidden-table");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Table_View_of ${worker?.workerName?.nickName}`);
    });
  };
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
                <th style={{ padding: "5px" }}>Date</th>
                <th style={{ padding: "5px" }}>Amount</th>
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
                    <td style={{ padding: "5px" }}>{account.give.amount}</td>
                    <td style={{ padding: "5px" }}>{account.give.days}</td>
                    <td style={{ padding: "5px" }}>{account.give.months}</td>
                    <td style={{ padding: "5px" }}>{account.give.interest}</td>
                    <td style={{ padding: "5px" }}>
                      {account.give.totalAmount}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate[1]?.endDate)}
                    </td>
                  </tr>
                )}

                {account.take.payment > 0 && (
                  <tr style={{ color: "#84944f" }} key={account._id}>
                    <td style={{ padding: "5px" }}>{index + 1}</td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(account.date)}
                    </td>
                    <td style={{ padding: "5px" }}>{account.take.payment}</td>
                    <td style={{ padding: "5px" }}>{account.take.days}</td>
                    <td style={{ padding: "5px" }}>{account.take.months}</td>
                    <td style={{ padding: "5px" }}>{account.take.interest}</td>
                    <td style={{ padding: "5px" }}>
                      {account.take.totalPayment}
                    </td>
                    <td style={{ padding: "5px" }}>
                      {formattedDate(endDate[1]?.endDate)}
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
                <td style={{ padding: "5px" }}>{amount}</td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}></td>
                <td style={{ padding: "5px" }}>{interest}</td>
                {grandTotal > 0 ? (
                  <td style={{ padding: "5px", color: "#84994f" }}>
                    {grandTotal}
                  </td>
                ) : (
                  <td style={{ padding: "5px", color: "#9e3b3b" }}>
                    {grandTotal}
                  </td>
                )}
                <td style={{ padding: "5px", color: "#ffff" }}>
                  {worker?.workerName?.nickName}
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
