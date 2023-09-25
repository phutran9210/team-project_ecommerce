import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { navStyle } from "../constants/style";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTER_PATH } from "../constants";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import axios from "axios";
import { sendFingerprint } from "../service/guest/checkFingerprint";
import { getCartRequest } from "../store/slices/cartSlice/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { dataCartSelector } from "../store/selectors/cartSelector";

//Mã hóa hash
async function generateSHA256(input: any) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

//Kiểm tra người dùng đã có token LOGIN chưa
function useIdentification() {
  const [identificationChecked, setIdentificationChecked] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [idLoggedIn, setIdLoggedIn] = useState("");

  useEffect(() => {
    const checkIdentificationStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3008/auth/guest-login",
          {
            withCredentials: true,
          }
        );

        setIdLoggedIn(response.data.guest_id);
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
      } finally {
        setIdentificationChecked(true);
      }
    };

    checkIdentificationStatus();
  }, []);

  return { idLoggedIn, identificationChecked, isLoggedIn };
}

const Navbar: React.FC = () => {
  const [search, setSearch] = useState<string>(""); //state search
  const navigate = useNavigate();
  //Translation:
  const { t } = useTranslation();
  const param = useParams().id;

  //NAVBAR RESPONSIVE
  const navRef = useRef<any>();

  //STATE FINGERPRINTJS
  const [idGuest, setIdGuest] = useState("");
  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );
  console.log(data);

  //STATE CHECK THE GUEST LOGIN
  const { idLoggedIn, identificationChecked, isLoggedIn } = useIdentification();
  //state redux
  const dispatch = useDispatch();
  const dataCart = useSelector(dataCartSelector);

  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive_navbar");
    //Set input-wrapper and icon-field to z-index: -1
    const inputWrapper = document.querySelector(".input-wrapper");
    const iconField = document.querySelector(".icon-field");
    if (inputWrapper && iconField) {
      inputWrapper.classList.toggle("-z-10");
      iconField.classList.toggle("-z-10");
    }
  };

  //GET DATA CART
  useEffect(() => {
    if (!idLoggedIn) {
      return;
    }
    dispatch(getCartRequest(idLoggedIn));
  }, [idLoggedIn]);

  //FingerprintJS
  useEffect(() => {
    if (!data || isLoggedIn) {
      return;
    }
    const getFingerprint = async () => {
      const browserInfo = {
        browserName: data.browserName,
        device: data.device,
        ip: data.ip,
        ipLocation: data.ipLocation,
        os: data.os,
        osVersion: data.osVersion,
        visitorId: data.visitorId,
        incognito: data.incognito,
      };

      const hash = await generateSHA256(JSON.stringify(browserInfo));
      setIdGuest(hash);
    };

    getFingerprint();
  }, [data, isLoggedIn]);

  //REQUEEST TO CHECK FINGERPRINT
  useEffect(() => {
    if (!idGuest) {
      return;
    }
    const guestFingerId = {
      fingerprint: idGuest,
    };
    const fetchData = async () => {
      await sendFingerprint(guestFingerId);
    };

    fetchData();
  }, [idGuest]);

  //STATE OF THEME
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html")?.setAttribute("data-theme", localTheme!);
  }, [theme]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggleChangeTheme = (e: any) => {
    if (e.target.checked) {
      setTheme("retro");
    } else {
      setTheme("light");
    }
  };

  //SEARCH:
  const handleSearchResult = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") {
      return;
    }
    const searchProducts = await axios.get(
      `http://localhost:3008/products/db/search?payload=${search}`
    );
    setSearch("");
    navigate(`/search-results/${search}`, {
      state: { searchResults: searchProducts.data },
    });
  };

  return (
    <div
      id="navbar"
      className="navbar fixed w-full flex justify-between items-center px-[3rem] h-[4rem] border-b bg-transparent text-white font-oswald"
    >
      {/* ----------------left----------------- */}
      <div className="w-[15rem] cursor-pointer flex justify-around items-center">
        <Link to={ROUTER_PATH.HOME}>
          <img
            className="logo animate__animated animate__slideInUp"
            src="/logos/white-logo.png"
            alt=""
          />
        </Link>
      </div>
      {/* ---------------------center------------------- */}
      <nav ref={navRef} className="flex justify-between items-center gap-7">
        <Link to="/products/headphones">
          <span
            className={`${navStyle.navLink} ${
              param === "headphones" ? "text-yellow-600" : ""
            }`}
          >
            {t("HEADPHONES")}
          </span>
        </Link>
        <Link to="/products/earphones">
          <span
            className={`${navStyle.navLink} ${
              param === "earphones" ? "text-yellow-600" : ""
            }`}
          >
            {t("EARPHONES")}
          </span>
        </Link>
        <Link to="/products/accessories">
          <span
            className={`${navStyle.navLink} ${
              param === "accessories" ? "text-yellow-600" : ""
            }`}
          >
            {t("ACCESSORIES")}
          </span>
        </Link>
        <span className={navStyle.navLink}>{t("COLLABORATIONS")}</span>
        <span className={navStyle.navLink}>{t("BLOG")}</span>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <i className="fa-sharp fa-solid fa-x" />
        </button>
      </nav>

      {/* ---------------------right side------------------- */}
      <div className="flex justify-between items-center gap-2">
        {/* search  */}
        <form onSubmit={handleSearchResult}>
          <div className="input-wrapper">
            <button className="icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              placeholder={t("search")}
              className="inputSearch"
              name="text"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        {/* theme icon  */}
        <div className="icon-field mt-2">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={theme === "light" ? false : true}
              onChange={handleToggleChangeTheme}
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        <Link to={ROUTER_PATH.CART}>
          <div className="cursor-pointer hover:text-yellow-700">
            <ShoppingBagOutlinedIcon />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <span className="mt-1">{dataCart?.data?.length}</span>
        </div>

        {/* --------------toggle navbar------------- */}
        <div className="flex justify-between items-center">
          <button className="nav-btn mt-1 mr-3" onClick={showNavbar}>
            <i className="text-xl fa-regular fa-bars" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
