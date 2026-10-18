import React from "react";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";
import { AiOutlineCloud } from "react-icons/ai";

const courses = [
  {
    icon: FaLaptopCode,
    title: "Web Development",
    topics: ["HTML, CSS, JS", "React", "Node.js", "Full Stack Projects"],
  },
  {
    icon: FaMobileAlt,
    title: "App Development",
    topics: ["Android/iOS Apps", "Flutter", "React Native", "Mobile UI Design"],
  },
  {
    icon: FaPaintBrush,
    title: "Design",
    topics: ["UI/UX Design", "Product Design", "Prototyping", "AR/VR Design"],
  },
  {
    icon: AiOutlineCloud,
    title: "Software Development",
    topics: ["Custom Software", "Web Services", "DevOps", "API Integration"],
  },
  {
    icon: FaDatabase,
    title: "Database Management",
    topics: ["SQL", "NoSQL", "MongoDB", "Data Modeling"],
  },
  {
    icon: FaCloud,
    title: "Cloud Computing",
    topics: ["AWS", "Azure", "Google Cloud", "Serverless Architecture"],
  },
];

const CourseGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-16 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.map(({ icon, title, topics }, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg hover:border-green-500 transition-shadow duration-300"
          >
            <div className="w-14 h-14  text-green-600">
              {React.createElement(icon, { size: 40 })}
            </div>

            <h3 className="text-[23px] font-semibold mb-2">{title}</h3>
            <ul className="text-gray-500 text-sm space-y-1">
              {topics.map((topic, index) => (
                <li key={index}>• {topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
