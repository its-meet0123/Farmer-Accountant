import { Navigate } from "react-router-dom";

import LogIn from "../pages/auth/LogIn";
import SignUp from "../pages/auth/SignUp";

export const signUpRoutes = [
  {
    path: "/signup",
    element: <SignUp />,
  },
  { path: "*", element: <Navigate to="/signup" /> },
];

export const logInRoutes = [
  {
    path: "/login",
    element: <LogIn />,
  },
  { path: "*", element: <Navigate to="/login" /> },
];
