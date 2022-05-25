// React
import React from "react";
import { useState } from "react";
// React Tostify
import { toast } from "react-toastify";

const AddAProduct = () => {
  const imgStorageKey = "c52e775809a1317e74d6f4056dd40a16";
  const [file, setFile] = useState();

  const handleAddProduct = (e) => {
    e.preventDefault();
    const addedProductInfo = {
      name: e.target.name.value,
      price: e.target.price.value,
      description: e.target.description.value,
      available_quantity: e.target.available.value,
      minimum_order_quantity: e.target.order.value,
    };
    const formData = new FormData();
    formData.append("image", file);
    fetch(`https://api.imgbb.com/1/upload?key=${imgStorageKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          addedProductInfo.img = result.data.image.url;
        }
        // Send to data base
        fetch("http://localhost:5000/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(addedProductInfo),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              toast.success(data.info);
            }
          });
      });

    e.target.reset();
  };

  return (
    <section className="text-gray-600 body-font relative">
      <h2 className="text-2xl mb-3">Add a new product</h2>
      <div className="container px-5 mx-auto">
        <form onSubmit={handleAddProduct} className="mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="price"
                  className="leading-7 text-sm text-gray-600"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  id="price"
                  name="price"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="img"
                  className="leading-7 text-sm text-gray-600"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  id="img"
                  name="img"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2  md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="available"
                  className="leading-7 text-sm text-gray-600"
                >
                  Available Quantity
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  id="available"
                  name="available"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 md:w-1/2 w-full">
              <div className="relative">
                <label
                  htmlFor="order"
                  className="leading-7 text-sm text-gray-600"
                >
                  Minimum Order Quantity
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  id="order"
                  name="order"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm text-gray-600"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  name="description"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Add Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAProduct;
