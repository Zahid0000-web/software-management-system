import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import testi1 from "../../../assets/image/testi1.jpg";
import testi2 from "../../../assets/image/testi2.jpg";
import testi3 from "../../../assets/image/testi3.jpg";
import mainImage from "../../../assets/image/testimain.png";
import { HiArrowLongRight } from "react-icons/hi2";
import { HiArrowLongLeft } from "react-icons/hi2";

const TeamData = [
  {
    text: "I just brought it and I love it. Lorem Ipsum is simply dummy text of the typesetting industry.",
    name: "Musharof Chowdhury",
    role: "CEO - Graygrids",
    image: testi1,
  },
  {
    text: "This service exceeded my expectations. Lorem Ipsum has been the industry's standard dummy text.",
    name: "John Doe",
    role: "CTO - ExampleCorp",
    image: testi2,
  },
  {
    text: "Very professional and reliable. Lorem Ipsum has been used for typesetting since the 1500s.",
    name: "Sarah Smith",
    role: "Manager - StartupX",
    image: testi3,
  },
];

const Team = () => {
  return (
    <section className="bg-[#081828] text-white py-16 px-16">
      <div className="max-w-[1200px] mx-auto flex items-center gap-16">
        {/* Left Content */}
        <div className="w-[600px] relative">
          <button className="bg-blue-600 px-4 py-1 rounded text-sm font-medium mb-4">
            WHAT SAY'S OUR CLIENTS
          </button>
          <h2 className="text-4xl font-bold mb-6">Our Testimonials</h2>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              loop
              className="w-full"
            >
              {TeamData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">❝ {item.text} ❞</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-full border-2 border-gray-600"
                      />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-400">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Arrows → SAME level as Swiper */}
            <button className="custom-prev absolute left-109 text-[20px] w-12 h-12  top-30 -translate-y-1/2 z-10 cursor-pointer   flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-black transition">
              <HiArrowLongLeft />
            </button>
            <button className="custom-next absolute left-121 w-12 h-12 text-[20px] ml-2 top-30 -translate-y-1/2 z-10 cursor-pointer  flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-black transition">
              <HiArrowLongRight />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-[500px] flex justify-center">
          <img
            src={mainImage}
            alt="Main"
            className="h-[450px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
