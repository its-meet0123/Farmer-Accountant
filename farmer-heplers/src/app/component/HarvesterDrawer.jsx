import { Drawer } from "antd";
import HarvesterDetailForm from "./subcomponent/HarvesterDetailForm";
import HarvesterTransactionForm from "./subcomponent/HarvesterTransactionForm";

const HarvestDrawer = ({
  openType,
  setOpenType,
  setFetch,
  detailForm,
  harvesterList,
  transactionForm,
}) => {
  const onClose = () => {
    setOpenType(null);
    transactionForm.resetFields();
    detailForm.resetFields();
  };
  return (
    <>
      <Drawer
        title={openType !== null && "Harvest Drawer"}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openType !== null}
        size="medium">
        {(openType === "addDetail" || openType === "editDetail") && (
          <HarvesterDetailForm
            form={detailForm}
            setFetch={setFetch}
            openType={openType}
            onClose={onClose}
          />
        )}
        {(openType === "addTrans" || openType === "editTrans") && (
          <HarvesterTransactionForm
            form={transactionForm}
            openType={openType}
            harvesterList={harvesterList}
            setFetch={setFetch}
            onClose={onClose}
          />
        )}
      </Drawer>
    </>
  );
};
export default HarvestDrawer;
