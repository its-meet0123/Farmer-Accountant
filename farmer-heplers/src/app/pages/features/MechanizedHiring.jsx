import { useEffect, useMemo, useState } from "react";
import { PageContainer } from "../../component/PageContainer";
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
import { deleteHarvestData, getAllHarvestList } from "../../service/other";
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
import { duration } from "html2canvas/dist/types/css/property-descriptors/duration";

const HarvesterData = () => {
  const { t } = useAuth();
  const [harvestList, setHarvestList] = useState([]);
  const [fetch, setFetch] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [openType, setOpenType] = useState(null);
  const [detailForm] = Form.useForm();
  const [transactionForm] = Form.useForm();

  const handleAddHarvesterTransaction = (record) => {
    setIsLoading("aht");
    transactionForm.setFieldsValue({
      harvesterId: record._id,
    });
    setTimeout(() => {
      setOpenType("addTrans");
      setIsLoading(null);
    }, 1000);
  };

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
    setTimeout(() => {
      setOpenType("editDetail");
      setIsLoading(null);
    }, 2000);
  };

  const deleteHarvester = async (record) => {
    try {
      const id = record._id;
      const res = await deleteHarvestData(id);
      const data = await res.data;

      if (data.status === "Success") {
        message.success(data.Code);
        setFetch(data.data);
      }
    } catch (err) {
      console.log(err.message);
      message.error("Harvester not deleted");
    }
  };

  const editTransFunction = (record) => {
    setIsLoading("het");
    const forHarvesterId = harvestList.filter((harvester) => {
      return harvester.transactions.some((transaction) =>
        Object.keys(record).every((key) => transaction[key] === record[key]),
      );
    });
    const length = forHarvesterId[0]?.transactions.length;
    const harvesterId = forHarvesterId[0]?._id;
    const transId = record?._id;
    const date = dayjs(record?.startDate);

    if (length != record.serialNo) {
      setTimeout(() => {
        setIsLoading(null);
        notification.warning({
          message: "Edit Action not work",
          description:
            "You can only edit this transaction if it is the most recent one. Transactions preceding the last entry cannot be modified.",
          placement: "topRight",
        });
      }, 1000);
    }
    transactionForm.setFieldsValue({
      harvesterId: harvesterId,
      transId: transId,
      startDate: date,
      duration: record?.duration,
      measurment: record?.measurment,
      salary: record?.salary,
      pay: record?.pay,
      transType: record?.transType,
      handeOver: record?.handeOver,
    });

    setTimeout(() => {
      setIsLoading(null);
      setOpenType("editTrans");
    }, 1000);
  };

  const deleteTrans = (record) => {
    const forHarvesterId = harvestList.map((harvester) => {
      const matchingTransaction = harvester.transactions.filter(
        (transaction) => {
          return Object.keys(record).every(
            (key) => transaction[key] === record[key],
          );
        },
      );
      return { ...harvester, transactions: matchingTransaction };
    });

    console.log(forHarvesterId);
  };

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
                {isLoading === "het" && (
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
