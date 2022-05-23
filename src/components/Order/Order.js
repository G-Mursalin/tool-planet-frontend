// React
import React from "react";
// React Query
import { useQuery } from "react-query";
// React Route
import { useParams } from "react-router-dom";
// Components
import Loading from "../Utilities/Loading";
import OrderForm from "./OrderForm";
const Order = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery(["product", id], () =>
    fetch(`http://localhost:5000/product/${id}`).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  const {
    name,
    img,
    price,
    description,
    available_quantity,
    minimum_order_quantity,
  } = product;

  return (
    <section className="md:px-16">
      <h1 className="mt-20 text-center md:text-5xl text-3xl  font-bold">
        Product Information
      </h1>
      <div className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-60 verflow-hidden">
              <img
                alt="product img"
                className="object-cover object-center h-full w-full"
                src={img}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    {name}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base">{description}</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-xl font-bold">Price:{price}</h1>
                <h2>Available: {available_quantity} piece left</h2>
                <h2>Minimum Order: {minimum_order_quantity} piece</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderForm
        minimum_order_quantity={minimum_order_quantity}
        available_quantity={available_quantity}
        productName={name}
        productId={id}
      />
    </section>
  );
};

export default Order;
