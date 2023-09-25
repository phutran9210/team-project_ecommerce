const HeadphonesITB = () => {
  const headphones_images = [
    "/HP_inthebox/1.png",
    "/HP_inthebox/2.png",
    "/HP_inthebox/3.png",
    "/HP_inthebox/4.png",
    "/HP_inthebox/5.png",
    "/HP_inthebox/6.png",
  ];
  return (
    <div className="flex justify-center items-center flex-wrap">
      {headphones_images.map((image, index) => (
        <img className="w-[10rem]" src={image} key={index} />
      ))}
    </div>
  );
};

export default HeadphonesITB;
