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
  deleteIndShopeAccountData,
  getAllIndShopes,
  postEndDate,
} from "../../service/ind";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FileAddOutlined,
  LoadingOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { getColumnsForViewPage } from "../../constant/Extracolumns";
import { useNavigate } from "react-router-dom";
import IndDrawer from "../../component/IndDrawer";
import dayjs from "dayjs";
import AlertText from "../../component/Text";
import { useAuth } from "../../auth/AuthContext";
import { PageContainer } from "../../component/PageContainer";

const ViewPage = () => {
  const { season, t } = useAuth();
  const [isLoanding, setIsLoanding] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [allInd, setAllInd] = useState([]);
  const [Id, setId] = useState();
  const [fetch, setFetch] = useState();
  const [openType, setOpenType] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const calcView = (account) => {
    navigate("/view/calc", {
      state: { id: account._id },
    });
  };

  const showSuccess = (text) => {
    messageApi.open({
      type: "success",
      content: text,
      duration: 3,
    });
  };

  const editFunction = async (record) => {
    setIsLoanding("edit");
    const date = dayjs(record.startDate);
    form.setFieldsValue({
      id: record._id,
      startDate: date,
      rate: record.rate,
      amount: record?.loan?.amount,
      amountType: record?.loan?.amountType,
      handOver: record?.loan?.handOver,
      bBillAmount: record?.indBuy?.billAmount,
      bBill: record?.indBuy?.bill,
      bBrief: record?.indBuy?.brief,
      bHandOver: record?.indBuy?.handOver,
      sBillAmount: record?.indSell?.billAmount,
      sBill: record?.indSell?.bill,
      sBrief: record?.indSell?.brief,
      sHandOver: record?.indSell?.handOver,
      crop: record?.indSell?.crop,
      dBillAmount: record?.diesel?.billAmount,
      dQty: record?.diesel?.qty,
      dRate: record?.diesel?.rate,
      dHandOver: record?.diesel?.handOver,
    });

    const result = allInd
      .map((obj) => {
        return {
          ...obj,
          shopeAccount: obj.shopeAccount.filter(
            (subObj) => subObj._id === record._id,
          ),
        };
      })
      .filter((obj) => obj.shopeAccount.length > 0);

    setId({
      shopeId: result[0]._id,
      accountId: record._id,
      shopeNumber: record.shopeNumber,
    });
    setTimeout(() => {
      setIsLoanding(false);
      setOpenType("edit");
    }, 1000);
  };

  const handleAddShopeTransaction = (record) => {
    setId({ shopeId: record._id, shopeNumber: record.shopeNumber });
    setOpenType("add");
  };

  const deleteTransaction = async (record) => {
    setIsLoanding("at");
    const data = allInd.filter((ind) => {
      return ind.shopeAccount.some((shope) => shope._id === record._id);
    });
    const ids = {
      shopeId: data[0]._id,
      transactionIds: [record._id],
    };
    try {
      const res = await deleteIndShopeAccountData(ids);
      if (res.status === 200) {
        const text = `${t("ViewPage.deleteTransFunctionMessages.successMessage1")}`;
        showSuccess(text);
        setFetch(res.data);
        setIsLoanding(false);
      }
    } catch (err) {
      message.error(t("ViewPage.deleteTransFunctionMessages.errorMessage1"));
      console.log(err.message);
    }
  };

  const deleteAllTransaction = async (record) => {
    const transactionIds = record.shopeAccount.map((shope) => shope._id);
    const ids = {
      shopeId: record._id,
      transactionIds: transactionIds || [],
    };
    try {
      const res = await deleteIndShopeAccountData(ids);
      if (res.status === 200) {
        const text = `${t("ViewPage.deleteTransFunctionMessages.successMessage2")}`;
        showSuccess(text);
        setFetch("delete all transaction");
      }
    } catch (err) {
      message.error(t("ViewPage.deleteTransFunctionMessages.errorMessage2"));
      console.log(err.message);
    }
  };

  const stopCalculation = async (record) => {
    const date = new Date();
    const forenddate = {
      userId: record?.userId,
      dataId: record?._id,
      endDate: date,
    };
    const res = await postEndDate(forenddate);
    if (res.status == 201) {
      message.success(`Calculation stop for ${record?.shopeNumber}`);
    }
    if (res.status == 200) {
      message.info(`Calculation already stoped for ${record?.shopeNumber}`);
    }
  };

  useEffect(() => {
    if (!season?._id) return null;
    async function getData() {
      try {
        setIsLoanding("loadData");
        const res = await getAllIndShopes(season?._id);
        const data = await res.data.data;
        setAllInd(data);
        setIsLoanding(false);
      } catch (err) {
        message.error(t("ViewPage.fetchDataErrorMessage"));
        console.log(err.message);
      }

      setFetch("");
    }
    getData();
  }, [fetch, season?._id]);

  const tableData = useMemo(() => {
    if (!allInd) return [];
    return allInd.map((item, index) => ({
      ...item,
      serialNo: index + 1,
    }));
  }, [allInd]);

  const columns = [
    {
      title: t("ViewPage.tableColumns.serialNoTitleText"),
      dataIndex: "serialNo",
      width: "20%",
      key: "sno",
    },
    {
      title: t("ViewPage.tableColumns.IndustryNameTitleText"),
      dataIndex: "nameInd",
      width: "60%",
      key: "nameInd",
    },
    {
      title: t("ViewPage.tableColumns.ShopeNoText"),
      dataIndex: "shopeNumber",
      width: "30%",
      key: "shopeNumber",
    },
    {
      title: t("ViewPage.tableColumns.actionTitleText"),
      dataIndex: "",
      width: "40%",
      key: "a",
      fixed: "end",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "add",
                icon:
                  isLoanding == "at" ? (
                    <LoadingOutlined />
                  ) : (
                    <FileAddOutlined />
                  ),
                onClick: () => handleAddShopeTransaction(record),
              },
              {
                key: "2",
                label: "view",
                icon: <EyeOutlined />,
                onClick: () => calcView(record),
              },
              {
                key: "3",
                label: (
                  <Popconfirm
                    title={
                      <AlertText
                        text={`${t("ViewPage.tableColumns.actionPopAlertText")}`}
                      />
                    }
                    onConfirm={() => deleteAllTransaction(record)}
                    okText="Yes"
                    cancelText="No"
                    placement="left">
                    <Button
                      color="danger"
                      variant="text"
                      icon={<DeleteOutlined />}
                      size="small">
                      delete
                    </Button>
                  </Popconfirm>
                ),
              },
              {
                key: "4",
                label: "stop",
                icon: <StopOutlined />,
                onClick: () => stopCalculation(record),
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
    const shopeAccount = record
      ? record.shopeAccount.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }))
      : [];

    const SHOPE_ACCOUNT_BASE_COLUMNS = getColumnsForViewPage(t);

    const SHOPE_ACCOUNT_COLUMNS = [
      ...SHOPE_ACCOUNT_BASE_COLUMNS,
      {
        title: t("ViewPage.tableColumns.actionTitleText"),
        dataIndex: "",
        key: "x",
        width: 50,
        fixed: "end",
        render: (_, record) => {
          return (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                size="small"
                loading={isLoanding == "edit" && true}
                onClick={() => editFunction(record)}
              />
              <Popconfirm
                title={`${t("ViewPage.tableColumns.extandTableColumns.actionPopAlertText")}`}
                onConfirm={() => deleteTransaction(record)}
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
            </>
          );
        },
      },
    ];

    return (
      <Table
        columns={SHOPE_ACCOUNT_COLUMNS}
        dataSource={shopeAccount}
        tableLayout="fixed"
        rowKey="_id"
        bordered
        scroll={{ x: 900 }}
      />
    );
  };
  return (
    <>
      {contextHolder}
      <PageContainer title={t("ViewPage.cardTitle")} extra={""}>
        {isLoanding == null ? (
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
            rowKey="_id"
            expandable={{
              expandedRowRender: (record) => ExpandedRow(record),
            }}
            pagination={false}
            scroll={{ x: "90vw", y: "90vh" }}
            style={{ minWidth: "100%" }}
          />
        )}
        <IndDrawer
          open={openType}
          setOpen={setOpenType}
          Id={Id}
          form={form}
          setFetch={setFetch}
          showSuccess={showSuccess}
          t={t}
          season={season}
        />
      </PageContainer>
    </>
  );
};

export default ViewPage;
