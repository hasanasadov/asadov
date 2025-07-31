"use client";

import { CardTypeDashboard } from "@/types";
import { QUERY_KEYS } from "@/constants/query-keys";
import { GithubSnippet } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import GithubSnippetCard from "./_components/GithubSnippetCard";
import { GithubSnippetGetItems } from "@/actions/github";
import { AddGithubSnippetItem } from "./_components/AddGithubSnippetItem";

export default function GithubSnippetsPage() {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.GITHUB_SNIPPETS_DASHBOARD],
    queryFn: () => GithubSnippetGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load GitHub snippet data. Displaying default experience."
    );
  }

  const [newItem, setNewItem] = useState<GithubSnippet | null>(null);

  return (
    <div className="md:px-8 pt-4 min-h-[90vh]">
      <div className="text-4xl mb-10 flex items-center gap-2 justify-between">
        <h1>GitHub Snippets</h1>
        <AddGithubSnippetItem
          type={CardTypeDashboard.GithubSnippet}
          newItem={newItem}
          setNewItem={setNewItem}
        />
      </div>
      <div className="flex flex-col gap-4">
        {newItem && (
          <GithubSnippetCard
            item={newItem}
            type={CardTypeDashboard.GithubSnippet}
            setNewItem={setNewItem}
          />
        )}
        {data?.map((item) => (
          <GithubSnippetCard
            key={item.id}
            item={item as GithubSnippet}
            type={CardTypeDashboard.GithubSnippet}
          />
        ))}
      </div>
    </div>
  );
}
