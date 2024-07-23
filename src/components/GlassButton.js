import React from 'react';
import { motion } from 'framer-motion';
import '../index'; 

const GlassButton = ({ board }) => {
  return (
    <motion.h3
      className=" glass-button truncate max-w-[300px] md:text-2xl text-xl font-bold md:ml-20 font-['Fira_Code'] code-text"
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {board.name}
    </motion.h3>
  );
};

export default GlassButton;
