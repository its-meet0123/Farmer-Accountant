import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message } from "antd";
import { postUserDataForLoggedIn } from "../../service/auth";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import UserActionModel from "../../component/UserIdActionModel";
import { AuthContainer } from "../../component/PageContainer";

const LogIn = () => {
  const { loginComplete, setIsSignedUp, t } = useAuth();
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
        message.success(t(data.code));
      }
    } catch (err) {
      const text = `${t("loginPage.formSubmitErrorText")}`;
      showError(text);
      console.log(err.message);
    }
  };
  return (
    <>
      <AuthContainer
        sologntext={{
          text1: t("pageContainer.logsologntext1"),
          text2: t("pageContainer.logsologntext2"),
        }}
        keytext={t("pageContainer.keytext2")}
        title={t("loginPage.cardTitle")}
        subtitle={t("loginPage.cardSubTitle")}
        t={t}>
        {contextHolder}
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}>
          <Form.Item
            name="userId"
            rules={[
              {
                required: true,
                message: t("loginPage.formUserIdInput.requiredText"),
              },
              { min: 5, message: t("loginPage.formUserIdInput.checkText") },
              { max: 15, message: t("loginPage.formUserIdInput.checkText") },
            ]}>
            <Input
              prefix={<UserOutlined />}
              placeholder={t("loginPage.formUserIdInput.text")}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("loginPage.formPasswordInput.requiredText"),
              },
              { min: 6, message: t("loginPage.formPasswordInput.checkText") },
            ]}>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder={t("loginPage.formPasswordInput.text")}
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <a onClick={() => setPassword()}>
                {t("loginPage.formForgotPasswordButtonText")}
              </a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              {t("loginPage.formSubmitButtonText")}
            </Button>
            or{" "}
            <a onClick={() => goToSignUP()}>
              {t("loginPage.formGoToSignUpButtonText")}
            </a>
          </Form.Item>
        </Form>
      </AuthContainer>
      <UserActionModel openType={openType} setOpenType={setOpenType} t={t} />
    </>
  );
};
export default LogIn;
