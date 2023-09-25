import Slider from "./Slider";
import EarphonesSlider from "./EarphonesSlider";
import ProductDisplayCard from "./ProductDisplayCard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProductInterface } from "../../constants/interface/ProductInterface";
// import { useEffect } from "react";

const ProductList = ({
  displayProductList,
}: {
  displayProductList: ProductInterface[];
}) => {
  const { t } = useTranslation(); //Translation:

  //Get product id from url:
  const param = useParams().id;

  return (
    <div className="products-list">
      {/*HEADPHONE LIST DISPLAY */}
      {param === "headphones" && (
        <div className="w-full">
          <Slider />
        </div>
      )}

      {/* EARPHONE LIST DISPLAY*/}
      {param === "earphones" && (
        <div className="w-full">
          <EarphonesSlider />
        </div>
      )}

      {/*ACCESSORIES LIST DISPLAY */}
      {param === "accessories" && (
        <div className="audio-head bg-black h-[12rem] text-white flex justify-center items-center gap-5">
          <img
            className="audio-logo w-[4rem]"
            src="/logos/logo_icon_white.svg"
            alt="logo"
          />
          <div className="audio-title text-[3rem]">
            {t("audio_accessories")}
          </div>
        </div>
      )}

      {/*CUSTOM ENGRAVING LIST DISPLAY */}
      {param === "custom-engraving" && (
        <>
          <div className="audio-head bg-black h-[12rem] text-white flex justify-center items-center gap-5">
            <img
              className="audio-logo w-[4rem]"
              src="/logos/logo_icon_white.svg"
              alt="logo"
            />
            <div className="custom-title text-[3rem]">
              {t("custom_engraving")}
            </div>
          </div>
        </>
      )}

      {displayProductList?.map((item: any) => (
        <ProductDisplayCard item={item} key={item.product_id} />
      ))}
    </div>
  );
};

export default ProductList;
