import { Button, Flex, Form, message, Popconfirm, Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  deleteWorkerById,
  deleteWorkerTransactionById,
  getAllWorkers,
} from "../../service/worker";
import {
  getWorkerListColumnsForWorkerPage,
  getWorkerTransactionColumnsForWorkerPage,
} from "../../constant/Extracolumns";
import WorkerDrawer from "../../component/WorkerDrawer";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { PageContainer } from "../../component/PageContainer";

const WorkersData = () => {
  const { t } = useAuth();
  const [isLoanding, setIsLoanding] = useState(null);
  const [workerList, setWorkerList] = useState([]);
  const [openType, setOpenType] = useState(null);
  const [fetchData, setFetchData] = useState("");
  const [editTransactionForm] = Form.useForm();
  const navigate = useNavigate();

  const calcView = (account) => {
    navigate("/worker/calc", {
      state: { id: account._id },
    });
    console.log(account._id);
  };

  const deleteWorker = async (record) => {
    if (record._id) {
      try {
        const res = await deleteWorkerById(record._id);
        if (res.status === 200) {
          message.success(res.data.message);
          setFetchData("delete");
        }
      } catch (err) {
        console.log(err.message);
        message.error(t("workerPage.deleteFunctionMessage.errorMessage2"));
      }
    }
  };

  const editWorkerTransaction = (record) => {
    setIsLoanding("ewt");
    const filltredWorker = workerList.find((worker) => {
      return worker.account.some((transaction) =>
        Object.keys(transaction).every(
          (key) => transaction[key] === record[key],
        ),
      );
    });
    editTransactionForm.setFieldsValue({
      workerId: filltredWorker?._id,
      transactionId: record?._id,
      amount: record?.give?.amount,
      amountType: record?.give?.amountType,
      cropG: record?.give?.crop,
      brief: record?.give?.brief,
      payment: record?.take?.payment,
      paymentType: record?.take?.paymentType,
      cropT: record?.take?.crop,
      interestRate: record?.rate,
    });
    setTimeout(() => {
      setIsLoanding(null);
      setOpenType("ewt");
    }, 1000);
  };

  const deleteWorkerTransaction = async (record) => {
    const filltredWorker = workerList
      .map((mainObj) => ({
        ...mainObj,
        account: mainObj.account.filter((childObj) => childObj === record),
      }))
      .filter((mainObj) => mainObj.account.length > 0);
    if (!filltredWorker || !record) {
      message.error(t("workerPage.deleteFunctionMessage.errorMessage1"));
    }
    try {
      const workerId = filltredWorker[0]._id;
      const accountIds = [record._id];
      const res = await deleteWorkerTransactionById(workerId, accountIds);
      console.log(res);
      if (res.status === 200) {
        message.success(res.data.message);
        setFetchData(res.data);
      }
    } catch (err) {
      console.log(err.message);
      message.error("Worker not deleted");
    }
  };
  useEffect(() => {
    async function getData() {
      try {
        setIsLoanding("loadData");
        const res = await getAllWorkers();
        const data = await res.data.data;
        setWorkerList(data);
        setIsLoanding(null);
      } catch (err) {
        message.error(t("workerPage.fetchDataErrorMessage"));
        console.log(err.message);
        setIsLoanding(true);
      }
    }
    getData();
  }, [fetchData]);

  const tableData = useMemo(() => {
    if (!workerList) return [];
    return workerList.map((item, index) => ({
      ...item,
      serialNo: index + 1,
    }));
  }, [workerList]);

  const Worker_List_Columns = getWorkerListColumnsForWorkerPage(t);

  const columns = [
    ...Worker_List_Columns,
    {
      title: t("workerPage.tableColumns.actionText"),
      dataIndex: "",
      width: 50,
      fixed: "end",
      render: (_, record) => (
        <Flex gap="small" horizontal>
          <Button
            type="link"
            icon={<FileAddOutlined />}
            onClick={() => {
              setOpenType("at");
            }}></Button>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => calcView(record)}></Button>
          <Popconfirm
            title={
              <AlertText
                text={`${t("workerPage.tableColumns.actionPopAlertText")}`}
              />
            }
            onConfirm={() => deleteWorker(record)}
            okText="Yes"
            cancelText="No"
            placement="left">
            <Button type="link" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const ExpandedRow = (record) => {
    const transaction = record?.account || [];
    const Worker_Transaction_Columns =
      getWorkerTransactionColumnsForWorkerPage(t);
    const columns = [
      ...Worker_Transaction_Columns,
      {
        title: t("workerPage.tableColumns.extandTableColumns.actionText"),
        dataIndex: "",
        render: (_, record) => (
          <Flex gap="small" horizontal>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => editWorkerTransaction(record)}
              loading={isLoanding == "ewt" && true}></Button>
            <Popconfirm
              title={t(
                "workerPage.tableColumns.extandTableColumns.actionPopAlertText",
              )}
              onConfirm={() => deleteWorkerTransaction(record)}
              okText="Yes"
              cancelText="No"
              placement="left">
              <Button type="link" icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Flex>
        ),
      },
    ];
    return (
      <Table
        dataSource={transaction}
        columns={columns}
        rowKey="_id"
        scroll={{ x: "max-content" }}
      />
    );
  };
  return (
    <>
      <PageContainer
        title={t("workerPage.cardTitle")}
        extra={
          <Button
            type="primary"
            onClick={() => {
              setOpenType("aw");
            }}>
            {t("workerPage.cardButtonText")}
          </Button>
        }>
        {isLoanding ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
            <Spin size="large" styles={{ indicator: { color: "#00E5FF" } }} />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={tableData}
            bordered
            rowKey="_id"
            expandable={{
              expandedRowRender: (record) => ExpandedRow(record),
            }}
            scroll={{ x: "max-content" }}
            style={{ width: "100%" }}
          />
        )}
        <WorkerDrawer
          open={openType}
          setOpen={setOpenType}
          workerList={workerList}
          setFetchData={setFetchData}
          editTransactionForm={editTransactionForm}
        />
      </PageContainer>
    </>
  );
};

export default WorkersData;
