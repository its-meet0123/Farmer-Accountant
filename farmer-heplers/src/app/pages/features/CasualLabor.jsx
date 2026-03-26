import {
  Button,
  Flex,
  Form,
  message,
  notification,
  Popconfirm,
  Spin,
  Table,
} from "antd";
import { PageContainer } from "../../component/PageContainer";
import { useState, useEffect, useMemo } from "react";
import {
  deleteFieldWorkerData,
  deleteFieldWorkerTransaction,
  getAllFieldWorkerData,
} from "../../service/other";
import { useAuth } from "../../auth/AuthContext";
import { getColumnsForCasualLaborPage } from "../../constant/Extracolumns";
import LaborDrawer from "../../component/CasualLaborDrawer";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";
import dayjs from "dayjs";

const CasualLabor = () => {
  const { t } = useAuth();
  const [laborForm] = Form.useForm();
  const [transactionForm] = Form.useForm();
  const [additonalWorker, setAdditonalWorker] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState();
  const [openType, setOpenType] = useState(null);
  const [buttonLoading, setButtonLoanding] = useState(null);

  const handleAddLaborTransaction = async (record) => {
    setButtonLoanding("alt");
    transactionForm.setFieldsValue({
      laborId: record._id,
    });
    setTimeout(() => {
      setOpenType("transAdd");
      setButtonLoanding(null);
    }, 1000);
  };

  const editFunction = async (details) => {
    setButtonLoanding("le");
    const date = dayjs(details?.date);
    laborForm.setFieldsValue({
      laborId: details._id,
      date: date || "",
      nickName: details?.serviceProvider?.nickName || "",
      firstName: details?.serviceProvider?.firstName || "",
      lastName: details?.serviceProvider?.lastName || "",
      contact: details?.serviceProvider?.contact || "",
      address: details?.serviceProvider?.address || "",
      idProof: details?.serviceProvider?.idProof || "",
      transactions: details?.transactions || [],
    });
    setTimeout(() => {
      setOpenType("laborEdit");
      setButtonLoanding(null);
    }, 1000);
  };

  const deleteLabor = async (record) => {
    try {
      const id = record._id;
      const res = await deleteFieldWorkerData(id);
      const data = await res.data;

      if (data.status === "Success") {
        message.success(data.Code);
        setFetch(data.worker);
      }
    } catch (err) {
      console.log(err.message);
      message.error(t("CL.AW.DWSEM"));
    }
  };

  const editTransFunction = async (record) => {
    const filterFieldWorkers = additonalWorker.find((labor) => {
      return labor.transactions.some((transaction) =>
        Object.keys(record).every((key) => transaction[key] === record[key]),
      );
    });
    const workerId = filterFieldWorkers?._id;
    setButtonLoanding("let");
    const startDate = dayjs(record.startDate);
    transactionForm.setFieldsValue({
      laborId: workerId,
      transId: record._id,
      startDate: startDate,
      duration: record.duration,
      salary: record.salary,
      pay: record.pay,
      transType: record.transType,
      handOver: record.handOver,
    });
    setTimeout(() => {
      setOpenType("transEdit");
      setButtonLoanding(false);
    }, 1000);
  };

  const deleteLaborTrans = async (record) => {
    const filterFieldWorkers = additonalWorker.find((worker) => {
      return worker.transactions.some((transaction) =>
        Object.keys(transaction).every(
          (key) => transaction[key] === record[key],
        ),
      );
    });

    const length = filterFieldWorkers.transactions.length;

    const sepcificTransaction = filterFieldWorkers.transactions.find(
      (transaction) => {
        return Object.keys(transaction).every(
          (key) => transaction[key] === record[key],
        );
      },
    );

    if (record.serialNo !== length) {
      setOpenType(null);
      setTimeout(() => {
        notification.warning({
          message: "Delete Action not work",
          description:
            "You can only delete this transaction if it is the most recent one. Transactions preceding the last entry cannot be removed.",
          placement: "topRight",
        });
        setIsLoading(null);
      }, 1000);

      return;
    }
    try {
      const ids = {
        workerId: filterFieldWorkers?._id,
        transactionId: sepcificTransaction._id,
      };
      const res = await deleteFieldWorkerTransaction(ids);
      const data = await res.data;
      if (data.status === "Success") {
        message.success(data.Code);
        setFetch(data.workerTrans);
      }
      console.log(filterFieldWorkers);
    } catch (err) {
      console.log(err.message);
      message.error("Labor transaction not deleted");
    }
  };

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
        message.error("Casual Labor data not fetching");
      }
    }
    getData();
  }, [fetch, t]);

  const tableData = useMemo(() => {
    if (!additonalWorker) return [];
    return additonalWorker.map((workers, index) => ({
      ...workers,
      serialNo: index + 1,
    }));
  }, [additonalWorker]);

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
      render: (name) =>
        `${name.firstName} ${name.lastName} [${name?.nickName}]`,
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
      dataIndex: "",
      key: "a",
      render: (_, record) => {
        return (
          <Flex gap={2} horizontal>
            <Button
              type="link"
              icon={<FileAddOutlined />}
              onClick={() => handleAddLaborTransaction(record)}>
              {buttonLoading === "alt" && (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              )}
            </Button>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => editFunction(record)}>
              {buttonLoading === "le" && (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              )}
            </Button>
            <Popconfirm
              title={<AlertText text={`${t("CasualLabor.wtc.aptt")}`} />}
              onConfirm={() => deleteLabor(record)}
              okText="Yes"
              cancelText="No"
              placement="left">
              <Button type="link" icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  const ExpandedRow = (record) => {
    const transactions =
      record?.transactions.map((transaction, index) => ({
        ...transaction,
        serialNo: index + 1,
      })) || [];
    const CASUAL_LABOR_TRANS_COLUMNS = getColumnsForCasualLaborPage(t);
    const columns = [
      ...CASUAL_LABOR_TRANS_COLUMNS,
      {
        title: t("casualLabor.ttc.act"),
        dataIndex: "",
        key: "a",
        render: (_, record) => {
          return (
            <Flex gap={2} horizontal>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => editTransFunction(record)}>
                {buttonLoading === "let" && (
                  <Spin indicator={<LoadingOutlined spin />} size="small" />
                )}
              </Button>
              <Popconfirm
                title={<AlertText text={`${t("CasualLabor.wtc.aptt")}`} />}
                onConfirm={() => deleteLaborTrans(record)}
                okText="Yes"
                cancelText="No"
                placement="left">
                <Button type="link" icon={<DeleteOutlined />} size="small" />
              </Popconfirm>
            </Flex>
          );
        },
      },
    ];

    return (
      <Table dataSource={transactions} columns={columns} scroll={{ x: 300 }} />
    );
  };

  return (
    <>
      <PageContainer
        title={t("casulaLabor.cardTitle")}
        extra={
          <Button type="primary" onClick={() => setOpenType("laborAdd")}>
            Add Labor
          </Button>
        }>
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
      <LaborDrawer
        openType={openType}
        setOpenType={setOpenType}
        laborForm={laborForm}
        setFetch={setFetch}
        transactionForm={transactionForm}
        additionalWorker={additonalWorker}
      />
    </>
  );
};

export default CasualLabor;
