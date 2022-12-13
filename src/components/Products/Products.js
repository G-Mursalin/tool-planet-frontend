// React
import React from "react";
// Components
import Loading from "../Utilities/Loading";
import Product from "./Product";
// React Query
import { useQuery } from "react-query";

const Products = () => {
  const { data: products, isLoading } = useQuery("products", () =>
    fetch(" https://tool-planet.onrender.com/products", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="mt-20 text-center md:text-5xl text-3xl  font-bold">
        Our Products
      </h1>
      <section className="md:px-16 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="grid max-w-md gap-10 row-gap-8 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
