import React from "react";
import { RiContactsLine } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";

const LearningSteps = () => {
  return (
    <div className="bg-blue-800 py-20 ">
      <div className="container mx-auto flex flex-row items-center justify-center gap-20 px-6">
        {/* Step 1 */}
        <div className="flex items-start gap-4 max-w-xs group">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-[1.5px] border-dotted border-white text-white transition-all duration-500 ease-in-out group-hover:bg-white group-hover:text-blue-700 group-hover:scale-110">
            <RiContactsLine className="text-3xl transform transition duration-500 group-hover:rotate-[360deg]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Create Your Student Profile
            </h3>
            <div className="w-20 h-[2px] bg-white my-3"></div>
            <p className="text-base text-white leading-relaxed">
              Create your profile to start <br />
              your learning journey easily.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4 max-w-xs group">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-[1.5px] border-dotted border-white text-white transition-all duration-500 ease-in-out group-hover:bg-white group-hover:text-blue-600 group-hover:scale-110">
            <FaRegFileAlt className="text-3xl transform transition duration-500 group-hover:rotate-[360deg]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Add Your Learning Goals
            </h3>
            <div className="w-20 h-[2px] bg-white my-3"></div>
            <p className="text-base text-white leading-relaxed">
              Add your learning goals to <br />
              track your progress effectively.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4 max-w-xs group">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-[1.5px] border-dotted border-white text-white transition-all duration-500 ease-in-out group-hover:bg-white group-hover:text-blue-600 group-hover:scale-110">
            <FaBookOpen className="text-3xl transform transition duration-500 group-hover:rotate-[360deg]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Start Learning Courses
            </h3>
            <div className="w-20 h-[2px] bg-white my-3"></div>
            <p className="text-base text-white leading-relaxed">
              Start learning your chosen courses <br />
              instantly and grow your skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSteps;
