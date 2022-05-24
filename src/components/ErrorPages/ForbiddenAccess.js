import React from "react";

const ForbiddenAccess = () => {
  return (
    <div className=" bg-red-500 w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl ">403</h1>
        <p className="text-2xl">Forbidden Access</p>
      </div>
    </div>
  );
};

export default ForbiddenAccess;
