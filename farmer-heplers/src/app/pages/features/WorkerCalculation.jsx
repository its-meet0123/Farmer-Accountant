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
import { data, useLocation } from "react-router-dom";
import { getWorkerTransaction } from "../../service/worker";
import { WORKER_TRANSACTION_CALC_COLUMNS } from "../../constant/Extracolumns";
import { TableFooterForWorkerCalc } from "../../component/TableFooter";
import {
  deleteEndDate,
  editEndDate,
  getEndDate,
  postEndDate,
} from "../../service/ind";
import dayjs from "dayjs";
import { useAuth } from "../../auth/AuthContext";
import { DownloadTable2 } from "../../component/CalculateTableDownload";
import { DownloadOutlined } from "@ant-design/icons";

const options = [
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete" },
];

const WorkerCalculation = () => {
  const { state } = useLocation();
  const { authState } = useAuth();
  const [isLoanding, setIsLoanding] = useState(false);
  const [worker, setWorker] = useState({});
  const [id, setId] = useState();
  const [endDate, setEndDate] = useState([]);
  const [form] = Form.useForm();
  const [fetch, setFetch] = useState();
  const today = dayjs();
  const [modalOpen, setModalOpen] = useState(false);

  const setDate = async () => {
    if (id == null || id == "" || id == undefined) {
      const formDate = form.getFieldsValue();
      const dateValue =
        formDate.endDate != null ? new Date(formDate.endDate) : new Date();
      const data = {
        endDate: dateValue,
        userId: authState.user.userId,
        dateType: "worker",
      };
      const res = await postEndDate(data);
      message.success(res.data.message);
      setFetch("post");
    }
    if (id) {
      if (fetch === "edit") {
        const formDate = form.getFieldsValue();
        const dateValue =
          formDate.endDate != null ? new Date(formDate.endDate) : new Date();
        const data = {
          endDate: dateValue,
          userId: authState.user.userId,
          dateType: "worker",
        };
        const res = await editEndDate(id, data);
        setEndDate(res.data.data);
        message.success(res.data.message);
        setFetch("patch");
      }
      if (fetch === "delete") {
        const res = await deleteEndDate(id);
        setId(null);
        form.setFieldsValue({
          endDate: null,
        });
        message.success(res.data.message);
        setFetch("del");
      }
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        if (state) {
          setIsLoanding(true);
          const res = await getWorkerTransaction(state.id);
          const data = await res.data.data;
          setIsLoanding(false);
          setWorker(data);
        }
      } catch (err) {
        message.error(err.message);
        setIsLoanding(true);
      }
    }
    getData();
  }, [state]);

  useEffect(() => {
    async function getData() {
      try {
        if (fetch != "del") {
          setIsLoanding(true);
          const dateRes = await getEndDate();
          const data = await dateRes.data.data;
          setIsLoanding(false);
          const workerEndDate =
            data.filter((date) => date.dateType === "worker") || [];
          setEndDate(workerEndDate);
          setId(workerEndDate[0]._id);
        }
        form.setFieldsValue({
          endDate: endDate.length > 0 ? dayjs(endDate[0].endDate) : today,
        });
      } catch (err) {
        setIsLoanding(true);
        message.error(err.message);
        setFetch("del");
      }
    }
    getData();
  }, [fetch]);

  const tableData = worker.account
    ? worker.account.map((data, index) => ({
        ...data,
        serialNo: index + 1,
      }))
    : [];

  const setFooter = (currentData) => {
    return <TableFooterForWorkerCalc data={currentData} />;
  };

  return (
    <>
      <Card
        title={
          worker?.workerName &&
          `Transaction view for ${worker?.workerName?.nickName}`
        }
        extra={
          <>
            <Flex gap="small" horizontal>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => setModalOpen(true)}></Button>
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
              columns={WORKER_TRANSACTION_CALC_COLUMNS}
              dataSource={tableData}
              bordered
              rowKey="serialNo"
              scroll={{ x: 500 }}
              summary={(currentData) => setFooter(currentData)}
            />
          </>
        )}
      </Card>
      <DownloadTable2
        modelOpen={modalOpen}
        setModelOpen={setModalOpen}
        worker={worker}
        endDate={endDate}
      />
    </>
  );
};

export default WorkerCalculation;
