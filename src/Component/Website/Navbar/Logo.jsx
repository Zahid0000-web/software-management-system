import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/image/LOGOimg.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center no-underline flex-shrink-0">
      <img
        src={image}
        alt="Logo"
        className="h-11 w-auto object-contain mix-blend-multiply transition-opacity duration-200 hover:opacity-80"
      />
    </Link>
  );
};

export default Logo;