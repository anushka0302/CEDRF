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
        "service_2xekge8",
        "template_5qj7z8t",
        formData,
        "ItFe68uW5tcHisaIe"
      )
      .then(
        () => toast.success("Message sent successfully!"),
        (error) => toast.error("Failed to send message. Error: " + error.text)
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-white px-4 py-16 font-sans"
    >
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Mentorship Enquiry
        </h2>

        {/* Subject Card */}
        <div className="bg-[#111] rounded-2xl p-4 shadow-md">
          <label className="block mb-1 text-sm text-gray-400">Type</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleSubjectChange}
            className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Project Discussion">Project Discussion</option>
            <option value="Counselling & Mentoring">Counselling & Mentoring</option>
          </select>
        </div>

        {/* Input Fields */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "tel" }
        ].map((field) => (
          <div key={field.name} className="bg-[#111] rounded-2xl p-4 shadow-md">
            <label className="block mb-1 text-sm text-gray-400">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}

        {/* Conditional Fields */}
        {formData.subject === "Project Discussion" && (
          <div className="bg-[#111] rounded-2xl p-4 shadow-md">
            <label className="block mb-1 text-sm text-gray-400">Project Idea</label>
            <input
              type="text"
              name="idea"
              value={formData.idea}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        {formData.subject === "Counselling & Mentoring" && (
          <div className="bg-[#111] rounded-2xl p-4 shadow-md">
            <label className="block mb-1 text-sm text-gray-400">Field of Counselling</label>
            <input
              type="text"
              name="counsellingField"
              value={formData.counsellingField}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        {/* Message Box */}
        <div className="bg-[#111] rounded-2xl p-4 shadow-md">
          <label className="block mb-1 text-sm text-gray-400">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition duration-300 hover:shadow-[0_0_15px_#ff6d00]"
          >
            Send Message
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MentoringFormPage;
