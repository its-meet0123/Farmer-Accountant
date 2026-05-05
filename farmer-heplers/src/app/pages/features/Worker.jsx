import {
  Button,
  Dropdown,
  Flex,
  Form,
  message,
  Popconfirm,
  Spin,
  Table,
} from "antd";
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
  EllipsisOutlined,
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { PageContainer } from "../../component/PageContainer";
import dayjs from "dayjs";

const WorkersData = () => {
  const { season, t } = useAuth();
  const [isLoanding, setIsLoanding] = useState(null);
  const [workerList, setWorkerList] = useState([]);
  const [openType, setOpenType] = useState(null);
  const [fetchData, setFetchData] = useState("");
  const [transactionType, setTransactionType] = useState("Gives");
  const [transactionForm] = Form.useForm();
  const [workerInfoForm] = Form.useForm();
  const navigate = useNavigate();

  const calcView = (account) => {
    navigate("/worker/calc", {
      state: { id: account._id },
    });
    console.log(account._id);
  };

  const addWorkerTransaction = (record) => {
    transactionForm.setFieldsValue({
      workerId: record?._id,
    });

    setTimeout(() => {
      setIsLoanding(null);
      setOpenType("at");
    }, 1000);
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

  const editWorker = (record) => {
    console.log("edit worker trans function click: ", record);
    setIsLoanding("ew");
    const date = dayjs(record?.workerDetail?.date);

    workerInfoForm.setFieldsValue({
      workerId: record?._id,
      firstName: record?.workerDetail?.workerName?.firstName,
      lastName: record?.workerDetail?.workerName?.lastName,
      nickName: record?.workerDetail?.workerName?.nickName,
      contect: record?.workerDetail?.contect,
      date: date,
      idProof: record?.workerDetail?.idProof,
      account: record?.account || [],
    });

    setTimeout(() => {
      setIsLoanding(null);
      setOpenType("ew");
    }, 1000);
  };

  const editWorkerTransaction = (record) => {
    setIsLoanding("ewt");
    if (record?.give?.amount > 0 && record?.take?.payment > 0) {
      setTransactionType("Both");
    } else if (record?.give?.amount > 0) {
      setTransactionType("Gives");
    } else if (record?.take?.payment > 0) {
      setTransactionType("Takes");
    }
    const filltredWorker = workerList.find((worker) => {
      return worker.account.some((transaction) =>
        Object.keys(transaction).every(
          (key) => transaction[key] === record[key],
        ),
      );
    });
    const date = dayjs(record?.date);
    transactionForm.setFieldsValue({
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
      date: date,
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
    if (!season._id) return;
    async function getData() {
      try {
        setIsLoanding("loadData");
        const res = await getAllWorkers(season?._id);
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
  }, [fetchData, season._id]);

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
      width: 20,
      fixed: "end",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "add",
                icon: <FileAddOutlined />,
                onClick: () => addWorkerTransaction(record),
              },
              {
                key: "2",
                label: "view",
                icon: <EyeOutlined />,
                onClick: () => calcView(record),
              },
              {
                key: "3",
                label: "edit",
                icon: <EditOutlined />,
                onClick: () => editWorker(record),
              },
              {
                key: "4",
                icon: <DeleteOutlined />,
                danger: true,
                label: (
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
                    <span style={{ color: "red", cursor: "pointer" }}>
                      delete
                    </span>
                  </Popconfirm>
                ),
              },
            ],
          }}
          trigger={["click"]}>
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const ExpandedRow = (record) => {
    const transaction =
      record?.account.map((item, index) => ({
        ...item,
        serialNo: index + 1,
      })) || [];
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
              <Button
                color="danger"
                variant="text"
                icon={<DeleteOutlined />}
                size="small"
              />
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
        {isLoanding == "loadData" ? (
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
            scroll={{ x: "max-content", y: "90vh" }}
            style={{ width: "100%" }}
          />
        )}
        <WorkerDrawer
          openType={openType}
          setOpenType={setOpenType}
          workerList={workerList}
          setFetchData={setFetchData}
          transactionForm={transactionForm}
          workerInfoForm={workerInfoForm}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </PageContainer>
    </>
  );
};

export default WorkersData;
