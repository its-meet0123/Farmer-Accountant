import { DatePicker, Form, Modal, Select } from "antd";

const SeasonModal = ({ season, setSeason, userId }) => {
  const [form] = Form.useForm();
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
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={season.openModal}
        onOk={onSubmit}
        onCancel={handleCancel}>
        <Form
          layout={"inline"}
          form={form}
          initialValues={{ layout: "inline" }}
          onValuesChange={onSubmit}
          style={{ maxWidth: "none" }}>
          <Form.Item label="UserId" name="userId" initialValue={userId} hidden>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Select Season"
            name="name"
            rules={[{ required: true, message: "Please select a role!" }]}>
            <Select placeholder="Select a season">
              <Option value="Rabi">Rabi</Option>
              <Option value="Kharif">Kharif</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Year" name="year">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Start Date" name="startDate">
            <DatePicker placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="End Date" name="endDate">
            <DatePicker placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Active" name="isActive">
            <Select placeholder="set season status">
              <Option value="true">True</Option>
              <Option value="false">False</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SeasonModal;
