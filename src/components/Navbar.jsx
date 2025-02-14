// Navbar.js
import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <motion.h1 
          className="text-2xl font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Finance Tracker
        </motion.h1>
        <motion.span 
          className="text-sm font-medium backdrop-blur-sm bg-white bg-opacity-10 px-4 py-2 rounded-full"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          by Saket Saurav
        </motion.span>
      </div>
    </motion.nav>
  );
};

export default Navbar;
