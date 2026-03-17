import { Button, DatePicker, Form, Input, message, Row } from "antd";
import { useAuth } from "../../auth/AuthContext";
import { postFieldWorkerData } from "../../service/other";

const CasualLaborAddForm = ({ form }) => {
  const { authState } = useAuth();

  const onFinish = () => {
    const formValues = form.getFieldsValue();

    const laberDetails = {
      ...formValues,
      userId: authState.user.userId,
    };
    console.log(laberDetails);
    const response = postFieldWorkerData(laberDetails);
    const data = response.data;
    message.success(data.Code);
  };

  return (
    <>
      <Form
        layout="inline"
        name="basic"
        form={form}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item label="Date" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Nick Name" name="nickName">
            <Input />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter name of labor" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label="Contact" name="contact">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label="Id Proof" name="idProof">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default CasualLaborAddForm;
