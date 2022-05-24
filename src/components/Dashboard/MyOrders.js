// React
import React, { useState, useEffect } from "react";
// Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../Authentication/Firebase/firebase.init";
import { signOut } from "firebase/auth";
// React Query
import { useQuery } from "react-query";
// React Route
import { useNavigate } from "react-router-dom";
// Components
import Loading from "../Utilities/Loading";
import DeleteModal from "./DeleteModal";

const MyOrders = () => {
  const [user, ULoading] = useAuthState(auth);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`http://localhost:5000/order?email=${user.email}`, {
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

  const handleDelete = () => {
    fetch(`http://localhost:5000/order/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
        }
      });
  };

  if (ULoading || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-2xl mb-3">Your total order {orders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Phone</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.phone}</td>
                <td>
                  <button className="btn btn-xs">Pay Now</button>
                </td>
                <td>
                  <label
                    onClick={() => setProduct(product)}
                    htmlFor="my-modal-6"
                    className="btn modal-button btn-xs"
                  >
                    cancel order
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {product && (
          <DeleteModal
            product={product}
            handleDelete={handleDelete}
            setProduct={setProduct}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
