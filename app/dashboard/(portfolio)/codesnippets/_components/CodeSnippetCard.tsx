"use client";

import React, { useState } from "react";
import { CardTypeDashboard } from "@/types";
import { CodeSnippet, GithubSnippet } from "@prisma/client";
import { useDashboardMutation } from "@/hooks/useDashboardMutation";
import { confirmAction } from "@/utils/dashboardHelpers";
import RenderIf from "@/utils/RenderIf";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { GithubSnippetGetItems } from "@/actions/github";
import GithubSnippetCard from "../../githubsnippets/_components/GithubSnippetCard";
import SelectReact from "@/components/ui/selectReact";

type Props = {
  item: CodeSnippet & { isNew?: boolean };
  type: CardTypeDashboard;
  setNewItem?: (item: CodeSnippet | null) => void;
};

export const CodeSnippetCard = ({ item, type, setNewItem }: Props) => {
  const isNew = item?.["isNew"] === true;
  const [isEditing, setIsEditing] = useState(isNew);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formState, setFormState] = useState({
    title: item.title,
    githubSnippetId: item.githubSnippetId,
  });

  const { data: githubSnippetsData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GITHUB_SNIPPETS_DASHBOARD],
    queryFn: () => GithubSnippetGetItems(),
  });

  const currentSnippet = githubSnippetsData?.find(
    (snippet) => snippet.id === item.githubSnippetId
  );

  const options = githubSnippetsData?.map((snippet) => ({
    value: snippet.id,
    label: `${snippet.repo} - ${snippet.filePath} `,
  }));

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const { updateMutation, deleteMutation, createMutation } =
    useDashboardMutation(type, item.id);

  const onEdit = () => {
    setFormState({
      title: item.title,
      githubSnippetId: item.githubSnippetId,
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
      title: formState.title.trim(),
      githubSnippetId: formState.githubSnippetId.trim(),
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
    <div className="flex flex-col rounded-2xl hover:shadow-inner transition-shadow duration-200 custom-button ite">
      <div className="flex flex-col md:flex-row gap-4 relative w-full !items-start p-4">
        <div className="md:w-1/2 flex flex-col md:flex-row w-full gap-4 items-center">
          <div className="w-full text-[14px] md:text-[16px]">
            <RenderIf condition={isEditing}>
              <input
                type="text"
                value={formState.title}
                placeholder="Enter title"
                onChange={(e) => handleChange("title", e.target.value)}
                className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent "
              />
            </RenderIf>
            <RenderIf condition={!isEditing}>
              <p className="text-[16px] md:text-[20px] font-medium">
                {item.title}
              </p>
            </RenderIf>
          </div>

          <div className="w-full flex items-center justify-start">
            <RenderIf condition={isEditing}>
              <SelectReact
                isLoading={isLoading}
                onChange={(val) =>
                  handleChange("githubSnippetId", val?.value || "")
                }
                value={
                  options?.find(
                    (opt) => opt.value === formState.githubSnippetId
                  ) || null
                }
                options={options || []}
              />
            </RenderIf>
            <RenderIf condition={!isEditing}>
              <p className="text-[16px] md:text-[20px] font-medium">
                {currentSnippet?.repo} - {currentSnippet?.filePath}
              </p>
            </RenderIf>
          </div>
        </div>

        <div className="md:w-1/2 w-full flex justify-end gap-4">
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
      <div className="w-full p-4">
        <RenderIf condition={!isNew && !!currentSnippet}>
          <GithubSnippetCard
            item={currentSnippet as GithubSnippet}
            type={CardTypeDashboard.GithubSnippet}
          />
        </RenderIf>
      </div>
    </div>
  );
};

export default CodeSnippetCard;
