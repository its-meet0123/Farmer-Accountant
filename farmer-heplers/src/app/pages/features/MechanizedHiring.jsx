import { useEffect, useMemo, useState } from "react";
import { PageContainer } from "../../component/PageContainer";
import { Button, Flex, Form, message, Popconfirm, Spin, Table } from "antd";
import { getAllHarvestList } from "../../service/other";
import {
  getColumnsForHarvestList,
  getColumnsForHarvestTransaction,
} from "../../constant/Extracolumns";
import { useAuth } from "../../auth/AuthContext";
import HarvestDrawer from "../../component/HarvesterDrawer";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";
import dayjs from "dayjs";

const HarvesterData = () => {
  const { t } = useAuth();
  const [harvestList, setHarvestList] = useState([]);
  const [fetch, setFetch] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [openType, setOpenType] = useState(null);
  const [detailForm] = Form.useForm();
  const [transactionForm] = Form.useForm();

  const handleAddHarvesterTransaction = (record) => {};

  const editFunction = (record) => {
    console.log("harvesterDateEdit", record);
    setIsLoading("ehd");
    const date = dayjs(record.date);
    detailForm.setFieldsValue({
      harvesterId: record._id,
      date: date,
      nickName: record?.serviceProvider?.nickName,
      firstName: record?.serviceProvider?.firstName,
      lastName: record?.serviceProvider?.lastName,
      contact: record?.serviceProvider?.contact,
      address: record?.serviceProvider?.address,
      idProof: record?.serviceProvider?.idProof,
      vehicalDetails: record?.vehicalDetails,
      transactions: record?.transactions,
    });
    setOpenType("editDetial");
    setIsLoading(null);
  };

  const deleteHarvester = (record) => {};

  const editTransFunction = () => {};

  const deleteTrans = () => {};

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
        dataIndex: "",
        key: "a",
        render: (_, record) => {
          return (
            <Flex gap={2} horizontal>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => editTransFunction(record)}>
                {isLoading === "let" && (
                  <Spin indicator={<LoadingOutlined spin />} size="small" />
                )}
              </Button>
              <Popconfirm
                title={<AlertText text={`${t("CasualLabor.wtc.aptt")}`} />}
                onConfirm={() => deleteTrans(record)}
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

    return <Table dataSource={transData} columns={TRANS_COLUMNS} />;
  };

  const tableData = useMemo(() => {
    if (!harvestList) return [];
    return harvestList.map((list, index) => ({
      ...list,
      serialNo: index + 1,
    }));
  }, [harvestList]);

  const LIST_COLUMNS = getColumnsForHarvestList(t);
  const columns = [
    ...LIST_COLUMNS,
    {
      title: "Action",
      dataIndex: "",
      key: "a",
      render: (_, record) => {
        return (
          <Flex gap={2} horizontal>
            <Button
              type="link"
              icon={<FileAddOutlined />}
              onClick={() => handleAddHarvesterTransaction(record)}>
              {isLoading === "aht" && (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              )}
            </Button>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => editFunction(record)}>
              {isLoading === "ehd" && (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              )}
            </Button>
            <Popconfirm
              title={<AlertText text={`${t("CasualLabor.wtc.aptt")}`} />}
              onConfirm={() => deleteHarvester(record)}
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
    <>
      <PageContainer
        title={t("mechanizedal.cardTitle")}
        extra={
          <Button type="primary" onClick={() => setOpenType("addDetail")}>
            Add Harvester
          </Button>
        }>
        {isLoading == "loading" ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={tableData}
            columns={columns}
            expandable={{ expandedRowRender: (record) => ExpanedRow(record) }}
          />
        )}
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
