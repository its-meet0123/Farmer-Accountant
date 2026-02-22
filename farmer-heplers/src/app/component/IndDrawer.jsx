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
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import {
  dieselPrice,
  pushIndShopeAccountById,
  updateIndShopeAccount,
} from "../service/ind";
import dayjs from "dayjs";

const IndDrawer = ({ open, form, setOpen, Id, setFetch, showSuccess, t }) => {
  const [addForm] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const date = dayjs(new Date());
  const [dieselRate, setDieselRate] = useState(0);

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
        const text = `${t("indDrawer.submitMessageforEdit")}`;
        onClose();
        setFetch("indData");
        showSuccess(text);
      } else {
        message.error(t("indDrawer.submitFunction.errorMessageforEdit"));
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
          crop: allValues.crops || [],
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
        const text = `${t("indDrawer.submitFunction.successMessageforCreate")}`;
        showSuccess(text);
        setFetch("indData");
      } else {
        message.error(t("indDrawer.submitFunction.errorMessageforCreate"));
      }
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await dieselPrice();
        console.log(res);
        const data = res.data;
        console.log(data);
      } catch (err) {
        message.error("diesel Price not found");
        console.log(err.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Drawer
        title={
          (open === "edit" && t("indDrawer.drawerForm.titleText1")) ||
          (open === "add" && t("indDrawer.drawerForm.titleText2"))
        }
        getContainer={false}
        placement="right"
        size="large"
        onClose={onClose}
        open={open !== null}
        extra={
          <Space>
            <Button onClick={onClose}>{t("indDrawer.button.cbt")}</Button>
            {open === "edit" && edit === false && (
              <Button onClick={() => setEdit(true)}>Edit</Button>
            )}
          </Space>
        }>
        {open === "edit" && (
          <Form
            form={form}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 15 }}
            variant="filled"
            initialValues={{ crop: [""] }}
            onFinish={handleSubmit}>
            <Row gutter={24}>
              <Form.Item
                label={t("indDrawer.drawerForm.dateInput.text")}
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: t("indDrawer.drawerForm.dateInput.rm"),
                  },
                ]}>
                <DatePicker format={"DD/MM/YYYY"} />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.interestInput.text")}
                name="rate">
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.interestInput.pt")}
                />
              </Form.Item>
              <Row gutter={24}>
                <Form.Item
                  label={t("indDrawer.drawerForm.loanInput.text1")}
                  name="amount">
                  <InputNumber
                    placeholder={t("indDrawer.drawerForm.loanInput.pt1")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("indDrawer.drawerForm.loanInput.text2")}
                  name="amountType">
                  <Input
                    placeholder={t("indDrawer.drawerForm.loanInput.pt2")}
                  />
                </Form.Item>
              </Row>
              <Row gutter={24}>
                <Form.Item
                  label={t("indDrawer.drawerForm.buyItemInput.text1")}
                  name="bBillAmount">
                  <InputNumber
                    placeholder={t("indDrawer.drawerForm.buyItemInput.pt1")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("indDrawer.drawerForm.buyItemInput.text2")}
                  name="bBill">
                  <Input
                    placeholder={t("indDrawer.drawerForm.buyItemInput.pt2")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("indDrawer.drawerForm.buyItemInput.text3")}
                  name="bBrief">
                  <Input
                    placeholder={t("indDrawer.drawerForm.buyItemInput.pt3")}
                  />
                </Form.Item>
              </Row>
              <Row gutter={24}>
                <Form.Item
                  label={t("indDrawer.drawerForm.dieselInput.text1")}
                  name="dBillAmount">
                  <InputNumber
                    placeholder={t("indDrawer.drawerForm.dieselInput.pt1")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("indDrawer.drawerForm.dieselInput.text2")}
                  name="dQty">
                  <InputNumber
                    placeholder={t("indDrawer.drawerForm.dieselInput.pt2")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("indDrawer.drawerForm.dieselInput.text3")}
                  name="dRate">
                  <InputNumber
                    placeholder={t("indDrawer.drawerForm.dieselInput.pt3")}
                  />
                </Form.Item>
              </Row>
              <Row gutter={24}>
                <Form.Item
                  label={t("indDrawer.drawerForm.sellItemInput.text1")}
                  name="sBillAmount">
                  <InputNumber
                    placeholder={t("indDrawer.drawerForm.sellItemInput.pt1")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("indDrawer.drawerForm.sellItemInput.text2")}
                  name="sBill">
                  <Input
                    placeholder={t("indDrawer.drawerForm.sellItemInput.pt2")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("indDrawer.drawerForm.sellItemInput.text3")}
                  name="sBrief">
                  <Input
                    placeholder={t("indDrawer.drawerForm.sellItemInput.pt3")}
                  />
                </Form.Item>
              </Row>
              <Form.Item name="id"></Form.Item>
              <Form.Item></Form.Item>
            </Row>
            <Row>
              <Form.List name="crop">
                {(fields) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Row gutter={24} key={key}>
                        <Col span={6}>
                          <Form.Item
                            label={t(
                              "indDrawer.drawerForm.sellItemInput.crops.cnt",
                            )}
                            name={[name, "name"]}>
                            <Input placeholder="" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label={t(
                              "indDrawer.drawerForm.sellItemInput.crops.cqt",
                            )}
                            name={[name, "qty"]}>
                            <InputNumber placeholder="Crop Qty." />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label={t(
                              "indDrawer.drawerForm.sellItemInput.crops.crt",
                            )}
                            name={[name, "rate"]}>
                            <InputNumber placeholder="Rate of crop" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label={t(
                              "indDrawer.drawerForm.sellItemInput.crops.ctt",
                            )}
                            name={[name, "total"]}>
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
                {t("indDrawer.button.sbt")}
              </Button>
            </Flex>
          </Form>
        )}
        {open === "add" && (
          <Form
            form={addForm}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 15 }}
            variant="filled"
            initialValues={{ crops: [""] }}
            onFinish={handleSubmit}>
            <Typography.Title level={5}>
              {t("indDrawer.drawerForm.ttt1")}
            </Typography.Title>
            <Row gutter={24}>
              <Form.Item
                label={t("indDrawer.drawerForm.dateInput.text")}
                name="startDate"
                initialValue={date}
                rules={[
                  {
                    required: true,
                    message: t("indDrawer.drawerForm.dateInput.rm"),
                  },
                ]}>
                <DatePicker
                  placeholder={t("indDrawer.drawerForm.dateInput.pt")}
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.interestInput.text")}
                name="rate"
                rules={[
                  {
                    required: true,
                    message: t("indDrawer.drawerForm.interestInput.rm"),
                  },
                ]}>
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.interestInput.pt")}
                />
              </Form.Item>
            </Row>
            <Typography.Title level={5}>
              {t("indDrawer.drawerForm.ttt2")}
            </Typography.Title>
            <Row gutter={24}>
              <Form.Item
                label={t("indDrawer.drawerForm.loanInput.text1")}
                name="amount">
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.loanInput.pt1")}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.loanInput.text2")}
                name="amountType">
                <Input placeholder={t("indDrawer.drawerForm.loanInput.pt2")} />
              </Form.Item>
            </Row>
            <Typography.Title level={5}>
              {t("indDrawer.drawerForm.ttt3")}
            </Typography.Title>
            <Row gutter={24}>
              <Form.Item
                label={t("indDrawer.drawerForm.buyItemInput.text1")}
                name="bBillAmount">
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.buyItemInput.pt1")}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.buyItemInput.text2")}
                name="bBill">
                <Input
                  placeholder={t("indDrawer.drawerForm.buyItemInput.pt2")}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.buyItemInput.text3")}
                name="bBrief">
                <Input
                  placeholder={t("indDrawer.drawerForm.buyItemInput.pt3")}
                />
              </Form.Item>
            </Row>
            <Typography.Title level={5}>
              {t("indDrawer.drawerForm.ttt4")}
            </Typography.Title>
            <Row gutter={24}>
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text1")}
                name="dBillAmount">
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt1")}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text2")}
                name="dQty">
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt2")}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text3")}
                name="dRate">
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt3")}
                />
              </Form.Item>
            </Row>
            <Typography.Title level={5}>
              {t("indDrawer.drawerForm.ttt5")}
            </Typography.Title>
            <Row gutter={24}>
              <Form.Item
                label={t("indDrawer.drawerForm.sellItemInput.text1")}
                name="sBillAmount">
                <InputNumber
                  placeholder={t("indDrawer.drawerForm.sellItemInput.pt1")}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.sellItemInput.text2")}
                name="sBill">
                <Input
                  placeholder={t("indDrawer.drawerForm.sellItemInput.pt2")}
                />
              </Form.Item>
              <Form.Item
                label={t("indDrawer.drawerForm.sellItemInput.text3")}
                name="sBrief">
                <Input
                  placeholder={t("indDrawer.drawerForm.sellItemInput.pt3")}
                />
              </Form.Item>
            </Row>
            <Row gutter={24}>
              <Form.List name="crops">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Row gutter={24} key={key}>
                        <Form.Item
                          label={t(
                            "indDrawer.drawerForm.sellItemInput.crops.cnt",
                          )}
                          name={[name, "name"]}>
                          <Input placeholder="" />
                        </Form.Item>

                        <Form.Item
                          label={t(
                            "indDrawer.drawerForm.sellItemInput.crops.cqt",
                          )}
                          name={[name, "qty"]}>
                          <InputNumber placeholder="Crop Qty." />
                        </Form.Item>

                        <Form.Item
                          label={t(
                            "indDrawer.drawerForm.sellItemInput.crops.crt",
                          )}
                          name={[name, "rate"]}>
                          <InputNumber placeholder="Rate of crop" />
                        </Form.Item>

                        <Form.Item
                          label={t(
                            "indDrawer.drawerForm.sellItemInput.crops.ctt",
                          )}
                          name={[name, "total"]}>
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
                {t("indDrawer.button.sbt")}
              </Button>
            </Flex>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default IndDrawer;
