// React
import React from "react";
// Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Authentication/Firebase/firebase.init";
import { useState } from "react";
// React Toast
import { toast } from "react-toastify";
// Components
import Loading from "../Utilities/Loading";
const OrderForm = ({
  minimum_order_quantity,
  available_quantity,
  productName,
  productId,
}) => {
  const [user, loading] = useAuthState(auth);
  const [quantityError, setQuantityError] = useState("");

  if (loading) {
    return <Loading />;
  }

  const handleQuantityError = (e) => {
    setQuantityError("");
    const quantityValue = +e.target.value;
    if (quantityValue < minimum_order_quantity) {
      setQuantityError(
        <p className="text-red-500">
          Sorry! You have to order minimum {minimum_order_quantity} piece
        </p>
      );
    }
    if (quantityValue > available_quantity) {
      setQuantityError(
        <p className="text-red-500">
          Sorry! We have only {available_quantity} piece left
        </p>
      );
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const orderDetails = {
      customerName: e.target.name.value,
      customerEmail: e.target.email.value,
      phone: e.target.phone.value,
      productName: productName,
      productId: productId,
      quantity: e.target.quantity.value,
      address: e.target.address.value,
    };

    // Send data to server
    fetch("https://gentle-chamber-19518.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.info);
        } else {
          toast.warn(data.info);
        }
      });
    e.target.reset();
  };
  return (
    <section className="text-gray-600 body-font relative ">
      <div className="container px-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Please fill up the form for complete the purchase
          </p>
        </div>
        <form onSubmit={handleOrder} className="mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 sm:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  disabled
                  value={user?.displayName}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  sm:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled
                  value={user?.email}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  sm:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  sm:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="quantity"
                  className="leading-7 text-sm text-gray-600"
                >
                  Order Quantity (in piece)
                </label>
                <input
                  type="number"
                  min={0}
                  id="quantity"
                  name="quantity"
                  required
                  onChange={handleQuantityError}
                  placeholder={`Minimum order quantity ${minimum_order_quantity} piece`}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {quantityError && quantityError}
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                  id="message"
                  name="address"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                disabled={quantityError}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
