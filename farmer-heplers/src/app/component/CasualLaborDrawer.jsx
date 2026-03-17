import React, { useEffect, useState } from "react";
import { Button, Drawer, Form } from "antd";
import CasualLaborAddForm from "./subcomponent/CasualLaborForm";
const LaborDrawer = ({ openType, setOpenType, setFetch, laborDetails }) => {
  const [laborForm] = Form.useForm();
  const [transactionForm] = Form.useForm();
  useEffect(() => {
    laborForm.setFieldsValue({
      date: laborDetails.date,
      nickName: laborDetails.serviceProvider.nickName,
      firstName: laborDetails.serviceProvider.firstName,
      lastName: laborDetails.serviceProvider.lastName,
      contact: laborDetails.serviceProvider.contact,
      address: laborDetails.serviceProvider.address,
      idProof: laborDetails.serviceProvider.idProof,
    });
  }, [laborDetails]);
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
export default LaborDrawer;
