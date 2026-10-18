import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Facilities", to: "/facilities" },
  { label: "Training", to: "/traninig" },
  { label: "Fee", to: "/fee" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Apply", to: "/apply" },
  { label: "Submit Application", to: "/Sumit" },
];

const Menu = () => {
  const location = useLocation();

  return (
    <ul className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0">
      {navLinks.map(({ label, to }) => {
        const isActive = location.pathname === to;
        return (
          <li key={to}>
            <Link
              to={to}
              className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 group no-underline inline-block
                ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/60"
                }`}
            >
              {label}
              <span
                className={`absolute bottom-1.5 left-3.5 right-3.5 h-0.5 rounded-full bg-blue-500 transition-transform duration-200 origin-left
                  ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;