import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { postUserDataForSignUp } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { AuthContainer } from "../../component/PageContainer";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SignUp = () => {
  const [isLoading, setIsLoanding] = useState(false);
  const [form] = Form.useForm();
  const { signupComplete, t } = useAuth();
  const navigate = useNavigate();

  const validateMessages = {
    required: t("signUpPage.formValidateMessage"),
  };

  const onFinish = async (values) => {
    setIsLoanding(true);
    console.log(values);
    if (!values) {
      message.success(t("signUpPage.formSubmitErrorText1"));
    }
    try {
      const res = await postUserDataForSignUp(values);
      const data = await res.data;
      if (data.status === "success") {
        message.success(t(data.code));
        signupComplete();
        setIsLoanding(false);
        navigate("/login");
      } else {
        message.error("user create nhi huyaa hai");
        setIsLoanding(false);
      }
    } catch (err) {
      message.error(t("signUpPage.formSubmitErrorText2"));
      console.log(err.message);
      setIsLoanding(false);
    }
  };

  return (
    <>
      <AuthContainer
        sologntext={{
          text1: t("pageContainer.supsologntext1"),
          text2: t("pageContainer.supsologntext2"),
        }}
        keytext={t("pageContainer.keytext")}
        title={t("signUpPage.cardTitle")}
        subtitle={t("signUpPage.cardSubTitle")}
        t={t}>
        <Form
          {...layout}
          name="SignUp Form"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}>
          <Form.Item
            name={["userName", "firstName"]}
            label={t("signUpPage.formUserNameInputs.firstNameText")}
            rules={[
              {
                required: true,
                message: t("signUpPage.formUserNameInputs.requiredText"),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["userName", "lastName"]}
            label={t("signUpPage.formUserNameInputs.lastNameText")}>
            <Input />
          </Form.Item>
          <Form.Item
            name="userId"
            label={t("signUpPage.formUserIdInput.text")}
            rules={[
              {
                required: true,
                message: t("signUpPage.formUserIdInput.requiredText"),
              },
              { min: 5, message: t("signUpPage.formUserIdInput.miniText") },
              { max: 15, message: t("signUpPage.formUserIdInput.maxLText") },
              {
                pattern: /^@[a-z0-9_]+$/,
                message: t("signUpPage.formUserIdInput.patternCheckText"),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("signUpPage.formPasswordInput.text")}
            rules={[
              {
                required: true,
                message: t("signUpPage.formPasswordInput.requiredText"),
              },
              { min: 6, message: "Min 6 characters" },
              {
                pattern: /^[a-z0-9]+$/,
                message: t("signUpPage.formPasswordInput.patternCheckText"),
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label={null} wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              {t("signUpPage.formSubmitButtonText")}
            </Button>
            or{" "}
            <a
              onClick={() => {
                (navigate("/login"), signupComplete());
              }}>
              {t("signUpPage.formGoToLogInButtonText")}
            </a>
          </Form.Item>
        </Form>
      </AuthContainer>
    </>
  );
};

export default SignUp;
