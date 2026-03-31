import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import FarmerLoader from "./Loader";
import { userLoggedOut } from "../service/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(
    localStorage.getItem("hasAccount") === "true",
  );
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null,
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `https://farmer-accoutant-backend.onrender.com/user/status?t=${Date.now()}`,

          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
            withCredentials: true,
          },
        );
        const data = res.data;
        console.log(data);
        if (data && data.isLoggedIn) {
          setAuthState({
            isLoggedIn: data.isLoggedIn,
            user: data.user,
          });
          setIsLoading(false);
        } else {
          setAuthState({ isLoggedIn: false, user: null });
          setIsLoading(false);
        }
      } catch (err) {
        setAuthState({
          isLoggedIn: false,
          user: null,
        });
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const signupComplete = () => {
    localStorage.setItem("hasAccount", "true");
    setIsSignedUp(true);
  };

  const loginComplete = (userData) =>
    setAuthState({
      isLoggedIn: userData.isLoggedIn,
      user: userData.user,
    });

  const logout = async () => {
    try {
      setAuthState({ isLoggedIn: false, user: null });
      const res = await userLoggedOut();
      const data = res.data;
      if (data.status === "success") {
        localStorage.clear();
        sessionStorage.clear();
        setAuthState({
          isLoggedIn: data.isLoggedIn,
          user: data.user,
        });
        message.success(t(data.code));
      }
    } catch (err) {
      message.error(t("logout_error") || err.message);
    }
  };
  const goToSignUp = () => {
    localStorage.setItem("hasAccount", "false");
    logout();
    setIsSignedUp(false);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          authState,
          isSignedUp,
          signupComplete,
          loginComplete,
          logout,
          setIsSignedUp,
          goToSignUp,
          t,
          i18n,
        }}>
        {isLoading ? (
          <FarmerLoader isLoading={isLoading} user={authState.user} />
        ) : (
          children
        )}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
