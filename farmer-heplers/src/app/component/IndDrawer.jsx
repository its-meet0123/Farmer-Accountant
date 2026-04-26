import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
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
import { useState } from "react";
import { pushIndShopeAccountById, updateIndShopeAccount } from "../service/ind";
import dayjs from "dayjs";
const { Panel } = Collapse;

const IndDrawer = ({ open, form, setOpen, Id, setFetch, showSuccess, t }) => {
  const [addForm] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const date = dayjs(new Date());
  const [btnLoad, setBtnLoad] = useState(false);

  const onClose = () => {
    addForm.resetFields();
    form.resetFields();
    setBtnLoad(false);
    setOpen(null);
  };
  const handleSubmit = async () => {
    setBtnLoad(true);
    if (open === "edit") {
      try {
        const editValue = form.getFieldsValue();
        const { id, ...editedValues } = editValue;

        const res = await updateIndShopeAccount(Id.shopeId, id, editedValues);
        if (res.status === 200) {
          const text = `${t("indDrawer.submitFunction.successMessageforEdit")}`;
          onClose();
          setFetch(res.data);
          showSuccess(text);
        }
      } catch (err) {
        message.error(t("indDrawer.submitFunction.errorMessageforEdit"));
        console.log(err.message);
      }
    }
    if (open === "add") {
      const allValues = addForm.getFieldsValue();

      const res = await pushIndShopeAccountById(Id.shopeId, allValues);

      if (res.status === 200) {
        onClose();
        const text = `${t("indDrawer.submitFunction.successMessageforCreate")}`;
        showSuccess(text);
        setFetch(res.data);
      } else {
        message.error(t("indDrawer.submitFunction.errorMessageforCreate"));
      }
    }
  };

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
        {open == "add" && (
          <Collapse ghost style={{ marginBottom: 20 }}>
            <Panel header={t("indDrawer.drawerForm.colps.glm")} key="1">
              <ul>
                <li>{t("indDrawer.drawerForm.colps.li1")}</li>
                <li>{t("indDrawer.drawerForm.colps.li2")}</li>
                <li>{t("indDrawer.drawerForm.colps.li3")}</li>
                <li>{t("indDrawer.drawerForm.colps.li4")}</li>
                <li>{t("indDrawer.drawerForm.colps.li5")}</li>
                <li>{t("indDrawer.drawerForm.colps.li6")}</li>
              </ul>
            </Panel>
          </Collapse>
        )}
        {open === "edit" && (
          <Form
            form={form}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 15 }}
            variant="filled"
            initialValues={{ crop: [""] }}
            onFinish={handleSubmit}>
            <Typography.Title level={5}>
              {t("indDrawer.drawerForm.ttt1")}
            </Typography.Title>
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
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text4")}
                name="handOver">
                <Input
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt4")}
                />
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
              <Form.Item
                label={t("indDrawer.drawerForm.buyItemInput.text4")}
                name="bHandOver">
                <Input
                  placeholder={t("indDrawer.drawerForm.buyItemInput.pt4")}
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
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text4")}
                name="dHandOver">
                <Input
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt4")}
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
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text4")}
                name="sHandOver">
                <Input
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt4")}
                />
              </Form.Item>
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
            <Form.Item name="id"></Form.Item>
            <Form.Item></Form.Item>
            <Flex justify="flex-end" horizontal style={{ padding: "1rem" }}>
              <Button type="primary" htmlType="submit" loading={btnLoad}>
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
                  {
                    pattern: /^[0-9]+$/,
                    validator: (_, value) => {
                      if (value && !/^\d+$/.test(value.toString())) {
                        return Promise.reject(new Error("Only numbers"));
                      }
                      return Promise.resolve();
                    },
                    message: "Only numbers",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: 60,
                    message: "between 0 and 60",
                  },
                ]}
                extra={t("indDrawer.drawerForm.interestInput.hint")}>
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
              <Form.Item
                label={t("indDrawer.drawerForm.loanInput.text3")}
                name="handOver">
                <Input placeholder={t("indDrawer.drawerForm.loanInput.pt3")} />
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
              <Form.Item
                label={t("indDrawer.drawerForm.buyItemInput.text4")}
                name="bHandOver">
                <Input
                  placeholder={t("indDrawer.drawerForm.buyItemInput.pt4")}
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
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text4")}
                name="dHandOver">
                <Input
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt4")}
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
              <Form.Item
                label={t("indDrawer.drawerForm.dieselInput.text4")}
                name="sHandOver">
                <Input
                  placeholder={t("indDrawer.drawerForm.dieselInput.pt4")}
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
              <Button type="primary" htmlType="submit" loading={btnLoad}>
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
