import React from "react";
import CategoryGrid from "./CategoryGrid";

const CourseCategories = () => {
  return (
    <>
      <div className="text-center m-5 p-5">
        {/* Top blue bar */}
        <div className="bg-blue-600 text-white py-3 my-18 px-8 rounded-md inline-block text-lg md:text-xl font-medium">
          Course Categories
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6">
          Choose Your Preferred Course
        </h2>

        {/* Small underline */}
        <div className="w-24 h-[2px]  bg-blue-600 mx-auto mt-3"></div>

        {/* Paragraph */}
        <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
          Explore a variety of courses to enhance your skills <br />
          and learning journey.
        </p>
      </div>
      <div>
        <CategoryGrid />
      </div>
    </>
  );
};

export default CourseCategories;
