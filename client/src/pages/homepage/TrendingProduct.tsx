import { useEffect, useState } from "react";
import ProductDisplayCard from "../products/ProductDisplayCard";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { titleStyle, typePageStyle } from "../../constants/style";
import Slider from "react-slick";
import { ProductInterface } from "../../constants/interface/ProductInterface";

const TrendingProduct = () => {
  const { t } = useTranslation(); //Translation:
  const [trendingProducts, setTrendingProducts] = useState<ProductInterface[]>(
    []
  );

  //GET TRENDING PRODUCTS:
  const loadTrendingProducts = async () => {
    const response = await axios.get(
      "http://localhost:3008/products/details/values/product_type/trending"
    );

    setTrendingProducts(response.data);
  };
  useEffect(() => {
    loadTrendingProducts();
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
    <div>
      <div className={titleStyle.headerTitle}>
        <div>{t("TRENDING_PRODUCT")}</div>
      </div>
      <div className={typePageStyle.pageWrapper}>
        <Slider {...settings}>
          {trendingProducts.map((item: any) => (
            <ProductDisplayCard item={item} key={item.product_id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingProduct;
