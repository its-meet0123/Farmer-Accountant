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
  Radio,
} from "antd";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { addTransactionForHarvestData } from "../../service/other";

const HarvesterTransactionForm = ({
  form,
  openType,
  harvesterList,
  setFetch,
  onClose,
}) => {
  const { authState, t } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [baseOfRate, setBaseOfRate] = useState("duration");
  const options = [
    { label: "Duration", value: "duration" },
    { label: "Measurement", value: "measurment" },
  ];

  const onFinish = async () => {
    if (openType === "addTrans") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const { harvesterId, ...restOfformValues } = formValues;
        console.log("harvester trans form values", formValues);

        const res = await addTransactionForHarvestData(
          harvesterId,
          restOfformValues,
        );
        const data = await res.data;

        if (data.status === "Success") {
          message.success(data.Code);
          setButtonLoading(false);
          setFetch(data.data);
        }

        message.success(data.Code);
        setButtonLoading(false);
      } catch (err) {
        message.error("Harvester transaction not added");
        console.log(err.message);
      }
    }

    // if (openType === "editTrans") {
    //   try {
    //     setButtonLoading(true);
    //     const formValues = form.getFieldsValue();
    //     const { harvesterId, transId, ...restOfformValues } = formValues;
    //     const ids = { harvesterId: harvesterId, transactionId: transId };

    //     // TODO: Replace with actual API call
    //     // const res = await updateHarvesterTransaction(ids, restOfformValues);
    //     // const data = await res.data;
    //     // if (data.status === "Success") {
    //     //   message.success(data.Code);
    //     //   setButtonLoading(false);
    //     //   setFetch(data.harvesterTrans);
    //     // }

    //     message.info("API endpoint not yet implemented");
    //     setButtonLoading(false);
    //   } catch (err) {
    //     console.log(err.message);
    //     message.error("Harvester transaction not updated");
    //   }
    // }
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
        <Row gutter={12}>
          <Form.Item label="Harvester ID" name="harvesterId" hidden>
            <Input />
          </Form.Item>

          <Form.Item label="Trans ID" name="transId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Date"
            name="startDate"
            rules={[{ required: true, message: "Please select date" }]}>
            <DatePicker />
          </Form.Item>
        </Row>

        <Radio.Group
          options={options}
          onChange={(e) => setBaseOfRate(e.target.value)}
          value={baseOfRate}
          optionType="button"
        />

        <Row gutter={12}>
          {baseOfRate == "duration" && (
            <Form.Item label="Duration" name="duration">
              <InputNumber placeholder="duration" />
            </Form.Item>
          )}

          {baseOfRate == "measurment" && (
            <Form.Item label="Measurement" name="measurment">
              <InputNumber placeholder="measurment" />
            </Form.Item>
          )}

          <Form.Item label="Harvesting Charge" name="salary">
            <InputNumber placeholder="harvesting charge" />
          </Form.Item>
        </Row>
        <Row gutter={12}>
          <Form.Item label="Pay" name="pay">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Transaction Type" name="transType">
            <Input />
          </Form.Item>

          <Form.Item label="Handover" name="handOver">
            <Input />
          </Form.Item>
        </Row>
        <Row gutter={12}>
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
