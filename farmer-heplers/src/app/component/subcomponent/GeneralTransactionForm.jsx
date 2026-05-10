import dayjs from "dayjs";
import { useAuth } from "../../auth/AuthContext";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const GeneralTransactionForm = ({ form, setFetch }) => {
  const date = dayjs();
  const { t } = useAuth();
  const [btnLoad, setBtnLoad] = useState(false);
  const handleSubmit = () => {};

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 15 }}
        variant="filled"
        initialValues={{ buyItems: [""], returnItems: [""] }}
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
          {t("generalForm.titls.bit")}
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
            <Input placeholder={t("indDrawer.drawerForm.buyItemInput.pt2")} />
          </Form.Item>

          <Row gutter={24}>
            <Form.List name="buyItems">
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

          <Form.Item
            label={t("indDrawer.drawerForm.buyItemInput.text4")}
            name="bHandOver">
            <Input placeholder={t("indDrawer.drawerForm.buyItemInput.pt4")} />
          </Form.Item>
        </Row>

        <Typography.Title level={5}>
          {t("generalForm.titls.rit")}
        </Typography.Title>
        <Row gutter={24}>
          <Form.Item label={t("generalForm.inputs.rbat")} name="rBillAmount">
            <InputNumber placeholder={t("generalForm.inputs.rbapt")} />
          </Form.Item>
          <Form.Item label={t("generalForm.inputs.rbt")} name="rBill">
            <Input placeholder={t("generalForm.inputs.rbpt")} />
          </Form.Item>

          <Form.Item
            label={t("indDrawer.drawerForm.dieselInput.text4")}
            name="rHandOver">
            <Input placeholder={t("indDrawer.drawerForm.dieselInput.pt4")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("generalForm.inputs.payt")} name="payment">
            <InputNumber placeholder={t("generalForm.inputs.paypt")} />
          </Form.Item>
          <Form.Item label={t("generalForm.inputs.mt")} name="method">
            <Input placeholder={t("generalForm.inputs.mtpt")} />
          </Form.Item>
          <Form.Item label={t("generalForm.inputs.hot")} name="pHandOver">
            <Input placeholder={t("generalForm.inputs.hopt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.List name="returnItems">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Row gutter={24} key={key}>
                    <Form.Item
                      label={t("indDrawer.drawerForm.sellItemInput.crops.cnt")}
                      name={[name, "name"]}>
                      <Input placeholder="" />
                    </Form.Item>

                    <Form.Item
                      label={t("indDrawer.drawerForm.sellItemInput.crops.cqt")}
                      name={[name, "qty"]}>
                      <InputNumber placeholder="Crop Qty." />
                    </Form.Item>

                    <Form.Item
                      label={t("indDrawer.drawerForm.sellItemInput.crops.crt")}
                      name={[name, "rate"]}>
                      <InputNumber placeholder="Rate of crop" />
                    </Form.Item>

                    <Form.Item
                      label={t("indDrawer.drawerForm.sellItemInput.crops.ctt")}
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
    </>
  );
};

export default GeneralTransactionForm;
