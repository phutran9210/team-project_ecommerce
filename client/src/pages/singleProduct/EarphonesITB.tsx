const EarphonesITB = () => {
  const earphones_images = [
    "/EP_inthebox/1.png",
    "/EP_inthebox/2.png",
    "/EP_inthebox/3.png",
    "/EP_inthebox/4.png",
    "/EP_inthebox/5.png",
    "/EP_inthebox/6.png",
  ];

  return (
    <div className="flex flex-wrap justify-center items-center">
      {earphones_images.map((image, index) => (
        <img className="w-[10rem]" src={image} key={index} />
      ))}
    </div>
  );
};

export default EarphonesITB;
