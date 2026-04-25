import { ConfigProvider, Table, theme } from "antd";
import { useAuth } from "../../auth/AuthContext";

const Expense = ({ data }) => {
  const { t } = useAuth();
  const formattedTotal = data?.totalExpense || 0;
  const dataSource = [
    {
      no: "1",
      label: t("dashbord.cards.table.lt1"),
      value: data?.totalOfDiesel,
    },
    {
      no: "2",
      label: t("dashbord.cards.table.lt2"),
      value: data?.totalOfSeedsAndFertilizer,
    },
    {
      no: "3",
      label: t("dashbord.cards.table.lt3"),
      value: data?.totalOfPermanentWorker,
    },
    {
      no: "4",
      label: t("dashbord.cards.table.lt4"),
      value: data?.totalOfHarvest,
    },
    {
      no: "5",
      label: t("dashbord.cards.table.lt5"),
      value: data?.totalOfCasualLabor,
    },
  ];

  const columns = [
    {
      dataIndex: "label",
      key: "label",
      render: (text) => (
        <span style={{ color: "#4da3ff", fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      dataIndex: "value",
      key: "value",
      render: (value) => (
        <span style={{ color: "#ffffff", fontWeight: "bold" }}>{value}</span>
      ),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#161d2f",
            colorBgContainer: "#161d2f",
            rowHoverBg: "#1f1f1f",

            headerColor: "#ffffff",
            colorText: "#ffffff",
            borderColor: "#303030",
          },
        },
      }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="no"
        pagination={false}
        style={{ background: "none" }}
        rowClassName="transparent-row"
        footer={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "2px solid #4da3ff", // Image jaisi line
              paddingTop: "10px",
              marginTop: "5px",
            }}>
            <span
              style={{
                color: "#4da3ff",
                fontWeight: "bold",
                fontSize: "18px",
              }}>
              {t("dashbord.cards.table.lt6")}
            </span>
            <span
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "18px",
              }}>
              {formattedTotal}
            </span>
          </div>
        )}
      />
    </ConfigProvider>
  );
};

export default Expense;
