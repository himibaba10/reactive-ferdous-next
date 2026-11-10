import React from "react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { SiFiverr } from "react-icons/si";

const ContactSocialIcons = () => {
  return (
    <div className="flex gap-4 text-2xl mt-5">
      <a href="https://www.facebook.com/ferdoushimel10" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FaFacebook aria-hidden="true" focusable="false" />
      </a>
      <a
        href="https://www.linkedin.com/in/ferdous-ahmed-6535b0202/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn aria-hidden="true" focusable="false" />
      </a>
      <a href="https://t.me/himibaba10" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
        <FaTelegramPlane aria-hidden="true" focusable="false" />
      </a>
      <a href="https://wa.me/8801997722621" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <FaWhatsapp aria-hidden="true" focusable="false" />
      </a>
      <a href="https://www.fiverr.com/ferdoushimel" target="_blank" rel="noopener noreferrer" aria-label="Fiverr">
        <SiFiverr aria-hidden="true" focusable="false" />
      </a>
    </div>
  );
};

export default ContactSocialIcons;
