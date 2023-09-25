import Slider from "react-slick";
import { useTranslation } from "react-i18next";
const Reviews = () => {
  //Translation:
  const { t } = useTranslation(); //Translation:

  //Slider settings:
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinity: true,
    autoPlay: true,
  };

  //Reviews content:
  const reviews = [
    {
      id: 1,
      content: t("john_doe_review"),
      from: "John Doe",
      onProduct: "Master & Dynamic MH02",
    },
    {
      id: 2,
      content: t("men_review"),
      from: "Men's Health",
      onProduct: "Master & Dynamic MH03",
    },
    {
      id: 3,
      content: t("forbes_review"),
      from: "Forbes",
      onProduct: "Master & Dynamic MP08 Sport",
    },
    {
      id: 4,
      content: t("BGR_review"),
      from: "BGR",
      onProduct: "Master & Dynamic MP04 Wireless",
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="reviews my-[3rem] w-[45rem] sm:min-w-[25rem]">
        <Slider {...settings}>
          {reviews?.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center text-center sm:min-h-[12rem] md:min-h-[22rem] md:w-[]"
            >
              {/* REVIEW CONTENT */}
              <div className="reviews-content text-[2.5rem] sm:text-[1.5rem] md:text-[2rem] font-chakra">
                "{item.content}"
              </div>
              {/* REVIEW FROM */}
              <div className="mt-[1.5rem]">
                <span className="reviews-from font-medium font-oswald">
                  {item.from}
                </span>
                &nbsp;
                <span>{t("on_product")}</span>&nbsp;
                <span className="reviews-on">{item.onProduct}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;
