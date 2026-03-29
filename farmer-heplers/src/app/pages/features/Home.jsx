import { Button, Flex, Form, message, Popconfirm, Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getColumnsForHomepage } from "../../constant/Extracolumns";
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
import { PageContainer } from "../../component/PageContainer";

const HomePage = () => {
  const [form] = Form.useForm();
  const [entData, setEntData] = useState([]);
  const [isLoanding, setIsLoanding] = useState(null);
  const [indData, setIndData] = useState([]);
  const [openType, setOpenType] = useState(null);
  const [fetch, setFetch] = useState();
  const [shopeNo, setShopeNo] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const { authState, t } = useAuth();

  const filltredIndData = useMemo(() => {
    if (shopeNo) {
      const data = indData.filter((ind) => ind.shopeNumber === shopeNo);
      return data;
    }
  }, [shopeNo, indData]);
  const showSuccess = (text) => {
    messageApi.open({
      type: "success",
      content: text,
      duration: 3,
    });
  };
  const deleteFunction = async (record) => {
    setIsLoanding("delete");
    const data = indData.filter((ind) => {
      return record.shopes.some(
        (shope) => shope.shopeNumber === ind.shopeNumber,
      );
    });
    console.log(data);
    const ids = data.map((data) => data._id);
    if (ids) {
      const indRes = await deleteIndDataByIds(ids);
      const entRes = await deleteEntDataById(record._id);
      console.log(ids);
      if (
        entRes.data.status === "Success" &&
        indRes.data.status === "Success"
      ) {
        const text = `${record.nameInd} ${t("homePage.deleteFunctionMessages.successMessage")}`;
        showSuccess(text);
        setFetch({ res1: entRes.data, res2: indRes.data });
        setIsLoanding(null);
      } else {
        message.error(t("homePage.deleteFunctionMessages.errorMessage"));
        console.log(indRes.data.message);
      }
    }
  };

  const editFunction = async (id) => {
    setIsLoanding("edit");
    try {
      const res = await getEntDataById(id);
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
        setTimeout(() => {
          setFetch(data);
          setOpenType("edit");
          setIsLoanding(null);
        }, 1000);
      }
    } catch (err) {
      message.error(t("homePage.editFunctionMessages.errorMessage"));
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
        setIsLoanding("loadData");
        const entRes = await getAllEntData();
        const entData = await entRes?.data?.data;
        const indRes = await getAllIndShopes();
        const indData = await indRes?.data?.data;
        if (
          entRes.data.status === "Success" &&
          indRes.data.status === "Success"
        ) {
          setEntData(entData);
          setIndData(indData);
          setIsLoanding(null);
        }
      } catch (err) {
        message.error(t("homePage.fetchDataErrorMessage"));
        console.error(err.message);
      }
      setFetch("");
    }
    getData();
  }, [fetch, t]);

  const tableData = entData.map((item, index) => ({
    ...item,
    serialNo: index + 1,
  }));
  const ENT_COLUMNS = [
    {
      title: t("homePage.tableColumns.serialNoTitleText"),
      dataIndex: "serialNo",
      key: "serialNO",
      width: 20,
      fixed: "start",
      render: (record) => {
        return record;
      },
    },
    {
      title: t("homePage.tableColumns.IndustryNameTitleText"),
      dataIndex: "nameInd",
      key: "nameInd",
      width: 150,
    },
    {
      title: t("homePage.tableColumns.founderTitleText"),
      key: "firstName",
      width: 70,
      render: (record) => {
        return (
          record?.indFounder?.firstName + " " + record.indFounder?.lastName
        );
      },
    },
    {
      title: t("homePage.tableColumns.contactTitleText"),
      dataIndex: "indContact",
      key: "indContact",
      width: 100,
    },

    {
      title: t("homePage.tableColumns.dateTitleText"),
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (startDate) => {
        const date = formattedDate(startDate);
        return date;
      },
    },
    {
      title: t("homePage.tableColumns.actionTitleText"),
      width: 100,
      key: "x",
      render: (_, record) => (
        <Flex gap="small" wrap>
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => editFunction(record._id)}
            loading={isLoanding == "edit" && true}
          />
          <Popconfirm
            title={
              <AlertText text={t("homePage.tableColumns.actionPopAlertText")} />
            }
            onConfirm={() => deleteFunction(record)}
            okText="Yes"
            cancelText="No"
            placement="left">
            <Button
              type="link"
              icon={<DeleteOutlined />}
              size="small"
              loading={isLoanding == "delete" && true}
            />
          </Popconfirm>
          {/* <Button type="primary" icon={<DownloadOutlined />} size={size} /> */}
        </Flex>
      ),
    },
  ];

  const ExpandedRow = (record) => {
    const shops = record ? record.shopes : [];
    const SHOPS_COLUMNS = getColumnsForHomepage(t);

    return <Table columns={SHOPS_COLUMNS} dataSource={shops} rowKey="_id" />;
  };
  return (
    <>
      {contextHolder}

      <PageContainer
        title={t("homePage.cardTitle")}
        extra={
          <Button type="primary" onClick={() => handleAddData()}>
            {t("homePage.buttonText")}
          </Button>
        }
        size={20}>
        {isLoanding === "loadData" ? (
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
            scroll={{ x: 800 }}
          />
        )}
      </PageContainer>
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
        t={t}
      />
    </>
  );
};

export default HomePage;
