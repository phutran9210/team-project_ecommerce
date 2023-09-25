import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PageNotFound() {
  const { t } = useTranslation(); //Translation:
  return (
    <div>
      <div>
        <div className="flex flex-col justify-center items-center">
          <img src="/notfound.png" alt="not found pgae" />
          <p className="text-3xl">
            <i className="fa-regular fa-face-frown"></i>&nbsp; {t("oops")}
          </p>
          <Link to="/">
            <button className="my-[2rem] border-2 border-black py-[.6rem] px-[2rem]">
              {t("back_home")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
