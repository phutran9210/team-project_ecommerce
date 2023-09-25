import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="hidden-scroll">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
