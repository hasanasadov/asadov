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

export default function GithubSnippetsPage() {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.CODE_SNIPPETS_DASHBOARD],
    queryFn: () => CodeSnippetGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load Code snippet data. Displaying default experience."
    );
  }

  const [newItem, setNewItem] = useState<CodeSnippet | null>(null);

  return (
    <div className="md:px-8 pt-4 min-h-[90vh]">
      <div className="text-4xl mb-10 flex items-center gap-2 justify-between">
        <h1>Code Snippets</h1>
        <AddCodeSnippetItem
          type={CardTypeDashboard.CodeSnippet}
          newItem={newItem}
          setNewItem={setNewItem}
        />
      </div>
      <div className="flex flex-col gap-4">
        {newItem && (
          <CodeSnippetCard
            item={newItem}
            type={CardTypeDashboard.CodeSnippet}
            setNewItem={setNewItem}
          />
        )}
        {data?.map((item) => (
          <CodeSnippetCard
            key={item.id}
            item={item as CodeSnippet}
            type={CardTypeDashboard.CodeSnippet}
          />
        ))}
      </div>
    </div>
  );
}
