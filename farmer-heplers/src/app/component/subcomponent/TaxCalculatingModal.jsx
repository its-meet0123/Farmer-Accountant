import { Form, InputNumber, Modal, Table } from "antd";

const TaxCalculatingModal = ({ openModal, setOpenModal, taxForm }) => {
  return (
    <>
      <Modal
        title="Tax Calculating Modal"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}>
        <Form
          form={taxForm}
          initialValues={{
            taxs: [{ tosc: "", rfe: "", em: "", rfc: "", com: "" }],
          }}>
          <Form.List name="taxs">
            {(fields, { add, remove }) => {
              const columns = [
                {
                  title: "Total Crop",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "tosc"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: "Rate For 8 Miti",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "rfe"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: "EightMiti",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "em"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: "Rate for Commission",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "rfc"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                {
                  title: "Commission",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "com"]}
                      style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  ),
                },
                // {
                //   title: "Action",
                //   render: (_, field) => (
                //     <Button danger onClick={() => remove(field.name)}>
                //       Delete
                //     </Button>
                //   ),
                // },
              ];

              return (
                <>
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={fields}
                    rowKey="key"
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
        );
      </Modal>
    </>
  );
};

export default TaxCalculatingModal;
