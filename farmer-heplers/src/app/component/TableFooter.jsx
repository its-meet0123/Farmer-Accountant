import { Table } from "antd";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
  }).format(amount);
};

const TableFooterForWorkerCalc = ({ data }) => {
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
  const amountTex = Number(totalOfPayment) * (1 / 100) || 0;
  const oAt = totalOfReturnPayment - (totalOfReturnAmount + amountTex) || 0;
  const grandTotal = formatCurrency(oAt);

  return (
    <>
      {
        <Table.Summary fixed="bottom">
          <Table.Summary.Row style={{ backgroundColor: "#fafafa" }}>
            <Table.Summary.Cell index={0}>
              <h4>Total</h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1}></Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <h4 style={{ color: "#D73535" }}>
                {formatCurrency(totalOfAmount)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}></Table.Summary.Cell>
            <Table.Summary.Cell index={4}></Table.Summary.Cell>
            <Table.Summary.Cell index={5}></Table.Summary.Cell>
            <Table.Summary.Cell index={6}>
              <h4 style={{ color: "#D73535" }}>
                {formatCurrency(totalOfAmountInterest)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              <h4 style={{ color: "#D73535" }}>
                {formatCurrency(totalOfReturnAmount)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={8}>
              <h4 style={{ color: "#8ABB6C" }}>
                {formatCurrency(totalOfPayment)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={9}>
              {formatCurrency(amountTex)}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}></Table.Summary.Cell>
            <Table.Summary.Cell index={11}></Table.Summary.Cell>
            <Table.Summary.Cell index={12}>
              <h4 style={{ color: "#8ABB6C" }}>
                {formatCurrency(totalOfPaymentInterest)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={13}>
              <h4 style={{ color: "#8ABB6C" }}>
                {formatCurrency(totalOfReturnPayment)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={14}>
              {grandTotal > 0 ? (
                <h4 style={{ color: "#8ABB6C" }}>{grandTotal}</h4>
              ) : (
                <h4 style={{ color: "#D73535" }}>{grandTotal}</h4>
              )}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      }
    </>
  );
};

const TableFooterForViewCalc = ({ data }) => {
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

  const oAT =
    totalOfReturnSellBillAmount -
    totalOfReturnLoanAmount -
    totalOfReturnBuyBillAmount -
    totalOfReturnDieselBillAmount;
  const grandTotal = formatCurrency(oAT);
  return (
    <>
      <Table.Summary fixed="bottom">
        <Table.Summary.Row style={{ backgroundColor: "#fafafa" }}>
          <Table.Summary.Cell index={0}>
            <h4>Total</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <h4 style={{ color: "#3e0703" }}>
              {formatCurrency(totalOfLoanAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
          <Table.Summary.Cell index={4}></Table.Summary.Cell>
          <Table.Summary.Cell index={5}>
            <h4 style={{ color: "#3e0703" }}>
              {formatCurrency(totalOfLoanAmountInterest)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={6}>
            <h4 style={{ color: "#3e0703" }}>
              {formatCurrency(totalOfReturnLoanAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={7}>
            <h4 style={{ color: "#D73535" }}>
              {formatCurrency(totalOfBuyBillAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={8}></Table.Summary.Cell>
          <Table.Summary.Cell index={9}></Table.Summary.Cell>
          <Table.Summary.Cell index={10}>
            <h4 style={{ color: "#D73535" }}>
              {formatCurrency(totalOfBuyBillAmountInterest)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={11}>
            <h4 style={{ color: "#D73535" }}>
              {formatCurrency(totalOfReturnBuyBillAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={12}>
            <h4 style={{ color: "#8ABB6C" }}>
              {formatCurrency(totalOfSellBillAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={13}></Table.Summary.Cell>
          <Table.Summary.Cell index={14}></Table.Summary.Cell>
          <Table.Summary.Cell index={15}>
            <h4 style={{ color: "#8ABB6C" }}>
              {formatCurrency(totalOfSellBillAmountInterest)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={16}>
            <h4 style={{ color: "#8ABB6C" }}>
              {formatCurrency(totalOfReturnSellBillAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={17}>
            <h4 style={{ color: "#075b5e" }}>
              {formatCurrency(totalOfDieselBillAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={18}></Table.Summary.Cell>
          <Table.Summary.Cell index={19}></Table.Summary.Cell>
          <Table.Summary.Cell index={20}>
            <h4 style={{ color: "#075b5e" }}>
              {totalOfDieselBillAmountInterest.toFixed(2)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={21}>
            <h4 style={{ color: "#075b5e" }}>
              {formatCurrency(totalOfReturnDieselBillAmount)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={22}>
            {grandTotal > 0 ? (
              <h4 style={{ color: "#8ABB6C" }}>{grandTotal}</h4>
            ) : (
              <h4 style={{ color: "#D73535" }}>{grandTotal}</h4>
            )}
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    </>
  );
};

export { TableFooterForWorkerCalc, TableFooterForViewCalc };
