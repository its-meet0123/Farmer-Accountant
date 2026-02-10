import {
  Button,
  Card,
  Flex,
  Form,
  message,
  Popconfirm,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { deleteIndShopeAccountData, getAllIndShopes } from "../../service/ind";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { SHOPE_ACCOUNT_BASE_COLUMNS } from "../../constant/Extracolumns";
import { useNavigate } from "react-router-dom";
import IndDrawer from "../../component/IndDrawer";
import dayjs from "dayjs";
import AlertText from "../../component/Text";

const ViewPage = () => {
  const [isLoanding, setIsLoanding] = useState(false);
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
    const date = dayjs(record.startDate);
    form.setFieldsValue({
      id: record._id,
      startDate: date,
      rate: record.rate,
      amount: record?.loan?.amount,
      amountType: record?.loan?.amountType,
      bBillAmount: record?.indBuy?.billAmount,
      bBill: record?.indBuy?.bill,
      bBrief: record?.indBuy?.brief,
      sBillAmount: record?.indSell?.billAmount,
      sBill: record?.indSell?.bill,
      sBrief: record?.indSell?.brief,
      crop: record?.indSell?.crop,
      dBillAmount: record?.diesel?.billAmount,
      dQty: record?.diesel?.qty,
      dRate: record?.diesel?.rate,
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

    setOpenType("edit");
  };

  const handleAddShopeTransaction = (record) => {
    setId({ shopeId: record._id, shopeNumber: record.shopeNumber });
    setOpenType("add");
  };

  const deleteTransaction = async (record) => {
    const data = allInd.filter((ind) => {
      return ind.shopeAccount.some((shope) => shope._id === record._id);
    });
    const ids = {
      shopeId: data[0]._id,
      transactionIds: [record._id],
    };
    const res = await deleteIndShopeAccountData(ids);
    if (res.status === 200) {
      const text = `Transaction Deleted Successfully for Shop No. ${record.shopeNumber}`;
      showSuccess(text);
      setFetch("delete transaction");
    } else {
      message.error("Trnasaction not deleted");
    }
  };

  const deleteAllTransaction = async (record) => {
    const transactionIds = record.shopeAccount.map((shope) => shope._id);
    const ids = {
      shopeId: record._id,
      transactionIds: transactionIds,
    };
    const res = await deleteIndShopeAccountData(ids);
    if (res.status === 200) {
      const text = `Transactions Deleted All transaction records for Shop No. ${record.shopeNumber} have been successfully removed from the system.`;
      showSuccess(text);
      setFetch("delete all transaction");
    } else {
      message.error("All transactions not deleted");
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoanding(true);
        const res = await getAllIndShopes();
        const data = await res.data.data;
        setIsLoanding(false);
        setAllInd(data);
      } catch (err) {
        setIsLoanding(true);
        message.error(err.message);
      }

      setFetch("");
    }
    getData();
  }, [fetch]);

  const tableData = allInd.map((item, index) => ({
    ...item,
    serialNo: index + 1,
  }));

  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNo",
      width: 100,
      key: "sno",
    },
    {
      title: "Ind. Name",
      dataIndex: "nameInd",
      width: 100,
      key: "nameInd",
    },
    {
      title: "Shope No.",
      dataIndex: "shopeNumber",
      width: 100,
      key: "shopeNumber",
    },
    {
      title: "Action",
      dataIndex: "",
      width: 100,
      key: "a",
      fixed: "end",
      render: (_, record) => {
        return (
          <Flex gap={2} horizontal>
            <Button
              type="link"
              icon={<FileAddOutlined />}
              onClick={() => handleAddShopeTransaction(record)}
            />
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => calcView(record)}
            />
            <Popconfirm
              title={
                <AlertText
                  text={`Do you want to clear all transactions for Shope No. ${record.shopeNumber}?`}
                />
              }
              onConfirm={() => deleteAllTransaction(record)}
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
    const shopeAccount = record
      ? record.shopeAccount.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }))
      : [];

    const SHOPE_ACCOUNT_COLUMNS = [
      ...SHOPE_ACCOUNT_BASE_COLUMNS,
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: 100,
        fixed: "end",
        render: (_, record) => {
          return (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                size="small"
                onClick={() => editFunction(record)}
              />
              <Popconfirm
                title={`Do you want to clear Transaction No. ${record.serialNo}?`}
                onConfirm={() => deleteTransaction(record)}
                okText="Yes"
                cancelText="No"
                placement="left">
                <Button type="link" icon={<DeleteOutlined />} size="small" />
              </Popconfirm>
            </>
          );
        },
        fixed: "right",
      },
    ];

    return (
      <Table
        columns={SHOPE_ACCOUNT_COLUMNS}
        dataSource={shopeAccount}
        tableLayout="fixed"
        rowKey="_id"
        bordered
        scroll={{ x: 500 }}
      />
    );
  };
  return (
    <>
      {contextHolder}
      <Card title="Accounts" extra={""}>
        {isLoanding ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey="_id"
            expandable={{
              expandedRowRender: (record) => ExpandedRow(record),
            }}
            pagination={false}
            scroll={{ x: 700 }}
          />
        )}
      </Card>
      <IndDrawer
        open={openType}
        setOpen={setOpenType}
        Id={Id}
        form={form}
        setFetch={setFetch}
        showSuccess={showSuccess}
      />
    </>
  );
};

export default ViewPage;
