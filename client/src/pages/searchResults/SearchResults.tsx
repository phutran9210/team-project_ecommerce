import { Link, useLocation, useParams } from "react-router-dom";
import { ProductInterface } from "../../constants/interface/ProductInterface";
import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";

const SearchResults = () => {
  //Translation:
  const { t } = useTranslation();

  const { state } = useLocation();
  const { keyword } = useParams();

  const searchResults = state?.searchResults || [];
  const searchResultsCount = searchResults.length;

  return (
    <div className="min-h-[100vh] w-[100%]">
      <div className="bg-black h-[4rem]" />
      <div className="search-container px-[3rem]">
        {/* HEAD TITLE  */}
        <div className="search-results-head font-chakra text-[2.5rem] flex justify-center items-center my-[2rem]">
          {t("search_results")}
        </div>

        {/* SEARCH RESULTS COUNT */}
        <div className="search-results-count text-[#5c5b5b]">
          {t("showing")}{" "}
          <span className="font-bold text-lg">{searchResultsCount}</span>{" "}
          {t("results")}{" "}
          <span className="font-bold text-base">"{keyword}"</span>
        </div>

        {/* SEARCH RESULTS */}
        <div className="search-results flex items-center flex-wrap text-center my-[2rem] w-[90%] mx-auto md:grid md:grid-cols-2 md:gap-4 md:w-[100%] md:justify-center lg:grid-cols-3 lg:justify-start lg:w-[100%] 2xl:grid-cols-4 2xl:w-[90%]">
          {searchResults.map((item: ProductInterface) => (
            <div
              key={item.product_id}
              className="search-items w-[16rem] h-[26rem] py-2 px-2 my-[1rem] mx-[1rem] bg-base-300 rounded-md hover:shadow-xl md:place-self-center"
            >
              <Link to={`/product/${item.product_id}`}>
                <img src={item.primary_img} alt="product image" />
                <div className="search-items-name font-oswald">
                  {item.product_name}{" "}
                  {Number(item.onSale) > 0 && (
                    <span className="text-red-500">-{item.onSale}%</span>
                  )}
                </div>
                <div className="search-items-des my-[1rem] font-chakra">
                  {item.product_description}
                </div>
                {Number(item.onSale) > 0 ? (
                  <div className="search-items-price flex justify-center items-center">
                    <div className="font-oswald line-through text-[#747373]">
                      ${item.price}
                    </div>{" "}
                    &nbsp;
                    <div className="search-items-price font-oswald text-red-500">
                      $
                      {Number(item.price) -
                        Number(item.price) * (Number(item.onSale) / 100)}
                    </div>
                  </div>
                ) : (
                  <div className="font-oswald">${item.price}</div>
                )}{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default SearchResults;
