import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { buttonStyle } from "../../constants/style";
import { Link } from "react-router-dom";

const ProductDisplayCard = ({ item }: { item: any }) => {
  //Translation:
  const { t } = useTranslation();

  //Animation product card:
  const [isProductCardVisible, setIsProductCardVisible] = useState(false);
  useEffect(() => {
    const productCard = document.querySelector(".product-list");
    if (productCard) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsProductCardVisible(true);
          observer.disconnect();
        }
      });
      observer.observe(productCard);
    }
  }, []);

  //Tags array:
  const tags = [
    {
      id: 1,
      type: "new",
      name: "NEW",
      style: buttonStyle.newBtn,
    },
    {
      id: 2,
      type: "feature",
      name: "FEATURE",
      style: buttonStyle.featureBtn,
    },
    {
      id: 3,
      type: "trending",
      name: "TRENDING",
      style: buttonStyle.trendingBtn,
    },
  ];

  return (
    <Link to={`/product/${item.product_id}`}>
      <div
        className={`product-list ${
          isProductCardVisible ? "animate__animated animate__zoomIn" : ""
        } my-[3rem] flex justify-center items-center`}
      >
        <div
          className="product-card animate__animated animate__fadeInUp bg-white w-[85%] flex justify-center items-center gap-4 hover:shadow-2xl py-3 px-2 rounded-md md:w-[90%] 2xl:mx-[10rem]"
          key={item.product_id}
        >
          {/* IMAGE DISPLAY*/}
          <div className="pic w-[25rem] sm:w-72 md:w-1/2 lg:w-1/2">
            <img
              className="h-[20rem] object-cover lg:justify-center lg:mx-[4rem] xl:items-center 2xl:items-center"
              src={item.primary_img}
              alt="photo"
            />
          </div>
          {/* TAGS DISPLAY*/}
          <div className="product-card-content flex flex-col justify-start items-start sm:justify-center sm:items-center md:w-1/2 md:justify-center md:items-center md:text-center lg:w-1/2">
            <div>
              {tags.map((tag) =>
                item.product_type === tag.type ? (
                  <span key={tag.id} className={tag.style}>
                    {tag.name}
                  </span>
                ) : null
              )}

              {Number(item.onSale) > 0 ? (
                <span className="bg-red-600 text-white px-2 rounded-sm text-sm ml-2">
                  -{item.onSale}%
                </span>
              ) : (
                ""
              )}
            </div>
            {/* PRODUCT NAME, DESCRIPTION, PRICE DISPLAY*/}
            <div className="font-oswald text-xl mt-1">{item.product_name}</div>
            <div className="description font-chakra my-2 text-[2rem] md:text-[1.5rem] lg:text-[1.5rem]">
              {item.product_description}
            </div>
            {Number(item.onSale) > 0 ? (
              <div className="flex gap-2">
                <div className="font-oswald text-lg line-through text-[#686868]">
                  ${item?.price && Number(item?.price).toFixed()}
                </div>
                <div className="font-oswald text-lg text-red-500">
                  $
                  {(
                    Number(item.price) -
                    Number(item.price) * (Number(item.onSale) / 100)
                  ).toFixed()}
                </div>
              </div>
            ) : (
              <div className="font-oswald text-lg">
                ${item?.price && Number(item?.price).toFixed()}
              </div>
            )}

            <div className="my-[1rem]">
              <button className={`details ${buttonStyle.secondaryBtn}`}>
                {t("DETAILS")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductDisplayCard;
