import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./Social";
import ContactAb from "./ContacAb";
import FooterTop from "../Home/CourseCategories/FooterTop";
import Footer from "../Home/CourseCategories/Footer";

const ContactUs = () => {
  return (
    <>
      <div className="py-10 ">
        <ContactAb />
      </div>
      <section className="bg-gray-50 py-12 px-16 mt-20">
        {/* mt-20 => navbar ke neeche gap */}
        <div className="max-w-6xl mx-auto bg-white shadow rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
      <div>
        <FooterTop />
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
