"use client";

import React, { useState } from "react";
import { CardTypeDashboard } from "@/types";
import { Project } from "@prisma/client";
import { useDashboardMutation } from "@/hooks/useDashboardMutation";
import { confirmAction } from "@/utils/dashboardHelpers";
import RenderIf from "@/utils/RenderIf";
import { Button } from "@/components/ui/button";

type Props = {
  item: Project & { isNew?: boolean };
  type: CardTypeDashboard;
  setNewItem?: (item: Project | null) => void;
};

export const ProjectDashboardCard = ({ item, type, setNewItem }: Props) => {
  const isNew = item?.["isNew"] === true;
  const [isEditing, setIsEditing] = useState(isNew);
  const [isDeleting, setIsDeleting] = useState(false);

  console.log("ProjectDashboardCard item", item);
  const [formState, setFormState] = useState({
    title: item.title || "",
    description: item.description || "",
    detailedDescription: item.detailedDescription || "",
    liveUrl: item.liveUrl || "",
    repoUrl: item.repoUrl || "",
    category: item.category || "Website",
    technologies: item.technologies || "",
    href: item.href || "",
    image: item.image || "",
  });

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const { updateMutation, deleteMutation, createMutation } =
    useDashboardMutation(type, item.id);

  const onEdit = () => {
    setFormState({
      title: item.title || "",
      description: item.description || "",
      detailedDescription: item.detailedDescription || "",
      liveUrl: item.liveUrl || "",
      repoUrl: item.repoUrl || "",
      category: item.category || "Website",
      technologies: item.technologies || "",
      href: item.href || "",
      image: item.image || "",
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
      ...formState,
      id: item.id,
      isNew: isNew,
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

  return (
    <div className="flex flex-col md:flex-row gap-4 relative rounded-2xl hover:shadow-inner transition-shadow duration-200 custom-button !items-start p-4">
      <div className="md:w-1/2 flex flex-col md:flex-row w-full gap-4 ">
        <div className="w-full text-[14px] md:text-[16px]">
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
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.title}
            </p>
          </RenderIf>
        </div>

        <div className="w-full">
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
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.description}
            </p>
          </RenderIf>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex justify-between gap-4 items-center">
        <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
          <RenderIf condition={isEditing}>
            <input
              type="text"
              value={formState.detailedDescription}
              onChange={(e) =>
                handleChange("detailedDescription", e.target.value)
              }
              className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
              placeholder="Enter detailed description"
            />
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.detailedDescription}
            </p>
          </RenderIf>
        </div>
        <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
          <RenderIf condition={isEditing}>
            <input
              type="text"
              value={formState.href}
              onChange={(e) => handleChange("href", e.target.value)}
              className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
              placeholder="Enter project link"
            />
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.href}
            </p>
          </RenderIf>
        </div>
        <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
          <RenderIf condition={isEditing}>
            <input
              type="text"
              value={formState.liveUrl}
              onChange={(e) => handleChange("liveUrl", e.target.value)}
              className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
              placeholder="Enter live URL"
            />
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.liveUrl}
            </p>
          </RenderIf>
        </div>
        <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
          <RenderIf condition={isEditing}>
            <input
              type="text"
              value={formState.repoUrl}
              onChange={(e) => handleChange("repoUrl", e.target.value)}
              className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
              placeholder="Enter repository URL"
            />
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.repoUrl}
            </p>
          </RenderIf>
        </div>
        <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
          <RenderIf condition={isEditing}>
            <input
              type="text"
              value={formState.technologies}
              onChange={(e) => handleChange("technologies", e.target.value)}
              className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
              placeholder="Enter technologies used"
            />
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.technologies}
            </p>
          </RenderIf>
        </div>
        <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
          <RenderIf condition={isEditing}>
            <input
              type="text"
              value={formState.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
              placeholder="Enter image URL"
            />
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.image}
            </p>
          </RenderIf>
        </div>
        <div className=" text-left flex justify-between  text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
          <RenderIf condition={isEditing}>
            <input
              type="text"
              value={formState.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="outline custom-button !px-4 py-1 w-full text-cyan-500 bg-transparent"
              placeholder="Enter category"
            />
          </RenderIf>
          <RenderIf condition={!isEditing}>
            <p className="text-[16px] md:text-[20px] font-medium">
              {item.category}
            </p>
          </RenderIf>
        </div>
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

export default ProjectDashboardCard;
