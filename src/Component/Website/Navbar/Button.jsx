import React from "react";
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link
      to="/apply"
      className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold no-underline transition-all duration-200 shadow-sm shadow-blue-200"
    >
      Apply Now
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

export default Button;