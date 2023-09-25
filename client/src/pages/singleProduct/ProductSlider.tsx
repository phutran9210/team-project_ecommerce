import { Component } from "react";
import Slider from "react-slick";

interface State {
  photos: any[];
  settings: any;
}

interface Props {
  photos: any[];
}

export default class CenterMode extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      photos: props.photos,
      settings: {
        customPaging: function (i: any) {
          return (
            <a>
              <img src={props.photos[i]} alt={`Thumbnail ${i + 1}`} />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    };
  }

  componentDidMount(): void {
    this.getPhotos();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.photos !== this.props.photos) {
      this.getPhotos();
    }
  }

  getPhotos = () => {
    const { photos } = this.props;

    //Sort photos by number:
    const sortedPhotos = photos.sort((a, b) => {
      const numberA = parseInt(a.match(/-(\d+)\.png/)?.[1] || "0", 10);
      const numberB = parseInt(b.match(/-(\d+)\.png/)?.[1] || "0", 10);
      return numberA - numberB;
    });
    this.setState({
      photos: sortedPhotos,
      settings: {
        customPaging: function (i: any) {
          return (
            <a>
              <img src={sortedPhotos[i]} alt={`Thumbnail ${i + 1}`} />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    });
  };

  render() {
    const { photos, settings } = this.state;

    return (
      photos.length && (
        <div className="product-slider w-[70%] sm:w-72 2xl:w-[50%] ">
          <Slider {...settings}>
            {photos.map((photo: any, index: number) => (
              <div key={index}>
                <img src={photo} alt={`Image ${photo}`} />
              </div>
            ))}
          </Slider>
        </div>
      )
    );
  }
}
