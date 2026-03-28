import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../component/Layout";
import HomePage from "../pages/features/Home";
import ViewPage from "../pages/features/View";
import CalcPage from "../pages/features/Calculator";
import WorkersData from "../pages/features/Worker";
import WorkerCalculation from "../pages/features/WorkerCalculation";
import CasualLabor from "../pages/features/CasualLabor";
import HarvesterData from "../pages/features/MechanizedHiring";
import DashBord from "../pages/features/Dashbord";

export const protectedRoutes = [
  {
    path: "/",
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      //default
      {
        index: true,
        element: <DashBord />,
      },
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
      {
        path: "/other/labor",
        element: <CasualLabor />,
      },
      { path: "/other/mechanized", element: <HarvesterData /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
