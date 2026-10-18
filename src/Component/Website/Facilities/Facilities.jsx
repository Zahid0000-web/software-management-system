import React from "react";
import Footer from "../Home/CourseCategories/Footer";
import Facilities1 from "./Facilities1";

const Facilities = () => {
  return (
    <>
      <section
        className="w-full h-[90vh] bg-cover bg-center bg-no-repeat relative flex items-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-left px-16 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Facilities We Offer
          </h1>

          <p className="text-xl md:text-2xl text-blue-300 mt-4 font-semibold">
            Bringing You the Best Learning Environment
          </p>

          <p className="text-gray-200 mt-6 text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
            From modern labs to comfortable workspaces — we provide everything
            you need to focus, create, and grow. Our goal is to give you a
            professional environment where{" "}
            <span className="text-blue-400 font-semibold">
              skills turn into success
            </span>
            .
          </p>
        </div>
      </section>

      <Facilities1 />
      <Footer />
    </>
  );
};

export default Facilities;
