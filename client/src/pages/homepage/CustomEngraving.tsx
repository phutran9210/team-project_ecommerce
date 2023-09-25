import { Link } from "react-router-dom";
import { buttonStyle } from "../../constants/style";
import { useTranslation } from "react-i18next";

const CustomEngraving = () => {
  const { t } = useTranslation(); //Translation:

  return (
    <Link to="/products/custom-engraving">
      <div className="relative flex flex-col justify-center items-center">
        {/* IMAGE DISPLAY */}
        <img className="w-[84%]" src="/custom.jpg" alt="custom engraving" />
        {/* CONTENT DISPLAY */}
        <div className="custom-content absolute bottom-10 flex flex-col justify-center items-center gap-5">
          <div className="custom-text text-white text-2xl font-chakra">
            {t("engraving_slogan")}
          </div>
          {/* BUTTON */}

          <button className={buttonStyle.primaryBtn}>{t("shop")}</button>
        </div>
      </div>
    </Link>
  );
};

export default CustomEngraving;
