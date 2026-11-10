'use client';

import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button after scrolling down a bit
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const whatsappMessage = encodeURIComponent("Hi Team, I was looking at your portfolio and I'd like to discuss a project!");
  const whatsappUrl = `https://wa.me/8801997722621?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          {/* Subtle pulse ring behind the button */}
          <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 group-hover:hidden"></div>
          
          <FaWhatsapp size={35} className="relative z-10" aria-hidden="true" focusable="false" />
        </m.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
