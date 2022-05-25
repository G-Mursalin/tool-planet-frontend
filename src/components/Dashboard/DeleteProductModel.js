import React from "react";

const DeleteProductModel = ({ product, handleDelete, setProduct }) => {
  return (
    <>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this product
          </h3>
          <p className="pt-4 font-bold">
            Product Name:&nbsp;
            <span className="font-semibold">{product.name}</span>
          </p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-7"
              onClick={() => setProduct(null)}
              className="btn"
            >
              cancel
            </label>
            <label
              htmlFor="my-modal-7"
              onClick={handleDelete}
              className="btn bg-red-800 text-white hover:bg-red-600"
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProductModel;
