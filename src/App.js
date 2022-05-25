// React
import { Fragment } from "react";
// React Routes
import { Routes, Route } from "react-router-dom";
// React Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Products/Products";
import Login from "./components/Authentication/Login/Login";
import SignUp from "./components/Authentication/SignUp/SignUp";
import Order from "./components/Order/Order";
import RequireAuth from "./components/Authentication/RequireAuth/RequireAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import MyOrders from "./components/Dashboard/MyOrders";
import AddAReviews from "./components/Dashboard/AddAReviews";
import MyProfile from "./components/Dashboard/MyProfile";
import PageNotFound from "./components/ErrorPages/PageNotFound/PageNotFound";
import UnAuthorizeAccess from "./components/ErrorPages/UnAuthorizeAccess";
import ForbiddenAccess from "./components/ErrorPages/ForbiddenAccess";
import MakeAdmin from "./components/Dashboard/MakeAdmin";
import RequireAdmin from "./components/Authentication/RequireAdmin/RequireAdmin";
import AddAProduct from "./components/Dashboard/AddAProduct";
import ManageProducts from "./components/Dashboard/ManageProducts";
import ManageAllOrders from "./components/Dashboard/ManageAllOrders";
function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/order/:id"
          element={
            <RequireAuth>
              <Order />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyOrders />} />
          <Route path="add-review" element={<AddAReviews />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route
            path="make-admin"
            element={
              <RequireAdmin>
                <MakeAdmin />
              </RequireAdmin>
            }
          />
          <Route
            path="add-product"
            element={
              <RequireAdmin>
                <AddAProduct />
              </RequireAdmin>
            }
          />
          <Route
            path="manage-all-orders"
            element={
              <RequireAdmin>
                <ManageAllOrders />
              </RequireAdmin>
            }
          />
          <Route
            path="manageProducts"
            element={
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/un-authorize-access" element={<UnAuthorizeAccess />} />
        <Route path="/forbidden-access" element={<ForbiddenAccess />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Fragment>
  );
}

export default App;
