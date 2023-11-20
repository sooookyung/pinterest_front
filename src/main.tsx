import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  type LoaderFunction,
  Outlet,
  redirect,
  redirectDocument,
  RouterProvider,
} from "react-router-dom";
import TestPage from "./components/TestPage.tsx";
import OmokBoard from "./components/OmokBoard.tsx";
import PinLayout from "./components/Pinlayout.tsx";
import Imageprac from "./components/Imageprac.tsx";
// import MainPage from "./components/MainPage.tsx";
import UserProfile from "./components/UserProfile.tsx";
import MakePin from "./components/MakePin.tsx";
import UserProvider from "./components/UserProvider.tsx";
import PinBuilder from "./components/PinBuilder.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./api/theme.ts";
import ProfileTab from "./components/ProfileTab.tsx";
import ProfileFooter from "./components/ProfileFooter.tsx";
import EditProfilePage from "./components/EditProfilePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WelcomePage from "./components/WelcomePage.tsx";

const checkLogin: LoaderFunction = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return redirect("/signup");
  } else {
    return null;
  }
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <UserProvider>
          <Outlet />
        </UserProvider>
      ),
      // errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <WelcomePage />,
        },
        {
          path: "test",
          element: <TestPage />,
        },
        {
          path: "omok",
          element: <OmokBoard />,
        },
        {
          path: "feed",
          element: <PinLayout />,
          loader: checkLogin,
        },
        {
          path: "image",
          element: <Imageprac />,
        },
        {
          path: "pin/:seq",
          element: <PinBuilder />,
        },
        {
          path: "makepin",
          element: <MakePin />,
          loader: checkLogin,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "profiletab",
          element: <ProfileTab />,
          loader: checkLogin,
        },
        {
          path: "profilefooter",
          element: <ProfileFooter />,
        },
        {
          path: "editprofilepage",
          element: <EditProfilePage />,
        },
        {
          path: "user/:id",
          element: <UserProfile />,
        },
        {
          path: "/pins/search/pinSearch/:inputValue",
          element: <PinLayout />,
          loader: checkLogin,
        },

        {
          path: "logout",
          loader: () => {
            localStorage.removeItem("user");
            return redirectDocument("/");
          },
        },
      ],
    },
  ],
  { basename: "/" },
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
