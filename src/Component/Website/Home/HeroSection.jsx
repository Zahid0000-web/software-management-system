import React from "react";
import Image from "../../../assets/image/Home.png";
import { GrPlay } from "react-icons/gr";

const HeroSection = () => {
  return (
    <div>
      <div className="flex items-center justify-between space-x-8 px-16 bg-[#f8fafc] min-h-screen pt-40 pb-20">
        {/* Left Side - Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-black">
            Start Learning Today <br /> to Boost Your Skills
          </h1>
          <p className="text-gray-600 font-normal text-sm">
            Designing a platform that inspires students to learn and grow <br />
            always. To make your life easier, we are <br />
            introducing our Learning Platform template.
          </p>

          {/* Search Box */}
          <div className="px-4 py-2 bg-white space-y-4 border border-gray-300">
            <div className="flex items-end gap-4 text-sm">
              {/* What Input */}
              <div>
                <label className="block text-sm font-semibold text-black mb-[1px]">
                  What
                </label>
                <div className="flex items-center relative pr-2 mr-4">
                  <span className="absolute right-0 h-10 bottom-1 w-px bg-gray-300"></span>
                  <input
                    type="text"
                    placeholder="What course you want"
                    className="w-full py-1 text-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Where Input */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-black mb-[1px]">
                  Where
                </label>
                <input
                  type="text"
                  placeholder="Preferred Location / Online"
                  className="w-full py-1 text-gray-600 focus:outline-none"
                />
              </div>

              {/* Search Button */}
            </div>
          </div>

          {/* Popular Keywords */}
          <div className="mt-4 py-4 flex">
            <p className="text-sm text-blue-600 mb-1 pr-3 font-semibold">
              Popular Courses:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Web Development",
                "UI/UX Design",
                "Data Science",
                "Marketing",
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="border border-gray-200 hover:bg-indigo-700 hover:text-white text-gray-400 text-xs px-3 py-1"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div className="flex justify-center relative">
          <img
            src={Image}
            alt="learning"
            className="w-[33rem] h-[30rem] object-cover rounded-tr-[5rem] rounded-bl-[5rem] shadow-lg"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="relative w-16 h-16 bg-blue-700 rounded-full shadow-lg flex items-center justify-center
                       hover:bg-white transition-all duration-300 hover:scale-110 border-4 border-transparent overflow-hidden group"
            >
              <GrPlay
                size={28}
                className="ml-1 text-white group-hover:text-blue-700 transition-colors duration-300"
              />
              <span className="absolute inset-0 rounded-full border-4 border-white opacity-0 group-hover:opacity-70 group-hover:animate-ping scale-150"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
