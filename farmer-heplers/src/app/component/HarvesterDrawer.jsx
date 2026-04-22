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
  baseOfRate,
  setBaseOfRate,
  t,
}) => {
  const onClose = () => {
    setOpenType(null);
    transactionForm.resetFields();
    detailForm.resetFields();
  };
  return (
    <>
      <Drawer
        title={t("harvestDrawer.title")}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openType !== null}
        size="medium"
        getContainer={false}>
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
            baseOfRate={baseOfRate}
            setBaseOfRate={setBaseOfRate}
          />
        )}
      </Drawer>
    </>
  );
};
export default HarvestDrawer;
