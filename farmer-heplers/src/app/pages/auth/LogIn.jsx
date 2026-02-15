import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, message } from "antd";
import { postUserDataForLoggedIn } from "../../service/auth";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import UserActionModel from "../../component/UserIdActionModel";
const LogIn = () => {
  const { loginComplete, setIsSignedUp } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [openType, setOpenType] = useState(null);

  const showError = (text) => {
    messageApi.open({
      type: "error",
      content: text,
      duration: 3,
    });
  };

  const goToSignUP = () => {
    setIsSignedUp(false);
    navigate("/signup");
  };

  const setPassword = () => {
    setOpenType("password");
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await postUserDataForLoggedIn(values);
      const data = await res.data;
      if (data.status === "success") {
        loginComplete(data);
        message.success(data.message);
      } else {
      }
    } catch (err) {
      const text = "Data not fetching for loggedIn";
      showError(text);
      console.log(err.message);
    }
  };
  return (
    <>
      {contextHolder}
      <Card title="LogIn Form">
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}>
          <Form.Item
            name="userId"
            rules={[
              { required: true, message: "Please input your ID!" },
              { min: 5, message: "Please enter valid userId" },
              { max: 15, message: "Please enter valid userId" },
            ]}>
            <Input prefix={<UserOutlined />} placeholder="User ID" allowClear />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
              { min: 6, message: "Please enter vailed password" },
            ]}>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <a onClick={() => setPassword()}>Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a onClick={() => goToSignUP()}>Sign Up!</a>
          </Form.Item>
        </Form>
      </Card>
      <UserActionModel openType={openType} setOpenType={setOpenType} />
    </>
  );
};
export default LogIn;
