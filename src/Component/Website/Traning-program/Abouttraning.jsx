import React from "react";

const Abouttraning = () => {
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
            About Training Programs
          </h1>

          <p className="text-xl md:text-2xl text-blue-300 mt-4 font-semibold">
            Learn, Practice & Upgrade Your Skills
          </p>

          <p className="text-gray-200 mt-6 text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
            Our training programs are designed to give you hands-on experience,
            real-world projects, and industry-level knowledge — so you don’t
            just study,{" "}
            <span className="text-blue-400 font-semibold">
              you master the craft
            </span>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default Abouttraning;
