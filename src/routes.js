import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PersistLoginComponent from "./components/PersistLoginComponent";

import ManageUserPage from "./pages/manage-user-page/ManageUserPage";

import CoursePage from "./pages/course/CoursePage";
import QuestionPage from "./pages/question/QuestionPage";
import DashBoardPage from "./pages/dashboard/DashBoardPage";

const combinedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <PersistLoginComponent />,
        children: [
          {
            element: <ProtectedRoute allowedRoles={["1991", "2013", "2025"]} />,
            children: [
              {
                path: "/dashboard",
                element: <DashBoardPage />,
              },
              {
                path: "/questions",
                element: <QuestionPage />,
              },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={["1991", "2013"]} />,
            children: [
              {
                path: "/dashboard",
                element: <DashBoardPage />,
              },
              {
                path: "/questions",
                element: <QuestionPage />,
              },
              {
                path: "/courses",
                element: <CoursePage />,
              },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={["1991"]} />,
            children: [
              {
                path: "/dashboard",
                element: <DashBoardPage />,
              },
              {
                path: "/questions",
                element: <QuestionPage />,
              },
              {
                path: "/courses",
                element: <CoursePage />,
              },
              {
                path: "/users",
                element: <ManageUserPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const router = { combinedRouter };

export default router;
