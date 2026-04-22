import React, { useEffect, useState } from "react";
import { Button, Drawer, Form } from "antd";
import CasualLaborAddForm from "./subcomponent/CasualLaborForm";
import LaborTransForm from "./subcomponent/CasualLaborTransForm";
const LaborDrawer = ({
  openType,
  setOpenType,
  setFetch,
  laborForm,
  additionalWorker,
  transactionForm,
  t,
}) => {
  const onClose = () => {
    setOpenType(null);
    transactionForm.resetFields();
    laborForm.resetFields();
  };
  return (
    <>
      <Drawer
        title={t("casualDrawer.title")}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openType !== null}
        size="large"
        getContainer={false}>
        {(openType === "laborAdd" || openType === "laborEdit") && (
          <CasualLaborAddForm
            form={laborForm}
            setFetch={setFetch}
            openType={openType}
            onClose={onClose}
          />
        )}
        {(openType === "transAdd" || openType === "transEdit") && (
          <LaborTransForm
            form={transactionForm}
            openType={openType}
            laborDetials={additionalWorker}
            setFetch={setFetch}
            onClose={onClose}
          />
        )}
      </Drawer>
    </>
  );
};
export default LaborDrawer;
