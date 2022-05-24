// React
import React from "react";
// React Tostify
import { toast } from "react-toastify";
// React firebase hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Authentication/Firebase/firebase.init";
// Components
import Loading from "../Utilities/Loading";
const AddAReviews = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }
  const handleReview = (e) => {
    e.preventDefault();

    const reviewDetails = {
      name: user.displayName,
      rating: e.target.rating.value,
      message: e.target.message.value,
    };
    // Send data to server
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(reviewDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.info);
        }
      });
    e.target.reset();
  };

  return (
    <section className="text-gray-600 body-font relative">
      <h2 className="text-2xl mb-3">Add a review</h2>
      <div className="container px-5 py-24 mx-auto">
        <form onSubmit={handleReview} className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="rating"
                  className="leading-7 text-sm text-gray-600"
                >
                  Ratings ( 1 to 5 )
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  id="rating"
                  name="rating"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
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

export default AddAReviews;
