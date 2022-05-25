// React
import React from "react";
// Components
import Banner from "./Banner";
import Tools from "./Tools";
import Reviews from "./Reviews";
import BusinessSummary from "../BusinessSummary/BusinessSummary";
import Supports from "./Supports";
const Home = () => {
  return (
    <>
      <Banner />
      <Tools />
      <Reviews />
      <BusinessSummary />
      <Supports />
    </>
  );
};

export default Home;
