import React from "react";
import WhyImage from "../../../assets/image/about.avif";
import { FaEye } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-[#F6F9FC]">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <img
            src={WhyImage}
            alt="Why Choose KhiPry n Jiy"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Right Text + Cards */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Choose KhiPry n Jiy
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
             We provide a supportive learning environment where students and professionals can grow their skills through practical experience, real projects, and guided mentorship close to home. Our platform connects local talent with modern digital opportunities, helping youth build confidence, gain industry-ready skills, and prepare for a successful future in tech.

          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Our training is practical, delivered by industry experts, and our
            workspaces support creativity, collaboration, and innovation. We
            don’t just teach skills — we build confidence, careers, and a
            professional community committed to local economic growth.
          </p>

          {/* Cards with divider */}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-6 justify-center">
        {/* Vision Card */}
        <div className="w    sm:w-5/12 rounded-lg shadow-lg overflow-hidden min-h-[280px] relative">
          {/* Icon on top-center */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaEye className="text-green-600 text-4xl bg-white rounded-full p-1 shadow" />
          </div>
          <div className="bg-[#193CB8] text-white p-4 text-center mt-6">
            <h3 className="font-bold text-[30px]">Our Vision</h3>
          </div>
          <div className="bg-white p-6 px-10 h-full text-[22px] font-normal text-gray-700">
            To become Pakistan’s leading hub for digital learning and
            innovation, enabling youth to "Learn, Earn & Thrive" while
            contributing to their local communities. We aim to inspire
            creativity, leadership, and community-focused growth.
          </div>
        </div>

        {/* Mission Card */}
        <div className="w-full sm:w-5/12 rounded-lg shadow-lg overflow-hidden min-h-[280px] relative">
          {/* Icon on top-center */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <IoIosCheckmarkCircleOutline className="text-green-600 text-4xl bg-white rounded-full p-1 shadow" />
          </div>
          <div className="bg-[#193CB8] text-white p-4 text-center mt-6">
            <h3 className="font-bold text-[30px]">Our Mission</h3>
          </div>
          <div className="bg-white p-6 px-10 text-[22px] font-normal h-full  text-gray-700">
            To provide end-to-end digital skills training, professional
            workspaces, and practical empowering students, freelancers, and
            startups across Pakistan to innovate, succeed, and make a tangible
            impact in their communities.
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
