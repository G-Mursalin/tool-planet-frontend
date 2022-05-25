// React
import React from "react";
// React Router
import { Link, Outlet } from "react-router-dom";
// Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Authentication/Firebase/firebase.init";
// Components
import useAdmin from "../UseHook/useAdmin";
const Dashboard = () => {
  const [use] = useAuthState(auth);
  const [admin] = useAdmin(use);
  return (
    <div className="mt-20 md:px-16 drawer drawer-mobile">
      <input id="dashboard" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <h1 className="text-3xl text-primary mb-3 font-bold">
          Welcome to dashboard
        </h1>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {!admin && (
            <li>
              <Link to="/dashboard">My Orders</Link>
            </li>
          )}

          {!admin && (
            <li>
              <Link to="/dashboard/add-review">Add a review</Link>{" "}
            </li>
          )}

          {admin && (
            <>
              <li>
                <Link to="/dashboard/make-admin">Make Admin</Link>
              </li>
              <li>
                <Link to="/dashboard/add-product">Add Product</Link>
              </li>
              <li>
                <Link to="/dashboard/manageProducts">Manage Product</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-all-orders">Manage All Orders</Link>
              </li>
            </>
          )}

          <li>
            <Link to="/dashboard/my-profile">My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
