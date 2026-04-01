import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
} from "antd";
import { useAuth } from "../auth/AuthContext";
import dayjs from "dayjs";
import {
  addWorker,
  addWorkerTransactionById,
  updateWorkerTransactionById,
} from "../service/worker";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const WorkerDrawer = ({
  open,
  setOpen,
  workerList,
  setFetchData,
  editTransactionForm,
}) => {
  const { authState, t } = useAuth();
  const [workerInfoForm] = Form.useForm();
  const [transactionForm] = Form.useForm();
  const today = dayjs();
  const [action, setAction] = useState("none");
  const [btnLoad, setBtnLoad] = useState(null);

  const plainOptions = [
    {
      label: t("workerDrawer.transactionInput.transType.gives"),
      value: "give",
    },
    { label: t("workerDrawer.transactionInput.transType.none"), value: "none" },
    {
      label: t("workerDrawer.transactionInput.transType.takes"),
      value: "take",
    },
  ];

  const onClose = () => {
    setBtnLoad(null);
    setOpen(null);
  };

  const handleSubmitInfoForm = async () => {
    setBtnLoad("ifb");
    try {
      const formValues = workerInfoForm.getFieldsValue();
      const workerInfo = {
        userId: authState.user.userId,
        workerDetail: {
          workerName: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            nickName: formValues.nickName,
          },
          contect: formValues.contect,
          date: new Date(formValues.date),
          idProof: formValues.idProof,
        },
        account: [],
      };
      const res = await addWorker(workerInfo);
      if (res.status === 201) {
        message.success(res.data.message);
        workerInfoForm.resetFields();
        setFetchData(formValues);
        onClose();
      }
    } catch (err) {
      message.error(t("workerDrawer.submitFunction.errorMessageforCreate1"));
      console.log(err.message);
    }
  };

  const handleSubmitTransactionForm = async () => {
    setBtnLoad("tfb");
    if (open === "at") {
      const formValues = transactionForm.getFieldsValue();
      const Id = formValues.workerId;
      if (action === "give") {
        try {
          const transactionBody = {
            date: new Date(formValues.date),
            rate: formValues.interestRate,
            give: {
              crop: formValues.crop,
              amount: formValues.amount,
              brief: formValues.brief,
              amountType: formValues.amountType,
            },
            take: {
              crop: [],
              payment: formValues.payment,
              paymentType: formValues.paymentType,
            },
          };
          const res = await addWorkerTransactionById(Id, transactionBody);
          if (res.status === 200) {
            transactionForm.resetFields();
            message.success(res.data.message);
            setFetchData(transactionBody);
            onClose();
          }
        } catch (err) {
          message.error(
            t("workerDrawer.submitFunction.errorMessageforCreate2"),
          );
          console.log(err.message);
        }
      }
      if (action === "take") {
        try {
          const transactionBody = {
            date: new Date(formValues.date),
            rate: formValues.interestRate,
            give: {
              crop: [],
              amount: formValues.amount,
              brief: formValues.brief,
              amountType: formValues.amountType,
            },
            take: {
              crop: formValues.crop,
              payment: formValues.payment,
              paymentType: formValues.paymentType,
            },
          };
          const res = await addWorkerTransactionById(Id, transactionBody);
          if (res.status === 200) {
            transactionForm.resetFields();
            message.success(res.data.message);
            setFetchData(transactionBody);
            onClose();
          }
        } catch (err) {
          message.error(
            t("workerDrawer.submitLFunction.errorMessageforCreate2"),
          );
          console.log(err.message);
        }
      }
      if (action === "none") {
        try {
          const transactionBody = {
            date: new Date(formValues.date),
            rate: formValues.interestRate,
            give: {
              crop: [],
              amount: formValues.amount,
              brief: formValues.brief,
              amountType: formValues.amountType,
            },
            take: {
              crop: [],
              payment: formValues.payment,
              paymentType: formValues.paymentType,
            },
          };
          const res = await addWorkerTransactionById(Id, transactionBody);
          if (res.status === 200) {
            transactionForm.resetFields();
            message.success(res.data.message);
            setFetchData(transactionBody);
            onClose();
          }
        } catch (err) {
          message.error(
            t("workerDrawer.submitFunction.errorMessageforCreate2"),
          );
          console.log(err.message);
        }
      }
    }
    if (open === "ewt") {
      try {
        const formValues = editTransactionForm.getFieldsValue();
        const workerId = formValues.workerId;
        const transactionId = formValues.transactionId;
        console.log(formValues);
        const ids = {
          workerId: workerId,
          accountId: transactionId,
        };
        const transactionBody = {
          date: new Date(formValues.date),
          rate: formValues.interestRate,
          give: {
            corp: formValues.corpG || [],
            amount: formValues.amount,
            amountType: formValues.amountType,
            brief: formValues.brief,
          },
          take: {
            crop: formValues.cropT || [],
            payment: formValues.payment,
            paymentType: formValues.paymentType,
          },
        };
        console.log(transactionBody);
        const res = await updateWorkerTransactionById(ids, transactionBody);
        if (res.status === 200) {
          setFetchData(transactionBody);
          editTransactionForm.resetFields();
          message.success(res.data.message);
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
      <Drawer
        title={t("workerDrawer.awDrawerTitle")}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open === "aw"}
        extra={
          <Form form={workerInfoForm} onFinish={handleSubmitInfoForm}>
            <Row style={{ gap: "8px" }}>
              <Button onClick={onClose}>
                {t("workerDrawer.transactionInput.button.cbt")}
              </Button>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={btnLoad == "ifb" && true}>
                  OK
                </Button>
              </Form.Item>
            </Row>
          </Form>
        }
        getContainer={false}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          form={workerInfoForm}
          onFinish={handleSubmitInfoForm}>
          <Row gutter={24}>
            <Form.Item
              label={t("workerDrawer.detailInput.fnt")}
              name="firstName"
              rules={[
                { required: true, message: t("workerDrawer.detailInput.fnrm") },
              ]}>
              <Input placeholder={t("workerDrawer.detailInput.fnpt")} />
            </Form.Item>
            <Form.Item
              label={t("workerDrawer.detailInput.lnt")}
              name="lastName">
              <Input placeholder={t("workerDrawer.detailInput.lnpt")} />
            </Form.Item>
          </Row>
          <Row gutter={24}>
            <Form.Item
              label={t("workerDrawer.detailInput.nnt")}
              name="nickName">
              <Input placeholder={t("workerDrawer.detailInput.nnpt")} />
            </Form.Item>
            <Form.Item
              label={t("workerDrawer.detailInput.idpt")}
              name="idProof"
              rules={[
                {
                  required: true,
                  message: t("workerDrawer.detailInput.idprm"),
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      Promise.resolve();
                    }
                    const isDuplicateId = workerList.some(
                      (worker) => worker.workerDetail.idProof === value,
                    );
                    if (isDuplicateId) {
                      return Promise.reject(
                        new Error(t("workerDrawer.detailInput.idpvm")),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}>
              <Input
                placeholder={t("workerDrawer.detailInput.idppt")}
                maxLength={12}
              />
            </Form.Item>
          </Row>
          <Row gutter={24}>
            <Form.Item
              label={t("workerDrawer.detailInput.ct")}
              name="contect"
              rules={[
                {
                  required: true,
                  message: t("workerDrawer.detailInput.crm"),
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    const regex = /^[6-9]\d{9}$/;
                    if (regex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("workerDrawer.detailInput.cvm")),
                    );
                  },
                },
              ]}>
              <Input
                type="tel"
                maxLength={10}
                placeholder={t("workerDrawer.detailInput.cpt")}
              />
            </Form.Item>
            <Form.Item
              label={t("workerDrawer.detailInput.dt")}
              name="date"
              initialValue={today}>
              <DatePicker format={"DD/MM/YYYY"} />
            </Form.Item>
          </Row>
        </Form>
      </Drawer>

      <Drawer
        title={t("workerDrawer.awtDrawerTitle")}
        placement="top"
        closable={false}
        onClose={onClose}
        open={open === "at" || open === "ewt"}
        extra={
          <Button onClick={onClose}>
            {t("workerDrawer.transactionInput.button.cbt")}
          </Button>
        }>
        {open === "at" && (
          <>
            <Collapse ghost style={{ marginBottom: 20 }}>
              <Panel
                header={t("workerDrawer.transactionInput.colps.glm")}
                key="1">
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
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 25 }}
              form={transactionForm}
              initialValues={{ corp: [] }}
              onFinish={handleSubmitTransactionForm}>
              <Row gutter={24}>
                <Form.Item label="Worker ID" name="workerId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t("workerDrawer.transactionInput.at")}
                  name="amount">
                  <InputNumber
                    placeholder={t("workerDrawer.transactionInput.apt")}
                    controls={false}
                  />
                </Form.Item>
                <Form.Item
                  label={t("workerDrawer.transactionInput.att")}
                  name="amountType">
                  <Input
                    placeholder={t("workerDrawer.transactionInput.atpt")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("workerDrawer.transactionInput.bt")}
                  name="brief">
                  <Input placeholder={t("workerDrawer.transactionInput.bt")} />
                </Form.Item>
              </Row>
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
                  <Input
                    placeholder={t("workerDrawer.transactionInput.ptpt")}
                  />
                </Form.Item>
              </Row>
              <Form.Item>
                <Radio.Group
                  options={plainOptions}
                  onChange={(e) => {
                    setAction(e.target.value);
                  }}
                  value={action}
                />
              </Form.Item>
              {action !== "none" && (
                <Form.List name="crop">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <Row gutter={24} key={key}>
                          <Col span={5}>
                            <Form.Item
                              label={t(
                                "workerDrawer.transactionInput.crops.cnt",
                              )}
                              name={[name, "name"]}>
                              <Input placeholder="Crop Name" />
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item
                              label={t(
                                "workerDrawer.transactionInput.crops.cqt",
                              )}
                              name={[name, "qty"]}>
                              <InputNumber placeholder="Crop Qty." />
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item
                              label={t(
                                "workerDrawer.transactionInput.crops.crt",
                              )}
                              name={[name, "rate"]}>
                              <InputNumber placeholder="Rate of crop" />
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item
                              label={t(
                                "workerDrawer.transactionInput.crops.ctt",
                              )}
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
              )}
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
                <Form.Item label={null}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={btnLoad === "tfb" && true}>
                    {t("workerDrawer.transactionInput.button.sbt")}
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </>
        )}

        {open === "ewt" && (
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 25 }}
            form={editTransactionForm}
            onFinish={handleSubmitTransactionForm}>
            <Form.Item label="Worker ID" name="workerId" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Trans ID" name="transactionId">
              <Input />
            </Form.Item>
            <Row gutter={24}>
              <Form.Item
                label={t("workerDrawer.transactionInput.at")}
                name="amount">
                <InputNumber
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

            <Form.List name="cropG">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Row gutter={24} key={key}>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cnt")}
                          name={[name, "name"]}>
                          <Input
                            placeholder={t(
                              "workerDrawer.transactionInput.crops.cnt",
                            )}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cqt")}
                          name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.crt")}
                          name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.ctt")}
                          name={[name, "amount"]}>
                          <InputNumber placeholder="Total of crop" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </Form.List>
            <Form.List name="cropT">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Row gutter={24} key={key}>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cnt")}
                          name={[name, "name"]}>
                          <Input placeholder="Crop Name" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.cqt")}
                          name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.crt")}
                          name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={t("workerDrawer.transactionInput.crops.ctt")}
                          name={[name, "amount"]}>
                          <InputNumber placeholder="Total of crop" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </Form.List>
            <Row gutter={24}>
              <Form.Item
                label={t("workerDrawer.transactionInput.dt")}
                name="date"
                rules={[
                  {
                    required: true,
                    message: t("workerDrawer.trnasactionInput.drm"),
                  },
                ]}>
                <DatePicker format={"DD/MM/YYYY"} />
              </Form.Item>
              <Form.Item
                label={t("workerDrawer.transactionInput.int")}
                name="interestRate"
                rules={[
                  {
                    required: true,
                    message: t("workerDrawer.transactionInput.intrm"),
                  },
                ]}>
                <InputNumber />
              </Form.Item>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={btnLoad === "tfb" && true}>
                  {t("workerDrawer.transactionInput.button.sbt")}
                </Button>
              </Form.Item>
            </Row>
          </Form>
        )}
      </Drawer>
    </>
  );
};
export default WorkerDrawer;
