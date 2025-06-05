"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiUser, FiMail, FiMessageSquare, FiSend, FiMapPin, FiPhone, FiClock, FiLoader,
  FiLinkedin, FiGithub
} from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      setStatus('success');
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus('idle'), 4000);
    } else {
      setStatus('error');
      setErrorMessage("Oops! Something went wrong. Please try again.");
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contactează
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Trimite un mesaj</h2>
          <p className="text-gray-600 mb-6">
          Ai întrebări sau feedback? Completează formularul de mai jos.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nume
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FiUser />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                  disabled={status === 'loading'}
                />
              </div>
            </motion.div>

            {/* Câmp Email */}
             <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FiMail />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                  disabled={status === 'loading'}
                />
              </div>
            </motion.div>

            {/* Câmp Mesaj */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mesaj
              </label>
              <div className="relative">
                 <span className="absolute top-3 left-0 flex items-center pl-3 text-gray-400">
                    <FiMessageSquare />
                 </span>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  rows={5}
                  required
                  disabled={status === 'loading'}
                ></textarea>
              </div>
            </motion.div>

            {/* Buton Submit cu stare de încărcare */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <button
                type="submit"
                className={`w-full flex justify-center items-center bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                   <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiSend className="mr-2" />
                )}
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </motion.div>

             {/* Mesaje de Status */}
             {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-100 text-green-700 border border-green-200 rounded-lg text-center"
              >
                Mesajul a fost trimis cu succes! Te vom contacta în curând.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-center"
              >
                {errorMessage || "An error occurred. Please try again."}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Coloana Dreapta: Doar Info Contact */}
        <motion.div
          className="space-y-8" 
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.7, delay: 0.4 }}
        >
            {/* Card Info Contact */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
             <h2 className="text-2xl font-semibold text-gray-800 mb-5">Hai să ne conectăm</h2>
             <ul className="space-y-4 text-gray-700">
                 <li className="flex items-center">
                    <FiMail className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0"/>
                    <a href="mailto:contact@devflow.example" className="hover:text-indigo-700">contact@devflow.com</a>
                </li>
                 <li className="flex items-center">
                    <FiPhone className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0"/>
                    <span>+40 123 456 789 (Mon-Fri, 9-17 EEST)</span>
                </li>
                <li className="flex items-start">
                    <FiMapPin className="w-5 h-5 mr-3 mt-1 text-indigo-600 flex-shrink-0"/>
                    <span> Iași, Romania</span>
                </li>
                 <li className="flex items-center">
                    <FiClock className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0"/>
                    <span>Timp de răspuns: De obicei în decurs de 24 de ore lucrătoare.</span>
                </li>
             </ul>
              {/* Social Media Links */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-4">
                 <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors" aria-label="LinkedIn"><FiLinkedin size={24} /></a>
                 <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors" aria-label="GitHub"><FiGithub size={24} /></a>
              </div>
          </div>

        </motion.div>
      </div>
    </main>
  );
}