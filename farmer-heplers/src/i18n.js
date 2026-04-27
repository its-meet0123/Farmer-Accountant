import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import pu from "./locales/pu.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    pu: { translation: pu },
  },
  lng: localStorage.getItem("lang") || "hi",
  fallbackLng: "hi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
