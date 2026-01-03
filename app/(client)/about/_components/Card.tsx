"use client";
import React from "react";
import { motion } from "framer-motion";

// Helper for professional date formatting
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
};

export const Card = ({
  start,
  end,
  title1,
  title2,
  description,
  loading = false,
}: {
  start: Date;
  end?: Date | null;
  title1: string;
  title2?: string | null;
  description: string;
  loading?: boolean;
}) => {
  const startDate = start instanceof Date ? start : new Date(start);
  const endDate = end instanceof Date ? end : end ? new Date(end) : undefined;

  // LOADING STATE (Skeletons)
  if (loading) {
    return (
      <div className="py-12 border-b border-neutral-200 dark:border-neutral-800 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded mt-2" />
            <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
          <div className="md:w-2/3">
            <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded mb-3" />
            <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // REAL CONTENT
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Starts slightly lower
      whileInView={{ opacity: 1, y: 0 }} // Floats up smoothly
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }} // Triggers when 10% in view
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group py-12 border-b border-neutral-200 dark:border-neutral-800 last:border-none"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Left Column: Metadata & Titles */}
        <div className="md:w-1/3 flex flex-col">
          {/* Date */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
              {formatDate(startDate)} —{" "}
              {endDate ? formatDate(endDate) : "Present"}
            </span>
            {/* Live Indicator */}
            {!endDate && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </div>

          {/* Title - Added tracking-tight for cleaner modern look */}
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight group-hover:text-red-700 transition-colors duration-300">
            {title1}
          </h3>

          {title2 && (
            <span className="text-sm font-medium text-neutral-500 mt-2 uppercase tracking-wide">
              {title2}
            </span>
          )}
        </div>

        {/* Right Column: Description */}
        <div className="md:w-2/3">
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-light group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
