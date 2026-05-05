import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Radio,
  Spin,
  Table,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWorkerTransaction } from "../../service/worker";
import { getColumnsForWorkerCalcPage } from "../../constant/Extracolumns";
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
import { DownloadOutlined, RollbackOutlined } from "@ant-design/icons";
import { PageContainer } from "../../component/PageContainer";

const WorkerCalculation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { state } = useLocation();
  const navigate = useNavigate();
  const today = dayjs();
  const { authState, t } = useAuth();
  const [isLoanding, setIsLoanding] = useState(false);
  const [worker, setWorker] = useState({});
  const [id, setId] = useState();
  const [endDate, setEndDate] = useState([]);
  const [selectMonth, setSelectMonth] = useState(dayjs());
  const [form] = Form.useForm();
  const [fetch, setFetch] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const options = [
    { label: t("workerCalcPage.form.editButtonText"), value: "edit" },
    { label: t("workerCalcPage.form.deleteButtonText"), value: "delete" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
    }).format(amount);
  };

  const setDate = async () => {
    if (id == null || id == "" || id == undefined) {
      const formDate = form.getFieldsValue();
      const dateValue =
        formDate.endDate != null ? new Date(formDate.endDate) : new Date();
      const data = {
        endDate: dateValue,
        userId: authState.user.userId,
        sessionId: state?.id,
        dateType: "worker",
      };
      try {
        const res = await postEndDate(data);
        message.success(res.data.message);
        setFetch("post");
      } catch (err) {
        message.error(t("workerCalcPage.setDateMessages.postError"));
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
          sessionId: state?.id,
          dateType: "worker",
        };
        const ids = { sessionId: state?.id, id: id };
        try {
          const res = await editEndDate(ids, data);
          setEndDate(res.data.data);
          message.success(res.data.message);
          setFetch("patch");
        } catch (err) {
          message.error(t("workerCalcPage.setDateMessages.editError"));
          console.log(err.message);
        }
      }
      if (fetch === "delete") {
        try {
          const res = await deleteEndDate(state?.id, id);
          setId(null);
          form.setFieldsValue({
            endDate: null,
          });
          message.success(res.data.message);
          setFetch("del");
        } catch (err) {
          message.error(t("workerCalcPage.setDateMessages.deleteError"));
          console.log(err.message);
        }
      }
    }
  };

  const returnBack = () => {
    navigate("/worker");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoanding(true);
        const res = await getWorkerTransaction(state.id);
        const data = await res.data.data;
        setIsLoanding(false);
        setWorker(data);
      } catch (err) {
        message.error(t("workerCalcPage.fetchDataErrorMessage"));
        console.error(err.message);
      }
    }
    getData();
  }, [state]);

  useEffect(() => {
    async function getData() {
      try {
        if (fetch != "del") {
          const dateRes = await getEndDate(state?.id);
          const data = await dateRes.data.data;

          const workerEndDate =
            data.filter((date) => date.dateType === "worker") || [];
          setEndDate(workerEndDate);
          setId(workerEndDate[0]._id);
        }
        form.setFieldsValue({
          endDate: endDate.length > 0 ? dayjs(endDate[0].endDate) : today,
        });
      } catch (err) {
        if (endDate.length > 0) {
          message.error(t("workerCalcPage.fetchDateErrorMessage"));
          console.error(err.message);
        }
        setFetch("del");
        if (err.code === "ERR_CANCELED") {
          return;
        }
      }
    }
    getData();
  }, [fetch, state?.id]);

  const WORKER_TRANSACTION_CALC_COLUMNS = getColumnsForWorkerCalcPage(t);

  const tableData = useMemo(() => {
    if (!worker.account) return [];
    return worker.account.map((data, index) => ({
      ...data,
      serialNo: index + 1,
    }));
  }, [worker?.account]);

  const setFooter = (currentData) => {
    const accounts = tableData || currentData || [];
    return <TableFooterForWorkerCalc data={accounts} />;
  };

  const monthlyTotal = useMemo(() => {
    if (!tableData) return 0;
    let giveAmount = 0;
    let takePayment = 0;

    return tableData.reduce((total, transaction) => {
      const transactionDate = dayjs(transaction.date);

      const isSameMonth = selectMonth
        ? transactionDate.month() === selectMonth.month() &&
          transactionDate.year() === selectMonth.year()
        : transactionDate.month() === today.month() &&
          transactionDate.year() === today.year();
      if (isSameMonth) {
        giveAmount += Number(transaction.give.amount);
        takePayment += Number(transaction.take.payment);

        return takePayment - giveAmount;
      }
      return total;
    }, 0);
  }, [tableData, selectMonth, today]);

  const mothlyTurnover = formatCurrency(Number(monthlyTotal));

  return (
    <>
      <PageContainer
        title={
          worker?.workerDetail?.workerName &&
          `${t("workerCalcPage.cardTitle")} ${worker?.workerDetail?.workerName?.nickName}`
        }
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
                onClick={() => setModalOpen(true)}></Button>
            </Flex>
          </>
        }>
        {isLoanding ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
            <Spin size="large" styles={{ indicator: { color: "#00E5FF" } }} />
          </div>
        ) : (
          <>
            <Flex
              vertical={isMobile}
              justify="space-between"
              gap="middle"
              style={{ width: "100%", padding: isMobile ? "10px" : "0" }}>
              <Flex
                vertical={isMobile}
                align={isMobile ? "stretch" : "center"}
                gap="small">
                <Form
                  form={form}
                  layout={isMobile ? "vertical" : "inline"}
                  onFinish={setDate}
                  style={{ width: isMobile ? "100%" : "auto" }}>
                  <Form.Item
                    label={t("workerCalcPage.form.inputLabel")}
                    name="endDate">
                    <DatePicker
                      disabled={id && fetch !== "edit"}
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>

                  {(id == null || fetch === "edit" || fetch === "delete") && (
                    <Form.Item
                      style={{ marginBottom: isMobile ? "12px" : "0" }}>
                      <Button htmlType="submit" block={isMobile} type="primary">
                        {t("workerCalcPage.form.setButtonText")}
                      </Button>
                    </Form.Item>
                  )}
                  {id && (
                    <Form.Item
                      style={{
                        marginBottom: isMobile ? "12px" : "0",
                        flex: 1,
                      }}>
                      <Radio.Group
                        block
                        defaultValue={fetch}
                        options={options}
                        optionType="button"
                        onChange={(e) => {
                          setFetch(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )}
                </Form>
              </Flex>

              <Flex
                vertical={isMobile}
                align={isMobile ? "stretch" : "center"}
                gap="small"
                style={{
                  marginTop: isMobile ? "20px" : "0",
                  borderTop: isMobile ? "1px solid #f0f0f0" : "none",
                  paddingTop: isMobile ? "20px" : "0",
                }}>
                <p style={{ fontWeight: 600, margin: 0 }}>
                  {t("workerCalcPage.transInput")}
                </p>

                <Flex gap="small" style={{ width: "100%" }}>
                  <DatePicker
                    picker="month"
                    format="MMM/YY"
                    value={selectMonth ? selectMonth : today}
                    onChange={(date) => setSelectMonth(date)}
                    style={{ flex: 1 }}
                  />
                  <Input
                    value={mothlyTurnover}
                    readOnly
                    style={{ width: isMobile ? "40%" : "120px" }}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Table
              columns={WORKER_TRANSACTION_CALC_COLUMNS}
              dataSource={tableData}
              bordered
              rowKey="serialNo"
              scroll={{ x: "max-content" }}
              style={{ width: "100%" }}
              summary={(currentData) => setFooter(currentData)}
            />
          </>
        )}
      </PageContainer>
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
