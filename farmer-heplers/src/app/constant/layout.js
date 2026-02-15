import { useTranslation } from "react-i18next";
const { t } = useTranslation();
function getItem(label, key, children, icon) {
  return {
    label: t(label),
    key,
    children,
    icon,
  };
}

export const primeryMenu = [
  getItem(`${t("layout.menu.home")}`, "/home"),
  getItem(`${t("layout.menu.view")}`, "/view"),
];
export const moreMenu = [
  getItem("Worker", "/worker"),
  getItem("Setting", "/setting", [
    getItem("Logout", "/logout"),
    getItem("Delete", "/delete"),
  ]),
];
