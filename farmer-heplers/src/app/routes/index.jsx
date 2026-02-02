import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { useAuth } from "../auth/AuthContext";
import { logInRoutes, signUpRoutes } from "./public";

export const AppRoutes = () => {
  const { authState, isSignedUp } = useAuth();
  console.log(authState, isSignedUp);

  if (authState.user) {
    const element = useRoutes(protectedRoutes);

    return <>{element}</>;
  }

  if (isSignedUp) {
    const element = useRoutes(logInRoutes);
    return <>{element}</>;
  }

  const element = useRoutes(signUpRoutes);
  return <>{element}</>;
};
