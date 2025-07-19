import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const MentoringFormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Project Discussion",
    idea: "",
    counsellingField: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubjectChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      subject: e.target.value,
      idea: "",
      counsellingField: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_2xekge8", // Replace with your EmailJS Service ID
        "template_5qj7z8t", // Replace with your EmailJS Template ID
        formData,
        "ItFe68uW5tcHisaIe" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
        },
        (error) => {
          toast.error("Failed to send message. Error: " + error.text);
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-10 bg-white rounded-2xl shadow-lg w-full max-w-2xl mx-auto font-sans space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Enquiry Form</h2>

        {/* Subject Selector */}
        <div className="relative">
          <select
            name="subject"
            value={formData.subject}
            onChange={handleSubjectChange}
            className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Project Discussion">Project Discussion</option>
            <option value="Counselling & Mentoring">Counselling & Mentoring</option>
          </select>
          <label className="absolute left-3 top-1 text-xs text-gray-500 peer-focus:text-blue-600">
            Type
          </label>
        </div>

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="absolute left-3 top-1 text-xs text-gray-500 peer-focus:text-blue-600">
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="absolute left-3 top-1 text-xs text-gray-500 peer-focus:text-blue-600">
            Email
          </label>
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="absolute left-3 top-1 text-xs text-gray-500 peer-focus:text-blue-600">
            Phone
          </label>
        </div>

        {/* Project Idea or Counselling Field */}
        {formData.subject === "Project Discussion" && (
          <div className="relative">
            <input
              type="text"
              name="idea"
              value={formData.idea}
              onChange={handleChange}
              className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="absolute left-3 top-1 text-xs text-gray-500 peer-focus:text-blue-600">
              Project Idea
            </label>
          </div>
        )}

        {formData.subject === "Counselling & Mentoring" && (
          <div className="relative">
            <input
              type="text"
              name="counsellingField"
              value={formData.counsellingField}
              onChange={handleChange}
              className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="absolute left-3 top-1 text-xs text-gray-500 peer-focus:text-blue-600">
              Field of Counselling
            </label>
          </div>
        )}

        {/* Message */}
        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <label className="absolute left-3 top-1 text-xs text-gray-500 peer-focus:text-blue-600">
            Message
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default MentoringFormPage;