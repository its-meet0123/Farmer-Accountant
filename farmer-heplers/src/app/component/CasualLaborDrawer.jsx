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
}) => {
  const onClose = () => {
    setOpenType(null);
  };
  return (
    <>
      <Drawer
        title={
          ((openType === "laborAdd" || openType === "laborEdit") &&
            "Labor Drawer") ||
          (openType === "edit" && "Edit")
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openType !== null}
        size="large">
        {(openType === "laborAdd" || openType === "laborEdit") && (
          <CasualLaborAddForm
            form={laborForm}
            setFetch={setFetch}
            openType={openType}
            onClose={onClose}
          />
        )}
        {openType === "transAdd" && (
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
