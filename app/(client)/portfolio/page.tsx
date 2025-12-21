"use client";

import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Loader2, SearchX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import SearchInput from "./_components/SearchInput";
import ProjectCard from "./_components/ProjectCard";
import Footer from "@/components/shared/Footer";
import { getInfiniteProjects } from "@/actions/project";

// Utility hook for debouncing (or install 'use-debounce')
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const PortfolioPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Debounce search by 500ms to avoid excessive API calls
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["infinite-projects", debouncedSearch],
      queryFn: ({ pageParam = 0 }) =>
        getInfiniteProjects({ pageParam, search: debouncedSearch }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const projects = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="min-h-screen md:p-8  text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <header className="sticky top-0 z-50 border-b border-zinc-100 dark:border-zinc-800  backdrop-blur-md transition-all duration-300">
        <div className=" mx-auto py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Portfolio
            </h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
              Selected works 2023 — Present
            </p>
          </div>

          <div className="w-full md:w-72">
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>
      </header>

      {/* 2. Main Grid */}
      <main className="max-w-[1400px] mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {/* Projects with Staggered Entry */}
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>

          {(isLoading || isFetchingNextPage) &&
            [...Array(3)].map((_, i) => (
              <ProjectSkeleton key={`skeleton-${i}`} />
            ))}
        </div>

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center border-t border-dashed border-zinc-200 dark:border-zinc-800 mt-12"
          >
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-full mb-4">
              <SearchX className="w-6 h-6 text-zinc-400" />
            </div>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium text-lg">
              No projects found
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 mb-6 max-w-xs mx-auto">
              We couldnt find anything matching {searchTerm}. Try a different
              keyword.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-md hover:opacity-90 transition-opacity"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Infinite Scroll Trigger */}
        <div
          ref={ref}
          className="h-24 w-full flex items-center justify-center mt-8"
        >
          {isFetchingNextPage && (
            <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Extracted Skeleton for cleanliness
const ProjectSkeleton = () => (
  <div className="space-y-4 w-full">
    <div className="w-full aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div className="h-5 w-1/2 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
        <div className="h-5 w-5 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
      </div>
      <div className="h-4 w-3/4 bg-zinc-50 dark:bg-zinc-800/50 rounded animate-pulse" />
    </div>
  </div>
);

export default PortfolioPage;
