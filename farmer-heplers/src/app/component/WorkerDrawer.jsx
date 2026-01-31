import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Space,
  theme,
} from "antd";
import { useAuth } from "../auth/AuthContext";
import dayjs from "dayjs";
import {
  addWorker,
  addWorkerTransactionById,
  updateWorkerTransactionById,
} from "../service/worker";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const plainOptions = [
  { label: "Give", value: "give" },
  { label: "None", value: "none" },
  { label: "Take", value: "take" },
];

const WorkerDrawer = ({ open, setOpen, workerList, setFetchData, worker }) => {
  const { token } = theme.useToken();
  const { authState } = useAuth();
  const [workerInfoForm] = Form.useForm();
  const [transactionForm] = Form.useForm();
  const [editTransactionForm] = Form.useForm();
  const today = dayjs();
  const [action, setAction] = useState("none");

  const onClose = () => {
    setOpen(null);
  };

  const handleSubmitInfoForm = async () => {
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
      setOpen(null);
      setFetchData("add");
    } else {
      message.error("Worker not added");
    }
  };

  const handleSubmitTransactionForm = async () => {
    if (open === "at") {
      const formValues = transactionForm.getFieldsValue();
      if (action === "give") {
        const transactionBody = {
          date: new Date(formValues.date),
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
        const res = await addWorkerTransactionById(worker._id, transactionBody);
        if (res.status === 200) {
          transactionForm.resetFields();
          message.success(res.data.message);
          setFetchData("addT");
          onClose();
        }
      }
      if (action === "take") {
        const transactionBody = {
          date: new Date(formValues.date),
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
        const res = await addWorkerTransactionById(worker._id, transactionBody);
        if (res.status === 200) {
          transactionForm.resetFields();
          message.success(res.data.message);
          setFetchData("addT");
          onClose();
        }
      }
      if (action === "none") {
        const transactionBody = {
          date: new Date(formValues.date),
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
        const res = await addWorkerTransactionById(worker._id, transactionBody);
        if (res.status === 200) {
          transactionForm.resetFields();
          message.success(res.data.message);
          setFetchData("addT");
          onClose();
        }
      }
    }
    if (open === "ewt") {
      const formValues = editTransactionForm.getFieldsValue();
      console.log(formValues);
      const ids = {
        workerId: worker._id,
        accountId: worker.account[0]._id,
      };
      const transactionBody = {
        date: new Date(formValues.date),
        give: {
          corp: formValues.corpG,
          amount: formValues.amount,
          amountType: formValues.amountType,
          brief: formValues.brief,
        },
        take: {
          crop: formValues.cropT,
          payment: formValues.payment,
          paymentType: formValues.paymentType,
        },
      };
      if (ids.workerId && ids.accountId && transactionBody) {
        console.log(transactionBody);
        const res = await updateWorkerTransactionById(ids, transactionBody);
        if (res.status === 200) {
          setFetchData("editT");
          editTransactionForm.resetFields();
          message.success(res.data.message);
          onClose();
        } else {
          message.error("Transaction not edit");
        }
      }
    }
  };

  useEffect(() => {
    if (worker) {
      const workerAccount = worker.account ? worker.account[0] : {};
      if (open === "ewt") {
        editTransactionForm.setFieldsValue({
          date: dayjs(workerAccount.date),
          amount: workerAccount.give.amount,
          amountType: workerAccount.give.amountType,
          brief: workerAccount.give.brief,
          cropG: workerAccount.give.crop,
          payment: workerAccount.take.payment,
          paymentType: workerAccount.take.paymentType,
          cropT: workerAccount.take.crop,
        });
      }
    }
  }, [worker]);

  return (
    <>
      <Drawer
        title="Add Worker"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open === "aw"}
        extra={
          <Form form={workerInfoForm} onFinish={handleSubmitInfoForm}>
            <Row style={{ gap: "8px" }}>
              <Button onClick={onClose}>Cancel</Button>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
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
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter worker name" }]}>
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Row>
          <Row gutter={24}>
            <Form.Item label="Nick Name" name="nickName">
              <Input placeholder="Enter home name" />
            </Form.Item>
            <Form.Item
              label="Id Proof"
              name="idProof"
              rules={[
                {
                  required: true,
                  message: "Proof is required",
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
                        new Error("This ID is already exist in your data base"),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}>
              <Input placeholder="Enter Id proof" maxLength={12} />
            </Form.Item>
          </Row>
          <Row gutter={24}>
            <Form.Item
              label="Contact"
              name="contect"
              rules={[
                {
                  required: true,
                  message: "Please enter the mob number",
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
                      new Error("Please enter vaild 10 digits number"),
                    );
                  },
                },
              ]}>
              <Input type="tel" maxLength={10} placeholder="Enter Mob no" />
            </Form.Item>
            <Form.Item label="Date" name="date" initialValue={today}>
              <DatePicker />
            </Form.Item>
          </Row>
        </Form>
      </Drawer>

      <Drawer
        title="Add Worker Transaction"
        placement="top"
        closable={false}
        onClose={onClose}
        open={open === "at" || open === "ewt"}
        extra={<Button onClick={onClose}>Cancel</Button>}>
        {open === "at" && (
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 25 }}
            form={transactionForm}
            initialValues={{ corp: [""] }}
            onFinish={handleSubmitTransactionForm}>
            <Row gutter={24}>
              <Form.Item label="Amount" name="amount">
                <InputNumber
                  placeholder="Enter gives amount"
                  controls={false}
                />
              </Form.Item>
              <Form.Item label="Type" name="amountType">
                <Input placeholder="Enter amount type" />
              </Form.Item>
              <Form.Item label="Brief" name="brief">
                <Input placeholder="Enter amount brief" />
              </Form.Item>
            </Row>
            <Row gutter={24}>
              <Form.Item label="Payment" name="payment">
                <InputNumber placeholder="Enter payment" controls={false} />
              </Form.Item>
              <Form.Item label="Type" name="paymentType">
                <Input placeholder="Enter payment type" />
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
                          <Form.Item label="Crop" name={[name, "name"]}>
                            <Input placeholder="Crop Name" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item label="Qty." name={[name, "qty"]}>
                            <InputNumber placeholder="Crop Qty." />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item label="Rate" name={[name, "rate"]}>
                            <InputNumber placeholder="Rate of crop" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item label="Total" name={[name, "amount"]}>
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
                label="Date"
                name="date"
                initialValue={today}
                rules={[{ required: true, message: "Date is required" }]}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Row>
          </Form>
        )}

        {open === "ewt" && (
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 25 }}
            form={editTransactionForm}
            onFinish={handleSubmitTransactionForm}>
            <Row gutter={24}>
              <Form.Item label="Amount" name="amount">
                <InputNumber
                  placeholder="Enter gives amount"
                  controls={false}
                />
              </Form.Item>
              <Form.Item label="Type" name="amountType">
                <Input placeholder="Enter amount type" />
              </Form.Item>
              <Form.Item label="Brief" name="brief">
                <Input placeholder="Enter amount brief" />
              </Form.Item>
            </Row>
            <Row gutter={24}>
              <Form.Item label="Payment" name="payment">
                <InputNumber placeholder="Enter payment" controls={false} />
              </Form.Item>
              <Form.Item label="Type" name="paymentType">
                <Input placeholder="Enter payment type" />
              </Form.Item>
            </Row>

            <Form.List name="cropG">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Row gutter={24} key={key}>
                      <Col span={6}>
                        <Form.Item label="Crop" name={[name, "name"]}>
                          <Input placeholder="Crop Name" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Qty." name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Rate" name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Total" name={[name, "amount"]}>
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
                        <Form.Item label="Crop" name={[name, "name"]}>
                          <Input placeholder="Crop Name" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Qty." name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Rate" name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Total" name={[name, "amount"]}>
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
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date is required" }]}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
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
