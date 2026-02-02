import {
  CheckOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Form,
  Grid,
  Input,
  message,
  Row,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { postEntData, updateEntData } from "../service/ent";
import { postIntShopeInitailData, UpdateIndDataById } from "../service/ind";
import dayjs from "dayjs";
const { useBreakpoint } = Grid;

const EntDrawer = ({
  open,
  setOpen,
  form,
  setShopeNo,
  indData,
  setFetch,
  showSuccess,
  user,
  data,
}) => {
  const [addForm] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [rowData, setRowData] = useState({});
  const date = dayjs(new Date());
  const screens = useBreakpoint();

  const onClose = () => {
    addForm.resetFields();
    form.resetFields();
    setOpen(null);
  };

  const handleToggleActive = (index) => {
    setActiveRow(index);
    const allShopes = form.getFieldValue("shopes");
    const currentShopeNumber = allShopes[index]?.shopeNumber;
    setShopeNo(currentShopeNumber);
    setEdit(true);
  };
  const handleEdit = (index) => {
    setActiveRow(null);
    const obj = form.getFieldValue(["shopes", index]);
    console.log(obj);
    setRowData(obj);
  };
  const handleSubmit = async () => {
    if (open === "edit" && edit === true) {
      const allValues = form.getFieldsValue();
      console.log(allValues);
      const id = allValues.id;
      if (allValues.shopes[0].shopeNumber === allValues.shopes[1].shopeNumber) {
        message.error("Shope Numbers are same");
      } else {
        const entData = {
          nameInd: allValues.nameInd,
          indFounder: {
            firstName: allValues.firstName,
            lastName: allValues.lastName,
          },
          indContact: allValues.indContact,
          shopes: allValues.shopes,
          startDate: allValues.startDate,
        };
        const entRes = await updateEntData(id, entData);
        console.log(entRes);
        console.log(indData);
        const indDatas = {
          nameInd: allValues.nameInd || indData[0]?.nameInd,
          shopeNumber: rowData?.shopeNumber || indData[0]?.shopeNumber,
          shopeAccount: indData[0]?.shopeAccount,
        };
        const Id = indData[0]?._id;
        const indRes = await UpdateIndDataById(Id, indDatas);
        if (entRes.status === 200 || indRes.status === 200) {
          const text = "Industry data update successfully";
          showSuccess(text);
          setFetch("allValues");
          onClose();
        } else {
          message.error("Industry data not updated");
        }
      }
    } else {
      message.info("No changes detected");
      onClose();
    }
    if (open === "add") {
      const allValues = addForm.getFieldsValue();
      if (
        allValues?.shopes[0]?.shopeNumber === allValues?.shopes[1]?.shopeNumber
      ) {
        message.error("Shope Numbers are same");
      } else {
        const newEntData = {
          userId: user.userId,
          nameInd: allValues.nameInd || "",
          firstName: allValues.firstName || "",
          lastName: allValues.lastName || "",
          contact: allValues.indContact,
          shopes: allValues.shopes,
          startDate: allValues.startDate,
        };
        const entRes = await postEntData(newEntData);
        const shopeDataArray = allValues.shopes.map((shope) => {
          const shopeDataObj = {
            userId: user.userId,
            nameInd: allValues.nameInd,
            shopeNumber: shope.shopeNumber,
            shopeAccount: [],
          };
          return shopeDataObj;
        });
        const indRes = await postIntShopeInitailData(shopeDataArray);
        if (entRes.status === 201 && indRes.status === 201) {
          const text = `${allValues.nameInd} Created Successfully.`;
          showSuccess(text);
          setFetch("allValues");
          onClose();
        } else {
          message.error("Indusrty not created");
        }
      }
    }
  };

  return (
    <>
      <Drawer
        title={(open === "edit" && "Edit") || (open === "add" && "Add")}
        getContainer={false}
        placement="right"
        size={screens.md ? "large" : "default"}
        onClose={onClose}
        open={open !== null}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            {/* {open === "edit" && edit === false && (
              <Button onClick={() => setEdit(true)}>Edit</Button>
            )} */}
          </Space>
        }>
        {open === "edit" && (
          <Form
            form={form}
            variant="filled"
            onFinish={handleSubmit}
            disabled={!edit}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Name is required" }]}>
                  <Input placeholder="first name" />
                </Form.Item>
                <Form.Item
                  label="Industry Name"
                  name="nameInd"
                  rules={[
                    { required: true, message: "Industry Name is required" },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Contact"
                  name="indContact"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the mob number",
                    },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.resolve();
                        }
                        const regex = /^[6-9]\d{9}$/;
                        if (regex.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please enter vaild 10 digits number"),
                        );
                      },
                    },
                  ]}>
                  <Input placeholder="contact" type="tel" maxLength={10} />
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="startDate"
                  rules={[{ required: true, message: "Date is required" }]}>
                  <DatePicker />
                </Form.Item>
                <Form.Item name="id"></Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName">
                  <Input placeholder="last name" />
                </Form.Item>
                <Form.List name="shopes">
                  {(fields) => (
                    <>
                      {fields.map(({ key, name, ...resetField }) => {
                        const isEditable = activeRow === name;
                        const isAnyEditable =
                          activeRow !== null && activeRow !== name;
                        return (
                          <Flex gap="middle" horizontal key={key}>
                            <Flex gap="small" vertical>
                              <Form.Item
                                label="Shope No"
                                name={[name, "shopeNumber"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Shope number is required",
                                  },
                                ]}>
                                <Input placeholder="" disabled={!isEditable} />
                              </Form.Item>
                              <Form.Item
                                label="Address"
                                name={[name, "shopeAddress"]}>
                                <Input placeholder="" disabled={!isEditable} />
                              </Form.Item>
                            </Flex>
                            {isEditable ? (
                              <Button
                                icon={<CheckOutlined />}
                                onClick={() => handleEdit(name)}></Button>
                            ) : (
                              <Button
                                type="link"
                                icon={<EditOutlined />}
                                disabled={isAnyEditable}
                                onClick={() => {
                                  handleToggleActive(name);
                                }}></Button>
                            )}
                          </Flex>
                        );
                      })}
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={activeRow !== null}>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {open === "add" && (
          <Form
            form={addForm}
            variant="filled"
            initialValues={{ shopes: [""] }}
            onFinish={handleSubmit}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Industry Name"
                  name="nameInd"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Industry name",
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter first name",
                    },
                  ]}>
                  <Input placeholder="first name" />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input placeholder="last name" />
                </Form.Item>
                <Form.Item
                  label="Contact"
                  name="indContact"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the mob number",
                    },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.resolve();
                        }
                        const regex = /^[6-9]\d{9}$/;
                        if (regex.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please enter vaild 10 digits number"),
                        );
                      },
                    },
                  ]}>
                  <Input placeholder="contact" />
                </Form.Item>
                <Form.Item label="Date" name="startDate" initialValue={date}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.List name="shopes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <Flex gap="middle" horizontal key={key}>
                          <Flex gap="small" vertical>
                            <Form.Item
                              label="Shope No"
                              name={[name, "shopeNumber"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Shope number is required",
                                },
                                {
                                  validator: (_, value) => {
                                    if (!value) {
                                      Promise.resolve();
                                    }
                                    const isEntDuplicate = data.entData.some(
                                      (obj) =>
                                        obj.shopes.some(
                                          (shope) =>
                                            shope.shopeNumber === value,
                                        ),
                                    );
                                    const isIndDuplicate = data.indData.some(
                                      (obj) => obj.shopeNumber === value,
                                    );
                                    if (isEntDuplicate || isIndDuplicate) {
                                      return Promise.reject(
                                        new Error(
                                          "This Shope Number is already exist in your data base",
                                        ),
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                },
                              ]}>
                              <Input placeholder="" />
                            </Form.Item>
                            <Form.Item
                              label="Address"
                              name={[name, "shopeAddress"]}>
                              <Input placeholder="" />
                            </Form.Item>
                          </Flex>
                          <Flex vertical align="bottom">
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Flex>
                        </Flex>
                      ))}
                      <PlusCircleOutlined onClick={() => add()} />
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Flex justify="flex-end" horizontal>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default EntDrawer;
