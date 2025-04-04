// credit: https://blog.stackademic.com/how-to-create-a-private-route-in-react-typescript-d43e2b162d46

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // check if token exists

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
