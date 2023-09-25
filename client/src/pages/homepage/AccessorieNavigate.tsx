import { buttonStyle } from "../../constants/style";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AccessorieNavigate = () => {
  //Translation:
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const language = localStorage.getItem("i18nextLng");
    if (language === "vn") {
      i18n.changeLanguage("vn");
    }
    if (language === "en") {
      i18n.changeLanguage("en");
    }
  }, [i18n]);
  const accessoriesBanner = [
    {
      image: "/a1.jpg",
      head_title: t("Accessories"),
      content: t("Accessories_banner_content"),
      button: t("SHOP_ACCESSORIES"),
      link: "/products/accessories",
    },
    {
      image: "/a2.jpg",
      head_title: t("M_D"),
      content: t("Mobile_App"),
      button: t("learn_more"),
      link: "",
    },
  ];
  return (
    <div className="accessorieNavigate flex justify-center items-center gap-[3rem] my-[2rem]">
      {accessoriesBanner?.map((item: any) => (
        <div
          key={item.image}
          className="relative text-white flex flex-col justify-center items-start"
        >
          {/* IMAGE DISPLAY */}
          <img className="w-[35rem]" src={item.image} alt="image" />
          {/* CONTENT DISPLAY */}
          <div className="absolute bottom-5 left-5 right-5">
            {/* CONTENT HEAD TITLE */}
            <div className="accessorieNavigate-head text-[2.5rem] font-chakra my-[1rem]">
              {item.head_title}
            </div>
            {/* CONTENT */}
            <div className="accessorieNavigate-content text-lg my-[1rem]">
              {item.content}
            </div>
            {/* BUTTON */}
            <Link to={item.link}>
              <button
                className={`accessorieNavigate-button ${buttonStyle.thirdBtn}`}
              >
                {item.button}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccessorieNavigate;
