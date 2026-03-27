import { Button, Flex, Input, Modal } from "antd";

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

const showModal = ({ crop, title, t }) => {
  Modal.success({
    title: title,
    content: (
      <>
        {crop?.map((i) => (
          <Flex key={i.id} horizontal>
            <Input
              value={i?.name}
              type="string"
              title={t(
                "workerPage.tableColumns.extandTableColumns.takes.Crops.cropNameText",
              )}
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
              }}
              readOnly
            />
            <Input
              value={i?.rate}
              type="number"
              title={t(
                "workerPage.tableColumns.extandTableColumns.takes.Crops.cropRateText",
              )}
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
              }}
              readOnly
            />
            <Input
              value={i?.qty}
              type="number"
              title={t(
                "workerPage.tableColumns.extandTableColumns.takes.Crops.cropQtyText",
              )}
              style={{
                color: title === "Give Crop" ? "#D73535" : "#8ABB6C",
              }}
              readOnly
            />
            <Input
              value={i?.amount || i?.total}
              type="number"
              title={t(
                "workerPage.tableColumns.extandTableColumns.takes.Crops.cropTotalText",
              )}
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

const getColumnsForViewPage = (t) => {
  const SHOPE_ACCOUNT_BASE_COLUMNS = [
    {
      title: t("ViewPage.tableColumns.extandTableColumns.transNoTitleText"),
      dataIndex: "serialNo",

      width: 50,
    },
    {
      title: t("ViewPage.tableColumns.extandTableColumns.dateTitleText"),
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
      title: t("ViewPage.tableColumns.extandTableColumns.loan.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#3E0703" }}>
              {t("ViewPage.tableColumns.extandTableColumns.loan.amountText")}
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
              {t(
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
        {
          title: (
            <p style={{ color: "#3E0703" }}>
              {t("ViewPage.tableColumns.extandTableColumns.loan.viaText")}
            </p>
          ),
          dataIndex: ["loan", "handOver"],
          key: "handOver",
          width: 70,
          render: (text) => {
            return <p style={{ color: "#3E0703" }}>{text}</p>;
          },
        },
      ],
    },
    {
      title: t("ViewPage.tableColumns.extandTableColumns.buyItem.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t(
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
              {t("ViewPage.tableColumns.extandTableColumns.buyItem.billText")}
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
              {t("ViewPage.tableColumns.extandTableColumns.buyItem.briefText")}
            </p>
          ),
          dataIndex: ["indBuy", "brief"],
          key: "brief",
          width: 70,
          render: (text) => {
            return <p style={{ color: "#D73535" }}>{text}</p>;
          },
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("ViewPage.tableColumns.extandTableColumns.buyItem.viaText")}
            </p>
          ),
          dataIndex: ["indBuy", "handOver"],
          key: "handOver",
          width: 70,
          render: (text) => {
            return <p style={{ color: "#D73535" }}>{text}</p>;
          },
        },
      ],
    },
    {
      title: t("ViewPage.tableColumns.extandTableColumns.sellItem.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t(
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
              {t("ViewPage.tableColumns.extandTableColumns.sellItem.billText")}
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
              {t("ViewPage.tableColumns.extandTableColumns.sellItem.BriefText")}
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
              {t(
                "ViewPage.tableColumns.extandTableColumns.sellItem.Crops.titleText",
              )}
            </p>
          ),
          dataIndex: ["indSell", "crop"],
          key: "crop",
          width: 100,
          render: (_, record) => {
            const crop = record.indSell.crop;
            const title = `${t("ViewPage.tableColumns.extandTableColumns.sellItem.Crops.buttonTitle")}`;
            return (
              record.indSell.billAmount > 0 && (
                <Button
                  type="link"
                  onClick={() => showModal({ crop, title, t })}>
                  {t(
                    "ViewPage.tableColumns.extandTableColumns.sellItem.Crops.buttonText",
                  )}
                </Button>
              )
            );
          },
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("ViewPage.tableColumns.extandTableColumns.sellItem.viaText")}
            </p>
          ),
          dataIndex: ["indSell", "handOver"],
          key: "handOver",
          width: 70,
          render: (text) => {
            return <p style={{ color: "#8ABB6C" }}>{text}</p>;
          },
        },
      ],
    },
    {
      title: t("ViewPage.tableColumns.extandTableColumns.diesel.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#075B5E" }}>
              {t(
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
              {t("ViewPage.tableColumns.extandTableColumns.diesel.billText")}
            </p>
          ),
          children: [
            {
              title: (
                <p style={{ color: "#075B5E" }}>
                  {t("ViewPage.tableColumns.extandTableColumns.diesel.qtyText")}
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
                  {t(
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
        {
          title: (
            <p style={{ color: "#075B5E" }}>
              {t("ViewPage.tableColumns.extandTableColumns.diesel.viaText")}
            </p>
          ),
          dataIndex: ["diesel", "handOver"],
          key: "handOver",
          width: 100,
          render: (text) => {
            return <p style={{ color: "#075B5E" }}>{text}</p>;
          },
        },
      ],
    },
  ];
  return SHOPE_ACCOUNT_BASE_COLUMNS;
};

const getColumnsForCalulationPage = (t) => {
  const BASE_COLUMNS = [
    {
      title: t("calculationPage.tableColumns.serialNoTitleText"),
      dataIndex: "serialNo",
      key: "serialNo",
      width: 50,
    },
    {
      title: t("calculationPage.tableColumns.dateTitleText"),
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
      title: t("calculationPage.tableColumns.loan.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#3E0703" }}>
              {t("calculationPage.tableColumns.loan.amountText")}
            </p>
          ),
          dataIndex: ["loan", "amount"],
          key: "amount",
          width: 100,
          render: (text) => {
            if (text > 0) return <p style={{ color: "#3E0703" }}>{text}</p>;
          },
        },
        {
          title: (
            <p style={{ color: "#3E0703" }}>
              {t("calculationPage.tableColumns.loan.daysText")}
            </p>
          ),
          dataIndex: ["loan", "days"],
          key: "days",
          width: 100,
          render: (text) => {
            if (text > 0) return <p style={{ color: "#3E0703" }}>{text}</p>;
          },
        },
        {
          title: (
            <p style={{ color: "#3E0703" }}>
              {t("calculationPage.tableColumns.loan.monthsText")}
            </p>
          ),
          dataIndex: ["loan", "months"],
          key: "days",
          width: 100,
          render: (text) => {
            if (text > 0) return <p style={{ color: "#3E0703" }}>{text}</p>;
          },
        },
        {
          title: (
            <p style={{ color: "#3E0703" }}>
              {t("calculationPage.tableColumns.loan.interestText")}
            </p>
          ),
          dataIndex: ["loan", "interest"],
          key: "interest",
          width: 100,
          render: (text) => {
            if (text > 0) return <p style={{ color: "#3E0703" }}>{text}</p>;
          },
        },
        {
          title: (
            <p style={{ color: "#3E0703" }}>
              {t("calculationPage.tableColumns.loan.totalText")}
            </p>
          ),
          dataIndex: ["loan", "totalAmount"],
          key: "totalAmount",
          width: 100,
          render: (text) => {
            if (text > 0) return <p style={{ color: "#3E0703" }}>{text}</p>;
          },
        },
      ],
    },
    {
      title: t("calculationPage.tableColumns.buyItem.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("calculationPage.tableColumns.buyItem.billAmountText")}
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
              {t("calculationPage.tableColumns.buyItem.daysText")}
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
              {t("calculationPage.tableColumns.buyItem.monthsText")}
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
              {t("calculationPage.tableColumns.buyItem.interestText")}
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
              {t("calculationPage.tableColumns.buyItem.totalText")}
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
      title: t("calculationPage.tableColumns.sellItem.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("calculationPage.tableColumns.sellItem.billAmountText")}
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
              {t("calculationPage.tableColumns.sellItem.daysText")}
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
              {t("calculationPage.tableColumns.sellItem.monthsText")}
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
              {t("calculationPage.tableColumns.sellItem.interestText")}
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
              {t("calculationPage.tableColumns.sellItem.totalText")}
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
      title: t("calculationPage.tableColumns.diesel.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#075B5E" }}>
              {t("calculationPage.tableColumns.diesel.billAmountText")}
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
              {t("calculationPage.tableColumns.diesel.daysText")}
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
              {t("calculationPage.tableColumns.diesel.monthsText")}
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
              {t("calculationPage.tableColumns.diesel.interestText")}
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
              {t("calculationPage.tableColumns.diesel.interestText")}
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
      title: t("calculationPage.tableColumns.grandTotalText"),
      dataIndex: "",
      width: 120,
      key: "gt",
    },
  ];
  return BASE_COLUMNS;
};

const getWorkerListColumnsForWorkerPage = (t) => {
  const Worker_List_Columns = [
    {
      title: t("workerPage.tableColumns.serialNoTextTitle"),
      dataIndex: "serialNo",
      key: "serialNo",
      width: 50,
    },
    {
      title: t("workerPage.tableColumns.dateText"),
      dataIndex: ["workerDetail", "date"],
      key: "date",
      width: 150,
      render: (date) => {
        const wDate = formattedDate(date);
        return wDate;
      },
    },
    {
      title: t("workerPage.tableColumns.workerDetails.workerNameText"),
      dataIndex: ["workerDetail", "workerName"],
      key: "workerName",
      width: 250,
      render: (workerName) => {
        return `${workerName?.firstName} ${workerName?.lastName} [${workerName.nickName}]`;
      },
    },
    {
      title: t("workerPage.tableColumns.workerDetails.workerIdProofText"),
      dataIndex: ["workerDetail", "idProof"],
      key: "idProof",
      width: 250,
    },
    {
      title: t("workerPage.tableColumns.workerDetails.workerContect"),
      dataIndex: ["workerDetail", "contect"],
      key: "contect",
      width: 200,
    },
  ];
  return Worker_List_Columns;
};

const getWorkerTransactionColumnsForWorkerPage = (t) => {
  const Worker_Transaction_Columns = [
    {
      title: t("workerPage.tableColumns.extandTableColumns.serialNoTextTitle"),
      dataIndex: "serialNo",
      key: "serialNo",
      with: 50,
    },
    {
      title: t("workerPage.tableColumns.extandTableColumns.dateText"),
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (date) => {
        const wDate = formattedDate(date);
        return wDate;
      },
    },
    {
      title: t("workerPage.tableColumns.extandTableColumns.gives.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerPage.tableColumns.extandTableColumns.gives.amountText")}
            </p>
          ),
          dataIndex: ["give", "amount"],
          key: "giveAmount",
          width: 100,
          render: (amount) => {
            return <p style={{ color: "#D73535" }}>{amount}</p>;
          },
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t(
                "workerPage.tableColumns.extandTableColumns.gives.amountTypeText",
              )}
            </p>
          ),
          dataIndex: ["give", "amountType"],
          key: "giveAmountType",
          width: 100,
          render: (amounType) => (
            <p style={{ color: "#D73535" }}>{amounType}</p>
          ),
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerPage.tableColumns.extandTableColumns.gives.briefText")}
            </p>
          ),
          dataIndex: ["give", "brief"],
          key: "giveBrief",
          width: 100,
          render: (brief) => <p style={{ color: "#D73535" }}>{brief}</p>,
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t(
                "workerPage.tableColumns.extandTableColumns.gives.Crops.titleText",
              )}
            </p>
          ),
          dataIndex: ["give", "crop"],
          key: "giveCrop",
          width: 100,
          render: (_, record) => {
            const crop = record.give.crop;
            const title = `${t("workerPage.tableColumns.extandTableColumns.gives.Crops.buttonTitle")}`;
            return (
              record.give.crop.length > 0 && (
                <Button
                  type="link"
                  onClick={() => showModal({ crop, title, t })}>
                  {t(
                    "workerPage.tableColumns.extandTableColumns.gives.Crops.buttonText",
                  )}
                </Button>
              )
            );
          },
        },
      ],
    },
    {
      title: t("workerPage.tableColumns.extandTableColumns.takes.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t(
                "workerPage.tableColumns.extandTableColumns.takes.paymentText",
              )}
            </p>
          ),
          dataIndex: ["take", "payment"],
          width: 100,
          key: "takeAmount",
          render: (payment) => <p style={{ color: "#8ABB6C" }}>{payment}</p>,
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t(
                "workerPage.tableColumns.extandTableColumns.takes.paymentType",
              )}
            </p>
          ),
          dataIndex: ["take", "paymentType"],
          width: 100,
          key: "takeAmount",
          render: (paymentType) => (
            <p style={{ color: "#8ABB6C" }}>{paymentType}</p>
          ),
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t(
                "workerPage.tableColumns.extandTableColumns.takes.Crops.titleText",
              )}
            </p>
          ),
          dataIndex: ["take", "crop"],
          key: "takeCrop",
          width: 100,
          render: (_, record) => {
            const crop = record.take.crop;
            const title = `${t("workerPage.tableColumns.extandTableColumns.takes.Crops.buttonTitle")}`;
            return (
              record.take.payment > 0 && (
                <Button
                  type="link"
                  onClick={() => showModal({ crop, title, t })}>
                  {t(
                    "workerPage.tableColumns.extandTableColumns.takes.Crops.buttonText",
                  )}
                </Button>
              )
            );
          },
        },
      ],
    },
  ];
  return Worker_Transaction_Columns;
};

const getColumnsForWorkerCalcPage = (t) => {
  const WORKER_TRANSACTION_CALC_COLUMNS = [
    {
      title: t("workerCalcPage.tableColumns.serialNoTextTitle"),
      dataIndex: "serialNo",
      key: "serialNo",
      width: 50,
    },
    {
      title: t("workerCalcPage.tableColumns.dateText"),
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (date) => {
        const workerDate = formattedDate(date);
        return workerDate;
      },
    },
    {
      title: t("workerCalcPage.tableColumns.gives.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerCalcPage.tableColumns.gives.amountText")}
            </p>
          ),
          dataIndex: ["give", "amount"],
          key: "giveAmount",
          width: 100,
          render: (amount) => {
            return <p style={{ color: "#D73535" }}>{amount}</p>;
          },
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerCalcPage.tableColumns.gives.amountTypeText")}
            </p>
          ),
          dataIndex: ["give", "amountType"],
          key: "giveAmountType",
          width: 100,
          render: (amounType) => (
            <p style={{ color: "#D73535" }}>{amounType}</p>
          ),
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerCalcPage.tableColumns.gives.daysText")}
            </p>
          ),
          dataIndex: ["give", "days"],
          key: "givedays",
          width: 100,
          render: (days) => <p style={{ color: "#D73535" }}>{days}</p>,
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerCalcPage.tableColumns.gives.monthsText")}
            </p>
          ),
          dataIndex: ["give", "months"],
          key: "givemonths",
          width: 100,
          render: (months) => <p style={{ color: "#D73535" }}>{months}</p>,
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerCalcPage.tableColumns.gives.interestText")}
            </p>
          ),
          dataIndex: ["give", "interest"],
          key: "giveInterest",
          width: 100,
          render: (interest) => <p style={{ color: "#D73535" }}>{interest}</p>,
        },
        {
          title: (
            <p style={{ color: "#D73535" }}>
              {t("workerCalcPage.tableColumns.gives.totalText")}
            </p>
          ),
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
      title: t("workerCalcPage.tableColumns.takes.titleText"),
      children: [
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("workerCalcPage.tableColumns.takes.paymentText")}
            </p>
          ),
          dataIndex: ["take", "payment"],
          width: 100,
          key: "takeAmount",
          render: (payment) => <p style={{ color: "#8ABB6C" }}>{payment}</p>,
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("workerCalcPage.tableColumns.takes.paymentType")}
            </p>
          ),
          dataIndex: ["take", "paymentType"],
          width: 100,
          key: "takeAmountType",
          render: (paymentType) => (
            <p style={{ color: "#8ABB6C" }}>{paymentType}</p>
          ),
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("workerCalcPage.tableColumns.takes.daysText")}
            </p>
          ),
          dataIndex: ["take", "days"],
          width: 100,
          key: "takeDays",
          render: (days) => <p style={{ color: "#8ABB6C" }}>{days}</p>,
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("workerCalcPage.tableColumns.takes.monthsText")}
            </p>
          ),
          dataIndex: ["take", "months"],
          width: 100,
          key: "takeMonths",
          render: (months) => <p style={{ color: "#8ABB6C" }}>{months}</p>,
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("workerCalcPage.tableColumns.takes.interestText")}
            </p>
          ),
          dataIndex: ["take", "interest"],
          width: 100,
          key: "takeInterest",
          render: (interest) => <p style={{ color: "#8ABB6C" }}>{interest}</p>,
        },
        {
          title: (
            <p style={{ color: "#8ABB6C" }}>
              {t("workerCalcPage.tableColumns.takes.totalText")}
            </p>
          ),
          dataIndex: ["take", "totalPayment"],
          key: "takeTotalPayment",
          render: (totalPayment) => (
            <p style={{ color: "#8ABB6C" }}>{totalPayment}</p>
          ),
        },
      ],
    },
    {
      title: t("workerCalcPage.tableColumns.grandTotalText"),
      dataIndex: "",
      key: "a",
    },
  ];
  return WORKER_TRANSACTION_CALC_COLUMNS;
};

const getColumnsForCasualLaborPage = (t) => {
  const TRANS_COLUMNS = [
    {
      title: t("casualLabor.ttc.sntt"),
      dataIndex: "serialNo",
      key: "serialNo",
      width: 50,
    },
    {
      title: t("casualLabor.ttc.dt"),
      dataIndex: "startDate",
      key: "date",
      width: 100,
    },
    {
      title: t("casualLabor.ttc.wt"),
      dataIndex: "salary",
      key: "salary",
      width: 100,
    },
    {
      title: t("casualLabor.ttc.dut"),
      dataIndex: "duration",
      key: "duration",
      width: 100,
    },
    {
      title: t("casualLabor.ttc.tt"),
      dataIndex: "total",
      key: "total",
      width: 100,
    },
    {
      title: t("casualLabor.ttc.pt"),
      dataIndex: "pay",
      key: "pay",
      width: 100,
    },
    {
      title: t("casualLabor.ttc.hot"),
      dataIndex: "handOver",
      key: "handOver",
      render: (text, record) => (
        <>
          <h5>{record.transType}</h5>,<p>{text}</p>
        </>
      ),
    },
  ];
  return TRANS_COLUMNS;
};

const getColumnsForHarvestList = (t) => {
  const vehicleModal = ({ title, details }) => {
    Modal.info({
      title: title,
      content: (
        <>
          <table border="1">
            <thead>
              <tr>
                <th>{t("mechanizedHiring.htc.vd.vdmtvn")}</th>
                <th>{t("mechanizedHiring.htc.vd.vdmtvt")}</th>
                <th>{t("mechanizedHiring.htc.vd.vdmtvid")}</th>
              </tr>
            </thead>
            <tbody>
              {details.map((vehicle) => (
                <tr key={vehicle.vehicalID}>
                  <td>{vehicle.vehicalNumber}</td>
                  <td>{vehicle.vehicalType}</td>
                  <td>{vehicle.vehicalID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ),
    });
  };
  const LIST_COLUMNS = [
    {
      title: t("mechanizedHiring.htc.sntt"),
      dataIndex: "serialNo",
      width: 50,
      key: "serialNo",
    },
    {
      title: t("mechanizedHiring.htc.dt"),
      dataIndex: "date",
      width: 100,
      key: "date",
    },
    {
      title: t("mechanizedHiring.htc.nt"),
      dataIndex: "serviceProvider",
      width: 150,
      key: "name",
      render: (serviceProvider) => (
        <>
          <p>
            <span>{serviceProvider.firstName}</span>{" "}
            <span>{serviceProvider.lastName}</span>[
            <span>{serviceProvider.nickName}</span>]
          </p>
        </>
      ),
    },
    {
      title: t("mechanizedHiring.htc.ct"),
      dataIndex: ["serviceProvider", "contact"],
      width: 100,
      key: "contact",
    },
    {
      title: t("mechanizedHiring.htc.at"),
      dataIndex: ["serviceProvider", "address"],
      width: 100,
      key: "address",
    },
    {
      title: t("mechanizedHiring.htc.vd.vdt"),
      dataIndex: "vehicalDetails",
      width: 100,
      key: "vehicalDetails",
      render: (details) => {
        if (details.length > 0) {
          const title = t("mechanizedHiring.htc.vd.vdmt");
          return (
            <Button
              type="text"
              onClick={() => vehicleModal({ title, details })}>
              view
            </Button>
          );
        }
      },
    },
  ];
  return LIST_COLUMNS;
};

const getColumnsForHarvestTransaction = (t) => {
  const TRANS_COLUMNS = [
    {
      title: t("mechanizedHiring.ttc.sntt"),
      dataIndex: "serialNo",
      key: "serialNo",
      width: 50,
    },
    {
      title: t("mechanizedHiring.ttc.dt"),
      dataIndex: "startDate",
      key: "date",
      width: 100,
    },
    {
      title: t("mechanizedHiring.ttc.wt"),
      dataIndex: "salary",
      key: "salary",
      width: 100,
    },
    {
      title: t("mechanizedHiring.ttc.dut"),
      dataIndex: "",
      key: "duration",
      width: 100,
      render: (_, record) => {
        if (record.duration > 0) {
          return <>{record.duration}</>;
        }
        if (record.measurment > 0) {
          return <>{record.measurment}</>;
        }
      },
    },
    {
      title: t("mechanizedHiring.ttc.tt"),
      dataIndex: "total",
      key: "total",
      width: 100,
    },
    {
      title: t("mechanizedHiring.ttc.pt"),
      dataIndex: "pay",
      key: "pay",
      width: 100,
    },
    {
      title: t("mechanizedHiring.ttc.hot"),
      dataIndex: "handOver",
      key: "handOver",
      render: (text, record) => (
        <>
          <span>{record.transType}</span>,<span>{text}</span>
        </>
      ),
    },
  ];
  return TRANS_COLUMNS;
};

export {
  getColumnsForHomepage,
  getColumnsForViewPage,
  getColumnsForCalulationPage,
  getWorkerListColumnsForWorkerPage,
  getWorkerTransactionColumnsForWorkerPage,
  getColumnsForWorkerCalcPage,
  getColumnsForCasualLaborPage,
  getColumnsForHarvestList,
  getColumnsForHarvestTransaction,
};
