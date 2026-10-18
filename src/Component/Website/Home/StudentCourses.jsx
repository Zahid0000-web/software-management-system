// StudentCourses.jsx
import React from "react";

import img1 from "../../../assets/image/icon1.png";
import img2 from "../../../assets/image/icon2.png";
import img3 from "../../../assets/image/icon3.png";
import img4 from "../../../assets/image/icon4.png";
import img5 from "../../../assets/image/icon5.png";
import img6 from "../../../assets/image/icon6.png";
import img7 from "../../../assets/image/icon7.png";
import img8 from "../../../assets/image/icon8.png";

const courses = [
  {
    title: "Web Development",
    level: "Beginner",
    institute: "MainBrains Academy",
    duration: "3 Months",
    fee: "Rs 15,000",
    description:
      "Learn HTML, CSS, JavaScript and React with real-world projects.",
    icon: img1,
  },
  {
    title: "Graphic Designing",
    level: "Beginner",
    institute: "DesignHub School",
    duration: "2 Months",
    fee: "Rs 12,000",
    description:
      "Master Adobe Photoshop, Illustrator and creative design skills.",
    icon: img2,
  },
  {
    title: "Digital Marketing",
    level: "Intermediate",
    institute: "Marketers Academy",
    duration: "2.5 Months",
    fee: "Rs 18,000",
    description:
      "SEO, Facebook Ads, Google Ads and complete marketing strategy.",
    icon: img3,
  },
  {
    title: "UI/UX Designing",
    level: "Advanced",
    institute: "UX Studio",
    duration: "2 Months",
    fee: "Rs 25,000",
    description:
      "Figma, Wireframing, Prototyping and advanced UI/UX techniques.",
    icon: img4,
  },
  {
    title: "Mobile App Development",
    level: "Beginner",
    institute: "AppDev House",
    duration: "3 Months",
    fee: "Rs 20,000",
    description: "Learn Flutter & React Native with hands-on app building.",
    icon: img5,
  },
  {
    title: "Video Editing",
    level: "Intermediate",
    institute: "VEdit Academy",
    duration: "1.5 Months",
    fee: "Rs 10,000",
    description:
      "Premiere Pro, After Effects and complete video production workflow.",
    icon: img6,
  },
  {
    title: "Python Programming",
    level: "Beginner",
    institute: "CodeBase Institute",
    duration: "2 Months",
    fee: "Rs 14,000",
    description: "Python basics, automation, mini projects, data handling.",
    icon: img7,
  },
  {
    title: "AI & Machine Learning",
    level: "Advanced",
    institute: "AI Hub",
    duration: "3 Months",
    fee: "Rs 30,000",
    description: "ML models, AI tools, datasets and real-world applications.",
    icon: img8,
  },
];

const StudentCourses = () => {
  return (
    <div className="w-full mx-auto px-16 bg-[#F6F9FC] py-10">
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white px-10 py-15 rounded-lg shadow-md
            hover:shadow-[0_5px_5px_rgba(0,0,0,0.35)]
            hover:scale-[1.02]
            transition-all duration-250 ease-in-out"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={course.icon}
                    alt={course.title}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors cursor-pointer">
                  {course.title}
                </h3>
              </div>

              {/* Level Badge */}
              <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                {course.level}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-500 mb-3">{course.description}</p>

            {/* Details */}
            <div className="flex py-3 flex-wrap gap-2 text-xs">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded">
                {course.institute}
              </span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded">
                {course.duration}
              </span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded">
                {course.fee}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-4">
              <button className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:text-white transition-all">
                View Details
              </button>

              <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
