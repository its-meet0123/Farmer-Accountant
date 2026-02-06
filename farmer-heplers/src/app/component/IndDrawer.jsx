import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Space,
} from "antd";
import { useState } from "react";
import { pushIndShopeAccountById, updateIndShopeAccount } from "../service/ind";
import dayjs from "dayjs";

const IndDrawer = ({ open, form, setOpen, Id, setFetch, showSuccess }) => {
  const [addForm] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const date = dayjs(new Date());

  const onClose = () => {
    addForm.resetFields();
    form.resetFields();
    setOpen(null);
  };
  const handleSubmit = async () => {
    if (open === "edit") {
      const allValues = form.getFieldsValue();
      const date = dayjs(allValues.startDate);
      const transaction = {
        startDate: date,
        rate: allValues.rate,
        loan: {
          amount: allValues.amount,
          amountType: allValues.amountType,
        },
        indBuy: {
          billAmount: allValues.bBillAmount,
          bill: allValues.bBill,
          brief: allValues.bBrief,
        },
        indSell: {
          crop: allValues.crop,
          billAmount: allValues.sBillAmount,
          bill: allValues.sBill,
          brief: allValues.sBrief,
        },
        diesel: {
          billAmount: allValues.dBillAmount,
          bill: allValues.dBill,
          qty: allValues.dQty,
          rate: allValues.dRate,
        },
      };

      const res = await updateIndShopeAccount(
        Id.shopeId,
        allValues.id,
        transaction,
      );
      if (res.status === 200) {
        const text = "Transaction Edited";
        onClose();
        setFetch("indData");
        showSuccess(text);
      } else {
        message.error("Transaction not edit");
      }
    }
    if (open === "add") {
      const allValues = addForm.getFieldsValue();
      const transaction = {
        startDate: allValues.startDate,
        rate: allValues.rate,
        loan: {
          amount: allValues.amount,
          amountType: allValues.amountType,
        },
        indBuy: {
          billAmount: allValues.bBillAmount,
          bill: allValues.bBill,
          brief: allValues.bBrief,
        },
        indSell: {
          crop: allValues.crops,
          billAmount: allValues.sBillAmount,
          bill: allValues.sBill,
          brief: allValues.sBrief,
        },
        diesel: {
          billAmount: allValues.dBillAmount,
          bill: allValues.dBill,
          qty: allValues.dQty,
          rate: allValues.dRate,
        },
      };
      const res = await pushIndShopeAccountById(Id.shopeId, transaction);

      if (res.status === 200) {
        onClose();
        const text = `Transaction Added Successfully New transaction for Shop No. ${Id.shopeNumber} has been recorded for ${allValues.startDate}.`;
        showSuccess(text);
        setFetch("indData");
      } else {
        message.error("Transaction not added");
      }
    }
  };

  return (
    <>
      <Drawer
        title={(open === "edit" && "Edit") || (open === "add" && "Add")}
        getContainer={false}
        placement="right"
        size="large"
        onClose={onClose}
        open={open !== null}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            {open === "edit" && edit === false && (
              <Button onClick={() => setEdit(true)}>Edit</Button>
            )}
          </Space>
        }>
        {open === "edit" && (
          <Form
            form={form}
            variant="filled"
            initialValues={{ crop: [""] }}
            onFinish={handleSubmit}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="Date"
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: "Please enter date",
                    },
                  ]}>
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Loan Amount" name="amount">
                  <InputNumber placeholder="amount" />
                </Form.Item>
                <Form.Item label="BBA" name="bBillAmount">
                  <InputNumber placeholder="Buy item bill amount" />
                </Form.Item>
                <Form.Item label="DBA" name="dBillAmount">
                  <InputNumber placeholder="Diesel bill amount" />
                </Form.Item>
                <Form.Item label="SBA" name="sBillAmount">
                  <InputNumber placeholder="Sell item bill amount" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Interest Rate" name="rate">
                  <InputNumber placeholder="interest rate" />
                </Form.Item>
                <Form.Item label="Type" name="amountType">
                  <Input placeholder="Amount Type" />
                </Form.Item>
                <Form.Item label="BB" name="bBill">
                  <Input placeholder="Buy item bill " />
                </Form.Item>
                <Form.Item label="D.Qty." name="dQty">
                  <InputNumber placeholder="Diesel Qty." />
                </Form.Item>
                <Form.Item label="SB" name="sBill">
                  <Input placeholder="Sell item bill" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="id"></Form.Item>
                <Form.Item></Form.Item>
                <Form.Item label="B.brief" name="bBrief">
                  <Input placeholder="Buy item brief" />
                </Form.Item>
                <Form.Item label="D.Rate" name="dRate">
                  <InputNumber placeholder="Diesel Rate" />
                </Form.Item>
                <Form.Item label="S.brief" name="sBrief">
                  <Input placeholder="Sell item brief" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.List name="crop">
                {(fields) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Row gutter={24} key={key}>
                        <Col span={6}>
                          <Form.Item label="Crop" name={[name, "name"]}>
                            <Input placeholder="" />
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
                          <Form.Item label="Total" name={[name, "total"]}>
                            <InputNumber placeholder="Total of crop" />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
              </Form.List>
            </Row>
            <Flex justify="flex-end" horizontal style={{ padding: "1rem" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Form>
        )}
        {open === "add" && (
          <Form
            form={addForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            variant="filled"
            initialValues={{ crops: [""] }}
            onFinish={handleSubmit}>
            <Row gutter={24}>
              <Form.Item
                label="Date"
                name="startDate"
                initialValue={date}
                rules={[
                  {
                    required: true,
                    message: "Please enter date",
                  },
                ]}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Interest Rate"
                name="rate"
                rules={[
                  {
                    required: true,
                    message: "Please enter date",
                  },
                ]}>
                <InputNumber placeholder="interest rate" />
              </Form.Item>
            </Row>
            <Row gutter={24}>
              <Form.Item label="Loan Amount" name="amount">
                <InputNumber placeholder="amount" />
              </Form.Item>
              <Form.Item label="Type" name="amountType">
                <Input placeholder="Amount Type" />
              </Form.Item>
            </Row>
            <Row gutter={24}>
              <Form.Item label="BBA" name="bBillAmount">
                <InputNumber placeholder="Buy item bill amount" />
              </Form.Item>
              <Form.Item label="BB" name="bBill">
                <Input placeholder="Buy item bill " />
              </Form.Item>
              <Form.Item label="B.brief" name="bBrief">
                <Input placeholder="Buy item brief" />
              </Form.Item>
            </Row>
            <Row gutter={24}>
              <Form.Item label="DBA" name="dBillAmount">
                <InputNumber placeholder="Diesel bill amount" />
              </Form.Item>
              <Form.Item label="D.Qty." name="dQty">
                <InputNumber placeholder="Diesel Qty." />
              </Form.Item>
              <Form.Item label="D.Rate" name="dRate">
                <InputNumber placeholder="Diesel Rate" />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="SBA" name="sBillAmount">
                <InputNumber placeholder="Sell item bill amount" />
              </Form.Item>
              <Form.Item label="SB" name="sBill">
                <Input placeholder="Sell item bill" />
              </Form.Item>
              <Form.Item label="S.brief" name="sBrief">
                <Input placeholder="Sell item brief" />
              </Form.Item>
            </Row>
            <Row>
              <Form.List name="crops">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Row gutter={24} key={key}>
                        <Form.Item label="Crop" name={[name, "name"]}>
                          <Input placeholder="" />
                        </Form.Item>

                        <Form.Item label="Qty." name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>

                        <Form.Item label="Rate" name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>

                        <Form.Item label="Total" name={[name, "total"]}>
                          <InputNumber placeholder="Total of crop" />
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
            <Flex justify="flex-end" horizontal style={{ padding: "1rem" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default IndDrawer;
