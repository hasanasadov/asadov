"use client";

import React, { useState } from "react";
import { EducationUpdateItem, EducationDeleteItem } from "@/actions/education";
import {
  InternshipUpdateItem,
  InternshipDeleteItem,
} from "@/actions/internship";
import { CardTypeDashboard } from "@/types";
import { DescriptionSection } from "./DescriptionSection";
import { TitleSection } from "./TitleSection";
import { DateSection } from "./DateSection";
import { Actions } from "./Actions";
import { Education, Internship } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/config/query";
import { QUERY_KEYS } from "@/constants/query-keys";

type Props = {
  item: Education | Internship;
  type: CardTypeDashboard;
};

export const CardDashboard = ({ item, type }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedTitle1, setEditedTitle1] = useState(item.title1);
  const [editedTitle2, setEditedTitle2] = useState(item.title2 || "");
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [editedStartDate, setEditedStartDate] = useState(
    new Date(item.start).toISOString().slice(0, 7)
  );
  const [editedEndDate, setEditedEndDate] = useState(
    item.end ? new Date(item.end).toISOString().slice(0, 7) : ""
  );

  const onEdit = () => {
    setEditedTitle1(item.title1);
    setEditedTitle2(item.title2 || "");
    setEditedDescription(item.description);
    setEditedStartDate(new Date(item.start).toISOString().slice(0, 7));
    setEditedEndDate(
      item.end ? new Date(item.end).toISOString().slice(0, 7) : ""
    );
    setIsEditing(true);
  };

  const onCancel = () => {
    const confirmed = confirm("Are you sure you want to cancel the changes?");
    if (!confirmed) return;
    setIsEditing(false);
  };

  const educationMutation = useMutation({
    mutationFn: async () => {
      const updatedData = {
        title1: editedTitle1.trim(),
        title2: editedTitle2.trim(),
        description: editedDescription.trim(),
        start: new Date(editedStartDate),
        end: new Date(editedEndDate),
      };
      return await EducationUpdateItem(item.id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EDUCATION_DASHBOARD],
      });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Education update failed:", error);
    },
  });

  const internshipMutation = useMutation({
    mutationFn: async () => {
      const updatedData = {
        title1: editedTitle1.trim(),
        title2: editedTitle2.trim(),
        description: editedDescription.trim(),
        start: new Date(editedStartDate),
        end: new Date(editedEndDate),
      };
      return await InternshipUpdateItem(item.id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INTERNSHIP_DASHBOARD],
      });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Internship update failed:", error);
    },
  });

  const onDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      if (type === "education") {
        await EducationDeleteItem(item.id);
      } else {
        await InternshipDeleteItem(item.id);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmitEdit = () => {
    const confirmed = confirm("Do you want to save the changes?");
    if (!confirmed) return;

    if (type === CardTypeDashboard.Education) {
      educationMutation.mutate();
    } else if (type === CardTypeDashboard.Internship) {
      internshipMutation.mutate();
    }
  };

  const isPending = educationMutation.isPending || internshipMutation.isPending;
  return (
    <div className="flex flex-col md:flex-row gap-8 relative rounded-2xl hover:shadow-inner transition-shadow duration-200 custom-button !items-start p-4">
      <div className="md:w-1/2 flex w-full md:gap-8">
        <div className="relative w-full flex flex-col gap-2">
          <DateSection
            isEditing={isEditing}
            startDate={editedStartDate}
            endDate={editedEndDate}
            originalStart={item.start}
            originalEnd={item.end ?? undefined}
            setStartDate={setEditedStartDate}
            setEndDate={setEditedEndDate}
          />
          <Actions
            onEdit={onEdit}
            onCancel={onCancel}
            isEditing={isEditing}
            isPending={isPending}
            isDeleting={isDeleting}
            onDelete={onDelete}
            onSubmitEdit={onSubmitEdit}
            // className="absolute top-2 right-2"
          />
        </div>

        <TitleSection
          isEditing={isEditing}
          title1={editedTitle1}
          title2={editedTitle2}
          setTitle1={setEditedTitle1}
          setTitle2={setEditedTitle2}
          originalTitle1={item.title1}
          originalTitle2={item.title2}
        />
      </div>

      <DescriptionSection
        isEditing={isEditing}
        description={editedDescription}
        setDescription={setEditedDescription}
      />
    </div>
  );
};
