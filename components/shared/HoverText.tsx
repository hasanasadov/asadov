"use client";
import { motion } from "framer-motion";

export default function DiagonalTextHover() {
  return (
    <div className="relative  inline-block h-[32px] overflow-hidden w-full text-center cursor-pointer">
      {/* Original Text */}
      <motion.span
        className="absolute left-0 top-0 w-full"
        initial={{ y: 0, opacity: 1, skewY: 0 }}
        whileHover={{ y: "-100%", opacity: 0, skewY: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        Instagram
      </motion.span>

      {/* Skewed Hover Text */}
      <motion.span
        className="absolute left-0 top-full w-full"
        initial={{ y: 0, opacity: 0, skewY: 12 }}
        whileHover={{ y: "-100%", opacity: 1, skewY: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        Instagram
      </motion.span>
    </div>
  );
}
