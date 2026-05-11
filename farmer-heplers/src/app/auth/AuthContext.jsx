import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import FarmerLoader from "./Loader";
import { userLoggedOut } from "../service/auth";
import { axiosInstance } from "../service/axiosIntance";
import { getActiveSeason } from "../service/season";

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
  const [season, setSeason] = useState({
    ...null,
    openModal: true,
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get(`/auth/status?t=${Date.now()}`);
        const data = await res.data;

        if (data.isLoggedIn === true) {
          setAuthState({
            isLoggedIn: data.isLoggedIn,
            user: data.user,
          });
          setIsLoading(false);
        } else {
          setAuthState({
            isLoggedIn: false,
            user: null,
          });
          setIsLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setAuthState({
          isLoggedIn: false,
          user: null,
        });
        console.log("auth provider api error : ", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const checkSeason = async () => {
      try {
        const res = await getActiveSeason();
        const data = res.data;
        if (data.status === "Success") {
          setSeason({
            ...data.data,
            openModal: false,
          });
        }
      } catch (err) {
        console.log(err.message);
        setSeason({
          openModal: true,
        });
        if (err.code === "ERR_CANCELED") {
          return;
        }
      }
    };
    checkSeason();
  }, [season.openModal]);

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
      localStorage.removeItem("token");
      sessionStorage.clear();
      const res = await userLoggedOut();
      const data = res.data;
      if (data.status === "success") {
        setAuthState({
          isLoggedIn: data.isLoggedIn,
          user: data.user,
        });
        setIsSignedUp(true);
        message.success(t(data.code));
        window.location.replace("https://farmer-accoutant.onrender.com/login");
      }
    } catch (err) {
      message.error(t("logout_error") || err.message);
      console.log(err.message);
    }
  };
  const goToSignUp = () => {
    localStorage.setItem("hasAccount", "false");
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
          season,
          setSeason,
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
