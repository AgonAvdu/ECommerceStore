import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../store/accountSlice";
export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = useSelector(getUser);
  console.log(location.pathname);

  if (!user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
