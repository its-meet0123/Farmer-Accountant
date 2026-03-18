import { LoadingOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Row, Spin } from "antd";
import { useState } from "react";

const LaborTransForm = ({ form, openType }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    const formValues = form.getFieldsValue();
    console.log(formValues);
  };

  return (
    <>
      <Form
        layout="inline"
        name={
          (openType === "transAdd" && "Add Transaction") ||
          (openType === "trnasEdit" && "Edit Transaction")
        }
        form={form}
        style={{ maxWidth: 800 }}
        labelCol={100}
        wrapperCol={150}
        onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item label="Date" name="startDate">
            <DatePicker />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label="Wages/D" name="salary">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Duration" name="duration">
            <InputNumber />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label="Pay" name="pay">
            <InputNumber />
          </Form.Item>
          <Form.Item label="PaymentType" name="transType">
            <Input />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label="Hand Over" name="handOver">
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

export default LaborTransForm;
