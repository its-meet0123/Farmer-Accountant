import { Button, Form, Input, InputNumber, message, Modal, Table } from "antd";
import { calculateMarketTax, updateMarketTax } from "../../service/tax";
import { useAuth } from "../../auth/AuthContext";
import { useEffect, useState } from "react";

const TaxCalculatingModal = ({
  openModal,
  setOpenModal,
  taxForm,
  shopeId,
  setFetch,
}) => {
  const { authState, season, t } = useAuth();
  const [edit, setEdit] = useState(false);

  const addData = async () => {
    const formValues = taxForm.getFieldsValue();
    const value = {
      userId: authState.user.userId,
      sessionId: season._id,
      shopeId: shopeId,
      tosc: formValues.taxs[0].tosc,
      rfe: formValues.taxs[0].rfe,
      em: formValues.taxs[0].em,
      rfc: formValues.taxs[0].rfc,
      com: formValues.taxs[0].com,
    };

    try {
      const res = await calculateMarketTax(value);
      if (res.data.status == "Success") {
        message.success("tax data submited ");
        setFetch("add");
        setOpenModal(false);
      }
    } catch (err) {
      message.error("tax data not submited");
      console.log(err.message);
    }
  };

  const editData = async () => {
    const formValues = taxForm.getFieldsValue();
    const { _id, total, values } = formValues.taxs[0];
    const Ids = {
      sessionId: season?._id,
      shopeId: shopeId,
      dataId: _id,
    };
    try {
      const res = await updateMarketTax(Ids, values);
      if (res.data.status == "Success") {
        setFetch("edit");
        message.success("data edit successfully");
      }
    } catch (err) {
      message.error("Data not edited");
      console.log(err.message);
    }
  };

  const onSubmit = () => {
    if (edit === true) {
      editData();
    } else {
      addData();
    }
  };

  return (
    <>
      <Modal
        title={t("calculationPage.tableFooter.mt")}
        centered
        open={openModal}
        onOk={() => onSubmit()}
        onCancel={() => setOpenModal(false)}
        width={600}>
        <Form
          form={taxForm}
          initialValues={{
            taxs: [{ tosc: 0, rfe: 0, em: 0, rfc: 0, com: 0, _id: "" }],
          }}>
          <Form.List name="taxs">
            {(fields, { add, remove }) => {
              <Form.Item name="_id" label="Data ID" hidden>
                <Input />
              </Form.Item>;
              const columns = [
                {
                  title: t("calculationPage.tableFooter.tosc"),
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "tosc"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: t("calculationPage.tableFooter.rfo"),
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "rfe"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: t("calculationPage.tableFooter.other"),
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "em"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: t("calculationPage.tableFooter.rfc"),
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "rfc"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: t("calculationPage.tableFooter.com"),
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "com"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: "Total",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "total"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: "Action",
                  render: (_, field) => (
                    <Button primary onClick={() => setEdit(true)}>
                      Edit
                    </Button>
                  ),
                },
              ];

              return (
                <>
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={fields}
                    rowKey="key"
                    scroll={{ x: 500 }}
                  />

                  {/* <Button
                type="dashed"
                onClick={() => add()}
                style={{ marginTop: 10 }}
              >
                Add Row
              </Button> */}
                </>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default TaxCalculatingModal;
