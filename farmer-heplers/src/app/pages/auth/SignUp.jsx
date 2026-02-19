import React from "react";
import { Button, Card, Form, Input, message } from "antd";
import { postUserDataForSignUp } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import LanguageChangeDropDown from "../../component/LanguageChangeDropdown";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SignUp = () => {
  const [form] = Form.useForm();
  const { signupComplete, t } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccess = (text, type) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 3,
    });
  };

  const validateMessages = {
    required: t("signUpPage.formValidateMessage"),
  };

  const onFinish = async (values) => {
    console.log(values);
    if (!values) {
      const type = "error";
      const text = `${t("signUpPage.formSubmitErrorText1")}`;
      showSuccess(text, type);
    }
    try {
      const res = await postUserDataForSignUp(values);
      const data = await res.data;
      if (data.status === "success") {
        const type = "success";
        const text = data.message;
        showSuccess(text, type);
        signupComplete();
        navigate("/login");
      }
    } catch (err) {
      const type = "error";
      const text = `${t("signUpPage.formSubmitErrorText2")}`;
      showSuccess(text, type);
      console.log(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <Card
        title={t("signUpPage.cardTitle")}
        extra={<LanguageChangeDropDown />}>
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
          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
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
      </Card>
    </>
  );
};

export default SignUp;
