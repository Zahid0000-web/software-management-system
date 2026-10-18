import React from "react";
import img1 from "../../../../assets/image/Job1.jpg";
import img2 from "../../../../assets/image/Job2.jpg";
import img3 from "../../../../assets/image/Job3.jpg";
import { IoPricetagOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi2";
import { PiEyeLight } from "react-icons/pi";

const posts = [
  {
    image: img1,
    title: "The Internet Is A Job Seeker Most Crucial Success",
    category: "Job Skills",
    date: "12-09-2023",
    views: "55",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.",
  },
  {
    image: img2,
    title: "Today From Connecting With Potential Employers",
    category: "Career Advice",
    date: "10-10-2023",
    views: "55",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.",
  },
  {
    image: img3,
    title: "We’ve Weeded Through Hundreds Of Job Hunting",
    category: "Future Plan",
    date: "09-05-2023",
    views: "55",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.",
  },
];

const News = () => {
  return (
    <section className="bg-[#FFFFFF]  ">
      {/* Section Header */}
      <div className="text-center py-30 mx-auto">
        <span className="text-xs font-semibold bg-[#2042E3] text-white px-5 py-2 rounded-sm uppercase">
          Latest News
        </span>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Latest News & Blog
        </h2>
        <div className="w-16 h-[2px] bg-blue-600 mx-auto mt-2"></div>
        <p className="mt-4 text-gray-500 text-sm">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </p>
      </div>

      {/* Blog Cards */}
      <div className=" flex gap-6 px-16 ">
        {posts.map(
          ({ image, title, category, date, views, description }, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105"
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-base text-[22px] font-semibold text-gray-900">
                  {title}
                </h3>
                <div className="h-[1px] w-full my-4  bg-gray-300"></div>

                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-[12px] text-gray-500 mt-3">
                  <span className="px-2 py-1 bg-[#EBEDFA] rounded flex items-center  text-[#1F41E1] cursor-pointer hover:bg-[#1F41E1] hover:text-white transition duration-600 ">
                    <IoPricetagOutline className=" mx-1" />
                    {category}
                  </span>
                  <span className="px-2 py-1 bg-[#EBEDFA] rounded flex items-center text-[#1F41E1] cursor-pointer hover:bg-[#1F41E1] hover:text-white transition duration-600 ">
                    <BsCalendar2Date className=" mx-1" />

                    {date}
                  </span>
                  <span className="px-2 py-1 bg-[#EBEDFA] rounded flex items-center text-[#1F41E1] cursor-pointer hover:bg-[#1F41E1] hover:text-white transition duration-600 ">
                    <PiEyeLight className=" mx-1" />

                    {views}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-gray-500 text-sm">{description}</p>

                {/* Button */}
                <button className="mt-6 bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded hover:bg-blue-700 transition cursor-pointer">
                  Read More
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default News;
