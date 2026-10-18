import React from "react";

const CoursesSection = () => {
  return (
    <section className="w-full mx-auto py-16 px-6 bg-[#F6F9FC] text-center">
      {/* Featured Courses badge */}
      <span className="bg-blue-600 text-white text-sm px-6 py-2 rounded-md font-semibold">
        Featured Courses
      </span>

      {/* Heading */}
      <h2 className="text-2xl font-bold mt-4">Explore Recent Courses</h2>

      {/* Underline */}
      <div className="h-1 w-24 bg-blue-600 rounded mx-auto my-4"></div>

      {/* Description */}
      <p className="text-gray-400 mb-6">
        Discover a variety of new courses designed to help you learn and grow.
      </p>
    </section>
  );
};

export default CoursesSection;
