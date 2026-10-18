import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="p-8 border-l border-gray-200 ">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <p className="text-gray-600 mb-6">
        Business consulting excepteur sint occaecat cupidatat consulting non
        proident.
      </p>

      <div className="space-y-4 text-gray-700">
        <p className="flex items-center gap-3">
          <FaPhoneAlt className="text-blue-600" /> +522 672-452-1120
        </p>
        <p className="flex items-center gap-3">
          <FaEnvelope className="text-blue-600" /> example@yourwebsite.com
        </p>
        <p className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-blue-600" /> KA-62/1, Travel Agency,
          45 Grand Central Terminal, New York.
        </p>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-3">Follow Us on</h3>
      <div className="flex gap-3 mt-4">
        <div className="bg-gray-200 text-black p-3 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition duration-500">
          <FaFacebookF />
        </div>
        <div className="bg-gray-200 text-black p-3 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition duration-500">
          <FaTwitter />
        </div>
        <div className="bg-gray-200 text-black p-3 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition duration-500">
          <FaLinkedinIn />
        </div>
        <div className="bg-gray-200 text-black p-3 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white transition duration-500">
          <FaPinterestP />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
