// React

import React from "react";
import { useState } from "react";
// React Query
import { useQuery } from "react-query";
// React Route
import { useNavigate } from "react-router-dom";
// Components
import Loading from "./../Utilities/Loading";
import DeleteProductModel from "./DeleteProductModel";
// Firebase Hook
import { signOut } from "firebase/auth";
import auth from "./../Authentication/Firebase/firebase.init";
const ManageProducts = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch(" https://tool-planet.onrender.com/products", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }
  const handleProductDelete = () => {
    fetch(` https://tool-planet.onrender.com/product/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
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
        if (data.deletedCount > 0) {
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="text-2xl mb-3">Total products {products.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Product Name</th>
              <th>Available Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={product.img} alt={product.name} />
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.available_quantity}</td>
                <td>{product.price}</td>
                <td>
                  <label
                    onClick={() => setProduct(product)}
                    htmlFor="my-modal-7"
                    className="btn modal-button btn-xs"
                  >
                    Delete Product
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {product && (
          <DeleteProductModel
            product={product}
            handleDelete={handleProductDelete}
            setProduct={setProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
