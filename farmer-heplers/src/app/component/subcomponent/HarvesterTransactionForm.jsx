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
import { useAuth } from "../../auth/AuthContext";

const HarvesterTransactionForm = ({
  form,
  openType,
  harvesterDetails,
  setFetch,
  onClose,
}) => {
  const { authState, t } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    if (openType === "transAdd") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const { harvesterId, ...restOfformValues } = formValues;

        // TODO: Replace with actual API call
        // const res = await addTransactionForHarvester(
        //   harvesterId,
        //   restOfformValues,
        // );
        // const data = await res.data;

        // if (data.status === "Success") {
        //   message.success(data.Code);
        //   setButtonLoading(false);
        //   setFetch(data.harvester);
        // }

        message.info("API endpoint not yet implemented");
        setButtonLoading(false);
      } catch (err) {
        message.error("Harvester transaction not added");
        console.log(err.message);
      }
    }

    if (openType === "transEdit") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const { harvesterId, transId, ...restOfformValues } = formValues;
        const ids = { harvesterId: harvesterId, transactionId: transId };

        // TODO: Replace with actual API call
        // const res = await updateHarvesterTransaction(ids, restOfformValues);
        // const data = await res.data;
        // if (data.status === "Success") {
        //   message.success(data.Code);
        //   setButtonLoading(false);
        //   setFetch(data.harvesterTrans);
        // }

        message.info("API endpoint not yet implemented");
        setButtonLoading(false);
      } catch (err) {
        console.log(err.message);
        message.error("Harvester transaction not updated");
      }
    }
    form.resetFields();
  };

  return (
    <>
      <Form
        layout="inline"
        name={
          (openType === "transAdd" && "Add Transaction") ||
          (openType === "transEdit" && "Edit Transaction")
        }
        form={form}
        style={{ maxWidth: 800 }}
        labelCol={100}
        wrapperCol={150}
        onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item label="Harvester ID" name="harvesterId" hidden>
            <Input />
          </Form.Item>

          <Form.Item label="Trans ID" name="transId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter amount" }]}>
            <InputNumber placeholder="Enter amount" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select date" }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={buttonLoading}>
              {buttonLoading ? (
                <Spin indicator={<LoadingOutlined />} />
              ) : (
                t?.submit || "Submit"
              )}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default HarvesterTransactionForm;
