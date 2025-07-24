"use client";

import React from "react";

type SearchInputProps = {
  searchTerm: string;
  onSearchChange: (val: string) => void;
};

const SearchInput = ({ searchTerm, onSearchChange }: SearchInputProps) => {
  return (
    <input
      type="search"
      placeholder="Search projects..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      aria-label="Search projects"
      className="w-full md:w-72 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition"
    />
  );
};

export default SearchInput;
