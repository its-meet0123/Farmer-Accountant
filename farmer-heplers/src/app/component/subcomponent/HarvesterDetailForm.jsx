import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Row, Spin } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { postHarvestData } from "../../service/other";

const HarvesterDetailForm = ({ form, openType, setFetch, onClose }) => {
  const { authState, t } = useAuth();
  const today = dayjs();
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    setButtonLoading(true);
    if (openType === "addDetial") {
      const formValues = form.getFieldsValue();
      console.log("all values", formValues);
      const { harvesterId, ...restOfFormValues } = formValues;
      const harvesterDetails = {
        ...restOfFormValues,
        userId: authState.user.userId,
      };
      try {
        const res = await postHarvestData(harvesterDetails);
        const data = await res.data;

        if (data.status === "Success") {
          message.success(data.Code);
          setFetch(data.data);
          setButtonLoading(false);
          onClose();
        }
      } catch (err) {
        console.log(err.message);
        message.error("Harvester Details not posted");
      }
    }
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
        initialValues={{ vehicalDetails: [" "], transactions: [] }}>
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
