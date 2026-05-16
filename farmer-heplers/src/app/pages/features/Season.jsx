import {
  Button,
  Collapse,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Select,
  Spin,
  Table,
  Typography,
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
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import AlertText from "../../component/Text";
const { Option } = Select;
const { Panel } = Collapse;
const { Text } = Typography;

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
  const [isLoanding, setIsLoanding] = useState(null);
  const [fetch, setFetch] = useState();
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
    setIsLoanding("sbl");
    if (modal.isEdit) {
      const editValues = seasonForm.getFieldsValue();
      const formattedValues = {
        ...editValues,
        startDate: new Date(editValues.startDate),
        endDate: new Date(editValues.endDate),
        year: editValues.year ? editValues.year.year() : null,
      };

      if (formattedValues.startDate > formattedValues.endDate) {
        notification.warning({
          message: t("season.modal.wm"),
          description: t("season.modal.wmd"),
          placement: "topRight",
          duration: 5,
        });
        setIsLoanding("nslf");
        return;
      }

      const { sessionId, ...values } = formattedValues;
      try {
        const res = await updateSeasonById(sessionId, values);
        const data = res.data;
        if (data.status == "success") {
          message.success(data.message);
          setIsLoanding(false);
          setSeason({ ...data.data, openModal: false });
          setFetch(data.status);
          handleCancel();
        }
      } catch (err) {
        if (err.response?.status === 409) {
          message.error(t(err.response.data.message));
          setIsLoanding("409");
          return null;
        }
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

      if (formattedValues.startDate > formattedValues.endDate) {
        notification.warning({
          message: t("season.modal.wm"),
          description: t("season.modal.wmd"),
          placement: "topRight",
        });
        setIsLoanding("nslc");
        return;
      }

      try {
        const res = await postSeason(formattedValues);
        const data = await res.data;
        if (data.status == "success") {
          message.success(data.message);
          setFetch(data.status);
          setIsLoanding(false);
          handleCancel();
        }
      } catch (err) {
        if (err.response?.status === 409) {
          message.error(t(err.response.data.message));
          setIsLoanding("409");
          return null;
        }
        console.log(err.message);
      }
    }
  };

  const editSeason = (record) => {
    setIsLoanding("ebl");
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
      setIsLoanding(false);
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
        setFetch(res.status);
      }
    } catch (err) {
      console.log(err.message);
      message.error("Season not deleted");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoanding(true);
        const res = await getAllSeason();
        const list = await res.data;
        if (list.status == "success") {
          setSeasonList(list.data);
          message.success("Season list fetched successfully");
          setIsLoanding(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [season, fetch]);

  const tableData = seasonList.map((item, index) => ({
    ...item,
    serialNo: index + 1,
  }));

  const columns = [
    {
      title: t("season.table.sntt"),
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: t("season.table.sn"),
      dataIndex: "name",
      key: "name",
      render: (name) => {
        if (name == "Rabi") {
          return t("season.modal.sort");
        }
        if (name == "Kharif") {
          return t("season.modal.sokt");
        }
        if (name == "Perennial") {
          return t("season.modal.soat");
        }
      },
    },
    {
      title: t("season.table.sy"),
      dataIndex: "year",
      key: "year",
    },
    {
      title: t("season.table.st"),
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => {
        const date = formattedDate(startDate);

        return date;
      },
    },
    {
      title: t("season.table.et"),
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => {
        const date = formattedDate(endDate);

        return date;
      },
    },
    {
      title: t("season.table.at1"),
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => {
        const today = new Date();
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);

        if (record.isActive == true) {
          return "Active Now";
        } else if (today < startDate) {
          return "Upcoming";
        } else if (today > endDate) {
          return "Expired";
        }
      },
    },
    {
      title: t("season.table.at2"),
      key: "a",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "select",
                icon:
                  season?._id == record?._id || record?.isActive ? (
                    <CheckSquareOutlined />
                  ) : (
                    <BorderOutlined />
                  ),
                onClick: () => handleSelectSeason(record),
              },
              {
                key: "3",
                label: "edit",
                icon:
                  isLoanding == "ebl" ? <LoadingOutlined /> : <EditOutlined />,
                onClick: () => editSeason(record),
              },
              {
                key: "4",
                icon: <DeleteOutlined />,
                danger: true,
                label: record?.isActive ? (
                  "not deleted"
                ) : (
                  <Popconfirm
                    title={<AlertText text={`${t("season.table.sdw")}`} />}
                    onConfirm={() => handleDeleteSeason(record)}
                    okText="Yes"
                    cancelText="No"
                    placement="left">
                    <span style={{ color: "red", cursor: "pointer" }}>
                      delete
                    </span>
                  </Popconfirm>
                ),
              },
            ],
          }}
          trigger={["click"]}>
          <Button
            type="text"
            icon={<EllipsisOutlined />}
            loading={isLoanding == "ebl"}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        title={t("season.pt")}
        extra={
          <Button
            type="primary"
            onClick={() =>
              setModal({
                isOpen: true,
                isEdit: false,
              })
            }>
            {t("season.bt")}
          </Button>
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
          <Table
            dataSource={tableData}
            columns={columns}
            rowKey="_id"
            onRow={(record) => ({
              style: {
                backgroundColor:
                  season?._id == record._id || record.isActive
                    ? "#e6f7ff"
                    : "white",
              },
            })}
          />
        )}
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
              {t("season.modal.tt1")}
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
          <Collapse
            ghost
            style={{
              marginBottom: "15px",
              background: "none",
              color: "#fff",
              borderRadius: "8px",
            }}
            expandIcon={({ isActive }) => (
              <InfoCircleOutlined spin={isActive} />
            )}>
            <Panel
              header={<Text type="secondary">{t("season.modal.fg")}</Text>}
              key="1">
              <ul
                style={{
                  paddingLeft: "15px",
                  fontSize: "13px",
                  color: "#fff",
                }}>
                <li>
                  <b>{t("season.modal.fist")}:</b> {t("season.modal.fg1")}
                </li>
                <li>
                  <b>{t("season.modal.fiyt")}:</b> {t("season.modal.fg2")}
                </li>
                <li>
                  <b>{t("season.modal.fisdt")}:</b> {t("season.modal.fg3")}
                </li>
                <li>
                  <b>{t("season.modal.fiedt")}:</b> {t("season.modal.fg4")}
                </li>
                <li>{t("season.modal.fg5")}</li>
                <li>
                  <b>{t("season.modal.fg6")}</b>
                </li>
              </ul>
            </Panel>
          </Collapse>
          <p style={{ color: "#ffffff", marginBottom: "20px" }}>
            {modal.isEdit ? t("season.modal.tt3") : t("season.modal.tt2")}
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
              label={t("season.modal.fist")}
              name="name"
              rules={[{ required: true }]}>
              <Select placeholder="Select" style={{ width: 200 }}>
                <Option value="Rabi" label={t("season.modal.sort")}>
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    {t("season.modal.sort")}
                  </span>
                  <span style={{ fontSize: "12px", color: "#ffffff" }}>
                    Dec/Jan to April/May
                  </span>
                </Option>
                <Option value="Kharif" label={t("season.modal.sokt")}>
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    {t("season.modal.sokt")}
                  </span>
                  <span style={{ fontSize: "12px", color: "#ffffff" }}>
                    May/Jun to Nov/Dec.
                  </span>
                </Option>
                <Option value="Perennial" label={t("season.modal.soat")}>
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    {t("season.modal.soat")}
                  </span>
                  <span style={{ fontSize: "12px", color: "#ffffff" }}>
                    12 Months.
                  </span>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label={t("season.modal.fiyt")} name="year">
              <DatePicker picker="year" placeholder="select year" />
            </Form.Item>

            <Form.Item label={t("season.modal.fisdt")} name="startDate">
              <DatePicker style={{ width: 130 }} format={"DD/MM/YYYY"} />
            </Form.Item>

            <Form.Item label={t("season.modal.fiedt")} name="endDate">
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
                style={{ backgroundColor: "#0499A9" }}
                loading={isLoanding === "sbl" && true}>
                {t("season.modal.fisbt")}
              </Button>
            </div>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Season;
