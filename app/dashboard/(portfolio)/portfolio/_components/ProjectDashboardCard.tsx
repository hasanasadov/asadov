"use client";
import React, { useState, useEffect } from "react";
import {
  CardTypeDashboard,
  ProjectWithSnippets,
  SelectOptionType,
} from "@/types";
import { useDashboardMutation } from "@/hooks/useDashboardMutation";
import { CodeSnippetGetItems } from "@/actions/code";
import Select, { MultiValue } from "react-select";
import { confirmAction } from "@/utils/dashboardHelpers";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import RenderIf from "@/utils/RenderIf";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import Image from "next/image";

type Props = {
  item: ProjectWithSnippets & { isNew?: boolean };
  type: CardTypeDashboard;
  setNewItem?: (v: null) => void;
};

export const ProjectDashboardCard = ({ item, type, setNewItem }: Props) => {
  const isNew = item?.isNew === true;
  const [isEditing, setIsEditing] = useState(isNew);
  const [isDeleting, setIsDeleting] = useState(false);

  // Query all code snippets
  const { data: codeSnippetsData = [], isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CODE_SNIPPETS_DASHBOARD],
    queryFn: () => CodeSnippetGetItems(),
  });

  // Form state
  const [formState, setFormState] = useState({
    title: item.title ?? "",
    description: item.description ?? "",
    detailedDescription: item.detailedDescription ?? "",
    codeSnippets: item.codeSnippets ?? [],
    liveUrl: item.liveUrl ?? "",
    repoUrl: item.repoUrl ?? "",
    technologies: Array.isArray(item.technologies)
      ? item.technologies.join(", ")
      : item.technologies ?? "",
    image: item.image ?? "",
    category: item.category ?? "",
  });

  useEffect(() => {
    setFormState({
      title: item.title ?? "",
      description: item.description ?? "",
      detailedDescription: item.detailedDescription ?? "",
      codeSnippets: item.codeSnippets ?? [],
      liveUrl: item.liveUrl ?? "",
      repoUrl: item.repoUrl ?? "",
      technologies: Array.isArray(item.technologies)
        ? item.technologies.join(", ")
        : item.technologies ?? "",
      image: item.image ?? "",
      category: item.category ?? "",
    });
  }, [item]);

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Code snippets (multi-select) handle
  const handleCodeSnippetsChange = (newValue: MultiValue<SelectOptionType>) => {
    const selectedIds = newValue.map((v) => v.value);
    // Əlavə: branch-i uyğunlaşdırırıq
    const selectedSnippets = (codeSnippetsData || [])
      .filter((s) => selectedIds.includes(s.id))
      .map((s) => ({
        ...s,
        branch: s.branch ?? undefined, // null varsa, undefined-a çevir
      }));

    setFormState((prev) => ({
      ...prev,
      codeSnippets: selectedSnippets,
    }));
  };

  const { updateMutation, deleteMutation, createMutation } =
    useDashboardMutation(type, item.id);

  const onEdit = () => setIsEditing(true);

  const onCancel = () => {
    if (!confirmAction("Are you sure you want to cancel the changes?")) return;
    if (setNewItem) setNewItem(null);
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
      title: formState.title,
      description: formState.description,
      detailedDescription: formState.detailedDescription,
      image: formState.image,
      category: formState.category,
      liveUrl: formState.liveUrl,
      repoUrl: formState.repoUrl,
      // split technologies by comma and trim spaces
      technologies: formState.technologies
        ? formState.technologies.split(",").map((t) => t.trim())
        : [],
      // For codeSnippets: send only their IDs
      codeSnippets: formState.codeSnippets.map((s) => ({ id: s.id })),
    };

    if (isNew) {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsEditing(false);
          setNewItem?.(null);
        },
      });
    } else {
      updateMutation.mutate(data, {
        onSuccess: () => setIsEditing(false),
      });
    }
  };

  const isPending =
    updateMutation.isPending ||
    deleteMutation.isPending ||
    createMutation.isPending;

  // For select components
  const selectedSnippetOptions: SelectOptionType[] = (
    formState.codeSnippets || []
  ).map((snippet) => ({
    value: snippet.id,
    label: snippet.title ?? "",
  }));

  const codeSnippetOptions: SelectOptionType[] = (codeSnippetsData || []).map(
    (snippet) => ({
      value: snippet.id,
      label: snippet.title ?? "",
    })
  );

  return (
    <div className="custom-button !grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 relative rounded-2xl hover:shadow-inner transition-shadow duration-200 items-start p-4">
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
            className="outline custom-button px-4 py-1 w-full text-cyan-500 bg-transparent"
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
      <div>
        <label className="text-gray-500 font-semibold text-sm mb-1 block">
          Code Snippets
        </label>
        <Select<SelectOptionType, true>
          isMulti
          className="z-[999999] text-orange-800 custom-border"
          isDisabled={!isEditing || isLoading}
          options={codeSnippetOptions}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              borderColor: "transparent",
              boxShadow: "none",
              "&:hover": {
                borderColor: "transparent",
              },
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "rgba(255, 165, 0, 0.2)",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#FFA500",
            }),
          }}
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
          <p className="font-medium text-sm md:text-sm break-words">
            {item.image}
          </p>
        </RenderIf>
        <div className="flex mt-4 justify-evenly flex-col md:flex-row  gap-5 items-center  relative ">
          <RenderIf condition={!!formState.image}>
            <div>
              <Image
                src={formState.image}
                alt="Project"
                width={100}
                height={100}
                className="bg-red-600"
              />
            </div>
          </RenderIf>
          <div className="flex gap-2">
            <Button
              variant="custom"
              className="text-red-600 hover:underline text-sm "
              onClick={() => handleChange("image", "")}
              disabled={!isEditing}
            >
              x
            </Button>
            <UploadButton
              className=" "
              endpoint="imageUploader"
              disabled={!isEditing}
              onClientUploadComplete={(res) => {
                handleChange("image", res[0]?.ufsUrl || "");
                console.log("Files: ", res);
                toast.message("Upload Completed");
              }}
              onUploadProgress={(progress) => {
                console.log("Upload Progress: ", progress);
              }}
              appearance={{
                button: "custom-button p-4",
                container: "w-full",
                allowedContent: "image",
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </div>
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
