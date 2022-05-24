// React
import React from "react";
// React Router
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
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
          <li>
            <Link to="/dashboard">My Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/add-review">Add a review</Link>
          </li>
          <li>
            <Link to="/dashboard/my-profile">My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
