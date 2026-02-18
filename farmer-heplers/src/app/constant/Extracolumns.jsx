import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Modal, Popconfirm } from "antd";
import { useState } from "react";
import i18next from "i18next";

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
              title="Crop Name"
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
              }}
              readOnly
            />
            <Input
              value={i?.rate}
              type="number"
              title="Crop Rate"
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
              }}
              readOnly
            />
            <Input
              value={i?.qty}
              type="number"
              title="Qty."
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
              }}
              readOnly
            />
            <Input
              value={i?.amount || i?.total}
              type="number"
              title="Total"
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
              }}
              readOnly
            />
          </Flex>
        ))}
      </>
    ),
  });
};

const getColumnsForHomepage = (t) => {
  const SHOPS_COLUMNS = [
    {
      title: t("homePage.tableColumns.extandTableColumns.ShopeNoText"),
      dataIndex: "shopeNumber",
      key: "shopeNumber",
      width: 50,
    },
    {
      title: t("homePage.tableColumns.extandTableColumns.AddressText"),
      dataIndex: "shopeAddress",
      key: "shopeAddress",
      width: 100,
    },
  ];
  return SHOPS_COLUMNS;
};

export const SHOPE_ACCOUNT_BASE_COLUMNS = [
  {
    title: i18next.t(
      "ViewPage.tableColumns.extandTableColumns.transNoTitleText",
    ),
    dataIndex: "serialNo",

    width: 50,
  },
  {
    title: i18next.t("ViewPage.tableColumns.extandTableColumns.dateTitleText"),
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
    title: i18next.t("ViewPage.tableColumns.extandTableColumns.loan.titleText"),
    children: [
      {
        title: (
          <p style={{ color: "#3E0703" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.loan.amountText",
            )}
          </p>
        ),
        dataIndex: ["loan", "amount"],
        key: "amount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#3E0703" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.loan.amountTypeText",
            )}
          </p>
        ),
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
    title: i18next.t(
      "ViewPage.tableColumns.extandTableColumns.buyItem.titleText",
    ),
    children: [
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.buyItem.billAmountText",
            )}
          </p>
        ),
        dataIndex: ["indBuy", "billAmount"],
        key: "billAmount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.buyItem.billText",
            )}
          </p>
        ),
        dataIndex: ["indBuy", "bill"],
        key: "bill",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.buyItem.briefText",
            )}
          </p>
        ),
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
    title: i18next.t(
      "ViewPage.tableColumns.extandTableColumns.sellItem.titleText",
    ),
    children: [
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.sellItem.billAmountText",
            )}
          </p>
        ),
        dataIndex: ["indSell", "billAmount"],
        key: "amount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.sellItem.billText",
            )}
          </p>
        ),
        dataIndex: ["indSell", "bill"],
        key: "bill",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.sellItem.BriefText",
            )}
          </p>
        ),
        dataIndex: ["indSell", "brief"],
        key: "brief",
        width: 70,
        render: (text) => {
          return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.sellItem.Crops.titleText",
            )}
          </p>
        ),
        dataIndex: ["indSell", "crop"],
        key: "crop",
        width: 100,
        render: (crop) => {
          if (crop.length > 0) {
            const title = "Sell Crop";
            return (
              <Button type="link" onClick={() => showModal({ crop, title })}>
                {i18next.t(
                  "ViewPage.tableColumns.extandTableColumns.sellItem.Crops.buttonText",
                )}
              </Button>
            );
          }
        },
      },
    ],
  },
  {
    title: i18next.t(
      "ViewPage.tableColumns.extandTableColumns.diesel.titleText",
    ),
    children: [
      {
        title: (
          <p style={{ color: "#075B5E" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.diesel.billAmountText",
            )}
          </p>
        ),
        dataIndex: ["diesel", "billAmount"],
        key: "amount",
        width: 100,
        render: (text) => {
          return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#075B5E" }}>
            {i18next.t(
              "ViewPage.tableColumns.extandTableColumns.diesel.billText",
            )}
          </p>
        ),
        children: [
          {
            title: (
              <p style={{ color: "#075B5E" }}>
                {i18next.t(
                  "ViewPage.tableColumns.extandTableColumns.diesel.qtyText",
                )}
              </p>
            ),
            dataIndex: ["diesel", "qty"],
            key: "abill",
            width: 70,
            render: (text) => {
              return <p style={{ color: "#075B5E" }}>{text}</p>;
            },
          },
          {
            title: (
              <p style={{ color: "#075B5E" }}>
                {i18next.t(
                  "ViewPage.tableColumns.extandTableColumns.diesel.rateText",
                )}
              </p>
            ),
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
    title: i18next.t("calculationPage.tableColumns.serialNoTitleText"),
    dataIndex: "serialNo",
    key: "serialNo",
    width: 50,
  },
  {
    title: i18next.t("calculationPage.tableColumns.dateTitleText"),
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
    title: i18next.t("calculationPage.tableColumns.loan.titleText"),
    children: [
      {
        title: (
          <p style={{ color: "#3E0703" }}>
            {i18next.t("calculationPage.tableColumns.loan.amountText")}
          </p>
        ),
        dataIndex: ["loan", "amount"],
        key: "amount",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#3E0703" }}>
            {i18next.t("calculationPage.tableColumns.loan.daysText")}
          </p>
        ),
        dataIndex: ["loan", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#3E0703" }}>
            {i18next.t("calculationPage.tableColumns.loan.monthsText")}
          </p>
        ),
        dataIndex: ["loan", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#3E0703" }}>
            {"calculationPage.tableColumns.loan.interestText"}
          </p>
        ),
        dataIndex: ["loan", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.loan.amount > 0)
            return <p style={{ color: "#3E0703" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#3E0703" }}>
            {i18next.t("calculationPage.tableColumns.loan.totalText")}
          </p>
        ),
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
    title: i18next.t("calculationPage.tableColumns.buyItem.titleText"),
    children: [
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t("calculationPage.tableColumns.buyItem.billAmountText")}
          </p>
        ),
        dataIndex: ["indBuy", "billAmount"],
        key: "billAmount",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t("calculationPage.tableColumns.buyItem.daysText")}
          </p>
        ),
        dataIndex: ["indBuy", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t("calculationPage.tableColumns.buyItem.monthsText")}
          </p>
        ),
        dataIndex: ["indBuy", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t("calculationPage.tableColumns.buyItem.interestText")}
          </p>
        ),
        dataIndex: ["indBuy", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.indBuy.billAmount > 0)
            return <p style={{ color: "#D73535" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#D73535" }}>
            {i18next.t("calculationPage.tableColumns.buyItem.totalText")}
          </p>
        ),
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
    title: i18next.t("calculationPage.tableColumns.sellItem.titleText"),
    children: [
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t("calculationPage.tableColumns.settItem.billAmountText")}
          </p>
        ),
        dataIndex: ["indSell", "billAmount"],
        key: "amount",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t("calculationPage.tableColumns.sellItem.daysText")}
          </p>
        ),
        dataIndex: ["indSell", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t("calculationPage.tableColumns.sellItem.monthsText")}
          </p>
        ),
        dataIndex: ["indSell", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t("calculationPage.tableColumns.sellItem.interestText")}
          </p>
        ),
        dataIndex: ["indSell", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.indSell.billAmount > 0)
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#8ABB6C" }}>
            {i18next.t("calculationPage.tableColumns.sellItem.totalText")}
          </p>
        ),
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
    title: i18next.t("calculationPage.tableColumns.diesel.titleText"),
    children: [
      {
        title: (
          <p style={{ color: "#075B5E" }}>
            {i18next.t("calculationPage.tableColumns.diesel.billAmountText")}
          </p>
        ),
        dataIndex: ["diesel", "billAmount"],
        key: "amount",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#075B5E" }}>
            {i18next.t("calculationPage.tableColumns.diesel.daysText")}
          </p>
        ),
        dataIndex: ["diesel", "days"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#075B5E" }}>
            {i18next.t("calculationPage.tableColumns.diesel.monthsText")}
          </p>
        ),
        dataIndex: ["diesel", "months"],
        key: "days",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#075B5E" }}>
            {i18next.t("calculationPage.tableColumns.diesel.interestText")}
          </p>
        ),
        dataIndex: ["diesel", "interest"],
        key: "interest",
        width: 100,
        render: (text, record) => {
          if (record.diesel.billAmount > 0)
            return <p style={{ color: "#075B5E" }}>{text}</p>;
        },
      },
      {
        title: (
          <p style={{ color: "#075B5E" }}>
            {i18next.t("calculationPage.tableColumns.diesel.interestText")}
          </p>
        ),
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
    title: i18next.t("calculationPage.tableColumns.grandTotalText"),
    dataIndex: "",
    width: 120,
    key: "gt",
  },
];

export const Worker_List_Columns = [
  {
    title: i18next.t("workerPage.tableColumns.serialNoTextTitle"),
    dataIndex: "serialNo",
    key: "serialNo",
    width: 50,
  },
  {
    title: i18next.t("workerPage.tableColumns.dateText"),
    dataIndex: ["workerDetail", "date"],
    key: "date",
    width: 150,
    render: (date) => {
      const wDate = formattedDate(date);
      return wDate;
    },
  },
  {
    title: i18next.t("workerPage.tableColumns.workerDetails.workerNameText"),
    dataIndex: ["workerDetail", "workerName"],
    key: "workerName",
    width: 250,
    render: (workerName) => {
      return `${workerName?.firstName} ${workerName?.lastName} [${workerName.nickName}]`;
    },
  },
  {
    title: i18next.t("workerPage.tableColumns.workerDetails.workerIdProofText"),
    dataIndex: ["workerDetail", "idProof"],
    key: "idProof",
    width: 250,
  },
  {
    title: i18next.t("workerPage.tableColumns.workerDetails.workerContect"),
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

export { getColumnsForHomepage };
