// React
import React from "react";
// Components
import Review from "./Review";
// React Browser
import { Link, useNavigate } from "react-router-dom";
// React Query
import { useQuery } from "react-query";
// Firebase Hook
import { signOut } from "firebase/auth";
import auth from "./../Authentication/Firebase/firebase.init";
// Components
import Loading from "../Utilities/Loading";
const Reviews = () => {
  const navigate = useNavigate();
  const { data: reviews, isLoading } = useQuery("reviews", () =>
    fetch("http://localhost:5000/reviews", {
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

  if (isLoading) {
    return <Loading />;
  }

  if (!reviews.length) {
    return (
      <section className="text-gray-600 body-font">
        <h1 className="text-center md:text-5xl text-3xl font-bold">Reviews</h1>
        <h2 className="text-center md:text-4xl text-2xl my-6">
          No reviews added yet.&nbsp;
          <Link to="/dashboard/add-review" className="underline">
            Add one
          </Link>
        </h2>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <h1 className="text-center md:text-5xl text-3xl font-bold">Reviews</h1>
      <div className="container px-16 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
