"use client";

import { CardTypeDashboard, ProjectWithSnippets } from "@/types";
import { useDashboardMutation } from "@/hooks/useDashboardMutation";
import { CodeSnippetGetItems } from "@/actions/code";
import Select, { MultiValue } from "react-select";
import React, { useState } from "react";
import { confirmAction } from "@/utils/dashboardHelpers";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import RenderIf from "@/utils/RenderIf";
import Image from "next/image";

type Props = {
  item: ProjectWithSnippets & { isNew?: boolean };
  type: CardTypeDashboard;
  setNewItem?: (item: ProjectWithSnippets | null) => void;
};

export const ProjectDashboardCard = ({ item, type, setNewItem }: Props) => {
  const isNew = item?.["isNew"] === true;
  const [isEditing, setIsEditing] = useState(isNew);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: codeSnippetsData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CODE_SNIPPETS_DASHBOARD],
    queryFn: () => CodeSnippetGetItems(),
  });

  const [formState, setFormState] = useState({
    title: item.title || "",
    description: item.description || "",
    detailedDescription: item.detailedDescription || "",
    liveUrl: item.liveUrl || "",
    repoUrl: item.repoUrl || "",
    category: item.category || "",
    technologies: Array.isArray(item.technologies)
      ? item.technologies.join(", ")
      : item.technologies || "",
    codeSnippets: item.codeSnippets || [],
    image: item.image || "",
  });

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleCodeSnippetsChange = (
    newValue: MultiValue<{ value?: string; label?: string }>
  ) => {
    const selectedIds = newValue.map(
      (option: { value?: string; label?: string }) => option.value
    );
    const selectedSnippets = codeSnippetsData?.filter((snippet) =>
      selectedIds.includes(snippet.id)
    );
    if (selectedSnippets) {
      setFormState((prev) => ({
        ...prev,
        codeSnippets: selectedSnippets,
      }));
    }
  };

  const { updateMutation, deleteMutation, createMutation } =
    useDashboardMutation(type, item.id);

  const onEdit = () => {
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
      ...formState,
      id: item.id,
      isNew,
      technologies: formState.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      codeSnippetIds: formState.codeSnippets.map((snippet) => snippet.id), // ✅ FIXED
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

  const codeSnippetOptions =
    codeSnippetsData?.map((snippet) => ({
      value: snippet.id,
      label: snippet.title,
    })) || [];

  const selectedSnippetOptions = formState.codeSnippets.map((snippet) => ({
    value: snippet.id,
    label: snippet.title,
  }));

  return (
    <div className="custom-button !grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative rounded-2xl hover:shadow-inner transition-shadow duration-200 items-start p-4">
      {/* Title */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Title
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.title}
            placeholder="Enter project title"
            onChange={(e) => handleChange("title", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent "
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg">{item.title}</p>
        </RenderIf>
      </div>

      {/* Description */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Description
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
            placeholder="Enter project description"
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg">{item.description}</p>
        </RenderIf>
      </div>

      {/* Detailed Description */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Detailed Description
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.detailedDescription}
            onChange={(e) =>
              handleChange("detailedDescription", e.target.value)
            }
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
            placeholder="Enter detailed description"
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg">
            {item.detailedDescription}
          </p>
        </RenderIf>
      </div>

      {/* Code Snippets (Multi-select) */}
      <div className="">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Code Snippets
        </label>
        <Select
          isMulti
          className="z-[999999]"
          isDisabled={!isEditing || isLoading}
          options={codeSnippetOptions}
          value={selectedSnippetOptions}
          onChange={handleCodeSnippetsChange}
        />
      </div>

      {/* Live URL */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Live URL
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.liveUrl}
            onChange={(e) => handleChange("liveUrl", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
            placeholder="Enter live URL"
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg">{item.liveUrl}</p>
        </RenderIf>
      </div>

      {/* Repo URL */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Repo URL
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.repoUrl}
            onChange={(e) => handleChange("repoUrl", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
            placeholder="Enter repo URL"
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg break-words">
            {item.repoUrl}
          </p>
        </RenderIf>
      </div>

      {/* Technologies */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Technologies
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.technologies}
            onChange={(e) => handleChange("technologies", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
            placeholder="Enter technologies used (comma separated)"
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg">
            {Array.isArray(item.technologies)
              ? item.technologies.join(", ")
              : item.technologies}
          </p>
        </RenderIf>
      </div>

      {/* Image */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Image
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
            placeholder="Enter image URL"
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg">{item.image}</p>
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <Image
            className="font-medium text-base md:text-lg"
            src={item.image}
            alt="Project Image"
            width={100}
            height={100}
          />
        </RenderIf>
      </div>

      {/* Category */}
      <div className="text-left text-sm md:text-base">
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Category
        </label>
        <RenderIf condition={isEditing}>
          <input
            type="text"
            value={formState.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
            placeholder="Enter category"
          />
        </RenderIf>
        <RenderIf condition={!isEditing}>
          <p className="font-medium text-base md:text-lg">{item.category}</p>
        </RenderIf>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-2 col-span-full">
        <RenderIf condition={isEditing}>
          <>
            <Button
              onClick={onCancel}
              variant="custom"
              className="text-yellow-600 hover:underline text-sm"
            >
              Cancel
            </Button>
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
              className="text-yellow-600 hover:underline text-sm"
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
  );
};

export default ProjectDashboardCard;
