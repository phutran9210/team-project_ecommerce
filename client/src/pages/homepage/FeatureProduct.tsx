// import { useEffect } from "react";
import { titleStyle, typePageStyle } from "../../constants/style";
import ProductDisplayCard from "../products/ProductDisplayCard";
// import axios from "axios";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { ProductInterface } from "../../constants/interface/ProductInterface";
import axios from "axios";
import { useEffect, useState } from "react";

const FeatureProduct = () => {
  const { t } = useTranslation(); //Translation:
  const [featureProducts, setFeatureProducts] = useState<ProductInterface[]>(
    []
  );

  //GET FEATURE PRODUCTS:
  const loadFeatureProducts = async () => {
    const response = await axios.get(
      "http://localhost:3008/products/details/values/product_type/feature"
    );
    setFeatureProducts(response.data);
  };
  useEffect(() => {
    loadFeatureProducts();
  }, []);

  //Slick slider:
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="xl:justify-center">
      <div className={titleStyle.headerTitle}>
        <div>{t("FEATURE_PRODUCT")} </div>
      </div>
      <div className={typePageStyle.pageWrapper}>
        <Slider {...settings}>
          {featureProducts.map((item: any) => (
            <ProductDisplayCard item={item} key={item.product_id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeatureProduct;
