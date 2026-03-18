import { Button, DatePicker, Form, Input, message, Row, Spin } from "antd";
import { useAuth } from "../../auth/AuthContext";
import {
  postFieldWorkerData,
  updateFieldWorkerData,
} from "../../service/other";
import dayjs from "dayjs";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const CasualLaborAddForm = ({ form, openType, setFetch, onClose }) => {
  const { authState } = useAuth();
  const today = dayjs();
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    if (openType === "laborAdd") {
      setButtonLoading(true);
      const formValues = form.getFieldsValue();
      const laberDetails = {
        ...formValues,
        userId: authState.user.userId,
        transactions: [],
      };
      const response = await postFieldWorkerData(laberDetails);
      const data = await response.data;

      if (data.status === "Success") {
        setFetch(data.worker);
        message.success(data.Code);
        setButtonLoading(false);
        onClose();
      } else {
        message.error(data.Code);
      }
    }
    if (openType === "laborEdit") {
      setButtonLoading(true);
      const formValues = form.getFieldsValue();
      console.log(formValues);
      const { laborId, ...restOfformValues } = formValues;
      const updateLaborDetails = {
        ...restOfformValues,
      };
      console.log(updateLaborDetails);
      const res = await updateFieldWorkerData(laborId, updateLaborDetails);
      const data = await res.data;

      if (data.status === "Success") {
        setFetch(data.worker);
        message.success(data.Code);
        setButtonLoading(false);
        onClose();
      } else {
        message.error(data.Code);
      }
    }
  };

  return (
    <>
      <Form
        layout="inline"
        name={
          (openType === "laborAdd" && "Add") ||
          (openType === "laborEdit" && "Edit")
        }
        form={form}
        style={{ maxWidth: 800 }}
        labelCol={100}
        wrapperCol={150}
        onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item label="ID" name="laborId" hidden>
            <Input />
          </Form.Item>
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
            Submit{" "}
            {buttonLoading && (
              <Spin
                indicator={<LoadingOutlined spin />}
                size="small"
                style={{ color: "#fff" }}
              />
            )}
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default CasualLaborAddForm;
