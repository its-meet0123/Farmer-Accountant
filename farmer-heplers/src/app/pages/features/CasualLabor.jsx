import { Button, Flex, Form, message, Popconfirm, Spin, Table } from "antd";
import { PageContainer } from "../../component/PageContainer";
import { useState } from "react";
import { useEffect } from "react";
import { getAllFieldWorkerData } from "../../service/other";
import { useAuth } from "../../auth/AuthContext";
import { getColumnsForCasualLaborPage } from "../../constant/Extracolumns";
import LaborDrawer from "../../component/CasualLaborDrawer";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";

const CasualLabor = () => {
  const { t } = useAuth();
  const [laborForm] = Form.useForm();
  const [additonalWorker, setAdditonalWorker] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState();
  const [openType, setOpenType] = useState(null);
  const handleAddLaborTransaction = async (record) => {
    console.log(record);
  };

  const editFunction = (record) => {
    setLaborDetails(record);
    laborForm.setFieldsValue({
      date: record?.date,
      nickName: record?.serviceProvider?.nickName,
      firstName: record?.serviceProvider?.firstName,
      lastName: record?.serviceProvider?.lastName,
      contact: record?.serviceProvider?.contact,
      address: record?.serviceProvider?.address,
      idProof: record?.serviceProvider?.idProof,
      transactions: record?.transactions,
    });
    setTimeout(() => {
      setOpenType("laborEdit");
    }, 3000);
  };

  const deleteLabor = async (record) => {
    console.log(record);
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
              onClick={() => handleAddLaborTransaction(record)}
            />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => editFunction(record)}
            />
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
      />
    </>
  );
};

export default CasualLabor;
