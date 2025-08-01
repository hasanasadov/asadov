"use client";

import { Education, Internship } from "@prisma/client";
import { useDashboardMutation } from "@/hooks/useDashboardMutation";
import { DescriptionSection } from "./DescriptionSection";
import { CardTypeDashboard } from "@/types";
import React, { useState } from "react";
import { TitleSection } from "./TitleSection";
import { DateSection } from "./DateSection";
import { Actions } from "./Actions";
import {
  formatDateInput,
  confirmAction,
  trimFormData,
} from "@/utils/dashboardHelpers";

type Props = {
  item: (Education | Internship) & { isNew?: boolean };
  type: CardTypeDashboard;
  setNewItem?: (item: Education | Internship | null) => void;
};

export const CardDashboard = ({ item, type, setNewItem }: Props) => {
  const isNew = item?.["isNew"] === true;
  const [isEditing, setIsEditing] = useState(isNew);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formState, setFormState] = useState({
    title1: item.title1,
    title2: item.title2 || "",
    description: item.description,
    startDate: formatDateInput(new Date(item.start)),
    endDate: item.end ? formatDateInput(new Date(item.end)) : "",
  });

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const { updateMutation, deleteMutation, createMutation } =
    useDashboardMutation(type, item.id);

  const onEdit = () => {
    setFormState({
      title1: item.title1,
      title2: item.title2 || "",
      description: item.description,
      startDate: formatDateInput(new Date(item.start)),
      endDate: item.end ? formatDateInput(new Date(item.end)) : "",
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

    const data = trimFormData({
      title1: formState.title1,
      title2: formState.title2 || "",
      description: formState.description,
      start: formState.startDate,
      end: formState.endDate || undefined,
    });

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
    <div className="flex flex-col md:flex-row gap-8 relative rounded-2xl hover:shadow-inner transition-shadow duration-200 custom-button !items-start p-4">
      <div className="md:w-1/2 flex w-full md:gap-8">
        <div className="relative w-full flex flex-col gap-2">
          <DateSection
            isEditing={isEditing}
            startDate={formState.startDate}
            endDate={formState.endDate}
            originalStart={item.start}
            originalEnd={item.end ?? undefined}
            setStartDate={(val) => handleChange("startDate", val)}
            setEndDate={(val) => handleChange("endDate", val)}
          />
          <Actions
            onEdit={onEdit}
            onCancel={isNew ? undefined : onCancel}
            isEditing={isEditing}
            isPending={isPending}
            isDeleting={isDeleting}
            onDelete={onDelete}
            onSubmitEdit={onSubmitEdit}
          />
        </div>

        <TitleSection
          isEditing={isEditing}
          title1={formState.title1}
          title2={formState.title2}
          setTitle1={(val) => handleChange("title1", val)}
          setTitle2={(val) => handleChange("title2", val)}
          originalTitle1={item.title1}
          originalTitle2={item.title2}
        />
      </div>

      <DescriptionSection
        isEditing={isEditing}
        description={formState.description}
        setDescription={(val) => handleChange("description", val)}
      />
    </div>
  );
};
