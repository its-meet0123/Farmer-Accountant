import {
  Button,
  Collapse,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { postSeason } from "../service/season";
import { useAuth } from "./AuthContext";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;
const { Panel } = Collapse;
const { Text } = Typography;

const modalBackground = `
    radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
    radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
  `;

const SeasonModal = ({ season, setSeason, userId }) => {
  const [form] = Form.useForm();
  const { t } = useAuth();
  const today = dayjs();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setSeason({
      ...(season?.data || null),
      openModal: false,
    });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const values = form.getFieldsValue();
    const formattedValues = {
      ...values,
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
      year: values.year ? values.year.year() : null,
    };

    if (formattedValues.startDate > formattedValues.endDate) {
      notification.warning({
        message: t("season.modal.wm"),
        description: t("season.modal.wmd"),
        placement: "topRight",
        duration: 5,
      });
      setIsLoading("nslc");
      return;
    }

    try {
      const res = await postSeason(formattedValues);
      const data = res.data;
      if (data.status == "success") {
        message.success(data.message);
        setSeason({ ...data.data, openModal: false });
        setIsLoading(false);
        handleCancel();
      }
    } catch (err) {
      console.log(err.message);
      message.error("Season not created");
      setIsLoading(false);
    }
  };

  return (
    <>
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
          open={season.openModal}
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
              </ul>
            </Panel>
          </Collapse>

          <p style={{ color: "#fff", marginBottom: "20px" }}>
            {t("season.modal.tt2")}dddd
          </p>

          <Form
            layout="inline"
            form={form}
            onFinish={onSubmit}
            style={{ gap: "15px" }} // Spacing maintain karne ke liye
          >
            {userId && (
              <Form.Item name="userId" initialValue={userId} hidden>
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
                  <span style={{ fontSize: "12px", color: "#fff" }}>
                    Dec/Jan to April/May
                  </span>
                </Option>
                <Option value="Kharif" label={t("season.modal.sokt")}>
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    {t("season.modal.sokt")}
                  </span>
                  <span style={{ fontSize: "12px", color: "#fff" }}>
                    May/Jun to Nov/Dec.
                  </span>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={t("season.modal.fiyt")}
              name="year"
              initialValue={today}
              rules={[{ required: true }]}>
              <DatePicker picker="year" placeholder="select year" />
            </Form.Item>

            <Form.Item
              label={t("season.modal.fisdt")}
              name="startDate"
              initialValue={today}
              rules={[{ required: true }]}>
              <DatePicker style={{ width: 130 }} format={"DD/MM/YYYY"} />
            </Form.Item>

            <Form.Item
              label={t("season.modal.fiedt")}
              name="endDate"
              rules={[{ required: true }]}>
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
                loading={isLoading}>
                {t("season.modal.fisbt")}
              </Button>
            </div>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default SeasonModal;
