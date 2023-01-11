import { useRoutes, useLocation, Navigate } from "react-router-dom";
import routes from "./config.js";

const Router = () => {
  const token = window.localStorage.getItem("token");
  const location = useLocation();
  const { pathname } = location;
  console.log(token, "toekn");
  if (pathname !== "/login" && !token) {
    return <Navigate to="/login"></Navigate>;
  }

  return useRoutes(routes);
};

export default Router;
