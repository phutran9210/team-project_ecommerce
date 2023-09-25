import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../../constants/interface/ProductInterface";
import axios from "axios";
import { FloatButton } from "antd";

const Products: React.FC = () => {
  const { t } = useTranslation(); //Translation:
  const [allProducts, setAllProducts] = useState<ProductInterface[]>([]); //All headphones products
  const [searchValue, setSearchValue] = useState<string>(""); //Search value
  const [showingSearchResults, setShowingSearchResults] = useState(""); //SEARCH RESULTS NOTIFICATION:

  const param = useParams().id;

  //Filter by price:
  const [maxPrice, setMaxPrice] = useState(800);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toggleCheckbox, setToggleCheckbox] = useState(""); //filter by type

  //Product display array:
  const [displayProductList, setDisplayProductList] = useState<
    ProductInterface[]
  >([]);

  //GET ALL PRODUCTS:
  const getAllProducts = async () => {
    const response = await axios.get(
      `http://localhost:3008/products/${
        param === "custom-engraving" ? "details/values/engraving/1" : param
      }`
    );
    setAllProducts(response.data);
  };

  useEffect(() => {
    getAllProducts();
    setToggleCheckbox("");
    setMaxPrice(800);
  }, [param]);

  //CLASSIFY PRODUCTS BY CATEGORY AND PRICE:
  useEffect(() => {
    const tempArr: ProductInterface[] = [];

    allProducts.forEach((product) => {
      const productPrice = product.price;
      if (
        (product.categories[0] === param || param === "custom-engraving") &&
        (toggleCheckbox ? product.product_type === toggleCheckbox : true) &&
        Number(productPrice) <= maxPrice
      ) {
        tempArr.push(product);
      }
      setDisplayProductList(tempArr);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, maxPrice, toggleCheckbox, allProducts]);

  const handleSliderChange = (event: any) => {
    setMaxPrice(event.target.value);
  };

  //SEARCH:
  const handleSearch = async (event: any) => {
    event.preventDefault();
    if (!searchValue) {
      return;
    }
    const searchProducts = await axios.get(
      `http://localhost:3008/products/db/search?payload=${searchValue}`
    );

    console.log("searchProducts==>", searchProducts.data);

    if (searchProducts.data.length === 0) {
      setShowingSearchResults("No result matches!");
      setDisplayProductList([]);
      return;
    } else {
      setShowingSearchResults("");
    }

    //IF PARAM MATCHES PRODUCT_CATEGORY:
    if (searchProducts.data[0]?.category_name === param) {
      const tempArr: ProductInterface[] = [];

      searchProducts.data.forEach((product: any) => {
        if (product.category_name === param) {
          if (
            (toggleCheckbox ? product.product_type === toggleCheckbox : true) &&
            Number(product.price) <= maxPrice
          ) {
            tempArr.push(product);
          }

          setDisplayProductList(tempArr);
          setSearchValue("");
        }
        console.log("tempArr 111111==>", tempArr);
        if (tempArr.length === 0) {
          setShowingSearchResults("No result matches!");
          setDisplayProductList([]);
          return;
        } else {
          setShowingSearchResults("");
        }
      });
    } else if (param === "custom-engraving") {
      const tempArr: ProductInterface[] = [];

      const engravingProducts = searchProducts.data.filter(
        (product: any) => product.engraving === true
      );
      console.log("engravingProducts==>", engravingProducts);
      engravingProducts.forEach((product: any) => {
        if (
          (toggleCheckbox ? product.product_type === toggleCheckbox : true) &&
          Number(product.price) <= maxPrice
        ) {
          tempArr.push(product);
        }
        setDisplayProductList(tempArr);
        setSearchValue("");
      });
      console.log("tempArr 222222==>", tempArr);
      if (tempArr.length === 0) {
        setShowingSearchResults("No result matches!");
        setDisplayProductList([]);
        return;
      } else {
        setShowingSearchResults("");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div>
        <div className="bg-black h-16" />
        <div className="container-products flex justify-around items-start">
          {/* LEFT SIDE MENU */}
          <div
            id="left-side-menu"
            className="left-side w-1/5 h-[100%] py-4 px-7 sticky top-0"
          >
            {/* RADIO INPUT */}
            <div className="radio-input flex flex-col justify-center items-start gap-5 sm:text-sm sm:flex-row sm:justify-start sm:items-center  md:text-base lg:flex-col lg:text-sm lg:items-start">
              <div className="flex justify-center items-center gap-4">
                <input
                  type="radio"
                  id="new"
                  name="radio-1"
                  value="new"
                  className="radio"
                  onClick={() => {
                    setToggleCheckbox(toggleCheckbox === "new" ? "" : "new");
                  }}
                  defaultChecked={toggleCheckbox === "new"}
                />
                <label htmlFor="1">{t("NEW_P")}</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <input
                  type="radio"
                  id="feature"
                  name="radio-1"
                  value="feature"
                  className="radio"
                  onClick={() => {
                    setToggleCheckbox(
                      toggleCheckbox === "feature" ? "" : "feature"
                    );
                  }}
                  defaultChecked={toggleCheckbox === "feature"}
                />
                <label htmlFor="2">{t("FEATURE_P")}</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <input
                  type="radio"
                  id="trending"
                  name="radio-1"
                  value="trending"
                  className="radio"
                  onClick={() => {
                    setToggleCheckbox(
                      toggleCheckbox === "trending" ? "" : "trending"
                    );
                  }}
                  defaultChecked={toggleCheckbox === "trending"}
                />
                <label>{t("TRENDING_P")}</label>
              </div>
            </div>
            {/* RANGE INPUT */}
            <div className="range-input mt-[3rem] md:w-45 sm:w-auto">
              <input
                type="range"
                min={0}
                max={800}
                value={maxPrice}
                onChange={handleSliderChange}
                className="range"
                step={200}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
              <div className="w-full flex justify-between text-xs px-2 gap-5 md:gap-3 lg:gap-[.5rem]">
                <span>0</span>
                <span>$200</span>
                <span>$400</span>
                <span>$600</span>
                <span>$800</span>
              </div>
            </div>
            {/* SEARCH INPUT */}
            <div className="search-input mt-[3rem] border-2 rounded-lg">
              <form onSubmit={handleSearch}>
                <div className="flex justify-between mx-3">
                  {/* INPUT FIELD */}
                  <input
                    className="my-[.5rem] mx-[.36rem] outline-none w-[85%] bg-transparent"
                    type="text"
                    placeholder={t("search")}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  {/* SEARCH ICON */}
                  <button>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="text-red-500 mt-[1rem]">{showingSearchResults}</div>
          </div>
          {/* RIGHT SIDE - PRODUCT LIST */}
          <div className="right-side w-4/5 h-[100%] pt-2 px-4">
            <ProductList displayProductList={displayProductList} />
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default Products;
