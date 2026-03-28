import {
  Button,
  DatePicker,
  Flex,
  Form,
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
  const { authState, t } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoanding, setIsLoanding] = useState(false);
  const [shope, setShope] = useState({});
  const [endDate, setEndDate] = useState([]);
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
      maximumFractionDigits: 2, // Paise dikhane ke liye (.00)
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
        dateType: "view",
      };
      try {
        const res = await postEndDate(data);
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
          dateType: "view",
        };
        try {
          const res = await editEndDate(id, data);
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
          const res = await deleteEndDate(id);
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
    async function getData() {
      try {
        setIsLoanding(true);
        const res = await getIndShopeAccountById(state.id);
        const allData = await res.data.data;
        setIsLoanding(false);
        setShope(allData);
      } catch (err) {
        setIsLoanding(true);
        message.error(t("calculationPage.fetchDataErrorMessage"));
        console.log(err.message);
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
          const viewEndDate =
            data.filter((date) => date.dateType === "view") || [];
          console.log(viewEndDate);
          setEndDate(viewEndDate);
          setId(viewEndDate[0]._id);
          form.setFieldsValue({
            endDate:
              viewEndDate?.length > 0 ? dayjs(viewEndDate[0]?.endDate) : today,
          });
        }
      } catch (err) {
        if (endDate.length > 0) {
          setIsLoanding(true);
          message.error(t("calculationPage.fetchDateErrorMessage"));
          console.log(err.message);
          setFetch("del");
        }
      }
    }
    getData();
  }, [fetch]);

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
        return loanAmount + buyAmount + dieselAmount - sellAmount;
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
        {isLoanding ? (
          <Spin size="large" />
        ) : (
          <>
            <Flex horizontal justify="space-between">
              <Flex horizontal>
                <Form form={form} layout="inline" onFinish={setDate}>
                  <Form.Item
                    label={t("calculationPage.form.inputLabel")}
                    name="endDate">
                    <DatePicker
                      disabled={id && fetch !== "edit"}
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>
                  {(id == null || fetch === "edit" || fetch === "delete") && (
                    <Form.Item>
                      <Button htmlType="submit">
                        {t("calculationPage.form.setButtonText")}
                      </Button>
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
              <Flex horizontal>
                <p style={{ fontWeight: 600 }}>
                  {t("calculationPage.transInput")}:
                </p>
                <DatePicker
                  picker="month"
                  format="MMM/YY"
                  value={selectMonth ? selectMonth : today}
                  onChange={(date) => setSelectMonth(date)}
                />
                <InputNumber value={monthlyTurnover} readOnly />
              </Flex>
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
