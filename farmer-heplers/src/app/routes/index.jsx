import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { useAuth } from "../auth/AuthContext";
import { logInRoutes, signUpRoutes } from "./public";
import { useMemo } from "react";

export const AppRoutes = () => {
  const { authState, isSignedUp } = useAuth();
  console.log(authState, isSignedUp);

  const routesConfig = useMemo(() => {
    if (authState.user) {
      return protectedRoutes;
    }
    if (isSignedUp) {
      return logInRoutes;
    }
    return signUpRoutes;
  }, [authState.user, isSignedUp]);

  const element = useRoutes(routesConfig);

  return <>{element}</>;
};
