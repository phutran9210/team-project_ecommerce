import { FloatButton } from "antd";
import AccessorieNavigate from "./AccessorieNavigate";
import CustomEngraving from "./CustomEngraving";
import FeatureProduct from "./FeatureProduct";
import Landing from "./Landing";
import NewProduct from "./NewProduct";
import Reviews from "./Reviews";
import TrendingProduct from "./TrendingProduct";
import ReactPlayer from "react-player";

const Home = () => {
  return (
    <div className="home">
      <Landing />
      <NewProduct />
      {/* VIDEO DISPLAY */}
      <div className="video-wrap flex justify-center items-center my-[1.5rem] ">
        <ReactPlayer
          className="introducing-video"
          width="1065px"
          height="602px"
          playing={true}
          loop={true}
          muted
          url="/introducingvideo.mkv"
        />
      </div>
      <FeatureProduct />
      <CustomEngraving />
      <TrendingProduct />
      <AccessorieNavigate />
      <Reviews />
      <FloatButton.BackTop />
    </div>
  );
};

export default Home;
