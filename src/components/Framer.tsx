'use client';

import React from "react";
import { motion } from "motion/react";

const Framer = () => {
  return (
    <motion.div
      style={{ width: "100px", height: "100px", backgroundColor: "#FF0000" }}
      animate={{ x: [0, -40, 100, 80] }}
      transition={{ duration: 3 }}
    />
  );
};

export default Framer;
