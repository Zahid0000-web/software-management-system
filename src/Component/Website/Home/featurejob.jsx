import React from "react";
import job1 from "../../../assets/image/Job1.jpg";
import job2 from "../../../assets/image/Job2.jpg";
import job3 from "../../../assets/image/Job3.jpg";
import job4 from "../../../assets/image/Job4.jpg";
import job5 from "../../../assets/image/Job5.jpg";
import job6 from "../../../assets/image/Job6.jpg";
import { GrLocation } from "react-icons/gr";
import { IoBagRemoveOutline, IoBookmarkOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";

const courses = [
  {
    title: "Graphic Designing",
    category: "Designing",
    level: "Beginner",
    fee: "Rs 15,000",
    image: job1,
  },
  {
    title: "Restaurant Management",
    category: "Hospitality",
    level: "Intermediate",
    fee: "Rs 18,000",
    image: job2,
  },
  {
    title: "Stock Market Learning",
    category: "Finance",
    level: "Beginner",
    fee: "Rs 12,500",
    image: job3,
  },
  {
    title: "Medical Lab Training",
    category: "Medical",
    level: "Advanced",
    fee: "Rs 22,000",
    image: job4,
  },
  {
    title: "Automobile Technician",
    category: "Automobile",
    level: "Beginner",
    fee: "Rs 20,000",
    image: job5,
  },
  {
    title: "IT & Networking",
    category: "Information Tech",
    level: "Intermediate",
    fee: "Rs 25,000",
    image: job6,
  },
];

const FeatureCourses = () => {
  return (
    <section className="py-16 px-16 bg-[#FFFFFF]">
      {/* Section Header */}
      <div className="text-center py-30 mx-auto">
        <span className="text-sm font-semibold bg-[#1E3FDA] text-white px-4 py-2 rounded-sm">
          FEATURED COURSES
        </span>

        <h2 className="text-4xl font-bold mt-4">
          Browse Featured <span className="text-blue-600">Courses</span>
        </h2>

        <div className="h-[2px] w-30 bg-[#1E3FDA] mx-auto my-6"></div>
        <p className="text-gray-500 mt-2 text-sm">
          Explore high-quality professional courses designed to build real-world
          skills and boost your career.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Course Image */}
            <div className="relative overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
              />

              {/* Featured Ribbon */}
              <div className="absolute top-4 -right-12 rotate-45 bg-blue-600 text-white text-[12px] font-semibold px-12 py-1 shadow-lg">
                FEATURED
              </div>
            </div>

            {/* Course Content */}
            <div className="p-5 px-5">
              <h3 className="text-lg font-semibold">{course.title}</h3>

              <div className="h-[1px] w-full bg-[#EEEEEE] my-6"></div>

              <div className="flex justify-between gap-2 mt-3 text-xs text-gray-600">
                <span className="bg-[#e8eaf8] text-blue-700 flex items-center gap-1 px-3 py-1 rounded">
                  <GrLocation />
                  {course.category}
                </span>

                <span className="bg-[#e8eaf8] flex items-center gap-1 text-blue-700 px-3 py-1 rounded">
                  <IoBagRemoveOutline />
                  {course.level}
                </span>

                <span className="bg-[#e8eaf8] flex items-center text-blue-700 px-3 py-1 rounded">
                  <LuDollarSign />
                  {course.fee}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Learn industry-level professional skills with hands-on training
                and expert guidance.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 mt-5">
                <button className="bg-blue-600 text-white text-[15px] cursor-pointer font-semibold text-center px-9 py-3 rounded hover:bg-black hover:text-white transition duration-600">
                  Enroll Now
                </button>

                <button className="text-[15px] flex border items-center gap-[5px] px-8 py-3 cursor-pointer border-gray-300 font-semibold rounded hover:bg-blue-700 hover:text-white transition duration-600">
                  <IoBookmarkOutline className="text-[19px]" />
                  Save Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCourses;
