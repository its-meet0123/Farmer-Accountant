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
      value: data?.totalOfSeddsAndFertilizer,
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
    },
    {
      dataIndex: "value",
      key: "value",
    },
  ];
  return <Table dataSource={dataSource} columns={columns} rowKey="no" />;
};

export default Expense;
