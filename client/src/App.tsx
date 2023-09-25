import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Router from "./router";
import { LANGUAGE } from "./constants";

const App: React.FC = () => {
  const currentLocation = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = localStorage.getItem("i18nextLng");
    if (language === LANGUAGE.VN || language === LANGUAGE.EN) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentLocation.pathname]);

  return <Router />;
};

export default App;
