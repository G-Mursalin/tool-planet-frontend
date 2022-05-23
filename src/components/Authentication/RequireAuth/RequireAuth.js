// React
import React from "react";
// Components
import Loading from "../../Utilities/Loading";
// React Router
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// React Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.init";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
