import { Button, Drawer } from "antd";
import { useAuth } from "../auth/AuthContext";

import WorkerForm from "./subcomponent/WorkerForm";
import WorkerTransForm from "./subcomponent/WorkerTransForm";

const WorkerDrawer = ({
  openType,
  setOpenType,
  workerList,
  setFetchData,
  workerInfoForm,
  transactionForm,
}) => {
  const { t } = useAuth();
  //const [workerInfoForm] = Form.useForm();
  //const [transactionForm] = Form.useForm();

  const onClose = () => {
    setOpenType(null);
    workerInfoForm.resetFields();
    transactionForm.resetFields();
  };

  return (
    <>
      <Drawer
        title={t("workerDrawer.awDrawerTitle")}
        size={450}
        placement="right"
        closable={false}
        onClose={onClose}
        open={openType !== null}
        extra={
          <Button onClick={onClose}>
            {t("workerDrawer.transactionInput.button.cbt")}
          </Button>
        }
        //getContainer={false}
      >
        {(openType == "aw" || openType == "ew") && (
          <WorkerForm
            workerInfoForm={workerInfoForm}
            openType={openType}
            onClose={onClose}
            setFetchData={setFetchData}
            workerList={workerList}
          />
        )}

        {(openType == "at" || openType == "ewt") && (
          <WorkerTransForm
            openType={openType}
            transactionForm={transactionForm}
            onClose={onClose}
            setFetchData={setFetchData}
          />
        )}
      </Drawer>

      {/* <Drawer
        title={t("workerDrawer.awtDrawerTitle")}
        placement="top"
        closable={false}
        onClose={onClose}
        openType={open === "at" || open === "ewt"}
        extra={
          <Button onClick={onClose}>
            {t("workerDrawer.transactionInput.button.cbt")}
          </Button>
        }>
        {open === "at" && (
          <>
            
          </>
        )}

        {open === "ewt" && (
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 25 }}
            form={editTransactionForm}
            onFinish={handleSubmitTransactionForm}>
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
            <Form.Item label="Worker ID" name="workerId" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Trans ID" name="transactionId" hidden>
              <Input />
            </Form.Item>
          </Form>
        )}
      </Drawer> */}
    </>
  );
};
export default WorkerDrawer;
