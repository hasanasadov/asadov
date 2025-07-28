"use client";

import React, { useState, useMemo } from "react";
import Footer from "@/components/shared/Footer";
import SearchInput from "./_components/SearchInput";
import FilterDropdown from "./_components/FilterDropDown";
import SelectedFilters from "./_components/SelectedFilters";
import ProjectCard from "./_components/ProjectCard";
import { projects } from "@/constants/projects";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const categories = ["Web", "Mobile", "Games"];

const PortfolioPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const removeCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== cat));
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, searchTerm]);

  return (
    <div className="min-h-screen md:p-6 ">
      <ScrollToTop />
      <h1 className="font-extrabold mb-10 leading-tight text-gray-900 dark:text-white text-[26px] md:text-[36px] lg:text-[48px]">
        Dive into my most fulfilling design experiences
      </h1>

      <div className="fle hidden sticky top-4 z-40 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md mb-8  flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterDropdown
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
        />
      </div>

      <SelectedFilters
        selectedCategories={selectedCategories}
        onRemoveCategory={removeCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProjects?.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
