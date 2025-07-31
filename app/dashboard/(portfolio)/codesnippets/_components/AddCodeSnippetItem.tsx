"use client";

import { CardTypeDashboard } from "@/types";
import { CodeSnippet } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { confirmAction } from "@/utils/dashboardHelpers";

type Props = {
  type: CardTypeDashboard;
  newItem?: CodeSnippet | null;
  setNewItem: (item: CodeSnippet | null) => void;
};

export const AddCodeSnippetItem = ({ newItem, setNewItem }: Props) => {
  const handleAdd = () => {
    const message = newItem
      ? "Are you sure you want to cancel adding new item?"
      : "Are you sure you want to add this item?";
    if (!confirmAction(message)) return;
    if (newItem) {
      setNewItem(null);
      return;
    }
    const now = new Date();
    const item = {
      id: Date.now().toString(),
      title: "",
      projectId: "",
      githubSnippetId: "",
      createdAt: now,
      updatedAt: now,
      isNew: true,
    };
    setNewItem?.(item);
  };

  return (
    <Button onClick={handleAdd} variant={"custom"} className="text-orange-500">
      {newItem ? "Cancel" : "Add Item"}
    </Button>
  );
};
