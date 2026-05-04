import {
  Button,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import {
  deleteSeason,
  getAllSeason,
  postSeason,
  updateSeasonById,
} from "../../service/season";
import { PageContainer } from "../../component/PageContainer";
import { useAuth } from "../../auth/AuthContext";

import dayjs from "dayjs";
import {
  BorderOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";
const { Option } = Select;

const formattedDate = (date) => {
  const rawDate = date ? new Date(date) : new Date();
  const DateTimeFormat = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(rawDate);

  return DateTimeFormat;
};

const modalBackground = `
    radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
    radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
  `;

const Season = () => {
  const { authState, t, season, setSeason } = useAuth();
  const [seasonList, setSeasonList] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    isEdit: false,
    isSelect: false,
  });
  const [seasonForm] = Form.useForm();

  const handleCancel = () => {
    setModal({
      isOpen: false,
    });
    seasonForm.resetFields();
  };

  const onSubmit = async () => {
    if (modal.isEdit) {
      const editValues = seasonForm.getFieldsValue();
      const formattedValues = {
        ...editValues,
        startDate: new Date(editValues.startDate),
        endDate: new Date(editValues.endDate),
        year: editValues.year ? editValues.year.year() : null,
      };

      const { sessionId, ...values } = formattedValues;

      console.log("edit season values from season form :", sessionId, values);
      try {
        const res = await updateSeasonById(sessionId, values);
        const data = res.data;
        if (data.status == "success") {
          message.success(data.message);
          setSeason({ ...data.data, openModal: false });
          handleCancel();
        }
      } catch (err) {
        console.log(err.message);
        message.error("Season not created");
      }
    }

    if (!modal.isEdit) {
      const values = seasonForm.getFieldsValue();
      const formattedValues = {
        ...values,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        year: values.year ? values.year.year() : null,
        userId: authState.user.userId,
      };

      console.log("add season value from season form :", formattedValues);

      try {
        const res = postSeason(formattedValues);
        const data = res.data;
        if (data.status === "success") {
          message.success(data.message);
          handleCancel();
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const editSeason = (record) => {
    const year = dayjs(record?.year);
    const startDate = dayjs(record?.startDate);
    const endDate = dayjs(record?.endDate);

    seasonForm.setFieldsValue({
      sessionId: record?._id,
      name: record?.name,
      year: year,
      startDate: startDate,
      endDate: endDate,
    });

    console.log("in season page :", record, "year :", year);

    setTimeout(() => {
      setModal({
        isOpen: true,
        isEdit: true,
      });
    }, 1000);
  };

  const handleSelectSeason = (record) => {
    setModal({
      isSelect: true,
    });
    setSeason({
      ...record,
      openModal: false,
    });
  };

  const handleDeleteSeason = async (record) => {
    try {
      const res = await deleteSeason(record?._id);
      const seasondata = res.data;
      if (seasondata.status === "success") {
        message.success(seasondata.message);
      }
    } catch (err) {
      console.log(err.message);
      message.error("Season not deleted");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllSeason();
        const list = await res.data;
        if (list.status == "success") {
          setSeasonList(list.data);
          message.success("Season list fetched successfully");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [season]);

  const tableData = seasonList.map((item, index) => ({
    ...item,
    serialNo: index + 1,
  }));

  const columns = [
    {
      title: "S.No.",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => {
        const date = formattedDate(startDate);

        return date;
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => {
        const date = formattedDate(endDate);

        return date;
      },
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => {
        const today = new Date();
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);

        if (today >= startDate && today <= endDate) {
          return "Active Now";
        } else if (today < startDate) {
          return "Upcoming";
        } else if (today > endDate) {
          return "Expired";
        }
      },
    },
    {
      title: "Action",
      key: "a",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "select",
                icon: modal.isSelect ? (
                  <CheckSquareOutlined />
                ) : (
                  <BorderOutlined />
                ),
                onClick: () => handleSelectSeason(record),
              },
              // {
              //   key: "2",
              //   label: "view",
              //   icon: <StopOutlined />,
              //   onClick: () => calcView(record),
              // },
              {
                key: "3",
                label: "edit",
                icon: <EditOutlined />,
                onClick: () => editSeason(record),
              },
              {
                key: "4",
                icon: <DeleteOutlined />,
                danger: true,
                label: (
                  <Popconfirm
                    title={
                      <AlertText
                        text={`${t("workerPage.tableColumns.actionPopAlertText")}`}
                      />
                    }
                    onConfirm={() => handleDeleteSeason(record)}
                    okText="Yes"
                    cancelText="No"
                    placement="left">
                    delete
                  </Popconfirm>
                ),
              },
            ],
          }}
          trigger={["click"]}>
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        title="Season List"
        extra={
          <Button
            type="primary"
            onClick={() =>
              setModal({
                isOpen: true,
                isEdit: false,
              })
            }>
            Add season
          </Button>
        }>
        <Table dataSource={tableData} columns={columns} rowKey="_id" />
      </PageContainer>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              headerBg: "transparent", // Header background clear rakha hai gradient dikhne ke liye
              contentBg: "#023F55", // Gradient ka dominant base color fallback ke liye
              titleColor: "#0F172A", // Aapka specific title color
            },
            Form: {
              labelColor: "#FFFFFF", // Saara label white
            },
            Input: {
              colorText: "#FFFFFF",
              colorBgContainer: "rgba(255, 255, 255, 0.05)", // Subtle transparent look
              colorTextPlaceholder: "#475569", // Subtitle color as placeholder
            },
            Select: {
              colorText: "#FFFFFF",
              colorBgContainer: "rgba(255, 255, 255, 0.05)",
              colorBgElevated: "#023F55", // Dropdown ka background
            },
          },
        }}>
        <Modal
          title={
            <span style={{ color: "#0F172A", fontWeight: "bold" }}>
              Season Modal
            </span>
          }
          open={modal.isOpen || modal.isEdit}
          onOk={onSubmit}
          onCancel={handleCancel}
          styles={{
            content: {
              backgroundImage: modalBackground,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#FFFFFF",
            },
            header: {
              marginBottom: "20px",
              borderBottom: "1px solid rgba(15, 23, 42, 0.1)",
            },
          }}
          width={800} // Inline layout ke liye width thodi zyada rakhi hai
        >
          <p style={{ color: "#ffffff", marginBottom: "20px" }}>
            Configure your seasonal settings below.
          </p>
          <Form
            layout="inline"
            form={seasonForm}
            onFinish={onSubmit}
            style={{ gap: "15px" }} // Spacing maintain karne ke liye
          >
            {modal.isEdit && (
              <Form.Item name="sessionId" hidden>
                <Input />
              </Form.Item>
            )}

            <Form.Item
              label="Select Season"
              name="name"
              rules={[{ required: true }]}>
              <Select placeholder="Select" style={{ width: 200 }}>
                <Option value="Rabi" label="Rabi">
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Rabi
                  </span>
                  <span style={{ fontSize: "12px", color: "#ffffff" }}>
                    Dec/Jan to April/May
                  </span>
                </Option>
                <Option value="Kharif" label="Kharif">
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Kharif
                  </span>
                  <span style={{ fontSize: "12px", color: "#ffffff" }}>
                    May/Jun to Nov/Dec.
                  </span>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label="Year" name="year">
              <DatePicker picker="year" placeholder="select year" />
            </Form.Item>

            <Form.Item label="Start" name="startDate">
              <DatePicker style={{ width: 130 }} format={"DD/MM/YYYY"} />
            </Form.Item>

            <Form.Item label="End" name="endDate">
              <DatePicker style={{ width: 130 }} format={"DD/MM/YYYY"} />
            </Form.Item>

            {/* <Form.Item label="Status" name="isActive">
              <Select style={{ width: 100 }}>
                <Option value="true">Active</Option>
                <Option value="false">Inactive</Option>
              </Select>
            </Form.Item> */}

            {/* Submit button wrapper */}
            <div
              style={{
                marginTop: "20px",
                width: "100%",
                textAlign: "right",
              }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#0499A9" }}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Season;
