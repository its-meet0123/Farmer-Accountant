import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const HarvesterDetailForm = ({ form, openType, setFetch, onClose }) => {
  const { authState } = useAuth();
  const today = dayjs();
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    const formValues = form.getFieldsValue();
    console.log("harvest detail fields :", formValues);
  };

  return (
    <>
      <Form
        layout="inline"
        name={
          (openType === "addDetail" && "Add") ||
          (openType === "editDetail" && "Edit")
        }
        form={form}
        style={{ maxWidth: 800 }}
        labelCol={100}
        wrapperCol={150}
        onFinish={onFinish}
        initialValues={{ vehicalDetails: [" "] }}>
        <Row gutter={24}>
          <Form.Item label="ID" name="harvesterId" hidden>
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
          <Form.List name="vehicalDetails">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Row gutter={24} key={key}>
                    <Form.Item
                      label={t("harvest.fl.vn")}
                      name={[name, "vehicalNumber"]}>
                      <Input placeholder="Number of Vehical" />
                    </Form.Item>

                    <Form.Item
                      label={t("harvest.fl.vt")}
                      name={[name, "vehicalType"]}>
                      <Input placeholder="Type of Vehical" />
                    </Form.Item>

                    <Form.Item
                      label={t("harvest.fl.vid")}
                      name={[name, "vehicalID"]}>
                      <Input placeholder="Vehical ID" />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{ margin: "1rem" }}
                    />
                  </Row>
                ))}
                <PlusCircleOutlined onClick={() => add()} />
              </>
            )}
          </Form.List>
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

export default HarvesterDetailForm;
