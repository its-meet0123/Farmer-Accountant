import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import i18n from "i18next";
const LanguageChangeDropDown = () => {
  const [buttonText, setButtonText] = useState("English");
  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            (i18n.changeLanguage("en"), setButtonText("English"));
          }}>
          English
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            (i18n.changeLanguage("hi"), setButtonText("हिंदी"));
          }}>
          हिंदी
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            (i18n.changeLanguage("pu"), setButtonText("ਪੰਜਾਬੀ"));
          }}>
          ਪੰਜਾਬੀ
        </a>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button color="default" variant="solid">
        {buttonText}
      </Button>
    </Dropdown>
  );
};
export default LanguageChangeDropDown;
