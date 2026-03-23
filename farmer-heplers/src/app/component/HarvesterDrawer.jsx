import { Drawer } from "antd";
import HarvesterDetailForm from "./subcomponent/HarvesterDetailForm";

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
        title={openType !== null && "Harvest Data"}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openType !== null}
        size="large">
        {(openType === "addDetail" || openType === "editDetail") && (
          <HarvesterDetailForm
            form={detailForm}
            setFetch={setFetch}
            openType={openType}
            onClose={onClose}
          />
        )}
        {(openType === "addTrans" || openType === "editTrans") &&
          //   <LaborTransForm
          //     form={transactionForm}
          //     openType={openType}
          //     laborDetials={additionalWorker}
          //     setFetch={setFetch}
          //     onClose={onClose}
          //   />
          Transactions}
      </Drawer>
    </>
  );
};
export default HarvestDrawer;
