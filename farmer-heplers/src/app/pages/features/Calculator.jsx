import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Spin,
  Table,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteEndDate,
  editEndDate,
  getEndDate,
  getIndShopeAccountById,
  postEndDate,
} from "../../service/ind";
import { getColumnsForCalulationPage } from "../../constant/Extracolumns";
import { DownloadOutlined, RollbackOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAuth } from "../../auth/AuthContext";
import { TableFooterForViewCalc } from "../../component/TableFooter";
import { DownloadTable1 } from "../../component/CalculateTableDownload";
import { PageContainer } from "../../component/PageContainer";

const CalcPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { authState, t } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoanding, setIsLoanding] = useState(null);
  const [shope, setShope] = useState({});
  const [endDate, setEndDate] = useState();
  const [selectMonth, setSelectMonth] = useState(dayjs());
  const [id, setId] = useState();
  const [fetch, setFetch] = useState("");
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
    { label: t("calculationPage.form.editButtonText"), value: "edit" },
    { label: t("calculationPage.form.deleteButtonText"), value: "delete" },
  ];

  const returnBack = () => {
    navigate("/view");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
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
        dataId: state?.id,
      };
      try {
        const res = await postEndDate(data);
        setEndDate(res.data.data);
        showMessage(res.data.message);
        setFetch("post");
      } catch (err) {
        message.error(t("calculationPage.setDateMessages.postError"));
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
          dataId: state?.id,
        };
        const ids = { dataId: state?.id, id: id };
        try {
          const res = await editEndDate(ids, data);
          setEndDate(res.data.data);
          showMessage(res.data);
          setFetch("patch");
        } catch (err) {
          message.error(t("calculationPage.setDateMessages.editError"));
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
          showMessage(res.data);
          setFetch("del");
        } catch (err) {
          message.error(t("calculationPage.setDateMessages.deleteError"));
          console.log(err.message);
        }
      }
    }
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
        const res = await getIndShopeAccountById(state?.id);
        const allData = await res.data.data;
        setIsLoanding(false);
        setShope(allData);
      } catch (err) {
        message.error(t("calculationPage.fetchDataErrorMessage"));
        console.log(err.message);
      }
    }
    getData();
  }, [state]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoanding(true);
        const dateRes = await getEndDate(state?.id);
        const data = await dateRes.data.data;
        setIsLoanding(false);
        setEndDate(data);
        setId(data._id);
        form.setFieldsValue({
          endDate: dayjs(data.endDate) || today,
        });
      } catch (err) {
        message.error(t("calculationPage.fetchDateErrorMessage"));
        console.log(err.message);
        if (err.code === "ERR_CANCELED") {
          return;
        }
      }
    }
    getData();
  }, [fetch, state?.id]);

  const BASE_COLUMNS = getColumnsForCalulationPage(t);

  const tableData = useMemo(() => {
    if (!shope.shopeAccount) return [];
    return shope.shopeAccount.map((item, index) => ({
      ...item,
      serialNo: index + 1,
    }));
  }, [shope.shopeAccount]);

  const setFooter = (currentData) => {
    const summeryData = tableData || currentData;
    return <TableFooterForViewCalc data={summeryData} />;
  };

  const monthlyTotal = useMemo(() => {
    if (!tableData) return 0;
    let loanAmount = 0;
    let buyAmount = 0;
    let dieselAmount = 0;
    let sellAmount = 0;

    return tableData.reduce((total, transaction) => {
      const transactionDate = dayjs(transaction.startDate);

      const isSameMonth = selectMonth
        ? transactionDate.month() === selectMonth.month() &&
          transactionDate.year() === selectMonth.year()
        : transactionDate.month() === today.month() &&
          transactionDate.year() === today.year();

      if (isSameMonth) {
        loanAmount += Number(transaction.loan.amount);
        buyAmount += Number(transaction.indBuy.billAmount);
        dieselAmount += Number(transaction.diesel.billAmount);
        sellAmount += Number(transaction.indSell.billAmount);
        return sellAmount - (loanAmount + buyAmount + dieselAmount);
      }
      return total;
    }, 0);
  }, [tableData, selectMonth, today]);

  const monthlyTurnover = formatCurrency(Number(monthlyTotal));

  return (
    <>
      {contextHolder}
      <PageContainer
        title={`${t("calculationPage.cardTitle")}: ${shope.shopeNumber}`}
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
                    label={t("calculationPage.form.inputLabel")}
                    name="endDate"
                    style={{ marginBottom: isMobile ? "12px" : "0", flex: 1 }}>
                    <DatePicker
                      disabled={id && fetch !== "edit"}
                      format={"DD/MM/YYYY"}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  {(id == null || fetch === "edit" || fetch === "delete") && (
                    <Form.Item
                      style={{ marginBottom: isMobile ? "12px" : "0" }}>
                      <Button htmlType="submit" block={isMobile} type="primary">
                        {t("calculationPage.form.setButtonText")}
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
                        onChange={(e) => setFetch(e.target.value)}
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
                  {t("calculationPage.transInput")}:
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
                    value={monthlyTurnover}
                    readOnly
                    style={{ width: isMobile ? "40%" : "120px" }}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Table
              id="view-table"
              columns={BASE_COLUMNS}
              dataSource={tableData}
              rowKey="serialNo"
              summary={(currentData) => setFooter(currentData)}
              bordered
              scroll={{ x: "max-content" }}
              style={{ width: "100%" }}
              sticky
            />
          </>
        )}
      </PageContainer>
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
