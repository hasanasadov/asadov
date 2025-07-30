import { useMutation } from "@tanstack/react-query";
import queryClient from "@/config/query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { EducationUpdateItem, EducationDeleteItem } from "@/actions/education";
import {
  InternshipUpdateItem,
  InternshipDeleteItem,
} from "@/actions/internship";
import { CardTypeDashboard } from "@/types";
import { Education, Internship } from "@prisma/client";

export const useDashboardMutation = (
  type: CardTypeDashboard,
  itemId: string
) => {
  const updateMutation = useMutation({
    mutationFn: async (updatedData: Partial<Education> | Partial<Internship>) => {
      if (type === CardTypeDashboard.Education) {
        return await EducationUpdateItem(itemId, updatedData);
      } else {
        return await InternshipUpdateItem(itemId, updatedData);
      }
    },
    onSuccess: () => {
      const queryKey =
        type === CardTypeDashboard.Education
          ? QUERY_KEYS.EDUCATION_DASHBOARD
          : QUERY_KEYS.INTERNSHIP_DASHBOARD;

      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (type === CardTypeDashboard.Education) {
        return await EducationDeleteItem(itemId);
      } else {
        return await InternshipDeleteItem(itemId);
      }
    },
    onSuccess: () => {
      const queryKey =
        type === CardTypeDashboard.Education
          ? QUERY_KEYS.EDUCATION_DASHBOARD
          : QUERY_KEYS.INTERNSHIP_DASHBOARD;

      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  return { updateMutation, deleteMutation };
};
