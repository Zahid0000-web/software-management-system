import React from "react";
// import CoursesSection from "./CoursesSection";
import ServicesCourses from "./Courses";
import Abouttraning from "./Abouttraning";
import Footer from "../Home/CourseCategories/Footer";

const Traning = () => {
  return (
    <>
      <div>
        <Abouttraning />
        {/* <CoursesSection /> */}
        <ServicesCourses />
        <Footer />
      </div>
    </>
  );
};

export default Traning;
