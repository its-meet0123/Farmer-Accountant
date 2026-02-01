import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userLoggedOut } from "../service/auth";

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
    await userLoggedOut();
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
  };
  const goToSignUP = () => {
    localStorage.setItem("hasAccount", "false");
    setIsSignedUp(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        authState,
        isSignedUp,
        signupComplete,
        loginComplete,
        logout,
        setIsSignedUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
