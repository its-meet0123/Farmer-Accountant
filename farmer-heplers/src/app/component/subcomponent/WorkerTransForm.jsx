import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import dayjs from "dayjs";
import {
  addWorkerTransactionById,
  updateWorkerTransactionById,
} from "../../service/worker";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Segmented,
} from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const WorkerTransForm = ({
  openType,
  transactionForm,
  setFetchData,
  onClose,
}) => {
  const { t } = useAuth();
  const [btnLoad, setBtnLoad] = useState(false);
  const today = dayjs();
  const [transactionType, setTransactionType] = useState("Gives");

  const handleSubmitTransactionForm = async () => {
    setBtnLoad(true);
    if (openType === "at") {
      const formValues = transactionForm.getFieldsValue();

      const { workerId, cropG, cropT, ...resetFields } = formValues;

      try {
        const transactionBody = {
          date: new Date(formValues.date),
          rate: resetFields.interestRate,
          give: {
            crop: cropG || [],
            amount: resetFields.amount,
            brief: resetFields.brief,
            amountType: resetFields.amountType,
          },
          take: {
            crop: cropT || [],
            payment: resetFields.payment,
            paymentType: resetFields.paymentType,
          },
        };
        const res = await addWorkerTransactionById(workerId, transactionBody);
        if (res.status === 200) {
          transactionForm.resetFields();
          message.success(res.data.message);
          setFetchData(transactionBody);
          setBtnLoad(false);
          onClose();
        }
      } catch (err) {
        message.error(t("workerDrawer.submitFunction.errorMessageforCreate2"));
        console.log(err.message);
      }
    }
    if (openType === "ewt") {
      try {
        const formValues = transactionForm.getFieldsValue();
        const { workerId, transactionId, cropG, cropT, ...resetFields } =
          formValues;
        console.log(formValues);
        const ids = {
          workerId: workerId,
          accountId: transactionId,
        };
        const transactionBody = {
          date: new Date(resetFields.date),
          rate: resetFields.interestRate,
          give: {
            crop: cropG || [],
            amount: resetFields.amount,
            amountType: resetFields.amountType,
            brief: resetFields.brief,
          },
          take: {
            crop: cropT || [],
            payment: resetFields.payment,
            paymentType: resetFields.paymentType,
          },
        };
        console.log(transactionBody);
        const res = await updateWorkerTransactionById(ids, transactionBody);
        if (res.status === 200) {
          setFetchData(transactionBody);
          message.success(res.data.message);
          setBtnLoad(false);
          onClose();
        }
      } catch (err) {
        message.error(t("workerDrawer.submitFunction.errorMessageforEdit"));
        console.log(err.message);
      }
    }
  };
  return (
    <>
      {openType == "aw" && (
        <Collapse ghost style={{ marginBottom: 20 }}>
          <Panel header={t("workerDrawer.transactionInput.colps.glm")} key="1">
            <ul>
              <li>{t("workerDrawer.transactionInput.colps.li1")}</li>
              <li>{t("workerDrawer.transactionInput.colps.li2")}</li>
              <li>{t("workerDrawer.transactionInput.colps.li3")}</li>
              <li>{t("workerDrawer.transactionInput.colps.li4")}</li>
              <li>{t("workerDrawer.transactionInput.colps.li5")}</li>
              <li>{t("workerDrawer.transactionInput.colps.li6")}</li>
            </ul>
          </Panel>
        </Collapse>
      )}
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 25 }}
        form={transactionForm}
        initialValues={{ corp: [] }}
        onFinish={handleSubmitTransactionForm}>
        <Row gutter={24}>
          <Form.Item
            label={t("workerDrawer.transactionInput.dt")}
            name="date"
            initialValue={today}
            rules={[
              {
                required: true,
                message: t("workerDrawer.transactionInput.drm"),
              },
            ]}>
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            label={t("workerDrawer.transactionInput.int")}
            name="interestRate"
            initialValue={0}
            rules={[
              {
                required: true,
                message: t("workerDrawer.transactionInput.intrm"),
              },
            ]}
            help={t("indDrawer.drawerForm.interestInput.hint")}>
            <InputNumber />
          </Form.Item>
        </Row>

        <Segmented
          options={["Gives", "Takes", "Both"]}
          value={transactionType}
          onChange={setTransactionType}
        />
        {(transactionType == "Gives" || transactionType == "Both") && (
          <>
            <Row gutter={24}>
              <Form.Item
                label={t("workerDrawer.transactionInput.at")}
                name="amount">
                <InputNumbr
                  placeholder={t("workerDrawer.transactionInput.apt")}
                  controls={false}
                />
              </Form.Item>
              <Form.Item
                label={t("workerDrawer.transactionInput.att")}
                name="amountType">
                <Input placeholder={t("workerDrawer.transactionInput.atpt")} />
              </Form.Item>
              <Form.Item
                label={t("workerDrawer.transactionInput.bt")}
                name="brief">
                <Input placeholder={t("workerDrawer.transactionInput.bt")} />
              </Form.Item>
            </Row>
            <Form.List name="cropG">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Row gutter={24} key={key}>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cnt")}
                          name={[name, "name"]}>
                          <Input placeholder="Crop Name" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cqt")}
                          name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.crt")}
                          name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.ctt")}
                          name={[name, "amount"]}>
                          <InputNumber placeholder="Total of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  ))}

                  <PlusCircleOutlined onClick={() => add()} />
                </>
              )}
            </Form.List>
          </>
        )}
        {(transactionType == "Takes" || transactionType == "Both") && (
          <>
            <Row gutter={24}>
              <Form.Item
                label={t("workerDrawer.transactionInput.plt")}
                name="payment">
                <InputNumber
                  placeholder={t("workerDrawer.transactionInput.plpt")}
                  controls={false}
                />
              </Form.Item>
              <Form.Item
                label={t("workerDrawer.transactionInput.ptt")}
                name="paymentType">
                <Input placeholder={t("workerDrawer.transactionInput.ptpt")} />
              </Form.Item>
            </Row>
            <Form.Item></Form.Item>
            <Form.List name="cropT">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Row gutter={24} key={key}>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cnt")}
                          name={[name, "name"]}>
                          <Input placeholder="Crop Name" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cqt")}
                          name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.crt")}
                          name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.ctt")}
                          name={[name, "amount"]}>
                          <InputNumber placeholder="Total of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  ))}

                  <PlusCircleOutlined onClick={() => add()} />
                </>
              )}
            </Form.List>
          </>
        )}
        <Row gutter={24}>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={btnLoad}>
              {t("workerDrawer.transactionInput.button.sbt")}
            </Button>
          </Form.Item>
        </Row>
        <Form.Item label="Worker ID" name="workerId" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Trans ID" name="transactionId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default WorkerTransForm;
