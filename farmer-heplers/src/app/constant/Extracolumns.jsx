import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Modal, Popconfirm } from "antd";
import { useState } from "react";

const formattedDate = (date) => {
  const rawDate = date ? new Date(date) : new Date();
  const DateTimeFormat = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(rawDate);

  return DateTimeFormat;
};

const showModal = ({ crop, title }) => {
  Modal.success({
    title: title,
    content: (
      <>
        {crop?.map((i) => (
          <Flex key={i.id} horizontal>
            <Input
              value={i?.name}
              type="string"
              name="Crop Name"
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
                width: 70,
              }}
              readOnly
            />
            <Input
              value={i?.rate}
              type="number"
              name="Crop Rate"
              style={{
                color: (title = "Give Crop" ? "#D73535" : "#8ABB6C"),
                width: 70,
              }}
              readOnly
            />
            <Input
              value={i?.qty}
              type="number"
              name="Crop Qty"
              style={{
                color: (title = "Give Crop" ? "#D73535" : "#8ABB6C"),
                width: 70,
              }}
              readOnly
            />
            <Input
              value={i?.amount}
              type="number"
              name="Total"
              style={{
                color: (title = "Give Crop" ? "#D73535" : "#8ABB6C"),
                width: 70,
              }}
              readOnly
            />
          </Flex>
        ))}
      </>
    ),
  });
};

export const SHOPS_COLUMNS = [
  {
    title: "Shope No.",
    dataIndex: "shopeNumber",
    key: "shopeNumber",
    width: 50,
  },
  {
    title: "Address",
    dataIndex: "shopeAddress",
    key: "shopeAddress",
    width: 100,
  },
];

export const SHOPE_ACCOUNT_BASE_COLUMNS = [
  {
    title: "Trans. No",
    dataIndex: "serialNo",

    width: 50,
  },
  {
    title: "Date",
    dataIndex: "startDate",
    key: "startDate",
    width: 150,
    fixed: "left",
    render: (startDate) => {
      const date = formattedDate(startDate);
      return date;
    },
  },
  {
    title: "Loan",
    children: [
      {
        title: <p style={{ color: "#3E0703" }}>Amount</p>,
        dataIndex: ["loan", "amount"],
        key: "amount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#3E0703" }}>Type</p>,
        dataIndex: ["loan", "amountType"],
        key: "amountType",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
    ],
  },
  {
    title: "Buy",
    children: [
      {
        title: <p style={{ color: "#D73535" }}>Amount</p>,
        dataIndex: ["indBuy", "billAmount"],
        key: "billAmount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Bill</p>,
        dataIndex: ["indBuy", "bill"],
        key: "bill",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Brief</p>,
        dataIndex: ["indBuy", "brief"],
        key: "brief",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
    ],
  },
  {
    title: "Sell",
    children: [
      {
        title: <p style={{ color: "#8ABB6C" }}>Amount</p>,
        dataIndex: ["indSell", "billAmount"],
        key: "amount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Bill</p>,
        dataIndex: ["indSell", "bill"],
        key: "bill",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Brief</p>,
        dataIndex: ["indSell", "brief"],
        key: "brief",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Crop</p>,
        dataIndex: ["indSell", "crop"],
        key: "crop",
        width: 100,
        render: (crop) => {
          if (crop.length > 0) {
            const title = "Sell Crop";
            return (
              <Button type="link" onClick={() => showModal({ crop, title })}>
                View
              </Button>
            );
          }
        },
      },
    ],
  },
  {
    title: "Diesel",
    children: [
      {
        title: <p style={{ color: "#075B5E" }}>Amount</p>,
        dataIndex: ["diesel", "billAmount"],
        key: "amount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#075B5E" }}>Bill</p>,
        children: [
          {
            title: <p style={{ color: "#075B5E" }}>Qty.</p>,
            dataIndex: ["diesel", "qty"],
            key: "abill",
            width: 70,
            render: (text) => {
              return <p style={{ color: "#075B5E" }}>{text}</p>;
            },
          },
          {
            title: <p style={{ color: "#075B5E" }}>Rate</p>,
            dataIndex: ["diesel", "rate"],
            key: "abill",
            width: 100,
            render: (text) => {
              return <p style={{ color: "#075B5E" }}>{text}</p>;
            },
          },
        ],
      },
    ],
  },
];

export const BASE_COLUMNS = [
  {
    title: "Sr.No",
    dataIndex: "serialNo",
    key: "serialNo",
    width: 50,
  },
  {
    title: "Date",
    dataIndex: "startDate",
    key: "startDate",
    width: 100,
    fixed: "left",
    render: (startDate) => {
      const date = formattedDate(startDate);
      return date;
    },
  },
  {
    title: "Loan",
    children: [
      {
        title: <p style={{ color: "#3E0703" }}>Amount</p>,
        dataIndex: ["loan", "amount"],
        key: "amount",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#3E0703" }}>Days</p>,
        dataIndex: ["loan", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#3E0703" }}>Months</p>,
        dataIndex: ["loan", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#3E0703" }}>Interest</p>,
        dataIndex: ["loan", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#3E0703" }}>Total</p>,
        dataIndex: ["loan", "totalAmount"],
        key: "totalAmount",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
    ],
  },
  {
    title: "Buy",
    children: [
      {
        title: <p style={{ color: "#D73535" }}>Amount</p>,
        dataIndex: ["indBuy", "billAmount"],
        key: "billAmount",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Days</p>,
        dataIndex: ["indBuy", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Months</p>,
        dataIndex: ["indBuy", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Interest</p>,
        dataIndex: ["indBuy", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Total</p>,
        dataIndex: ["indBuy", "totalAmount"],
        key: "totalAmount",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
    ],
  },
  {
    title: "Sell",
    children: [
      {
        title: <p style={{ color: "#8ABB6C" }}>Amount</p>,
        dataIndex: ["indSell", "billAmount"],
        key: "amount",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Days</p>,
        dataIndex: ["indSell", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Months</p>,
        dataIndex: ["indSell", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Interest</p>,
        dataIndex: ["indSell", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Total</p>,
        dataIndex: ["indSell", "totalAmount"],
        key: "totalAmount",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
    ],
  },
  {
    title: "Diesel",
    children: [
      {
        title: <p style={{ color: "#075B5E" }}>Amount</p>,
        dataIndex: ["diesel", "billAmount"],
        key: "amount",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#075B5E" }}>Days</p>,
        dataIndex: ["diesel", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#075B5E" }}>Months</p>,
        dataIndex: ["diesel", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#075B5E" }}>Interest</p>,
        dataIndex: ["diesel", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: <p style={{ color: "#075B5E" }}>Total</p>,
        dataIndex: ["diesel", "totalAmount"],
        key: "totalAmount",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
    ],
  },
  {
    title: "Grand Total",
    dataIndex: "",
    width: 120,
    key: "gt",
  },
];

export const Worker_List_Columns = [
  {
    title: "Sr. No.",
    dataIndex: "serialNo",
    key: "serialNo",
    width: 50,
  },
  {
    title: "Date",
    dataIndex: ["workerDetail", "date"],
    key: "date",
    width: 150,
    render: (date) => {
      const wDate = formattedDate(date);
      return wDate;
    },
  },
  {
    title: "Name",
    dataIndex: ["workerDetail", "workerName"],
    key: "workerName",
    width: 250,
    render: (workerName) => {
      return `${workerName?.firstName} ${workerName?.lastName} [${workerName.nickName}]`;
    },
  },
  {
    title: "ID Proof",
    dataIndex: ["workerDetail", "idProof"],
    key: "idProof",
    width: 250,
  },
  {
    title: "Contect",
    dataIndex: ["workerDetail", "contect"],
    key: "contect",
    width: 200,
  },
];

export const Worker_Transaction_Columns = [
  {
    title: "Sr.No.",
    dataIndex: "serialNo",
    key: "serialNo",
    with: 50,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 100,
    render: (date) => {
      const wDate = formattedDate(date);
      return wDate;
    },
  },
  {
    title: "Gives",
    children: [
      {
        title: <p style={{ color: "#D73535" }}>Amount</p>,
        dataIndex: ["give", "amount"],
        key: "giveAmount",
        width: 100,
        render: (amount) => {
          return <p style={{ color: "#D73535" }}>{amount}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Amount type</p>,
        dataIndex: ["give", "amountType"],
        key: "giveAmountType",
        width: 100,
        render: (amounType) => <p style={{ color: "#D73535" }}>{amounType}</p>,
      },
      {
        title: <p style={{ color: "#D73535" }}>Brief</p>,
        dataIndex: ["give", "brief"],
        key: "giveBrief",
        width: 100,
        render: (brief) => <p style={{ color: "#D73535" }}>{brief}</p>,
      },
      {
        title: <p style={{ color: "#D73535" }}>Crop [npqt]</p>,
        dataIndex: ["give", "crop"],
        key: "giveCrop",
        width: 100,
        render: (crop) => {
          if (crop.length > 0) {
            const title = "Give Crop";
            return (
              <Button type="link" onClick={() => showModal({ crop, title })}>
                View
              </Button>
            );
          }
        },
      },
    ],
  },
  {
    title: "Takes",
    children: [
      {
        title: <p style={{ color: "#8ABB6C" }}>Amount</p>,
        dataIndex: ["take", "payment"],
        width: 100,
        key: "takeAmount",
        render: (payment) => <p style={{ color: "#8ABB6C" }}>{payment}</p>,
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Payment Type</p>,
        dataIndex: ["take", "paymentType"],
        width: 100,
        key: "takeAmount",
        render: (paymentType) => (
          <p style={{ color: "#8ABB6C" }}>{paymentType}</p>
        ),
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Crops [npqt]</p>,
        dataIndex: ["take", "crop"],
        key: "takeCrop",
        width: 100,
        render: (crop) => {
          if (crop.length > 0) {
            const title = "Take Crop";
            return (
              <Button type="link" onClick={() => showModal({ crop, title })}>
                View
              </Button>
            );
          }
        },
      },
    ],
  },
];

export const WORKER_TRANSACTION_CALC_COLUMNS = [
  {
    title: "Sr.No",
    dataIndex: "serialNo",
    key: "serialNo",
    width: 50,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 150,
    render: (date) => {
      const workerDate = formattedDate(date);
      return workerDate;
    },
  },
  {
    title: "Gives",
    children: [
      {
        title: <p style={{ color: "#D73535" }}>Amount</p>,
        dataIndex: ["give", "amount"],
        key: "giveAmount",
        width: 100,
        render: (amount) => {
          return <p style={{ color: "#D73535" }}>{amount}</p>;
        },
      },
      {
        title: <p style={{ color: "#D73535" }}>Amount type</p>,
        dataIndex: ["give", "amountType"],
        key: "giveAmountType",
        width: 100,
        render: (amounType) => <p style={{ color: "#D73535" }}>{amounType}</p>,
      },
      {
        title: <p style={{ color: "#D73535" }}>Days</p>,
        dataIndex: ["give", "days"],
        key: "givedays",
        width: 100,
        render: (days) => <p style={{ color: "#D73535" }}>{days}</p>,
      },
      {
        title: <p style={{ color: "#D73535" }}>Months</p>,
        dataIndex: ["give", "months"],
        key: "givemonths",
        width: 100,
        render: (months) => <p style={{ color: "#D73535" }}>{months}</p>,
      },
      {
        title: <p style={{ color: "#D73535" }}>Interest</p>,
        dataIndex: ["give", "interest"],
        key: "giveInterest",
        width: 100,
        render: (interest) => <p style={{ color: "#D73535" }}>{interest}</p>,
      },
      {
        title: <p style={{ color: "#D73535" }}>Total Amount</p>,
        dataIndex: ["give", "totalAmount"],
        key: "giveTotalAmount",
        width: 100,
        render: (totalAmount) => (
          <p style={{ color: "#D73535" }}>{totalAmount}</p>
        ),
      },
    ],
  },
  {
    title: "Takes",
    children: [
      {
        title: <p style={{ color: "#8ABB6C" }}>Payment</p>,
        dataIndex: ["take", "payment"],
        width: 100,
        key: "takeAmount",
        render: (payment) => <p style={{ color: "#8ABB6C" }}>{payment}</p>,
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Payment Type</p>,
        dataIndex: ["take", "paymentType"],
        width: 100,
        key: "takeAmountType",
        render: (paymentType) => (
          <p style={{ color: "#8ABB6C" }}>{paymentType}</p>
        ),
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Days</p>,
        dataIndex: ["take", "days"],
        width: 100,
        key: "takeDays",
        render: (days) => <p style={{ color: "#8ABB6C" }}>{days}</p>,
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Months</p>,
        dataIndex: ["take", "months"],
        width: 100,
        key: "takeMonths",
        render: (months) => <p style={{ color: "#8ABB6C" }}>{months}</p>,
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Interest</p>,
        dataIndex: ["take", "interest"],
        width: 100,
        key: "takeInterest",
        render: (interest) => <p style={{ color: "#8ABB6C" }}>{interest}</p>,
      },
      {
        title: <p style={{ color: "#8ABB6C" }}>Total Payment</p>,
        dataIndex: ["take", "totalPayment"],
        key: "takeTotalPayment",
        render: (totalPayment) => (
          <p style={{ color: "#8ABB6C" }}>{totalPayment}</p>
        ),
      },
    ],
  },
  {
    title: "Grand Total",
    dataIndex: "",
    key: "a",
  },
];
