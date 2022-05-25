// React
import React from "react";
// Components
import Banner from "./Banner";
import Tools from "./Tools";
import Reviews from "./Reviews";
import BusinessSummary from "../BusinessSummary/BusinessSummary";
const Home = () => {
  return (
    <>
      <Banner />
      <Tools />
      <Reviews />
      <BusinessSummary />
    </>
  );
};

export default Home;
