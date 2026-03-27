import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Row, Spin } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { postHarvestData, updateHarvestData } from "../../service/other";

const HarvesterDetailForm = ({ form, openType, setFetch, onClose }) => {
  const { authState, t } = useAuth();
  const today = dayjs();
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = async () => {
    setButtonLoading(true);
    if (openType === "addDetail") {
      const formValues = form.getFieldsValue();
      const { harvesterId, ...restOfFormValues } = formValues;
      const harvesterDetails = {
        ...restOfFormValues,
        userId: authState.user.userId,
      };
      try {
        const res = await postHarvestData(harvesterDetails);
        const data = await res.data;

        if (data.status === "Success") {
          message.success(t(data.Code));
          setFetch(data.data);
          setButtonLoading(false);
          onClose();
        }
      } catch (err) {
        console.log(err.message);
        message.error(t("CL.HL.PHDSEM"));
      }
    }

    if (openType === "editDetail") {
      const editValues = form.getFieldsValue();
      console.log("Edit harvester data form values", editValues);
      const { harvesterId, ...restOfFormValues } = editValues;

      try {
        const res = await updateHarvestData(harvesterId, restOfFormValues);
        const data = await res.data;

        if (data.status === "Success") {
          message.success(t(data.Code));
          setFetch(data.data);
          onClose();
        }
      } catch (err) {
        console.log(err.message);
        message.error(t("CL.HL.UHLBIDSEM"));
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
          <Form.Item
            label={t("harvestDrawer.ahf.df")}
            name="date"
            initialValue={today}>
            <DatePicker
              format="DD/MM/YYYY"
              placeholder={t("harvestDrawer.ahf.dpt")}
            />
          </Form.Item>
          <Form.Item label={t("harvestDrawer.ahf.nnf")} name="nickName">
            <Input placeholder={t("harvestDrawer.ahf.nnpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item
            label={t("harvestDrawer.ahf.fnf")}
            name="firstName"
            rules={[{ required: true, message: t("harvestDrawer.ahf.fnrmt") }]}>
            <Input placeholder={t("harvestDrawer.ahf.fnpt")} />
          </Form.Item>
          <Form.Item label={t("harvestDrawer.ahf.lnf")} name="lastName">
            <Input placeholder={t("harvestDrawer.ahf.lnpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("harvestDrawer.ahf.cf")} name="contact">
            <Input placeholder={t("harvestDrawer.ahf.cfpt")} />
          </Form.Item>
          <Form.Item label={t("harvestDrawer.ahf.lf")} name="address">
            <Input placeholder={t("harvestDrawer.ahf.lfpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.List name="vehicalDetails">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Row gutter={24} key={key}>
                    <Form.Item
                      label={t("harvestDrawer.ahf.vd.vnf")}
                      name={[name, "vehicalNumber"]}>
                      <Input placeholder={t("harvestDrawer.ahf.vd.vnpt")} />
                    </Form.Item>

                    <Form.Item
                      label={t("harvestDrawer.ahf.vd.vtf")}
                      name={[name, "vehicalType"]}>
                      <Input placeholder={t("harvestDrawer.ahf.vd.vtpt")} />
                    </Form.Item>

                    <Form.Item
                      label={t("harvestDrawer.ahf.vd.vidf")}
                      name={[name, "vehicalID"]}>
                      <Input placeholder={t("harvestDrawer.ahf.vd.vidpt")} />
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
          <Form.Item label={t("harvestDrawer.ahf.idpf")} name="idProof">
            <Input placeholder={t("harvestDrawer.ahf.idppt")} />
          </Form.Item>
          <Form.Item label="Transactions" name="transactions" hidden>
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {t("harvestDrawer.ahf.sbt")}{" "}
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
