import { IoSearchOutline } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { GoGraph } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";

import Image1 from "../../../../assets/image/small1.jpg";
import Image2 from "../../../../assets/image/small2.jpg";
import Image3 from "../../../../assets/image/small3.jpg";

const LearningFeature = () => {
  return (
    <div className="my-16 px-16">
      <div className="flex items-center gap-10">
        {/* Left Side - Images and Alert Box Grid */}
        <div className="grid grid-cols-2 gap-6">
          <img
            src={Image1}
            className="rounded-md w-56 h-72 shadow-lg object-cover"
          />
          <img
            src={Image2}
            alt="Learning Illustration 2"
            className="rounded-md shadow-lg w-56 h-72 object-cover relative top-12"
          />
          <img
            src={Image3}
            alt="Learning Illustration 3"
            className="rounded-md shadow-lg w-56 h-72 object-cover"
          />
          {/* Blue Learning Alert Box */}
          <div className="rounded-md bg-blue-600 p-6 relative top-12 flex flex-col w-56 h-48 justify-center shadow-lg text-white">
            <div className="bg-blue-700 w-8 h-8 rounded-md mb-4 flex items-center justify-center opacity-80">
              <IoCheckmarkOutline />
            </div>
            <h3 className="font-bold text-xl mb-2">Learning Alert!</h3>
            <p>104 new courses are available this week!</p>
          </div>
        </div>

        {/* Right Side - Text and Features */}
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Enhance Your Skills and <br /> Grow Your Knowledge
          </h2>

          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="h-15 w-15 rounded-md bg-blue-100 flex justify-center items-center">
              <CiGrid41 className="text-blue-600 mt-1 text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                #1 Learning Platform for Students
              </h4>
              <p className="text-gray-500 text-sm">
                Access top-quality courses and structured learning paths to
                enhance your skills effectively.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="h-15 w-15 rounded-md bg-blue-100 flex justify-center items-center">
              <IoSearchOutline className="text-blue-600 text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Easy Course Navigation
              </h4>
              <p className="text-gray-500 text-sm">
                Find the courses you want effortlessly with our intuitive search
                and filter options.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="h-15 w-15 rounded-md bg-blue-100 flex justify-center items-center">
              <GoGraph className="text-blue-600 mt-1 text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Learn From Top Instructors
              </h4>
              <p className="text-gray-500 text-sm">
                Get guidance and insights from industry experts and experienced
                instructors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningFeature;
