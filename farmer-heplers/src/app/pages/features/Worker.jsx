import { Button, Card, Flex, message, Popconfirm, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  deleteWorkerById,
  deleteWorkerTransactionById,
  getAllWorkers,
} from "../../service/worker";
import {
  Worker_List_Columns,
  Worker_Transaction_Columns,
} from "../../constant/Extracolumns";
import WorkerDrawer from "../../component/WorkerDrawer";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";
import { useNavigate } from "react-router-dom";

const WorkersData = () => {
  const [workerList, setWorkerList] = useState();
  const [worker, setWorker] = useState({});
  const [openType, setOpenType] = useState(null);
  const [fetchData, setFetchData] = useState("");
  const navigate = useNavigate();

  const calcView = (account) => {
    navigate("/worker/calc", {
      state: { id: account._id },
    });
    console.log(account._id);
  };

  const deleteWorker = async (record) => {
    if (record._id) {
      const res = await deleteWorkerById(record._id);
      if (res.status === 200) {
        message.success(res.data.message);
        setFetchData("delete");
      }
    }
  };

  const editWorkerTransaction = (record) => {
    const filltredWorker = workerList
      .map((mainObj) => ({
        ...mainObj,
        account: mainObj.account.filter((childObj) => childObj === record),
      }))
      .filter((mainObj) => mainObj.account.length > 0);
    setWorker(filltredWorker[0]);
    setOpenType("ewt");
  };

  const deleteWorkerTransaction = async (record) => {
    const filltredWorker = workerList
      .map((mainObj) => ({
        ...mainObj,
        account: mainObj.account.filter((childObj) => childObj === record),
      }))
      .filter((mainObj) => mainObj.account.length > 0);
    if (!filltredWorker || !record) {
      message.error("Worker not found from table");
    }
    const workerId = filltredWorker[0]._id;
    const accountIds = [record._id];
    if (workerId && accountIds) {
      const res = await deleteWorkerTransactionById(workerId, accountIds);
      console.log(res);
      if (res.status === 200) {
        message.success(res.data.message);
        setFetchData("deleteT");
      }
    }
  };
  useEffect(() => {
    async function getData() {
      try {
        const res = await getAllWorkers();

        const data = await res.data.data;
        setWorkerList(data);
      } catch (err) {
        message.destroy(err.message);
      }
    }
    getData();
  }, [fetchData]);

  const tableData = Array.isArray(workerList)
    ? workerList.map((item, index) => ({
        ...item,
        serialNo: index + 1,
      }))
    : [];

  const columns = [
    ...Worker_List_Columns,
    {
      title: "Action",
      dataIndex: "",
      width: 100,
      fixed: "end",
      render: (_, record) => (
        <Flex gap="small" horizontal>
          <Button
            type="link"
            icon={<FileAddOutlined />}
            onClick={() => {
              (setOpenType("at"), setWorker(record));
            }}></Button>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => calcView(record)}></Button>
          <Popconfirm
            title={
              <AlertText
                text={`Are you sure you want to delete this Worker: ${record.workerDetail.workerName.nickName}?  All associated data with that will be permanently removed `}
              />
            }
            onConfirm={() => deleteWorker(record)}
            okText="Yes"
            cancelText="No"
            placement="left">
            <Button type="link" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const ExpandedRow = (record) => {
    const transaction = record?.account || [];
    const columns = [
      ...Worker_Transaction_Columns,
      {
        title: "Action",
        dataIndex: "",
        fixed: "end",
        render: (_, record) => (
          <Flex gap="small" horizontal>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => editWorkerTransaction(record)}></Button>
            <Popconfirm
              title={`Are you sure you want to delete this Transaction? `}
              onConfirm={() => deleteWorkerTransaction(record)}
              okText="Yes"
              cancelText="No"
              placement="left">
              <Button type="link" icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Flex>
        ),
      },
    ];
    return (
      <Table
        dataSource={transaction}
        columns={columns}
        rowKey="_id"
        scroll={{ x: 200 }}
      />
    );
  };
  return (
    <>
      <Card
        title="Worker List"
        extra={
          <div style={{ marginTop: 16 }}>
            <Button
              type="primary"
              onClick={() => {
                setOpenType("aw");
              }}>
              Open
            </Button>
          </div>
        }>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          rowKey="_id"
          expandable={{
            expandedRowRender: (record) => ExpandedRow(record),
          }}
          scroll={{ x: 300 }}
        />
        <WorkerDrawer
          open={openType}
          setOpen={setOpenType}
          workerList={workerList}
          worker={worker}
          setFetchData={setFetchData}
        />
      </Card>
    </>
  );
};

export default WorkersData;
