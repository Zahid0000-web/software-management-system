import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const subject = encodeURIComponent(
      `📩 New Message: ${formData.subject}`
    );

    const body = encodeURIComponent(
      `New Contact Form Submission\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 Name     : ${formData.name}\n` +
      `📧 Email    : ${formData.email}\n` +
      `📞 Phone    : ${formData.phone}\n` +
      `📌 Subject  : ${formData.subject}\n\n` +
      `💬 Message:\n${formData.message}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Sent from Contact Form`
    );

    // ✅ Gmail direct compose — no EmailJS needed
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=nasirhaji960@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");

    setSending(false);
    setSent(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSent(false);
      setFormData({
        name: "",
        subject: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-500 mb-6">
          We will reply you within 24 hours
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            disabled={sending || sent}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
              ${
                sent
                  ? "bg-green-500 text-white cursor-default"
                  : sending
                  ? "bg-blue-400 text-white cursor-wait"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {sent
              ? "✅ Gmail Opened! Check Your Browser"
              : sending
              ? "Opening Gmail..."
              : "Send Message"}
          </button>

          {sent && (
            <p className="text-center text-sm text-green-600 mt-2">
              Gmail compose window has opened. Please send the email from there.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;