"use client";

import { Input } from "@/components/ui/input";
import { SearchInputProps } from "@/types";
import React from "react";

const SearchInput = ({ searchTerm, onSearchChange }: SearchInputProps) => {
  return (
    <Input
      type="search"
      placeholder="Search projects..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      aria-label="Search projects"
      className="custom-border md:!px-6 !py-5 border-0 "
    />
  );
};

export default SearchInput;
