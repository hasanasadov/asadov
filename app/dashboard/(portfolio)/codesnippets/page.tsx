"use client";

import { CodeSnippetGetItems } from "@/actions/code";
import { AddCodeSnippetItem } from "./_components/AddCodeSnippetItem";
import { CardTypeDashboard } from "@/types";
import { CodeSnippet } from "@prisma/client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import CodeSnippetCard from "./_components/CodeSnippetCard";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function GithubSnippetsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.CODE_SNIPPETS_DASHBOARD],
    queryFn: () => CodeSnippetGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load Code snippet data. Displaying default experience."
    );
  }

  const [newItem, setNewItem] = useState<CodeSnippet | null>(null);

  // --- Search & Pagination State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-center ">
        <h1 className="text-3xl font-semibold animate-pulse text-muted-foreground">
          Loading...
        </h1>
      </div>
    );
  }

  // 1. Filter Data
  const filteredData = (data || []).filter((item) => {
    const query = searchQuery.toLowerCase();
    // Safety check for fields that might be null/undefined
    const title = item.title?.toLowerCase() || "";
    const desc = (item as CodeSnippet).title?.toLowerCase() || "";
    const code = (item as CodeSnippet).filePath?.toLowerCase() || "";

    return (
      title.includes(query) || desc.includes(query) || code.includes(query)
    );
  });

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="md:px-8 pt-6 min-h-[90vh]">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold tracking-tight whitespace-nowrap">
          Code Snippets
        </h1>

        {/* 2. Search Bar (Centered & Flexible) */}
        <div className="relative w-full md:max-w-md group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search titles, code, or descriptions..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2.5 rounded-full border border-border bg-secondary/30   transition-all duration-300 outline-none text-sm placeholder:text-muted-foreground/70"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* 3. Add Button */}
        <div className="shrink-0">
          <AddCodeSnippetItem
            type={CardTypeDashboard.CodeSnippet}
            newItem={newItem}
            setNewItem={setNewItem}
          />
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="flex flex-col gap-4 min-h-[400px]">
        {newItem && (
          <CodeSnippetCard
            item={newItem}
            type={CardTypeDashboard.CodeSnippet}
            setNewItem={setNewItem}
          />
        )}

        {paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 transition-all">
            {paginatedData.map((item) => (
              <CodeSnippetCard
                key={item.id}
                item={item as CodeSnippet}
                type={CardTypeDashboard.CodeSnippet}
              />
            ))}
          </div>
        ) : (
          !newItem && (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-xl bg-muted/10 text-muted-foreground">
              <Search className="h-10 w-10 mb-2 opacity-20" />
              <p>
                No snippets found matching{" "}
                <span className="font-medium text-foreground">
                  {searchQuery}
                </span>
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )
        )}
      </div>

      {/* --- PAGINATION SECTION --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10 pb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-md border border-input  hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="text-sm font-medium px-4">
            <span className="text-muted-foreground">Page</span> {currentPage}{" "}
            <span className="text-muted-foreground">of</span> {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-9 h-9 rounded-md border border-input  hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
