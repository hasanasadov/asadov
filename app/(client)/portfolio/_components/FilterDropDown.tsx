"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";

type FilterDropdownProps = {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
};

const FilterDropdown = ({
  categories,
  selectedCategories,
  onToggleCategory,
}: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-between w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:ring-2 hover:ring-indigo-500 transition"
          aria-label="Filter categories"
        >
          Filter Categories
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-48 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-2"
      >
        {categories.map((cat) => (
          <DropdownMenuCheckboxItem
            key={cat}
            checked={selectedCategories.includes(cat)}
            onCheckedChange={() => onToggleCategory(cat)}
            className="flex items-center px-4 py-2 cursor-pointer select-none hover:bg-indigo-50 dark:hover:bg-indigo-900"
          >
            {cat}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
