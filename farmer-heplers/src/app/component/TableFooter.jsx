import { Table } from "antd";

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

  const grandTotal = Number(totalOfReturnPayment - totalOfReturnAmount).toFixed(
    2,
  );
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
              <h4 style={{ color: "#D73535" }}>{totalOfAmount}</h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}></Table.Summary.Cell>
            <Table.Summary.Cell index={4}></Table.Summary.Cell>
            <Table.Summary.Cell index={5}></Table.Summary.Cell>
            <Table.Summary.Cell index={6}>
              <h4 style={{ color: "#D73535" }}>
                {Number(totalOfAmountInterest).toFixed(2)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              <h4 style={{ color: "#D73535" }}>{totalOfReturnAmount}</h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={8}>
              <h4 style={{ color: "#8ABB6C" }}>{totalOfPayment}</h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={9}></Table.Summary.Cell>
            <Table.Summary.Cell index={10}></Table.Summary.Cell>
            <Table.Summary.Cell index={11}></Table.Summary.Cell>
            <Table.Summary.Cell index={12}>
              <h4 style={{ color: "#8ABB6C" }}>
                {Number(totalOfPaymentInterest).toFixed(2)}
              </h4>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={13}>
              <h4 style={{ color: "#8ABB6C" }}>{totalOfReturnPayment}</h4>
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

  const oAT = Number(
    totalOfReturnSellBillAmount -
      totalOfReturnLoanAmount +
      totalOfReturnBuyBillAmount +
      totalOfReturnDieselBillAmount,
  );
  const grandTotal = Number(oAT).toFixed(2);
  return (
    <>
      <Table.Summary fixed="bottom">
        <Table.Summary.Row style={{ backgroundColor: "#fafafa" }}>
          <Table.Summary.Cell index={0}>
            <h4>Total</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <h4 style={{ color: "#3e0703" }}>{totalOfLoanAmount}</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
          <Table.Summary.Cell index={4}></Table.Summary.Cell>
          <Table.Summary.Cell index={5}>
            <h4 style={{ color: "#3e0703" }}>{totalOfLoanAmountInterest}</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={6}>
            <h4 style={{ color: "#3e0703" }}>
              {Number(totalOfReturnLoanAmount.toFixed(2))}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={7}>
            <h4 style={{ color: "#D73535" }}>{totalOfBuyBillAmount}</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={8}></Table.Summary.Cell>
          <Table.Summary.Cell index={9}></Table.Summary.Cell>
          <Table.Summary.Cell index={10}>
            <h4 style={{ color: "#D73535" }}>{totalOfBuyBillAmountInterest}</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={11}>
            <h4 style={{ color: "#D73535" }}>
              {Number(totalOfReturnBuyBillAmount.toFixed(2))}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={12}>
            <h4 style={{ color: "#8ABB6C" }}>{totalOfSellBillAmount}</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={13}></Table.Summary.Cell>
          <Table.Summary.Cell index={14}></Table.Summary.Cell>
          <Table.Summary.Cell index={15}>
            <h4 style={{ color: "#8ABB6C" }}>
              {totalOfSellBillAmountInterest}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={16}>
            <h4 style={{ color: "#8ABB6C" }}>
              {totalOfReturnSellBillAmount.toFixed(2)}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={17}>
            <h4 style={{ color: "#075b5e" }}>{totalOfDieselBillAmount}</h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={18}></Table.Summary.Cell>
          <Table.Summary.Cell index={19}></Table.Summary.Cell>
          <Table.Summary.Cell index={20}>
            <h4 style={{ color: "#075b5e" }}>
              {totalOfDieselBillAmountInterest}
            </h4>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={21}>
            <h4 style={{ color: "#075b5e" }}>
              {totalOfReturnDieselBillAmount.toFixed(2)}
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
