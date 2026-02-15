import { useTranslation } from "react-i18next";
function getItem(label, key, children, icon) {
  const { t } = useTranslation();
  return {
    label: t(label),
    key,
    children,
    icon,
  };
}

export const primeryMenu = [getItem(`Home`, "/home"), getItem(`View`, "/view")];
export const moreMenu = [
  getItem("Worker", "/worker"),
  getItem("Setting", "/setting", [
    getItem("Logout", "/logout"),
    getItem("Delete", "/delete"),
  ]),
];
