import { useEffect, useState } from "react";
import { Button, Dropdown } from "antd";
import i18n from "i18next";
const LanguageChangeDropDown = () => {
  const [buttonText, setButtonText] = useState("Lang");
  const lang = localStorage.getItem("lang");

  useEffect(() => {
    if (lang == "en") {
      setButtonText("English");
    }
    if (lang == "hi") {
      setButtonText("हिंदी");
    }
    if (lang == "pu") {
      setButtonText("ਪੰਜਾਬੀ");
    }
  }, [lang]);

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
            changeLanguage("en");
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
            changeLanguage("hi");
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
            changeLanguage("pu");
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
