'use client';

import { MdArrowOutward } from "react-icons/md";
import * as m from 'motion/react-m';

const ContactButton = ({ children }) => {
  const button = { changePosition: { background: "rgba(232,248,139,1)" } };
  const span = { changePosition: { left: "25%", color: "#000" } };
  const icon = {
    changePosition: {
      right: "82%",
      transform: "rotate(135deg)",
      backgroundColor: "rgba(11,17,35,1)",
      color: "#fff",
    },
  };

  return (
    <m.a
      initial={{
        background: "rgba(232,248,139,0)",
        boxShadow: "0.5px 0px 1.3px rgba(255,255,255,1)",
      }}
      variants={button}
      transition={{ duration: 0.3 }}
      whileHover="changePosition"
      href="https://wa.me/8801997722621"
      target="_blank"
      rel="noopener noreferrer"
      className="uppercase text-sm sm:text-lg inline-flex items-center sm:gap-2 p-1 pl-1 sm:pl-4 rounded-full relative"
    >
      <m.span
        className="text-white mx-3 relative"
        transition={{ duration: 0.3 }}
        variants={span}
      >
        {children}
      </m.span>
      <m.span
        variants={icon}
        transition={{ duration: 0.3 }}
        className="bg-secondary p-2 rounded-full relative text-black"
      >
        <MdArrowOutward size={25} />
      </m.span>
    </m.a>
  );
};

export default ContactButton;
