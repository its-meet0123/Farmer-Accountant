import { Button, DatePicker, Form, Input, message, Row } from "antd";
import { useAuth } from "../../auth/AuthContext";
import { postFieldWorkerData } from "../../service/other";
import dayjs from "dayjs";

const CasualLaborAddForm = ({ form }) => {
  const { authState } = useAuth();
  const today = dayjs();

  const onFinish = async () => {
    const formValues = form.getFieldsValue();
    console.log(formValues);
    const laberDetails = {
      ...formValues,
      userId: authState.user.userId,
      transactions: [],
    };
    console.log(laberDetails);
    // const response = await postFieldWorkerData(laberDetails);
    // const data = await response.data;
    // message.success(data.Code);
  };

  return (
    <>
      <Form
        layout="inline"
        name="basic"
        form={form}
        style={{ maxWidth: 800 }}
        labelCol={100}
        wrapperCol={150}
        onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item label="Date" name="date" initialValue={today}>
            <DatePicker format="DD/MM/YYYY" />
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
          <Form.Item label="Transactions" name="transactions" hidden>
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
