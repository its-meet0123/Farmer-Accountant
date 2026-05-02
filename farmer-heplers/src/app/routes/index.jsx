import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { useAuth } from "../auth/AuthContext";
import { logInRoutes, signUpRoutes } from "./public";
import { useMemo } from "react";
import SeasonModal from "../auth/SeasonModal";

export const AppRoutes = () => {
  const { authState, isSignedUp, season, setSeason } = useAuth();
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

  return (
    <>
      {element}
      {authState.user && season.openModal && (
        <SeasonModal
          season={season}
          setSeason={setSeason}
          userId={authState.user?.userId}
        />
      )}
    </>
  );
};
