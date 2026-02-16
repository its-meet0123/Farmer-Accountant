import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import i18n from "i18next";
const LanguageChangeDropDown = () => {
  const [buttonText, setButtonText] = useState("Eng");
  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            (i18n.changeLanguage("en"), setButtonText("Eng"));
          }}>
          En
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            (i18n.changeLanguage("hi"), setButtonText("Hin"));
          }}>
          Hi
        </a>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button>{buttonText}</Button>
    </Dropdown>
  );
};
export default LanguageChangeDropDown;
