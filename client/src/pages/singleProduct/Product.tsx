import { useParams } from "react-router-dom";
import { ProductInterface } from "../../constants/interface/ProductInterface";
import ProductSlider from "./ProductSlider";
import { buttonStyle } from "../../constants/style";
import { useTranslation } from "react-i18next";
import EarphonesITB from "./EarphonesITB";
import HeadphonesITB from "./HeadphonesITB";
import { useEffect, useState } from "react";
import axios from "axios";
import { addCartRequest } from "../../store/slices/cartSlice/cart-slice";
import { useDispatch } from "react-redux";
import { notification } from "antd";

const Product: React.FC = () => {
  const [isContentVisible, setIsContentVisible] = useState(false); //Right side content visible
  const { t } = useTranslation(); //translation
  const [singleProduct, setSingleProduct] = useState<ProductInterface>(); //Single product
  const [engraving_checked, setEngraving] = useState(false); //Engraving checkbox
  const [engravingText, setEngravingText] = useState(""); //Engraving text

  const product_id = useParams().id; //get id of product from url

  const dispatch = useDispatch();
  //GET PRODUCT:
  const getProduct = async () => {
    const response = await axios.get(
      `http://localhost:3008/products/details/${product_id}`
    );

    setSingleProduct(response.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  //Product's photos:
  const photos = singleProduct?.images || [];

  //Sale amount:
  const saleAmount = Number(
    (
      (Number(singleProduct?.price) * Number(singleProduct?.onSale)) /
      100
    ).toFixed()
  );

  //Price after sale:
  const priceAfterSale = Number(singleProduct?.price) - saleAmount;

  //Animation right side content:
  useEffect(() => {
    const rightContent = document.querySelector(".product-details-right-side");

    if (rightContent) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsContentVisible(true);
          observer.disconnect(); // stop observing footer when footer is visible
        }
      });

      observer.observe(rightContent);
    }
  }, []);

  //ADD TO CART:
  const handleAddToCart = () => {
    const payloadAddToCart: Partial<ProductInterface> = {
      engraving_content: engravingText,
      engraving_checked: engraving_checked,
      onSale: singleProduct?.onSale,
      price: singleProduct?.price,
      primary_img: singleProduct?.primary_img,
      product_description: singleProduct?.product_description,
      product_id: singleProduct?.product_id,
      product_name: singleProduct?.product_name,
      product_type: singleProduct?.product_type,
      quantity: 1,
      sale_start: singleProduct?.sale_start,
      sale_end: singleProduct?.sale_end,
    };
    if (engraving_checked && engravingText === "") {
      notification.error({
        message: "Please enter engraving content!",
        style: { top: "3rem" },
      });
      return;
    } else {
      dispatch(addCartRequest(payloadAddToCart));
      setEngraving(false);
      setEngravingText("");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      {/* COVERPHOTO FIELD */}
      {singleProduct?.coverImages && singleProduct?.coverImages[0] === "" ? (
        <div className="bg-black w-full h-[4rem]" />
      ) : (
        <div className="relative flex justify-center items-center">
          <img
            src={singleProduct?.coverImages[0]}
            alt={singleProduct?.product_name}
          />
          <div className="absolute product-details-header text-white animate__animated animate__fadeInUp bottom-[3rem] left-[3rem] right-[3rem]">
            <div className="product-details-head-title text-[2rem] font-oswald">
              {singleProduct?.product_name}
            </div>
            <div className="product-details-head-des text-[3rem] font-chakra">
              {singleProduct?.product_description}
            </div>
          </div>
        </div>
      )}
      {/* MAIN CONTENT DISPLAY */}
      <div className="product-details-content min-h-100vh w-[100%] flex justify-center items-center gap-[3rem] py-[4rem] px-[2.5rem] sm:flex-row md:px-[3.5rem] lg:my-[4rem] 2xl:items-center 2xl:h-[100vh]">
        {/* LEFT SIDE */}
        <div className="product-details-carousel w-[50%] h-[100%] flex justify-center items-center">
          <ProductSlider photos={photos} />
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`product-details-right-side ${
            isContentVisible ? "animate__animated animate__fadeInUp" : ""
          } w-[50%] h-[100%] flex flex-col justify-center items-center`}
        >
          <div className="flex justify-center items-center">
            <div className="font-oswald text-xl">
              {singleProduct?.product_name}
            </div>
            {Number(singleProduct?.onSale) > 0 && (
              <span className="bg-red-500 text-white mx-[.5rem] px-2 rounded-sm">
                -{singleProduct?.onSale}%
              </span>
            )}
          </div>
          <div className="details-content-name font-chakra text-[2rem] text-gray-600 my-3 text-center md:text-[1.5rem]">
            {singleProduct?.product_description}
          </div>

          {/* price field */}
          {Number(singleProduct?.onSale) > 0 ? (
            <div className="flex gap-3 font-oswald">
              <div className="line-through">
                $
                {singleProduct?.price && Number(singleProduct?.price).toFixed()}
              </div>
              <div className="text-red-500">${priceAfterSale}</div>
            </div>
          ) : (
            <div className="font-oswald">
              ${singleProduct?.price && Number(singleProduct?.price).toFixed()}
            </div>
          )}
          {/* engraving checkbox */}
          {singleProduct?.engraving === true ? (
            <>
              <div className="checkbox-wrapper-19 w-[60%] flex justify-center items-center border-t border-b border-gray-500 py-2 px-3 my-5 sm:w-[80%] md:w-[90%] lg:w-[70%] 2xl:w-[50%]">
                <div className="w-[25px] h-[25px]">
                  <input
                    id="cbtest-19"
                    type="checkbox"
                    checked={engraving_checked}
                    onChange={() => setEngraving(!engraving_checked)}
                  />
                  <label className="check-box" htmlFor="cbtest-19"></label>
                </div>
                <span className="ml-[1rem]">
                  {t(`engraving_${singleProduct.categories[0]}`)}
                </span>
              </div>
              {engraving_checked && (
                <div>
                  <input
                    className="w-[100%] h-[2.5rem] mb-2 outline-none rounded-sm border border-gray-500 px-4 py-1"
                    type="text"
                    maxLength={15}
                    value={engravingText}
                    onChange={(event) => {
                      setEngravingText(event.target.value);
                    }}
                    placeholder={t("enter_characters")}
                  />
                </div>
              )}
            </>
          ) : (
            ""
          )}

          {/* Product status */}
          {singleProduct?.quantity && Number(singleProduct?.quantity) > 0 ? (
            <>
              <div className="text-green-600">{t("in_stock")}</div>
              {/* add to cart button */}
              <button
                onClick={handleAddToCart}
                className={`my-[1rem] ${buttonStyle.primaryBtn}`}
              >
                {t("add_cart")}
              </button>
            </>
          ) : (
            <img className="w-[10rem]" src="/sold.png" alt="image" />
          )}
        </div>
      </div>
      <div className="w-[100%]  bg-base-300">
        {/* TECHNICAL INFOMATION */}
        <div className="technical-info flex flex-col justify-center items-center my-[2rem] px-[3rem] w-[100%]">
          <div className="technical-info-head font-chakra text-[2rem] my-[1rem]">
            {t("technical_information")}
          </div>
          <div
            tabIndex={0}
            className="table-info collapse collapse-plus border-t border-b border-black rounded-none bg-base-300 px-[2rem] py-[.2rem]"
          >
            <div className="collapse-title font-medium sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
              {singleProduct?.product_name} &nbsp;{" "}
              {singleProduct?.product_description}
            </div>
            <div className="collapse-content">
              <table>
                <tbody>
                  {typeof singleProduct?.details === "object" &&
                    Object.keys(singleProduct?.details).map((key) => (
                      <tr key={key}>
                        <td className="font-oswald align-top">
                          {t(`product_${key}`)}
                        </td>
                        <td className="table-r font-chakra pl-[3rem] align-top">
                          {singleProduct?.details?.[key]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* IN THE BOX FIELD */}
        <div className="py-[2rem] w-[100%] flex flex-col justify-center items-center mb-[1.5rem]">
          {singleProduct?.categories?.[0] === "earphones" && (
            <>
              <div className="font-chakra text-[2rem] my-[1rem]">
                {t("in_the_box")}
              </div>
              <EarphonesITB />
            </>
          )}
          {singleProduct?.categories?.[0] === "headphones" && (
            <>
              <div className="font-chakra text-[2rem] my-[1rem]">
                {t("in_the_box")}
              </div>
              <HeadphonesITB />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
