import React, { useState } from "react";
import { Button, Drawer, Form } from "antd";
import CasualLaborAddForm from "./subcomponent/CasualLaborForm";
const CasualLabor = ({ openType, setOpenType }) => {
  const [laborForm] = Form.useForm();
  const [transactionForm] = Form.useForm();
  const onClose = () => {
    setOpenType(null);
  };
  return (
    <>
      <Drawer
        title={(openType === "add" && "Add") || (openType === "edit" && "Edit")}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openType !== null}>
        {openType === "add" && <CasualLaborAddForm form={laborForm} />}
        {openType === "edit" && <Form></Form>}
      </Drawer>
    </>
  );
};
export default CasualLabor;
