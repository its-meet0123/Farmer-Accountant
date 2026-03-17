import React, { useEffect, useState } from "react";
import { Button, Drawer, Form } from "antd";
import CasualLaborAddForm from "./subcomponent/CasualLaborForm";
const LaborDrawer = ({ openType, setOpenType, setFetch, laborForm }) => {
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
        {openType === "add" && (
          <CasualLaborAddForm form={laborForm} setFetch={setFetch} />
        )}
        {openType === "edit" && <Form></Form>}
      </Drawer>
    </>
  );
};
export default LaborDrawer;
