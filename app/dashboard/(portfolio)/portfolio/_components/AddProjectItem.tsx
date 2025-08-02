"use client";
import {  ProjectWithSnippets } from "@/types";
import { confirmAction } from "@/utils/dashboardHelpers";
import { Button } from "@/components/ui/button";

type Props = {
  newItem: ProjectWithSnippets | null;
  setNewItem: (item: ProjectWithSnippets | null) => void;
};

export const AddProjectItem = ({ newItem, setNewItem }: Props) => {
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
    const item: ProjectWithSnippets & { id: string; isNew?: boolean } = {
      id: Date.now().toString(),
      title: "",
      image: "",
      description: "",
      technologies: [],
      codeSnippets: [],
      liveUrl: "",
      repoUrl: "",
      category: "",
      detailedDescription: "",
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
