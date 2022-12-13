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
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { price, productName, _id } = payProduct;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("  https://tool-planet.onrender.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    //confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: productName,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      setSuccess("Congrats! your payment is completed.");

      // Update payment to database
      const payment = {
        transactionId: paymentIntent.id,
        productId: _id,
      };
      setProcessing(true);
      fetch(` https://tool-planet.onrender.com/booking/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            navigate("/");
            signOut(auth);
            localStorage.removeItem("accessToken");
          }
          return res.json();
        })
        .then((data) => {
          setProcessing(false);
        });
    }
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
        {cardError && <p className="mt-3 text-red-500">{cardError}</p>}
        {success && (
          <p className="mt-3 text-green-500">
            {success}
            <span className="block font-bold">Your Transaction ID:</span>
            {transactionId}
          </p>
        )}
        {processing ? "Loading..." : ""}
        <button
          type="submit"
          className="btn btn-primary btn-sm mt-4"
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </Fragment>
  );
};

export default CheckoutForm;
