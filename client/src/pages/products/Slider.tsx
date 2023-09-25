import { Component } from "react";
import Slider from "react-slick";

export default class Responsive extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    //Images for the slider:
    const slider_images = [
      {
        id: 1,
        image: "/slider/1.jpg",
      },
      {
        id: 2,
        image: "/slider/3.png",
      },
      {
        id: 3,
        image: "/slider/4.jpg",
      },
      {
        id: 4,
        image: "/slider/6.png",
      },
      {
        id: 5,
        image: "/slider/7.png",
      },
      {
        id: 6,
        image: "/slider/9.jpg",
      },
    ];
    return (
      <div>
        <Slider {...settings}>
          {slider_images.map((img) => (
            <div className="h-[12rem] 2xl:h-[15rem]" key={img.id}>
              <img className="h-[100%] w-[100%]" src={img.image} alt="image" />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
