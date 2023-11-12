import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
