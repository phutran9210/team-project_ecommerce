import { useEffect, useState } from "react";
import ProductDisplayCard from "../products/ProductDisplayCard";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { titleStyle, typePageStyle } from "../../constants/style";
import Slider from "react-slick";
import { ProductInterface } from "../../constants/interface/ProductInterface";

const NewProduct = () => {
  const { t } = useTranslation(); //Translation:
  const [newProducts, setNewProducts] = useState<ProductInterface[]>([]); //New products array

  //GET NEW PRODUCTS:
  const loadNewProducts = async () => {
    const response = await axios.get(
      "http://localhost:3008/products/details/values/product_type/new"
    );
    setNewProducts(response.data);
  };

  useEffect(() => {
    loadNewProducts();
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
    <div className="">
      <div className={titleStyle.headerTitle}>
        <div>{t("NEW_PRODUCT")}</div>
      </div>
      <div className={typePageStyle.pageWrapper}>
        <Slider {...settings}>
          {newProducts.map((item: any) => (
            <ProductDisplayCard item={item} key={item.product_id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewProduct;
