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
  transactionType,
  setTransactionType,
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
        title={t("workerDrawer.drawerTitle")}
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
        getContainer={false}>
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
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
        )}
      </Drawer>
    </>
  );
};
export default WorkerDrawer;
