"use client";

import { Button } from "@/components/ui/button";
import { CardTypeDashboard } from "@/types";
import { confirmAction } from "@/utils/dashboardHelpers";
import { Education, Internship } from "@prisma/client";

type Props = {
  type: CardTypeDashboard;
  newItem?: Education | Internship | null;
  setNewItem: (item: Education | Internship | null) => void;
};

export const AddDashboardItem = ({ newItem, setNewItem }: Props) => {
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
      title1: "",
      title2: "",
      description: "",
      start: now,
      end: null,
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
