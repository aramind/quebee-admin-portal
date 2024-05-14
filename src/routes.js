import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PersistLoginComponent from "./components/PersistLoginComponent";
import AddQuestionPage from "./pages/add-question-page/AddQuestionPage";
import ManageQuestionPage from "./pages/manage-question-page/ManageQuestionPage";
import ManageUserPage from "./pages/manage-user-page/ManageUserPage";
import AddCoursePage from "./pages/add-course-page/AddCoursePage";
import ManageCoursePage from "./pages/manage-course-page/ManageCoursePage";

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
            element: <ProtectedRoute allowedRoles={["1991", "2013"]} />,
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
            element: <ProtectedRoute allowedRoles={["1991"]} />,
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
