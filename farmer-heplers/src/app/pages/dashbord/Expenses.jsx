import { Table } from "antd";

const Expense = ({ data }) => {
  const dataSource = [
    {
      no: "1",
      label: "Faul",
      value: data?.totalOfDiesel,
    },
    {
      no: "2",
      label: "Seeds & Fertilizer",
      value: data?.totalOfSeedsAndFertilizer,
    },
    {
      no: "3",
      label: "Permanent Worker",
      value: data?.totalOfPermanentWorker,
    },
    {
      no: "4",
      label: "Machinery",
      value: data?.totalOfHarvest,
    },
    {
      no: "5",
      label: "Casual Labor",
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
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="no"
      pagination={false}
      style={{ background: "none" }}
      rowClassName="transparent-row"
    />
  );
};

export default Expense;
