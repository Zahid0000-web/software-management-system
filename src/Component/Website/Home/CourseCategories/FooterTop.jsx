import { RiAppleLine } from "react-icons/ri";
import { LiaGooglePlay } from "react-icons/lia";

const FooterTop = () => {
  return (
    <div className="border-b border-slate-700 py-10 px-16 flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Download Our Best Apps</h2>
        <p className="text-slate-400 mt-2 max-w-md text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </p>
      </div>
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-blue-600 cursor-pointer text-white px-5 py-3 rounded-md hover:bg-blue-800 transition duration-300">
          <RiAppleLine className="text-[20px]" /> App Store
        </button>
        <button className="flex items-center gap-2 bg-blue-600 cursor-pointer text-white px-5 py-3 rounded-md hover:bg-blue-800 transition duration-300">
          <LiaGooglePlay className="text-[20px]" /> Google Play
        </button>
      </div>
    </div>
  );
};

export default FooterTop;