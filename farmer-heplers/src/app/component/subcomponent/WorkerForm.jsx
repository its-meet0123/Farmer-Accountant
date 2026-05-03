import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { addWorker } from "../../service/worker";
import { Button, DatePicker, Form, Input, message, Row } from "antd";
import dayjs from "dayjs";

const WorkerForm = ({
  workerInfoForm,
  openType,
  setFetchData,
  onClose,
  workerList,
}) => {
  const [btnLoad, setBtnLoad] = useState(false);
  const { authState, t, season } = useAuth();
  const today = dayjs();
  const handleSubmitInfoForm = async () => {
    setBtnLoad(true);
    if (openType === "aw") {
      try {
        const formValues = workerInfoForm.getFieldsValue();
        const workerInfo = {
          userId: authState.user.userId,
          sessionId: season?._id,
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
          setFetchData(res.data);
          setBtnLoad(false);
          onClose();
        }
      } catch (err) {
        message.error(t("workerDrawer.submitFunction.errorMessageforCreate1"));
        console.log(err.message);
      }
    }
  };
  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
        name={(openType == "aw" && "Add") || (openType == "ew" && "Edit")}
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
          <Form.Item label={t("workerDrawer.detailInput.lnt")} name="lastName">
            <Input placeholder={t("workerDrawer.detailInput.lnpt")} />
          </Form.Item>
        </Row>
        <Row gutter={24}>
          <Form.Item label={t("workerDrawer.detailInput.nnt")} name="nickName">
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
        <Row gutter={24}>
          <Form.Item label="">
            <Button type="primary" htmlType="submit" loading={btnLoad}>
              {t("workerDrawer.transactionInput.button.sbt")}
            </Button>
          </Form.Item>
        </Row>
        <Form.Item label="Worker ID" name="workerId" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Accounts" name="account" hidden>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default WorkerForm;
