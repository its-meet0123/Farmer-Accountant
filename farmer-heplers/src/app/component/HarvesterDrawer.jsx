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
          //   <LaborTransForm
          //     form={transactionForm}
          //     openType={openType}
          //     laborDetials={additionalWorker}
          //     setFetch={setFetch}
          //     onClose={onClose}
          //   />
          <p>transaction</p>
        )}
      </Drawer>
    </>
  );
};
export default HarvestDrawer;
