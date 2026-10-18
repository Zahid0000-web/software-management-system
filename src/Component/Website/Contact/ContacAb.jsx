import React from "react";

const ContactAb = () => {
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
            Contact Us
          </h1>

          <p className="text-xl md:text-2xl text-blue-300 mt-4 font-semibold">
            We're Here to Help You Grow
          </p>

          <p className="text-gray-200 mt-6 text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
            Have questions, need guidance, or want to explore opportunities? Our
            team is always ready to support you. <br />
            Get in touch and take the next step toward your future.
          </p>
        </div>
      </section>
    </>
  );
};

export default ContactAb;
