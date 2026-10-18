import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Facilities", path: "/facilities" },
  { name: "Training", path: "/traninig" },
  { name: "Fee Plans", path: "/fee" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const applyLinks = [
  { name: "Apply Home", path: "/apply" },
  { name: "Student Form", path: "/apply/student" },
  { name: "Teacher Form", path: "/apply/teacher" },
];

const FooterBottom = () => {
  return (
    <div className="bg-slate-800 text-slate-300 px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Brand */}
      <div>
        <h3 className="text-white text-xl font-bold mb-3">🎓 BTN</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Hamara maqsad har student ko behtar taleem dena hai. Quality education
          aur training jo aapka future roshan kare.
        </p>
        <div className="flex gap-3 mt-4">
          {["f", "t", "in", "yt"].map((s) => (
            <div
              key={s}
              className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center text-xs hover:bg-blue-600 cursor-pointer transition duration-300"
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
          Quick Links
        </h4>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-slate-400 text-sm hover:text-blue-400 transition duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Apply Links */}
      <div>
        <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
          Apply Now
        </h4>
        <ul className="space-y-2">
          {applyLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-slate-400 text-sm hover:text-blue-400 transition duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
          Contact Info
        </h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>📍 Lahore, Pakistan</li>
          <li>📞 +92 300 0000000</li>
          <li>✉️ info@educenter.com</li>
          <li>🕐 Mon–Fri, 9am–5pm</li>
        </ul>
      </div>
    </div>
  );
};

export default FooterBottom;