import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const modalBackground = `
    radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
    radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
  `;

const SeasonModal = ({ season, setSeason, userId }) => {
  const [form] = Form.useForm();
  const now = dayjs();
  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log("Season values :", values);
  };
  const handleCancel = () => {
    setSeason({
      data: season.data,
      openModal: false,
    });
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
              Season Modal
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
          <p style={{ color: "#475569", marginBottom: "20px" }}>
            Configure your seasonal settings below.
          </p>

          <Form
            layout="inline"
            form={form}
            onFinish={onSubmit}
            style={{ gap: "15px" }} // Spacing maintain karne ke liye
          >
            <Form.Item name="userId" hidden>
              <Input />
            </Form.Item>

            <Form.Item
              label="Select Season"
              name="name"
              rules={[{ required: true }]}>
              <Select placeholder="Select" style={{ width: 120 }}>
                <Option value="Rabi" label="Rabi">
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Rabi
                  </span>
                  <span style={{ fontSize: "12px", color: "#475569" }}>
                    Dec/Jan to April/May
                  </span>
                </Option>
                <Option value="Kharif" label="Kharif">
                  <span style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Kharif
                  </span>
                  <span style={{ fontSize: "12px", color: "#475569" }}>
                    May/Jun to Nov/Dec.
                  </span>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item label="Year" name="year" initialValue={now.year()}>
              <DatePicker picker="year" placeholder="select year" />
            </Form.Item>

            <Form.Item label="Start" name="startDate" initialValue={now.date()}>
              <DatePicker style={{ width: 130 }} format={"DD/MM/YYYY"} />
            </Form.Item>

            <Form.Item label="End" name="endDate">
              <DatePicker style={{ width: 130 }} format={"DD/MM/YYYY"} />
            </Form.Item>

            <Form.Item label="Status" name="isActive">
              <Select style={{ width: 100 }}>
                <Option value="true">Active</Option>
                <Option value="false">Inactive</Option>
              </Select>
            </Form.Item>

            {/* Submit button wrapper */}
            <div
              style={{ marginTop: "20px", width: "100%", textAlign: "right" }}>
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

export default SeasonModal;
