import { ConfigProvider, Table } from "antd";
import { useAuth } from "../../auth/AuthContext";
import { FaGasPump, FaUser } from "react-icons/fa";
import { GiFarmTractor, GiPlantSeed } from "react-icons/gi";
import { MdEngineering } from "react-icons/md";

const Expense = ({ data }) => {
  console.log("Expense table : ", data);
  const { t } = useAuth();
  const formattedTotal = data?.totalExpense || 0;
  const dataSource = [
    {
      no: "1",
      label: (
        <>
          <FaGasPump style={{ marginRight: 10, color: "#f59e0b" }} size={18} />
          {t("dashbord.cards.table.lt1")}
        </>
      ),
      value: data?.totalOfDiesel || 0,
    },
    {
      no: "2",
      label: (
        <>
          <GiPlantSeed
            style={{ marginRight: 10, color: "#22c55e" }}
            size={18}
          />
          {t("dashbord.cards.table.lt2")}
        </>
      ),
      value: data?.totalOfSeedsAndFertilizer || 0,
    },
    {
      no: "3",
      label: (
        <>
          <MdEngineering
            style={{ marginRight: 10, color: "#3b82f6" }}
            size={18}
          />
          {t("dashbord.cards.table.lt3")}
        </>
      ),
      value: data?.totalOfPermanentWorker || 0,
    },
    {
      no: "4",
      label: (
        <>
          <GiFarmTractor
            style={{ marginRight: 10, color: "#06b6d4" }}
            size={18}
          />
          {t("dashbord.cards.table.lt4")}
        </>
      ),
      value: data?.totalOfHarvest || 0,
    },
    {
      no: "5",
      label: (
        <>
          <FaUser style={{ marginRight: 10, color: "#a855f7" }} size={18} />
          {t("dashbord.cards.table.lt5")}
        </>
      ),
      value: data?.totalOfCasualLabor || 0,
    },
  ];

  const columns = [
    {
      dataIndex: "label",
      key: "label",
      render: (text) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            color: "#F8FAFC",
            fontWeight: 600,
            fontSize: "15px",
            letterSpacing: "0.3px",
          }}>
          {text}
        </span>
      ),
    },
    {
      dataIndex: "value",
      key: "value",
      align: "right",
      render: (value) => (
        <span
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: "30px",
            background:
              "linear-gradient(135deg, rgba(34,197,94,.18), rgba(16,185,129,.12))",
            border: "1px solid rgba(34,197,94,.25)",
            color: "#22c55e",
            fontWeight: 700,
            fontSize: "15px",
            minWidth: "90px",
            textAlign: "center",
          }}>
          {value}
        </span>
      ),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "rgba(255,255,255,.04)",

            colorBgContainer: "transparent",

            headerColor: "#F8FAFC",

            colorText: "#E5E7EB",

            borderColor: "rgba(255,255,255,.08)",

            rowHoverBg: "rgba(59,130,246,.08)",

            footerBg: "transparent",

            cellPaddingBlock: 18,

            cellPaddingInline: 18,
          },
        },
      }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="no"
        bordered={false}
        size="large"
        pagination={false}
        style={{ background: "none" }}
        rowClassName="transparent-row"
        style={{
          background: "transparent",
          borderRadius: "18px",
          overflow: "hidden",
        }}
        footer={() => (
          <div
            style={{
              marginTop: 15,
              padding: "18px 22px",
              borderRadius: "18px",
              background: "linear-gradient(90deg,#2563eb,#06b6d4)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 10px 25px rgba(37,99,235,.35)",
            }}>
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "16px",
              }}>
              💰 {t("dashbord.cards.table.lt6")}
            </span>

            <span
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "20px",
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
