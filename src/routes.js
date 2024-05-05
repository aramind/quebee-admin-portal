import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import AddCoursePage from "./pages/AddCoursePage";
import ManageQuestionPage from "./pages/ManageQuestionPage";
import ManageUserPage from "./pages/ManageUserPage";
import ManageCoursePage from "./pages/ManageCoursePage";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PersistLoginComponent from "./components/PersistLoginComponent";

const combinedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <PersistLoginComponent />,
        children: [
          {
            element: (
              <ProtectedRoute allowedRoles={["super", "admin", "editor"]} />
            ),
            children: [
              {
                path: "/dashboard",
                element: <DashBoardPage />,
              },
              {
                path: "/add-question",
                element: <AddQuestionPage />,
              },

              {
                path: "/manage-question",
                element: <ManageQuestionPage />,
              },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={["super", "admin"]} />,
            children: [
              {
                path: "/dashboard",
                element: <DashBoardPage />,
              },
              {
                path: "/add-question",
                element: <AddQuestionPage />,
              },
              {
                path: "/add-course",
                element: <AddCoursePage />,
              },
              {
                path: "/manage-question",
                element: <ManageQuestionPage />,
              },
              {
                path: "/manage-course",
                element: <ManageCoursePage />,
              },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={["super"]} />,
            children: [
              {
                path: "/dashboard",
                element: <DashBoardPage />,
              },
              {
                path: "/add-question",
                element: <AddQuestionPage />,
              },
              {
                path: "/add-course",
                element: <AddCoursePage />,
              },
              {
                path: "/manage-question",
                element: <ManageQuestionPage />,
              },
              {
                path: "/manage-course",
                element: <ManageCoursePage />,
              },
              {
                path: "/manage-user",
                element: <ManageUserPage />,
              },
            ],
          },
        ],
      },
      {
        path: "",
        element: <LandingPage />,
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
