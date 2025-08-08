"use client";

import React, { useState, useMemo } from "react";
import Select, { MultiValue } from "react-select";
import { findUniqueOptions } from "@/utils";
import { SelectOptionType } from "@/types";
import { ProjectGetItems } from "@/actions/project";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "./_components/SearchInput";
import ProjectCard from "./_components/ProjectCard";
import RenderIf from "@/utils/RenderIf";
import Footer from "@/components/shared/Footer";
import { toast } from "sonner";

const PortfolioPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    SelectOptionType[]
  >([]);
  const PortfolioPageHeroText =
    "Dive into my most fulfilling design experiences";
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: () => ProjectGetItems(),
  });
  if (!data && isError) {
    toast.error("Failed to load.");
  }

  const categories = (!isLoading && !data?.length ? [] : data)?.map((d) => {
    return {
      value: String(d.id),
      label: d.category,
    };
  });

  findUniqueOptions(categories);

  console.log("Unique Categories:", categories);

  const toggleCategory = (option: MultiValue<SelectOptionType>) => {
    const selectedIds = option.map((o) => o.value);
    const selectedCategories = (categories || []).filter((s) =>
      selectedIds.includes(s.value)
    );
    setSelectedCategories(selectedCategories);
  };

  const filteredProjects = useMemo(() => {
    return (!isLoading && !isError && !!data?.length ? data : [])?.filter(
      (p) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.filter((sC) => sC?.label === p.category).length;
        const matchesSearch = p.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      }
    );
  }, [selectedCategories, searchTerm, isLoading, isError, data]);

  return (
    <div className="min-h-screen md:p-6 ">
      <ScrollToTop />
      <h1 className="font-extrabold mb-10 leading-tight text-gray-900 dark:text-white text-[26px] md:text-[36px] lg:text-[48px]">
        {PortfolioPageHeroText}
      </h1>

      <div className="flex !sticky !top-4 md:!static z-40 rounded-3xl mb-8  flex-col md:flex-row md:!items-center md:justify-between gap-4">
        <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <Select<SelectOptionType, true>
          isMulti
          className="z-[999999] text-orange-800 custom-border md:w-2/5 w-full"
          isDisabled={isLoading}
          options={categories}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              borderColor: "transparent",
              boxShadow: "none",
              "&:hover": {
                borderColor: "transparent",
              },
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "rgba(255, 165, 0, 0.2)",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#FFA500",
            }),
          }}
          value={selectedCategories}
          onChange={toggleCategory}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <RenderIf condition={isLoading}>
          <div className="!bg-black/40 dark:!bg-white/40 custom-border animate-pulse h-[250px]"></div>
          <div className="!bg-black/40 dark:!bg-white/40 custom-border animate-pulse h-[250px]"></div>
          <div className="!bg-black/40 dark:!bg-white/40 custom-border animate-pulse h-[250px]"></div>
          <div className="!bg-black/40 dark:!bg-white/40 custom-border animate-pulse h-[250px]"></div>
        </RenderIf>
      </div>
      <RenderIf condition={!data?.length && !isLoading}>
        <div className="min-h-[20vh] flex items-center justify-center text-center ">
          <h1 className="text-3xl font-semibold text-red-600 dark:text-red-400">
            Projects not found
          </h1>
        </div>
      </RenderIf>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
