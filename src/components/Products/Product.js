import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const {
    _id,
    name,
    img,
    price,
    description,
    available_quantity,
    minimum_order_quantity,
  } = product;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <h1 className="text-xl font-bold">Price:{price}</h1>
        <h2>Available: {available_quantity} piece left</h2>
        <h2>Minimum Order: {minimum_order_quantity} piece</h2>
        <div className="card-actions justify-end mt-3">
          <Link to={`/order/${_id}`} className="btn btn-primary">
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
