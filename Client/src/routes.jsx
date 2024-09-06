import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate, BrowserRouter } from "react-router-dom";
import Loader from ".//utils/Loader.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


/****Auth Pages*****/
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const ForgotPassword = lazy(() =>
  import("./components/Auth/ForgotPassword.jsx")
);
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword.jsx"));
const VerifyOtp = lazy(() => import("./components/Auth/VerifyOtp.jsx"));
const PrivateRoute = lazy(() => import("./components/Auth/PrivateRoute.jsx"));

/****Layouts*****/

const UserLayout = lazy(() => import("./components/UserPages/Layouts/UserLayout.jsx"));
const FullLayout = lazy(() =>
  import("./components/AdminPages/layouts/FullLayout.jsx")
);
const SettingLayout = lazy(() =>
  import("./components/UserPages/Layouts/SettingLayout.jsx")
);
const QuestionLayout = lazy(() =>
  import("./components/UserPages/Layouts/QuestionLayout.jsx")
);

/****User Pages*****/

const Home = lazy(() => import("./components/UserPages/Pages/home.jsx"));
const CustomNavbar = lazy(() => import("./components/UserPages/Navbar/Navbar.jsx"));
const QuestionForYou = lazy(() =>
  import("./components/UserPages/Questions/QuestionsForYou.jsx")
);
const AnswerRequest = lazy(() =>
  import("./components/UserPages/Questions/AnswerRequest.jsx")
);
const Draft = lazy(() => import("./components/UserPages/Questions/Draft.jsx"));
const ViewProfile = lazy(() =>
  import("./components/UserPages/Profile/ViewProfile.jsx")
);

/****Admin Pages*****/
const Starter = lazy(() => import("./components/AdminPages/views/Starter.jsx"));

const Users = lazy(() => import("./components/AdminPages/Users.jsx"));

const MemberProfile = lazy(() =>
  import("./components/AdminPages/MemberProfile.jsx")
);
const AddMembers = lazy(() => import("./components/AdminPages/AddMembers.jsx"));
const EditMembers = lazy(() =>
  import("./components/AdminPages/EditMembers.jsx")
);
const Members = lazy(() => import("./components/AdminPages/Members.jsx"));

const About = lazy(() => import("./components/AdminPages/views/About.jsx"));
const Alerts = lazy(() =>
  import("./components/AdminPages/views/ui/Alerts.jsx")
);
const Badges = lazy(() =>
  import("./components/AdminPages/views/ui/Badges.jsx")
);
const Buttons = lazy(() =>
  import("./components/AdminPages/views/ui/Badges.jsx")
);
const Cards = lazy(() => import("./components/AdminPages/views/ui/Cards.jsx"));
const Grid = lazy(() => import("./components/AdminPages/views/ui/Grid.jsx"));
const Tables = lazy(() =>
  import("./components/AdminPages/views/ui/Tables.jsx")
);
const Forms = lazy(() => import("./components/AdminPages/views/ui/Forms.jsx"));
const Breadcrumbs = lazy(() =>
  import("./components/AdminPages/views/ui/Breadcrumbs.jsx")
);

/****Common Pages*****/
const ErrorPage = lazy(() => import("./components/Auth/Errorpage.jsx"));

function AppRoutes() {
  const routes = useRoutes([
    // Auth routes
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgotpassword", element: <ForgotPassword /> },
    { path: "/resetpassword", element: <ResetPassword /> },
    { path: "/resetpassword/:token", element: <ResetPassword /> },
    { path: "/navbar", element: <CustomNavbar /> },
    { path: "/verify-otp", element: <VerifyOtp /> },
    { path: "/verify-otp/:email", element: <VerifyOtp /> },

    // User routes
    {
      path: "/user",
      element: <PrivateRoute element={<UserLayout />} role="user" />,
      children: [{ path: "", element: <Home /> }],
    },

    // Question-related routes
    {
      path: "/question",
      element: <PrivateRoute element={<QuestionLayout />} role="user" />,
      children: [
        { path: "questionforyou", element: <QuestionForYou /> },
        { path: "answer-request", element: <AnswerRequest /> },
        { path: "draft", element: <Draft /> },
      ],
    },

    // Settings and profile routes
    {
      path: "/settings-page",
      element: <PrivateRoute element={<SettingLayout />} role="user" />,
      children: [{ path: "view-page", element: <ViewProfile /> }],
    },

    // Admin routes
    {
      path: "/admin",
      element: <PrivateRoute element={<FullLayout />} role="admin" />,
      children: [
        { path: "", element: <Navigate to="users" /> },
        { path: "users", element: <Users /> },
        { path: "memberprofile", element: <MemberProfile /> },
        { path: "addMembers", element: <AddMembers /> },
        { path: "editMembers", element: <EditMembers /> },
        { path: "members", element: <Members /> },
        { path: "starter", element: <Starter /> },
        { path: "about", element: <About /> },
        { path: "alerts", element: <Alerts /> },
        { path: "badges", element: <Badges /> },
        { path: "buttons", element: <Buttons /> },
        { path: "cards", element: <Cards /> },
        { path: "grid", element: <Grid /> },
        { path: "table", element: <Tables /> },
        { path: "forms", element: <Forms /> },
        { path: "breadcrumbs", element: <Breadcrumbs /> },
      ],
    },
    // Fallback for undefined routes
    { path: "*", element: <ErrorPage /> },
  ]);

  return routes;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}
