// React
import React from "react";
// React Router
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// React Query
import { useQuery } from "react-query";
// Firebase Hook
import { signOut } from "firebase/auth";
import auth from "./../Authentication/Firebase/firebase.init";
// Components
import Loading from "../Utilities/Loading";
import CheckoutForm from "./CheckoutForm ";
// React Strip
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51L0ewEEKrvYKu07JVvEGZ9pVEVbsMczCJsd26URh6eFX7kvX1lTd23ou1x027Ny8qwIuKgc0ZAQgsmzHmz1oL5Vr00tLYw5o11"
);
const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: payProduct,
    isLoading,
    refetch,
  } = useQuery("payProduct", () =>
    fetch(`https://gentle-chamber-19518.herokuapp.com/order/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        signOut(auth);
        navigate("/un-authorize-access");
      }
      if (res.status === 403) {
        localStorage.removeItem("accessToken");
        signOut(auth);
        navigate("/forbidden-access");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="card max-w-md bg-base-100 shadow-xl my-12 mx-auto">
        <div className="card-body">
          <p className="text-success font-bold">
            Hello, {payProduct.customerName}
          </p>
          <h2 className="card-title">
            Please Pay for {payProduct.productName}
          </h2>
          <p>Please pay: ${payProduct.price}</p>
        </div>
      </div>
      <div className="card flex-shrink-0 max-w-md shadow-2xl bg-base-100 mx-auto">
        <div className="card-body">
          {/* <Elements stripe={stripePromise}>
            <CheckoutForm payProduct={payProduct} />
          </Elements> */}
        </div>
      </div>
    </div>
  );
};

export default Payment;
