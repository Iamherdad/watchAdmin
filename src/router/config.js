import React from "react";
import { Navigate } from "react-router-dom";

import Login from "@/pages/login";
import Home from "@/pages/home";
import Gui from "@/pages/gui";
import Version from "@/pages/version";
import Star from "@/pages/star";
import NotFind from "@/pages/404";
import Demo from "@/pages/demo";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "gui",
        element: <Gui />,
      },
      {
        path: "",
        element: <Gui />,
      },
      {
        path: "star",
        element: <Star />,
      },
      {
        path: "version",
        element: <Version />,
      },
      {
        path: "demo",
        element: <Demo />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFind />,
  },
];

export default routes;
