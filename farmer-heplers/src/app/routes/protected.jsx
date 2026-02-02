import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../component/Layout";
import HomePage from "../pages/features/Home";
import ViewPage from "../pages/features/View";
import CalcPage from "../pages/features/Calculator";
import WorkersData from "../pages/features/Worker";
import WorkerCalculation from "../pages/features/WorkerCalculation";

export const protectedRoutes = [
  {
    path: "/",
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      //home
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/view",
        element: <ViewPage />,
      },
      {
        path: "/view/calc",
        element: <CalcPage />,
      },
      {
        path: "/worker",
        element: <WorkersData />,
      },
      {
        path: "/worker/calc",
        element: <WorkerCalculation />,
      },

      { path: "*", element: <Navigate to="/home" /> },
    ],
  },
];
