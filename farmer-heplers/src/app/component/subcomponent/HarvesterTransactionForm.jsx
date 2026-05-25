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
  Alert,
  Collapse,
  Select,
} from "antd";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import {
  addTransactionForHarvestData,
  updateHarvestDataTransaction,
} from "../../service/other";

const { Panel } = Collapse;

const HarvesterTransactionForm = ({
  form,
  openType,
  harvesterList,
  option,
  setFetch,
  baseOfRate,
  setBaseOfRate,
  onClose,
}) => {
  const { t } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const options = [
    { label: t("harvestDrawer.ahtf.odt"), value: "duration" },
    { label: t("harvestDrawer.ahtf.omt"), value: "measurment" },
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
          message.success(t(data.Code));
          setButtonLoading(false);
          setFetch(data.data);
          onClose();
        }
      } catch (err) {
        message.error(t("CL.HL.ATHLSEM"));
        console.log(err.message);
      }
    }

    if (openType === "editTrans") {
      try {
        setButtonLoading(true);
        const formValues = form.getFieldsValue();
        const { harvesterId, transId, ...restOfformValues } = formValues;
        const ids = { harvesterId: harvesterId, transactionId: transId };
        const res = await updateHarvestDataTransaction(ids, restOfformValues);
        const data = await res.data;
        if (data.status === "Success") {
          message.success(t(data.Code));
          setButtonLoading(false);
          setFetch(data);
          onClose();
        }
      } catch (err) {
        console.log(err.message);
        message.error(t("CL.HL.UHTBIDSEM"));
      }
    }
  };

  return (
    <>
      {openType == "addTrans" && (
        <Collapse ghost style={{ marginBottom: 20 }}>
          <Panel header={t("casualDrawer.acltf.colps.glm")} key="1">
            <ul style={{ gap: "2px" }}>
              <li
                style={{
                  padding: "2px",
                  borderRadius: "5px",
                  border: "1px solid #2196f3",
                  backgroundColor: "#E3F2FD",
                }}>
                {t("casualDrawer.acltf.colps.li6")}
              </li>
              <li>{t("casualDrawer.acltf.colps.li1")}</li>
              <li>{t("casualDrawer.acltf.colps.li2")}</li>
              <li>{t("casualDrawer.acltf.colps.li3")}</li>
              <li>{t("casualDrawer.acltf.colps.li4")}</li>
              <li>{t("casualDrawer.acltf.colps.li5")}</li>
            </ul>
          </Panel>
        </Collapse>
      )}
      <Form
        layout="inline"
        name={
          (openType === "addTrans" && "Add Transaction") ||
          (openType === "editTrans" && "Edit Transaction")
        }
        form={form}
        style={{ maxWidth: 800 }}
        labelCol={100}
        wrapperCol={150}
        onFinish={onFinish}>
        <Form.Item label="Harvester ID" name="harvesterId" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="Trans ID" name="transId" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="Trans No" name="transactionNumber" hidden>
          <Input />
        </Form.Item>

        <Row gutter={12}>
          <Form.Item
            label={t("harvestDrawer.ahtf.df")}
            name="startDate"
            rules={[
              { required: true, message: t("harvestDrawer.ahtf.dfrmt") },
            ]}>
            <DatePicker
              format={"DD/MM/YYYY"}
              placeholder={t("harvestDrawer.ahtf.dpt")}
            />
          </Form.Item>

          <Form.Item label={t("harvestDrawer.ahtf.vid")} name="vehical">
            <Select placeholder="vehical ID" options={option} />
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
            <Form.Item label={t("harvestDrawer.ahtf.durf")} name="duration">
              <InputNumber placeholder={t("harvestDrawer.ahtf.durpt")} />
            </Form.Item>
          )}

          {baseOfRate == "measurment" && (
            <Form.Item label={t("harvestDrawer.ahtf.mf")} name="measurment">
              <InputNumber placeholder={t("harvestDrawer.ahtf.mpt")} />
            </Form.Item>
          )}

          <Form.Item label={t("harvestDrawer.ahtf.hcf")} name="salary">
            <InputNumber placeholder={t("harvestDrawer.ahtf.hcpt")} />
          </Form.Item>
        </Row>
        <Row gutter={12}>
          <Form.Item label={t("harvestDrawer.ahtf.payf")} name="pay">
            <InputNumber placeholder={t("harvestDrawer.ahtf.paypt")} />
          </Form.Item>

          <Form.Item label={t("harvestDrawer.ahtf.paytf")} name="transType">
            <Input placeholder={t("harvestDrawer.ahtf.paytpt")} />
          </Form.Item>

          <Form.Item label={t("harvestDrawer.ahtf.hof")} name="handOver">
            <Input placeholder={t("harvestDrawer.ahtf.hopt")} />
          </Form.Item>
        </Row>
        <Row gutter={12}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={buttonLoading}>
              {/* {buttonLoading ? (
                <Spin
                indicator={<LoadingOutlined spin />}
                size="small"
                style={{ color: "#fff" }}
              />
              ) : (
                t?.submit || "Submit"
              )} */}
              {t("harvestDrawer.ahtf.sbt")}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default HarvesterTransactionForm;
