import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input, message, Modal, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  changeUserPassword,
  deleteUserAccount,
  getUserData,
} from "../service/auth";

const UserActionModel = ({ openType, setOpenType, user, logout }) => {
  const [passwordForm] = Form.useForm();
  const [deleteForm] = Form.useForm();
  const [findUser, setfindUser] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (res) => {
    if (res.status === "success") {
      messageApi.open({
        type: "success",
        content: res.message,
        duration: 3,
      });
    }

    if (res.status === "fail") {
      messageApi.open({
        type: "error",
        content: res.message,
        duration: 3,
      });
    }
  };

  const setUser = async () => {
    const userId = { id: passwordForm.getFieldValue("userId") };
    console.log(userId);
    if (userId.id) {
      const res = await getUserData(userId);

      setfindUser({ userId: userId, user: res.data.user });
      showMessage(res.data);
    } else {
      const res = {
        status: "fail",
        message: "Please enter valid user Id",
      };
      showMessage(res);
    }
  };

  const setPassword = async () => {
    const userPassword = passwordForm.getFieldValue("password");
    const length = userPassword[0].again.length;
    console.log(userPassword, length);

    if (length >= 6 && userPassword[0].once === userPassword[0].again) {
      const user = {
        userId: findUser.user.userId,
        newPassword: userPassword[0].again,
      };
      const res = await changeUserPassword(user);
      if (res.status === 200) {
        showMessage(res.data);
        passwordForm.resetFields();
        setOpenType(null);
      }
    }
    if (length < 6 || userPassword[0].once !== userPassword[0].again) {
      const res = {
        status: "fail",
        message:
          length < 6
            ? "Password must be at least 6 characters."
            : "Passwords do not match.",
      };
      showMessage(res);
    }
  };

  const deleteUser = async () => {
    const formValues = deleteForm.getFieldsValue();
    if (formValues) {
      const user = {
        userId: formValues.userId,
        password: formValues.password,
      };
      console.log(user);
      const res = await deleteUserAccount(user);
      console.log(res);
      if (res.status === 200) {
        message.warning(res.data.message);
        setOpenType(null);
        logout();
      }
    }
  };

  const onFinish = async () => {
    if (openType === "password") {
      setPassword();
    }

    if (openType === "delete") {
      deleteUser();
    }
  };
  useEffect(() => {
    deleteForm.setFieldsValue({
      userId: user?.userId || "",
      password: user?.password || "",
    });
  }, [user]);
  return (
    <>
      {contextHolder}
      <Modal
        title={
          (openType === "password" && <h4>Reset Password</h4>) ||
          (openType === "delete" && (
            <h4 style={{ color: "red" }}>Press "Ok" to confirm ID deletion!</h4>
          ))
        }
        centered
        open={openType !== null}
        onOk={() => onFinish()}
        onCancel={() => setOpenType(null)}>
        {openType === "password" && (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            form={passwordForm}
            name="dynamic_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ password: [{}] }}>
            <Form.Item
              label="UserId"
              name="userId"
              rules={[
                { required: true },
                { min: 6, message: "please enter valid userId" },
              ]}>
              <Input placeholder="Enter User Id" />
            </Form.Item>
            {findUser.userId && findUser.user && (
              <Form.List name="password">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}>
                    {fields.map(({ key, name, ...resetField }) => (
                      <Flex
                        key={key}
                        gap="small"
                        vertical
                        style={{ width: "auto" }}>
                        <Form.Item
                          {...resetField}
                          label="New Password"
                          name={[name, "once"]}
                          rules={[
                            {
                              required: true,
                              min: 6,
                              message: "Min 6 characters",
                            },
                          ]}>
                          <Input.Password placeholder="Enter password" />
                        </Form.Item>
                        <Form.Item
                          {...resetField}
                          label="Confirm Password"
                          name={[name, "again"]}
                          rules={[
                            {
                              required: true,
                              min: 6,
                              message: "Min 6 characters",
                            },
                          ]}>
                          <Input.Password placeholder="Enter again password" />
                        </Form.Item>
                      </Flex>
                    ))}
                  </div>
                )}
              </Form.List>
            )}
            <Form.Item label={null}>
              {!findUser.user && (
                <Button
                  type="primary"
                  onClick={() => {
                    setUser();
                  }}
                  block>
                  find
                </Button>
              )}
            </Form.Item>
          </Form>
        )}
        {openType === "delete" && (
          <Form
            name="basic"
            form={deleteForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="UserId"
              name="userId"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}>
              <Input.Password />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UserActionModel;
