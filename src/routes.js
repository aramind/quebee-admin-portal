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
import RequireAuth from "./components/RequireAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import { useGlobalState } from "./context/ContextProvider";

const combinedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <RequireAuth allowedRoles={["admin", "super"]} />,
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
      {
        element: <RequireAuth allowedRoles={["super", "admin", "editor"]} />,
        children: [
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
    ],
  },
]);

const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
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
]);

const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <LoginPage />,
  },
  {
    path: "/add-question",
    element: <LoginPage />,
  },
  {
    path: "/add-course",
    element: <LoginPage />,
  },
  {
    path: "/manage-question",
    element: <LoginPage />,
  },
  {
    path: "/manage-course",
    element: <LoginPage />,
  },
  {
    path: "/manage-user",
    element: <LoginPage />,
  },
]);

const router = { combinedRouter, publicRouter, privateRouter };

export default router;
