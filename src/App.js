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
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Fragment>
  );
}

export default App;
