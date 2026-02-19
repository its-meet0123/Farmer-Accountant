import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import i18n from "i18next";
const LanguageChangeDropDown = () => {
  const [buttonText, setButtonText] = useState("English");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            (changeLanguage("en"), setButtonText("English"));
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
            (changeLanguage("hi"), setButtonText("हिंदी"));
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
            (changeLanguage("pu"), setButtonText("ਪੰਜਾਬੀ"));
          }}>
          ਪੰਜਾਬੀ
        </a>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button variant="text">{buttonText}</Button>
    </Dropdown>
  );
};
export default LanguageChangeDropDown;
