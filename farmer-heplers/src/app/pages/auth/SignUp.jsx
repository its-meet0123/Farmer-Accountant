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

  const showSuccess = (text, type) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 3,
    });
  };

  const onFinish = async (values) => {
    console.log(values);
    if (!values) {
      const type = "error";
      const text = "Values not defined";
      showSuccess(text, type);
    }
    try {
      const res = await postUserDataForSignUp(values);
      const data = await res.data;
      if (data.status === "success") {
        const type = "success";
        const text = data.message;
        showSuccess(text, type);
      }
    } catch (err) {
      const type = "error";
      const text = "User data not posted";
      showSuccess(text, type);
      console.log(err.message);
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
            rules={[{ required: true, message: "User name is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name={["userName", "lastName"]} label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="userId"
            label="User Id"
            rules={[
              { required: true, message: "Please create your userId" },
              { min: 5, message: "Min 5 characters" },
              { max: 15, message: "Max 15 characters" },
              {
                pattern: /^@[a-z0-9_]+$/,
                message: "Start with [@...] and Lowercase letters only",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please set your password" },
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
