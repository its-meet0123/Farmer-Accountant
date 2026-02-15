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
import { useEffect, useMemo, useState } from "react";
import { SHOPS_COLUMNS } from "../../constant/Extracolumns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EntDrawer from "../../component/EntDrawer";
import { deleteIndDataByIds, getAllIndShopes } from "../../service/ind";
import dayjs from "dayjs";
import AlertText from "../../component/Text";
import { useAuth } from "../../auth/AuthContext";
import {
  deleteEntDataById,
  getAllEntData,
  getEntDataById,
} from "../../service/ent";

const HomePage = () => {
  const [form] = Form.useForm();
  const [entData, setEntData] = useState([]);
  const [isLoanding, setIsLoanding] = useState(false);
  const [indData, setIndData] = useState([]);
  const [openType, setOpenType] = useState(null);
  const [fetch, setFetch] = useState();
  const [shopeNo, setShopeNo] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const { authState } = useAuth();

  const filltredIndData = useMemo(() => {
    if (shopeNo) {
      const data = indData.filter((ind) => ind.shopeNumber === shopeNo);
      return data;
    }
  }, [shopeNo]);
  const showSuccess = (text) => {
    messageApi.open({
      type: "success",
      content: text,
      duration: 3,
    });
  };
  const deleteFunction = async (record) => {
    const data = indData.filter((ind) => {
      return record.shopes.some(
        (shope) => shope.shopeNumber === ind.shopeNumber,
      );
    });
    try {
      const ids = data.map((data) => data._id);
      const entRes = await deleteEntDataById(record._id);
      const indRes = await deleteIndDataByIds(ids);
      if (
        entRes.status === 200 ||
        (entRes.status === 204 && indRes.status === 201)
      ) {
        const text = `${record.nameInd} Deleted Successfully.`;
        showSuccess(text);
        setFetch("res");
      }
    } catch (err) {
      message.error(
        "The system is not allowing the Industry data to be removed",
      );
      console.log(err.message);
    }
  };

  const editFunction = async (id) => {
    try {
      setIsLoanding(true);
      const res = await getEntDataById(id);
      setIsLoanding(false);
      if (res.status === 200) {
        const data = await res.data.data;
        const date = dayjs(data.startDate);

        form.setFieldsValue({
          id: data._id,
          nameInd: data?.nameInd,
          firstName: data.indFounder?.firstName,
          lastName: data.indFounder?.lastName,
          indContact: data.indContact,
          shopes: data.shopes,
          startDate: date,
        });
        setFetch(data);
        setOpenType("edit");
      }
    } catch (err) {
      message.error("Industry Data not fetched by Id");
      console.log(err.message);
    }
  };

  const handleAddData = () => {
    setOpenType("add");
  };
  const formattedDate = (date) => {
    const rawDate = date ? new Date(date) : new Date();
    const DateTimeFormat = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(rawDate);

    return DateTimeFormat;
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoanding(true);
        const entRes = await getAllEntData();
        const entData = entRes?.data?.data;
        setIsLoanding(false);
        setEntData(entData);
        const indRes = await getAllIndShopes();
        const indData = await indRes?.data?.data;
        setIndData(indData);
      } catch (err) {
        setIsLoanding(ture);
        message.error("All Ent data not fetching");
        console.error(err.message);
      }
      setFetch("");
    }
    getData();
  }, [fetch]);

  const tableData = entData.map((item, index) => ({
    ...item,
    serialNo: index + 1,
  }));
  const ENT_COLUMNS = [
    {
      title: "S.No.",
      dataIndex: "serialNo",
      key: "serialNO",
      width: 50,
      render: (record) => {
        return record;
      },
    },
    {
      title: "Industry Name",
      dataIndex: "nameInd",
      key: "nameInd",
      width: 200,
    },
    {
      title: "Founder",
      key: "firstName",
      width: 150,
      render: (record) => {
        return (
          record?.indFounder?.firstName + " " + record.indFounder?.lastName
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "indContact",
      key: "indContact",
      width: 100,
    },

    {
      title: "Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (startDate) => {
        const date = formattedDate(startDate);
        return date;
      },
    },
    {
      title: "Action",
      width: 100,
      key: "x",
      fixed: "end",
      render: (_, record) => (
        <Flex gap="small" wrap>
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => editFunction(record._id)}
          />
          <Popconfirm
            title={
              <AlertText
                text={`Are you sure you want to delete this Industry:${record.nameInd}? All associated data and shops will be permanently removed `}
              />
            }
            onConfirm={() => deleteFunction(record)}
            okText="Yes"
            cancelText="No"
            placement="left">
            <Button type="link" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
          {/* <Button type="primary" icon={<DownloadOutlined />} size={size} /> */}
        </Flex>
      ),
    },
  ];

  const ExpandedRow = (record) => {
    const shops = record ? record.shopes : [];

    return <Table columns={SHOPS_COLUMNS} dataSource={shops} rowKey="_id" />;
  };
  return (
    <>
      {contextHolder}

      <Card
        extra={
          <Button type="primary" onClick={() => handleAddData()}>
            Add
          </Button>
        }
        size={20}>
        {isLoanding ? (
          <Spin size="large" />
        ) : (
          <Table
            size="small"
            columns={ENT_COLUMNS}
            dataSource={tableData}
            rowKey="_id"
            expandable={{
              expandedRowRender: (record) => ExpandedRow(record),
            }}
            scroll={{ x: 200 }}
          />
        )}
      </Card>
      <EntDrawer
        open={openType}
        form={form}
        setOpen={setOpenType}
        setShopeNo={setShopeNo}
        indData={filltredIndData}
        setFetch={setFetch}
        showSuccess={showSuccess}
        user={authState.user}
        data={{ entData, indData }}
      />
    </>
  );
};

export default HomePage;
