import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Landing: React.FC = () => {
  const { t } = useTranslation(); //Translation:
  const [currentIndex, setCurrentIndex] = useState(0); //Index of the current image and text

  //Texts and images for the landing page:
  const images: string[] = [
    "/landing/landing1.jpg",
    "/landing/landing2.jpg",
    "/landing/landing3.jpg",
    "/landing/landing4.jpg",
  ];

  const texts: string[] = [
    t("slogan1"),
    t("slogan2"),
    t("slogan3"),
    t("slogan4"),
  ];

  //Change the image and text every 5 seconds:
  useEffect(() => {
    function changeImageAndText() {
      const imageElement: HTMLElement | null = document.getElementById("image");
      const textElement: HTMLElement | null = document.getElementById("text");

      if (imageElement && textElement) {
        imageElement.style.backgroundImage = `url('${images[currentIndex]}')`;
        textElement.textContent = texts[currentIndex];

        // Add the animation classes
        textElement.classList.add("animate__animated", "animate__fadeIn");

        // Remove the animation classes after a delay
        setTimeout(() => {
          textElement.classList.remove("animate__animated", "animate__fadeIn");
        }, 500);

        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }

    const intervalId = setInterval(changeImageAndText, 5000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <>
      <div className="landing-container pointer-events-none -z-20">
        <div className="landing" id="image" />
        <div className="text-overlay font-chakra" id="text" />
      </div>
    </>
  );
};

export default Landing;
