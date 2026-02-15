import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  message,
  Radio,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import {
  deleteEndDate,
  editEndDate,
  getEndDate,
  getIndShopeAccountById,
  postEndDate,
} from "../../service/ind";
import { BASE_COLUMNS } from "../../constant/Extracolumns";
import { DownloadOutlined, RollbackOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAuth } from "../../auth/AuthContext";
import { TableFooterForViewCalc } from "../../component/TableFooter";
import { DownloadTable1 } from "../../component/CalculateTableDownload";

const CalcPage = () => {
  const { authState } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoanding, setIsLoanding] = useState(false);
  const [shope, setShope] = useState({});
  const [endDate, setEndDate] = useState([]);
  const [id, setId] = useState();
  const [fetch, setFetch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const today = dayjs();
  console.log(endDate);

  const showMessage = (res) => {
    if (res.status === "success") {
      messageApi.open({
        type: "success",
        content: res.message,
        duration: 3,
      });
    }
    if (res.status === "fail" || res.status === "error") {
      messageApi.open({
        type: "error",
        content: res.message,
        duration: 3,
      });
    }
  };
  const options = [
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
  ];

  const returnBack = () => {
    navigate("/view");
  };
  console.log(id);
  const setDate = async () => {
    if (id == null || id == "" || id == undefined) {
      const formDate = form.getFieldsValue();
      const dateValue =
        formDate.endDate != null ? new Date(formDate.endDate) : new Date();
      const data = {
        endDate: dateValue,
        userId: authState.user.userId,
        dateType: "view",
      };
      try {
        const res = await postEndDate(data);
        showMessage(res.data.message);
        setFetch("post");
      } catch (err) {
        message.error("End Date not posted");
        console.log(err.message);
      }
    }
    if (id) {
      if (fetch === "edit") {
        const formDate = form.getFieldsValue();
        const dateValue =
          formDate.endDate != null ? new Date(formDate.endDate) : new Date();
        const data = {
          endDate: dateValue,
          userId: authState.user.userId,
          dateType: "view",
        };
        try {
          const res = await editEndDate(id, data);
          setEndDate(res.data.data);
          showMessage(res.data);
          setFetch("patch");
        } catch (err) {
          message.error("The date has not changed");
          console.log(err.message);
        }
      }
      if (fetch === "delete") {
        try {
          const res = await deleteEndDate(id);
          setId(null);
          form.setFieldsValue({
            endDate: null,
          });
          showMessage(res.data);
          setFetch("del");
        } catch (err) {
          message.error("The date field cannot be deleted");
          console.log(err.message);
        }
      }
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoanding(true);
        const res = await getIndShopeAccountById(state.id);
        const allData = await res.data.data;
        setIsLoanding(false);
        setShope(allData);
      } catch (err) {
        setIsLoanding(true);
        message.error("Shope Account not fetched");
        console.log(err.message);
      }
    }
    getData();
  }, [fetch]);

  useEffect(() => {
    async function getData() {
      try {
        if (fetch != "del") {
          setIsLoanding(true);
          const dateRes = await getEndDate();
          const data = await dateRes.data.data;
          setIsLoanding(false);
          const viewEndDate =
            data.filter((date) => date.dateType === "view") || [];
          console.log(viewEndDate);
          setEndDate(viewEndDate);
          setId(viewEndDate[0]._id);
        }
        form.setFieldsValue({
          endDate: endDate?.length > 0 ? dayjs(endDate[0]?.endDate) : today,
        });
      } catch (err) {
        setIsLoanding(true);
        message.error("date not fetching in calculator");
        console.log(err.message);
        setFetch("del");
      }
    }
    getData();
  }, [fetch, state]);
  console.log(fetch);

  const tableData = shope.shopeAccount
    ? shope.shopeAccount.map((item, index) => ({
        ...item,
        serialNo: index + 1,
      }))
    : [];

  const setFooter = (currentData) => {
    return <TableFooterForViewCalc data={currentData} />;
  };

  return (
    <>
      {contextHolder}
      <Card
        title={`Calc View : ${shope.shopeNumber}`}
        extra={
          <>
            <Flex gap="small" horizontal>
              <Button
                type="primary"
                icon={<RollbackOutlined />}
                onClick={returnBack}></Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => setIsModalOpen(true)}></Button>
            </Flex>
          </>
        }>
        {isLoanding ? (
          <Spin size="large" />
        ) : (
          <>
            <Flex horizontal>
              <Form form={form} layout="inline" onFinish={setDate}>
                <Form.Item label="End Date" name="endDate">
                  <DatePicker disabled={id && fetch !== "edit"} />
                </Form.Item>
                {(id == null || fetch === "edit" || fetch === "delete") && (
                  <Form.Item>
                    <Button htmlType="submit">Set</Button>
                  </Form.Item>
                )}
                {id && (
                  <Radio.Group
                    block
                    defaultValue={fetch}
                    options={options}
                    optionType="button"
                    onChange={(e) => {
                      setFetch(e.target.value);
                    }}
                  />
                )}
              </Form>
            </Flex>
            <Table
              id="view-table"
              columns={BASE_COLUMNS}
              dataSource={tableData}
              rowKey="serialNo"
              summary={(currentData) => setFooter(currentData)}
              bordered
              scroll={{ x: 500 }}
              sticky
            />
          </>
        )}
      </Card>
      <DownloadTable1
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        endDate={endDate}
        shope={shope}
      />
    </>
  );
};

export default CalcPage;
