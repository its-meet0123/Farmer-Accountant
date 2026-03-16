import { Button, message, Spin, Table } from "antd";
import { PageContainer } from "../../component/PageContainer";
import { useState } from "react";
import { useEffect } from "react";
import { getAllFieldWorkerData } from "../../service/other";
import { useAuth } from "../../auth/AuthContext";
import { getColumnsForCasualLaborPage } from "../../constant/Extracolumns";

const CasualLabor = () => {
  const { t } = useAuth();
  const [additonalWorker, setAdditonalWorker] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await getAllFieldWorkerData();
        const data = await res.data;
        setIsLoading(false);
        setAdditonalWorker(data.data);
        message.success(t(data.Code));
      } catch (err) {
        console.log(err.message);
        if (data.status === "Error") {
          message.error(t(data.Code));
        }
      }
    }
    getData();
  }, [fetch]);

  const tableData = additonalWorker.map((workers, index) => ({
    ...workers,
    serialNo: index + 1,
  }));

  const columns = [
    {
      title: t("casualLabor.wtc.sntt"),
      dataIndex: "serialNo",
      key: "serialNo",
      width: 50,
    },
    {
      title: t("casualLabor.wtc.dt"),
      dataIndex: "date",
      width: 100,
      key: "date",
    },
    {
      title: t("casualLabor.wtc.nt"),
      dataIndex: "serviceProvider",
      key: "name",
      width: 150,
      render: (name) => `${name.firstName} ${name.lastName} [${name.nickName}]`,
    },
    {
      title: t("casualLabor.wtc.ct"),
      dataIndex: ["serviceProvider", "contact"],
      key: "contact",
      width: 100,
    },
    {
      title: t("casualLabor.wtc.at"),
      dataIndex: ["serviceProvider", "address"],
      key: "address",
      width: 100,
    },
    {
      title: t("casualLabor.wtc.act"),
    },
  ];

  const ExpandedRow = (record) => {
    const transactions = record.transactions || [];
    const CASUAL_LABOR_TRANS_COLUMNS = getColumnsForCasualLaborPage(t);
    const columns = [
      ...CASUAL_LABOR_TRANS_COLUMNS,
      {
        title: t("casualLabor.ttc.act"),
      },
    ];

    return (
      <Table dataSource={transactions} columns={columns} scroll={{ x: 300 }} />
    );
  };

  return (
    <>
      <PageContainer
        title={"Other Expense"}
        extra={<Button type="primary">Add Expense</Button>}>
        {isLoading ? (
          <Spin size="small" />
        ) : (
          <Table
            dataSource={tableData}
            columns={columns}
            expandable={{ expandedRowRender: (record) => ExpandedRow(record) }}
            scroll={{ x: 500 }}
          />
        )}
      </PageContainer>
    </>
  );
};

export default CasualLabor;
