import React from "react";
import Navbar from "./Navbar/Navbar";

import Footer from "./Home/CourseCategories/Footer";
import HeroSection from "./Home/HeroSection";
import LearningSteps from "./Home/LearningSteps";
import CourseCategories from "./Home/CourseCategories/CourseCategories";
import LearningFeature from "./Home/CourseCategories/LearningFeature";
import ApplySection from "./Home/ApplySection";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ApplySection />

      <LearningSteps />
      <CourseCategories />
      <LearningFeature />

      <Footer />
    </>
  );
};

export default Home;
