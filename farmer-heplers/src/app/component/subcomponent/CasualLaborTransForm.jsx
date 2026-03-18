import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Spin,
} from "antd";
import { useState } from "react";
import { addTransactionForFieldWorker } from "../../service/other";

const LaborTransForm = ({ form, openType }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    if (openType === "transAdd") {
      setButtonLoading(true);
      const formValues = form.getFieldsValue();
      const { laborId, ...restOfformValues } = formValues;

      const res = await addTransactionForFieldWorker(laborId, restOfformValues);
      const data = await res.data;

      if (data.status === "Success") {
        message.success(data.Code);
        setButtonLoading(false);
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
          (openType === "transAdd" && "Add Transaction") ||
          (openType === "trnasEdit" && "Edit Transaction")
        }
        form={form}
        style={{ maxWidth: 800 }}
        labelCol={100}
        wrapperCol={150}
        onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item label="Labor ID" name="laborId" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="startDate">
            <DatePicker format={"DD/MM/YYYY"} />
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
