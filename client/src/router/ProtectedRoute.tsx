import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import AdminHome from "../pages/adminHomePage/AdminHome";
import PageNotFound from "../pages/pageNotFound/PageNotFound";

function useAuth() {
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3008/auth/status", {
          withCredentials: true,
        });
        setLoggedIn(true);
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuthStatus();
  }, []);

  return { isAuthChecked, isLoggedIn };
}

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, isAuthChecked } = useAuth();

  if (!isAuthChecked) {
    return null;
  }

  return <>{isLoggedIn ? <AdminHome /> : <PageNotFound />}</>;
};

export default ProtectedRoute;
