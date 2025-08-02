"use client";

import { useDashboardMutation } from "@/hooks/useDashboardMutation";
import { CardTypeDashboard } from "@/types";
import React, { useState } from "react";
import { confirmAction } from "@/utils/dashboardHelpers";
import { CodeSnippet } from "@prisma/client";
import { Button } from "@/components/ui/button";
import RenderIf from "@/utils/RenderIf";

type Props = {
  item: CodeSnippet & { isNew?: boolean };
  type: CardTypeDashboard;
  setNewItem?: (item: CodeSnippet | null) => void;
};

export const CodeSnippetCard = ({ item, type, setNewItem }: Props) => {
  const isNew = item?.["isNew"] === true;
  console.log("new item", isNew, item);
  const [isEditing, setIsEditing] = useState(isNew);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formState, setFormState] = useState({
    title: item.title,
    repo: item.repo,
    filePath: item.filePath,
    branch: item.branch,
  });

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const { updateMutation, deleteMutation, createMutation } =
    useDashboardMutation(type, item.id);

  const onEdit = () => {
    setFormState({
      title: item.title,
      repo: item.repo,
      filePath: item.filePath,
      branch: item.branch,
    });
    setIsEditing(true);
  };

  const onCancel = () => {
    if (!confirmAction("Are you sure you want to cancel the changes?")) return;
    if (setNewItem) {
      setNewItem(null);
    }
    setIsEditing(false);
  };

  const onDelete = () => {
    if (!confirmAction("Are you sure you want to delete this item?")) return;
    setIsDeleting(true);
    deleteMutation.mutate(undefined, {
      onSettled: () => setIsDeleting(false),
    });
  };

  const onSubmitEdit = () => {
    if (!confirmAction("Do you want to save the changes?")) return;

    const data = {
      title: formState?.title?.trim(),
      repo: formState?.repo?.trim(),
      filePath: formState?.filePath?.trim(),
      branch: formState?.branch?.trim(),
    };

    if (isNew) {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
      if (setNewItem) {
        setNewItem(null);
      }
    } else {
      updateMutation.mutate(data, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
    }
  };

  const isPending =
    updateMutation.isPending ||
    deleteMutation.isPending ||
    createMutation.isPending;

  // console.log("CodeSnippetCard item", currentSnippet);
  return (
    <div className="!grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl hover:shadow-inner transition-shadow duration-200 custom-button">
      <div className="w-full text-[14px] md:text-[16px]">
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState?.title || ""}
            placeholder="Enter title"
            onChange={(e) => handleChange("title", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent "
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="text-[16px] md:text-[20px] font-medium">{item.title}</p>
        </RenderIf>
      </div>
      <div className="w-full text-[14px] md:text-[16px]">
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState?.repo || ""}
            placeholder="Enter repository URL"
            onChange={(e) => handleChange("repo", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent "
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="text-[16px] md:text-[20px] font-medium">{item.repo}</p>
        </RenderIf>
      </div>
      <div className="w-full text-[14px] md:text-[16px]">
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState?.filePath || ""}
            placeholder="Enter file path"
            onChange={(e) => handleChange("filePath", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent "
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="text-[16px] md:text-[20px] font-medium">
            {item.filePath}
          </p>
        </RenderIf>
      </div>
      <div className="w-full text-[14px] md:text-[16px]">
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState?.branch || ""}
            placeholder="Enter branch (optional)"
            onChange={(e) => handleChange("branch", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent "
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="text-[16px] md:text-[20px] font-medium">
            {item.branch || "main"}
          </p>
        </RenderIf>
      </div>

      <div className="w-full flex justify-end gap-4">
        <div className="flex gap-4">
          <RenderIf condition={isEditing}>
            <>
              <RenderIf condition={!!onCancel}>
                <Button
                  onClick={onCancel}
                  variant="custom"
                  className="text-yellow-600 hover:underline text-sm"
                >
                  Cancel
                </Button>
              </RenderIf>
              <Button
                onClick={onSubmitEdit}
                disabled={isPending}
                variant="custom"
                className="text-green-600 hover:underline text-sm"
              >
                {isPending ? "Saving..." : "Done"}
              </Button>
            </>
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <>
              <Button
                onClick={onEdit}
                variant="custom"
                className="text-yellow-600 !leading-0  hover:underline text-sm"
              >
                Edit
              </Button>
              <Button
                onClick={onDelete}
                disabled={isDeleting}
                variant="custom"
                className="text-red-600 hover:underline text-sm"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippetCard;
