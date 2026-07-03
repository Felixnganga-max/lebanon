import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProgramCards from "../components/ProgramCards";
import CourseSearch from "../components/CourseSearch";
import WhyChooseUs from "../components/WhyChooseUs";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import Faculty from "../components/Faculty";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProgramCards />
      <CourseSearch />
      <WhyChooseUs />
      <Faculty />
      <Gallery />
    </div>
  );
};

export default Home;
