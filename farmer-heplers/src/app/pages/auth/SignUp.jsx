import React from "react";
import { Button, Card, Form, Input, message } from "antd";
import { postUserDataForSignUp } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "${label} is required!",
};

const SignUp = () => {
  const [form] = Form.useForm();
  const { signupComplete } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccess = (text) => {
    messageApi.open({
      type: "success",
      content: text,
      duration: 3,
    });
  };

  const onFinish = async (values) => {
    console.log(values);
    if (!values) {
      const text = "Values not defined";
      showSuccess(text);
    }
    const res = await postUserDataForSignUp(values);
    const data = await res.data;

    if (!res) {
      const text = "Data not fetching";
      showSuccess(text);
    }
    if (data.status === "success") {
      signupComplete();
      navigate("/login");
      message.success(data.message);
    }
  };

  return (
    <>
      {contextHolder}
      <Card title="SignUp Form">
        <Form
          {...layout}
          name="SignUp Form"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}>
          <Form.Item
            name={["userName", "firstName"]}
            label="First Name"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={["userName", "lastName"]} label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="userId"
            label="User Id"
            rules={[
              { required: true },
              { min: 5, message: "Min 5 characters" },
              { max: 15, message: "Max 15 characters" },
              {
                pattern: /^@[a-z0-9_]+$/,
                message: "Lowercase letters only",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true },
              { min: 6, message: "Min 6 characters" },
              {
                pattern: /^[a-z0-9]+$/,
                message: "Lowercase letters only",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
            or{" "}
            <a
              onClick={() => {
                (navigate("/login"), signupComplete());
              }}>
              Log In
            </a>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SignUp;
