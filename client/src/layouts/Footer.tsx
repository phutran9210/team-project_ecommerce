import { useTranslation } from "react-i18next";
import { Switch, Space } from "antd";
import { useState, useEffect } from "react";
import { footerStyle } from "../constants/style";

const Footer: React.FC = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { t, i18n } = useTranslation(); //Translation:

  //Animation footer
  useEffect(() => {
    const footer = document.querySelector(".footer");

    if (footer) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsFooterVisible(true);
          observer.disconnect(); // stop observing footer when footer is visible
        }
      });

      observer.observe(footer);
    }
  }, []);

  //Translation:
  const handleChangeLanguage = (checked: boolean) => {
    if (checked) {
      localStorage.setItem("i18nextLng", "en");
      i18n.changeLanguage("en");
    }
    if (!checked) {
      localStorage.setItem("i18nextLng", "vn");
      i18n.changeLanguage("vn");
    }
  };

  return (
    <div
      className={`footer-container ${
        isFooterVisible ? "animate__animated animate__slideInUp" : ""
      }`}
    >
      <footer className="flex justify-around items-start p-10 bg-[#212121] text-base-300 sm:px-5 sm:flex-row">
        <div className={footerStyle.footerDiv}>
          <span className="footer-title">{t("CONTACT")}</span>
          <span className={footerStyle.spanStyle}>{t("contact")}</span>
          <span className={footerStyle.spanStyle}>{t("FAQ")}</span>
          <span className={footerStyle.spanStyle}>{t("gifting")}</span>
          <span className={footerStyle.spanStyle}>{t("Ad")}</span>
        </div>
        <div className={footerStyle.footerDiv}>
          <span className="footer-title">{t("ABOUT")}</span>
          <span className={footerStyle.spanStyle}>{t("about")}</span>
          <span className={footerStyle.spanStyle}>{t("News")}</span>
          <span className={footerStyle.spanStyle}>{t("Jobs")}</span>
          <span className={footerStyle.spanStyle}>{t("Reviews")}</span>
        </div>
        <div className={footerStyle.footerDivNoBorder}>
          <span className="footer-title">{t("SUPPORT")}</span>
          <span className={footerStyle.spanStyle}>{t("P_support")}</span>
          <span className={footerStyle.spanStyle}>{t("P_comparisons")}</span>
          <span className={footerStyle.spanStyle}>{t("gift_cards")}</span>
        </div>
      </footer>
      <footer className="flex justify-between items-center px-10 py-4 bg-zinc-500 text-base-content sm:px-0 sm:gap-4 md:justify-center md:g-5 lg:px-[3rem]">
        <div className="footer2-left flex justify-start items-center gap-5 w-4/5 sm:w-2/3 md:w-[70%]">
          <img
            className="logo-footer w-[15rem]"
            src="/logos/black-logo.png"
            alt="logo"
          />
          <div className="footer2-left-des">
            {t("ACME")} <br />
            {t("about_company")}
          </div>
        </div>
        <div className="footer2-right md:place-self-center md:justify-self-end w-1/5 sm:w-1/3 md:w-[18%]">
          <div className="grid grid-flow-col gap-4">
            <div>
              <Space direction="vertical">
                <Switch
                  checkedChildren="EN"
                  unCheckedChildren="VN"
                  defaultChecked={
                    localStorage.getItem("i18nextLng") === "en" ? true : false
                  }
                  onChange={handleChangeLanguage}
                />
              </Space>
            </div>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
