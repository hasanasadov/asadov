"use client";

import { SelectedFiltersProps } from "@/types";
import React from "react";

const SelectedFilters = ({
  selectedCategories,
  onRemoveCategory,
}: SelectedFiltersProps) => {
  if (selectedCategories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {selectedCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onRemoveCategory(cat)}
          className="flex items-center gap-2 bg-indigo-600 text-white rounded-full px-4 py-1 shadow hover:bg-indigo-700 transition"
          aria-label={`Remove filter category ${cat}`}
        >
          <span>{cat}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default SelectedFilters;
