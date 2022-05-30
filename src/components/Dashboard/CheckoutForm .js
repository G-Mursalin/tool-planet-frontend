import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { signOut } from "firebase/auth";
import React, { Fragment, useState, useEffect } from "react";
import auth from "../Authentication/Firebase/firebase.init";
import { useNavigate } from "react-router-dom";
// Private repo to public repo
const CheckoutForm = ({ payProduct }) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { price } = payProduct;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(" https://gentle-chamber-19518.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => {
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
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm mt-4"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </Fragment>
  );
};

export default CheckoutForm;
