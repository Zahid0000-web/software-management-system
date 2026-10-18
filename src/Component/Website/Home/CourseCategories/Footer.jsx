import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom ";

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <FooterTop />
      <FooterBottom />
      {/* Bottom Strip */}
      <div className="border-t border-slate-700 py-4 px-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-2">
        <p>© 2024 EduCenter. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer">FAQ</span>
          <span className="hover:text-slate-300 cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;