import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/homepage/Home";
import Products from "../pages/products/Products";
import Product from "../pages/singleProduct/Product";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkOut/Checkout";
import AdminLogin from "../pages/adminLogin/AdminLogin";
import VerifyOTP from "../pages/adminLogin/VerifyOTP";
import ProtectedRoute from "./ProtectedRoute";
import AdminHome from "../pages/adminHomePage/AdminHome";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import { ROUTER_PATH } from "../constants";
import OrderDetails from "../pages/orderDetails/OrderDetails";
import SearchResults from "../pages/searchResults/SearchResults";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={ROUTER_PATH.HOME} element={<Home />} />
        <Route path={ROUTER_PATH.PRODUCTS} element={<Products />} />
        <Route path={ROUTER_PATH.PRODUCT} element={<Product />} />
        <Route path={ROUTER_PATH.CART} element={<Cart />} />
        <Route path={ROUTER_PATH.SEARCH} element={<SearchResults />} />
      </Route>
      <Route path={ROUTER_PATH.CHECKOUT} element={<Checkout />} />
      <Route path={ROUTER_PATH.ORDER_DETAILS} element={<OrderDetails />} />
      <Route path={ROUTER_PATH.ADMIN} element={<AdminLogin />} />
      <Route path={ROUTER_PATH.VERIFY} element={<VerifyOTP />} />
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTER_PATH.ADMIN_HOME} element={<AdminHome />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
