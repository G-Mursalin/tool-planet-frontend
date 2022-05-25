// React
import React from "react";
import { useState } from "react";
// React Query
import { useQuery } from "react-query";
// Components
import Loading from "./../Utilities/Loading";
import DeleteProductModel from "./DeleteProductModel";
const ManageProducts = () => {
  const [product, setProduct] = useState(null);
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch("https://gentle-chamber-19518.herokuapp.com/products", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }
  const handleProductDelete = () => {
    fetch(`https://gentle-chamber-19518.herokuapp.com/product/${product._id}`, {
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

  return (
    <div>
      <h2 className="text-2xl mb-3">Total products {products.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
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
