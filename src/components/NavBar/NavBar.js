import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const menuItems = (
    <Fragment>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li tabIndex="0">
        <NavLink to="/products" className="justify-between">
          Products
        </NavLink>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </Fragment>
  );

  return (
    <div className=" md:px-16 navbar bg-base-200 fixed top-0 left-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          Tool Planet
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default NavBar;
