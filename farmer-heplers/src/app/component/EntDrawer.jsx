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
  t,
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
    if (open === "add") {
      const allValues = addForm.getFieldsValue();
      console.log(allValues);
      if (
        allValues?.aShopes[1] &&
        allValues?.aShopes[0]?.shopeNumber ===
          allValues?.aShopes[1]?.shopeNumber
      ) {
        message.error(t("entDrawer.submitFunction.sameShopeNoError"));
      } else {
        const newEntData = {
          userId: user.userId,
          nameInd: allValues.aNameInd,
          firstName: allValues.aFirstName,
          lastName: allValues.aLastName || "",
          contact: allValues.aIndContact,
          shopes: allValues.aShopes,
          startDate: allValues.aStartDate,
        };
        console.log(newEntData);
        const entRes = await postEntData(newEntData);
        const shopeDataArray = allValues.aShopes.map((shope) => {
          const shopeDataObj = {
            userId: user.userId,
            nameInd: allValues.aNameInd,
            shopeNumber: shope.shopeNumber,
            shopeAccount: [],
          };
          return shopeDataObj;
        });
        const indRes = await postIntShopeInitailData(shopeDataArray);
        if (entRes.status === 201 && indRes.status === 201) {
          const text = `${t("entDrawer.submitFunction.successMessageforCreate")}`;
          showSuccess(text);
          setFetch("allValues");
          onClose();
        } else {
          message.error(t("entDrawer.submitFunction.errorMessageforCreate"));
        }
      }
    }
    if (open === "edit" && edit === true) {
      const editFormValues = form.getFieldsValue();
      console.log(editFormValues);
      const id = editFormValues.id;
      if (
        editFormValues?.shopes[1] &&
        editFormValues?.shopes[0]?.shopeNumber ===
          editFormValues?.shopes[1]?.shopeNumber
      ) {
        message.error(t("entDrawer.submitFunction.sameShopeNoError"));
      } else {
        const entData = {
          nameInd: editFormValues.nameInd,
          indFounder: {
            firstName: editFormValues.firstName,
            lastName: editFormValues.lastName,
          },
          indContact: editFormValues.indContact,
          shopes: editFormValues.shopes,
          startDate: editFormValues.startDate,
        };
        const entRes = await updateEntData(id, entData);
        console.log(entRes);
        console.log(indData);
        const indDatas = {
          nameInd: editFormValues.nameInd || indData[0]?.nameInd,
          shopeNumber: rowData?.shopeNumber || indData[0]?.shopeNumber,
          shopeAccount: indData[0]?.shopeAccount,
        };
        const Id = indData[0]?._id;
        const indRes = await UpdateIndDataById(Id, indDatas);
        if (entRes.status === 200 || indRes.status === 200) {
          const text = `${t("entDrawer.submitFunction.successMessageforEdit")}`;
          showSuccess(text);
          setFetch("allValues");
          onClose();
        } else {
          message.error(t("entDrawer.submitFunction.errorMessageforEdit"));
        }
      }
    } else {
      message.info(t("entDrawer.submitFunction.withoutChangeMessage"));
      onClose();
    }
  };

  return (
    <>
      <Drawer
        title={
          (open === "edit" && t("entDrawer.drawerForm.titleText1")) ||
          (open === "add" && t("entDrawer.drawerForm.titleText2"))
        }
        getContainer={false}
        placement="right"
        size={screens.md ? "large" : "default"}
        onClose={onClose}
        open={open !== null}
        extra={
          <Space>
            <Button onClick={onClose}>
              {t("entDrawer.drawerForm.button.cbt")}
            </Button>
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
                  label={t("entDrawer.drawerForm.nameInput.fnText")}
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.nameInput.fnrText"),
                    },
                  ]}>
                  <Input
                    placeholder={t("entDrawer.drawerForm.nameInput.fnpt")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("entDrawer.drawerForm.nameInput.indnText")}
                  name="nameInd"
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.nameInput.indnrText"),
                    },
                  ]}>
                  <Input
                    placeholder={t("entDrawer.drawerForm.nameInput.indnpt")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("entDrawer.drawerForm.contactInput.text")}
                  name="indContact"
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.contactInput.rm"),
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
                          new Error(t("entDrawer.drawerForm.contactInput.vt")),
                        );
                      },
                    },
                  ]}>
                  <Input
                    placeholder={t("entDrawer.drawerForm.contactInput.pt")}
                    type="tel"
                    maxLength={10}
                  />
                </Form.Item>
                <Form.Item
                  label={t("entDrawer.drawerForm.dateInput.text")}
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.dateInput.rm"),
                    },
                  ]}>
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
                <Form.Item name="id"></Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("entDrawer.drawerForm.nameInput.lnText")}
                  name="lastName">
                  <Input
                    placeholder={t("entDrawer.drawerForm.nameInput.lnpt")}
                  />
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
                                label={t(
                                  "entDrawer.drawerForm.shopeInputs.snt",
                                )}
                                name={[name, "shopeNumber"]}
                                rules={[
                                  {
                                    required: true,
                                    message: t(
                                      "entDrawer.drawerForm.shopeInputs.rm",
                                    ),
                                  },
                                ]}>
                                <Input
                                  placeholder={t(
                                    "entDrawer.drawerForm.shopeInputs.snpt",
                                  )}
                                  disabled={!isEditable}
                                />
                              </Form.Item>
                              <Form.Item
                                label={t("entDrawer.drawerForm.shopeInputs.at")}
                                name={[name, "shopeAddress"]}>
                                <Input
                                  placeholder={t(
                                    "entDrawer.drawerForm.shopeInputs.apt",
                                  )}
                                  disabled={!isEditable}
                                />
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
                    {t("entDrawer.drawerForm.button.sbt")}
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
            initialValues={{ aShopes: [""] }}
            onFinish={handleSubmit}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label={t("entDrawer.drawerForm.nameInput.indnText")}
                  name="aNameInd"
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.nameInput.indnrText"),
                    },
                  ]}>
                  <Input
                    placeholder={t("entDrawer.drawerForm.nameInput.indnpt")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("entDrawer.drawerForm.nameInput.fnText")}
                  name="aFirstName"
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.nameInput.fnrText"),
                    },
                  ]}>
                  <Input
                    placeholder={t("entDrawer.drawerForm.nameInput.fnpt")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("entDrawer.drawerForm.nameInput.lnText")}
                  name="aLastName">
                  <Input
                    placeholder={t("entDrawer.drawerForm.nameInput.lnpt")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("entDrawer.drawerForm.contactInput.text")}
                  name="aIndContact"
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.contactInput.rm"),
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
                          new Error(t("entDrawer.drawerForm.contactInput.vt")),
                        );
                      },
                    },
                  ]}>
                  <Input
                    placeholder={t("entDrawer.drawerForm.contactInput.pt")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("entDrawer.drawerForm.dateInput.text")}
                  name="aStartDate"
                  initialValue={date}
                  rules={[
                    {
                      required: true,
                      message: t("entDrawer.drawerForm.dateInput.rm"),
                    },
                  ]}>
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.List name="aShopes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <Flex gap="middle" horizontal key={key}>
                          <Flex gap="small" vertical>
                            <Form.Item
                              label={t("entDrawer.drawerForm.shopeInputs.snt")}
                              name={[name, "shopeNumber"]}
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    "entDrawer.drawerForm.shopeInputs.rm",
                                  ),
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
                                          t(
                                            "entDrawer.drawerForm.shopeInputs.vt",
                                          ),
                                        ),
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                },
                              ]}>
                              <Input
                                placeholder={t(
                                  "entDrawer.drawerForm.shopeInputs.snpt",
                                )}
                              />
                            </Form.Item>
                            <Form.Item
                              label={t("entDrawer.drawerForm.shopeInputs.at")}
                              name={[name, "shopeAddress"]}>
                              <Input
                                placeholder={t(
                                  "entDrawer.drawerForm.shopeInputs.apt",
                                )}
                              />
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
                  {t("entDrawer.drawerForm.button.sbt")}
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
