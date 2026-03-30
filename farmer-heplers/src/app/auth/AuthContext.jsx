import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userLoggedOut } from "../service/auth";
import { Alert, message, Spin } from "antd";
import { useTranslation } from "react-i18next";
import FarmerLoader from "./Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoanding] = useState(true);
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
          "https://farmer-accoutant-backend.onrender.com/user/status",
          {
            withCredentials: true,
          },
        );
        const data = await res.data;
        console.log(data);
        if (data.isLoggedIn) {
          setAuthState({
            isLoggedIn: data.isLoggedIn,
            user: data.user,
          });
          setIsLoanding(false);
        }
      } catch (err) {
        setAuthState({
          isLoggedIn: false,
          user: null,
        });
      } finally {
        setIsLoanding(false);
      }
    };
    checkAuth();
  }, []);
  console.log(authState);

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
      const res = await userLoggedOut();
      const data = await res.data;
      setAuthState({
        isLoggedIn: data.isLoggedIn,
        user: data.user,
      });
      message.success(t(data.code));
    } catch (err) {
      console.log(err.message);
    }
  };
  const goToSignUP = () => {
    localStorage.setItem("hasAccount", "false");
    logout();
    setIsSignedUp(false);
  };

  if (isLoading)
    return (
      <>
        <FarmerLoader />
        Loading ...
      </>
    );

  return (
    <AuthContext.Provider
      value={{
        authState,
        isSignedUp,
        signupComplete,
        loginComplete,
        logout,
        setIsSignedUp,
        goToSignUP,
        t,
        i18n,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
