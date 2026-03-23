import { useEffect, useState } from "react";
import { PageContainer } from "../../component/PageContainer";
import { Button, Form, message, Spin, Table } from "antd";
import { getAllHarvestList } from "../../service/other";
import {
  getColumnsForHarvestList,
  getColumnsForHarvestTransaction,
} from "../../constant/Extracolumns";
import { useAuth } from "../../auth/AuthContext";
import HarvestDrawer from "../../component/HarvesterDrawer";

const HarvesterData = () => {
  const { t } = useAuth();
  const [harvestList, setHarvestList] = useState([]);
  const [fetch, setFetch] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [openType, setOpenType] = useState(null);
  const [detailForm] = Form.useForm();
  const [transactionForm] = Form.useForm();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading("loading");
        const res = await getAllHarvestList();
        const data = await res.data;
        if (data.status == "Success") {
          setHarvestList(data.data);
          message.success(data.Code);
          setIsLoading(null);
        }
      } catch (err) {
        console.log(err.message);
        message.error("Data not fetched");
      }
    }
    getData();
  }, [fetch]);

  const ExpanedRow = (record) => {
    const transData =
      record?.transactions.map((transaction, index) => ({
        ...transaction,
        serialNo: index + 1,
      })) || [];
    const transColumns = getColumnsForHarvestTransaction(t);
    const TRANS_COLUMNS = [
      ...transColumns,
      {
        title: "Action",
      },
    ];

    return <Table dataSource={transData} columns={TRANS_COLUMNS} />;
  };

  const tableData = harvestList.map((list, index) => ({
    ...list,
    serialNo: index + 1,
  }));

  const LIST_COLUMNS = getColumnsForHarvestList(t);
  const columns = [
    ...LIST_COLUMNS,
    {
      title: "Action",
    },
  ];
  return (
    <>
      <PageContainer
        title={t("mechanizedal.cardTitle")}
        extra={
          <Button type="primary" onClick={() => setOpenType("addDetail")}>
            Add Harvester
          </Button>
        }>
        {isLoading == "loading" && <Spin size="large" />}
        <Table
          dataSource={tableData}
          columns={columns}
          expandable={{ expandedRowRender: (record) => ExpanedRow(record) }}
        />
      </PageContainer>
      <HarvestDrawer
        openType={openType}
        setOpenType={setOpenType}
        setFetch={setFetch}
        detailForm={detailForm}
        transactionForm={transactionForm}
        harvesterList={harvestList}
      />
    </>
  );
};

export default HarvesterData;
