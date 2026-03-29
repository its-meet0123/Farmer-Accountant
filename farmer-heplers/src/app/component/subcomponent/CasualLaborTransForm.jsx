import { LoadingOutlined } from "@ant-design/icons";
import {
  Alert,
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
import {
  addTransactionForFieldWorker,
  updateFieldWorkerTransaction,
} from "../../service/other";
import { useAuth } from "../../auth/AuthContext";
import dayjs from "dayjs";

const LaborTransForm = ({
  form,
  openType,
  laborDetails,
  setFetch,
  onClose,
}) => {
  const { t } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const today = dayjs();

  const onFinish = async () => {
    if (openType === "transAdd") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const { laborId, ...restOfformValues } = formValues;

        const res = await addTransactionForFieldWorker(
          laborId,
          restOfformValues,
        );
        const data = await res.data;

        if (data.status === "Success") {
          message.success(t(data.Code));
          setButtonLoading(false);
          setFetch(data.worker);
        }
      } catch (err) {
        message.error(t("CL.FW.AWTSEM"));
        console.log(err.message);
      }
    }

    if (openType === "transEdit") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const { laborId, transId, ...restOfformValues } = formValues;
        const ids = { workerId: laborId, transactionId: transId };
        const res = await updateFieldWorkerTransaction(ids, restOfformValues);
        const data = await res.data;
        if (data.status === "Success") {
          message.success(t(data.Code));
          setButtonLoading(false);
          setFetch(data.workerTrans);
        }
      } catch (err) {
        console.log(err.message);
        message.error(t("CL.FW.UWTBIDSEM"));
      }
    }
    onClose();
  };

  return (
    <>
      {openType == "transAdd" && (
        <Alert
          message={t("casualDrawer.acltf.glm")}
          description={t("casualDrawer.acltf.glt")}
          type="info"
          showIcon
          closable
          style={{ marginBottom: 24 }}
        />
      )}
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
          <Form.Item label="Trans ID" name="transId" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Labor ID" name="laborId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label={t("casualDrawer.acltf.df")}
            name="startDate"
            initialValue={today}>
            <DatePicker
              format={"DD/MM/YYYY"}
              placeholder={t("casualDrawer.acltf.dpt")}
            />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("casualDrawer.acltf.wpdf")} name="salary">
            <InputNumber placeholder={t("casualDrawer.acltf.wpdpt")} />
          </Form.Item>
          <Form.Item label={t("casualDrawer.acltf.durf")} name="duration">
            <InputNumber placeholder={t("casualDrawer.acltf.durpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("casualDrawer.acltf.payf")} name="pay">
            <InputNumber placeholder={t("casualDrawer.acltf.paypt")} />
          </Form.Item>
          <Form.Item label={t("casualDrawer.acltf.paytf")} name="transType">
            <Input placeholder={t("casualDrawer.acltf.paytpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("casualDrawer.acltf.hof")} name="handOver">
            <Input placeholder={t("casualDrawer.acltf.hopt")} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {t("casualDrawer.acltf.sbt")}{" "}
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
