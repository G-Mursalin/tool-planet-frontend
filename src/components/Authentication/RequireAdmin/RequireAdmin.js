// React
import React from "react";
// React Router
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.init";
import { signOut } from "firebase/auth";
// Components
import useAdmin from "../../UseHook/useAdmin";
import Loading from "../../Utilities/Loading";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const location = useLocation();

  if (loading || adminLoading) {
    return <Loading />;
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
