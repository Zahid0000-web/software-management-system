import React from "react";
import { FaCertificate, FaPrint, FaWifi, FaShieldAlt } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { MdVideocam, MdRestaurant, MdLocalParking } from "react-icons/md";
import { GiSolarPower } from "react-icons/gi";
import { RiBuilding2Line, RiTeamLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

const facilities = [
  {
    title: "Certification",
    description:
      "Upon course completion, each student earns a recognized certificate, boosting their profile and validating their skills to employers, clients, or freelancing platforms globally for added credibility.",
    icon: <FaCertificate className="text-3xl" />,
    accent: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
  },
  {
    title: "High Speed Internet",
    description:
      "Enjoy uninterrupted work with our reliable high-speed internet. Perfect for uploading content, virtual teamwork, streaming, or completing online tasks smoothly and efficiently without buffering issues.",
    icon: <IoSpeedometer className="text-3xl" />,
    accent: "#EC4899",
    bg: "#FDF2F8",
    border: "#FBCFE8",
  },
  {
    title: "CCTV Surveillance",
    description:
      "The facility is secured 24/7 through CCTV surveillance to ensure a worry-free working environment. Your safety is our top priority, allowing you to focus on what truly matters.",
    icon: <MdVideocam className="text-3xl" />,
    accent: "#EF4444",
    bg: "#FEF2F2",
    border: "#FECACA",
  },
  {
    title: "Printing Facilities",
    description:
      "No need to step outside — our on-site printing lets you easily print everything from course notes to detailed reports, supporting both your learning and work documentation needs.",
    icon: <FaPrint className="text-3xl" />,
    accent: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  {
    title: "Solar / Generator Backup",
    description:
      "Our backup systems, including solar and generator setups, ensure continuous operation during power outages. You can work or learn without disruption, no matter the time or power condition.",
    icon: <GiSolarPower className="text-3xl" />,
    accent: "#22C55E",
    bg: "#F0FDF4",
    border: "#BBF7D0",
  },
  {
    title: "Fully Maintained Facility",
    description:
      "Our hub is regularly cleaned and equipment is well-maintained to offer a seamless work experience. This ensures you stay focused, productive, and stress-free throughout your stay.",
    icon: <RiBuilding2Line className="text-3xl" />,
    accent: "#A855F7",
    bg: "#FAF5FF",
    border: "#E9D5FF",
  },
  {
    title: "WiFi & Network",
    description:
      "Multiple WiFi zones ensure seamless connectivity throughout the facility. Stay connected with ultra-fast, reliable internet wherever you work or study.",
    icon: <FaWifi className="text-3xl" />,
    accent: "#06B6D4",
    bg: "#ECFEFF",
    border: "#A5F3FC",
  },
  {
    title: "Food & Beverage",
    description:
      "Access to cafeteria with healthy snacks and beverages to keep you energized throughout your workday without leaving the facility.",
    icon: <MdRestaurant className="text-3xl" />,
    accent: "#F97316",
    bg: "#FFF7ED",
    border: "#FED7AA",
  },
  {
    title: "Parking Available",
    description:
      "Secure, ample parking space available for all members. Easy access to your vehicle with 24/7 surveillance and lighting.",
    icon: <MdLocalParking className="text-3xl" />,
    accent: "#6366F1",
    bg: "#EEF2FF",
    border: "#C7D2FE",
  },
  {
    title: "24/7 Security",
    description:
      "Round-the-clock security personnel ensure maximum safety. Access control system with ID verification for authorized members only.",
    icon: <FaShieldAlt className="text-3xl" />,
    accent: "#475569",
    bg: "#F8FAFC",
    border: "#CBD5E1",
  },
  {
    title: "Collaborative Spaces",
    description:
      "Modern meeting rooms and collaboration zones equipped with whiteboards, projectors, and video conferencing setup for team projects.",
    icon: <RiTeamLine className="text-3xl" />,
    accent: "#14B8A6",
    bg: "#F0FDFA",
    border: "#99F6E4",
  },
  {
    title: "24/7 Support",
    description:
      "Dedicated support team available round the clock to assist with technical issues, facility requests, or any concerns.",
    icon: <BiSupport className="text-3xl" />,
    accent: "#F43F5E",
    bg: "#FFF1F2",
    border: "#FECDD3",
  },
];

const Facilities1 = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Our Premium Facilities
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to succeed under one roof. World-class amenities
            designed to elevate your learning and working experience.
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {facilities.map((facility, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{
                backgroundColor: facility.bg,
                borderColor: facility.border,
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${facility.accent}18`,
                  color: facility.accent,
                }}
              >
                {facility.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {facility.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                {facility.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: facility.accent }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Facilities1;