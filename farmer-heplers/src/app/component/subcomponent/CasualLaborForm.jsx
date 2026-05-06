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
  const { authState, t, season } = useAuth();
  const today = dayjs();
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    if (openType === "laborAdd") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const laberDetails = {
          ...formValues,
          userId: authState.user.userId,
          sessionId: season?._id,
          transactions: [],
        };
        const response = await postFieldWorkerData(laberDetails);
        const data = await response.data;

        if (data.status === "Success") {
          setFetch(data.worker);
          message.success(t(data.Code));
          setButtonLoading(false);
          form.resetFields();
          onClose();
        }
      } catch (err) {
        console.log(err.message);
        message.error(t("CL.FW.PDSEM"));
      }
    }
    if (openType === "laborEdit") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const { laborId, date, transactions, ...restOfformValues } = formValues;
        const updateLaborDetails = {
          date: date,
          serviceProvider: {
            ...restOfformValues,
            sessionId: season?._id,
          },
          transactions: transactions,
        };
        const res = await updateFieldWorkerData(laborId, updateLaborDetails);
        const data = await res.data;

        if (data.status === "Success") {
          setFetch(data.worker);
          message.success(data.Code);
          setButtonLoading(false);
          onClose();
        }
      } catch (err) {
        console.log(err.message);
        message.error("CL.FW.UWDSEM");
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
          <Form.Item
            label={t("casualDrawer.aclf.df")}
            name="date"
            initialValue={today}>
            <DatePicker
              format="DD/MM/YYYY"
              placeholder={t("casualDrawer.aclf.dpt")}
            />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          {/* <Form.Item label={t("casualDrawer.aclf.tow")} name="typeOfWork">
            <Input />
          </Form.Item> */}
          <Form.Item
            label={t("casualDrawer.aclf.nnf")}
            name="nickName"
            rules={[{ required: true, message: t("casualDrawer.aclf.fnrmt") }]}>
            <Input placeholder={t("casualDrawer.aclf.nnpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("casualDrawer.aclf.fnf")} name="firstName">
            <Input placeholder={t("casualDrawer.aclf.fnpt")} />
          </Form.Item>
          <Form.Item label={t("casualDrawer.aclf.lnf")} name="lastName">
            <Input placeholder={t("casualDrawer.aclf.lnpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("casualDrawer.aclf.cf")} name="contact">
            <Input placeholder={t("casualDrawer.aclf.cfpt")} maxLength={11} />
          </Form.Item>

          <Form.Item label={t("casualDrawer.aclf.lf")} name="address">
            <Input placeholder={t("casualDrawer.aclf.lfpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("casualDrawer.aclf.idpf")} name="idProof">
            <Input placeholder={t("casualDrawer.aclf.idppt")} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {t("casualDrawer.aclf.sbt")}{" "}
            {buttonLoading && (
              <Spin
                indicator={<LoadingOutlined spin />}
                size="small"
                style={{ color: "#fff" }}
              />
            )}
          </Button>
        </Row>
        <Form.Item label="ID" name="laborId" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Transactions" name="transactions" hidden>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default CasualLaborAddForm;
