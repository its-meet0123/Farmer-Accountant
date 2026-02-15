import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import i18n from "i18next";
const items = [
  {
    key: "1",
    label: <a onClick={() => i18n.changeLanguage("en")}>En</a>,
  },
  {
    key: "2",
    label: <a onClick={() => i18n.changeLanguage("hi")}>Hi</a>,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];
const LanguageChangeDropDown = () => (
  <Dropdown menu={{ items }}>
    <Button>Lang</Button>
  </Dropdown>
);
export default LanguageChangeDropDown;
