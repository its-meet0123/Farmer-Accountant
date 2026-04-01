import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import FarmerLoader from "./Loader";
import { userLoggedOut } from "../service/auth";
import { axiosInstance } from "../service/axiosIntance";

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
        const res = await axiosInstance.get(`/user/status?t=${Date.now()}`);
        const data = await res.data;

        console.log(data);

        if (data.isLoggedIn === "ture") {
          if (data.accessToken) {
            localStorage.setItem("token", data.accessToken);
          }
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
      localStorage.clear();
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
        console.log("auth state", data);
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

  console.log("auth sate console", authState);
  console.log("singup checking console in auth ", isSignedUp);

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
