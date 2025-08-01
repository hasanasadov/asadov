import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import queryClient from "@/config/query";
import {
  EducationUpdateItem,
  EducationDeleteItem,
  EducationAddItem,
} from "@/actions/education";
import {
  InternshipUpdateItem,
  InternshipDeleteItem,
  InternshipAddItem,
} from "@/actions/internship";
import {
  CardTypeDashboard,
  EducationModel,
  InternshipModel,
  ProjectWithSnippets,
} from "@/types";
import {
  CodeSnippet,
  Education,
  GithubSnippet,
  Internship,
} from "@prisma/client";
import {
  GithubSnippetAddItem,
  GithubSnippetDeleteItem,
  GithubSnippetUpdateItem,
} from "@/actions/github";
import {
  CodeSnippetAddItem,
  CodeSnippetDeleteItem,
  CodeSnippetUpdateItem,
} from "@/actions/code";
import {
  ProjectAddItem,
  ProjectDeleteItem,
  ProjectUpdateItem,
} from "@/actions/project";
import { toast } from "sonner";

export const useDashboardMutation = (
  type: CardTypeDashboard,
  itemId: string
) => {
  const updateMutation = useMutation({
    mutationFn: async (
      updatedData:
        | Partial<Education>
        | Partial<Internship>
        | Partial<GithubSnippet>
        | Partial<CodeSnippet>
        | Partial<ProjectWithSnippets>
    ) => {
      switch (type) {
        case CardTypeDashboard.Education:
          return await EducationUpdateItem(itemId, updatedData);
        case CardTypeDashboard.Internship:
          return await InternshipUpdateItem(itemId, updatedData);
        case CardTypeDashboard.GithubSnippet:
          return await GithubSnippetUpdateItem(itemId, updatedData);
        case CardTypeDashboard.CodeSnippet:
          return await CodeSnippetUpdateItem(itemId, updatedData);
        case CardTypeDashboard.Project:
          return await ProjectUpdateItem(itemId, updatedData);
        default:
          throw new Error("Unknown dashboard card type");
      }
    },
    onSuccess: () => {
      const queryKey = validateQueries(type);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success("Updated !");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("Update failed ! ");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      switch (type) {
        case CardTypeDashboard.Education:
          return await EducationDeleteItem(itemId);
        case CardTypeDashboard.Internship:
          return await InternshipDeleteItem(itemId);
        case CardTypeDashboard.GithubSnippet:
          return await GithubSnippetDeleteItem(itemId);
        case CardTypeDashboard.CodeSnippet:
          return await CodeSnippetDeleteItem(itemId);
        case CardTypeDashboard.Project:
          return await ProjectDeleteItem(itemId);
        default:
          throw new Error("Unknown dashboard card type");
      }
    },
    onSuccess: () => {
      const queryKey = validateQueries(type);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success("deleted !");
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error("Delete failed ! ");
    },
  });

  const createMutation = useMutation({
    mutationFn: async (
      newData:
        | Partial<Education>
        | Partial<Internship>
        | Partial<GithubSnippet>
        | Partial<CodeSnippet>
        | Partial<ProjectWithSnippets>
    ) => {
      switch (type) {
        case CardTypeDashboard.Education:
          return await EducationAddItem(newData as EducationModel);
        case CardTypeDashboard.Internship:
          return await InternshipAddItem(newData as InternshipModel);
        case CardTypeDashboard.GithubSnippet:
          return await GithubSnippetAddItem(newData as GithubSnippet);
        case CardTypeDashboard.CodeSnippet:
          return await CodeSnippetAddItem(newData as CodeSnippet);
        case CardTypeDashboard.Project:
          return await ProjectAddItem(newData as ProjectWithSnippets);
        default:
          throw new Error("Unknown dashboard card type");
      }
    },
    onSuccess: () => {
      const queryKey = validateQueries(type);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success("Created !");
    },
    onError: (error) => {
      console.error("Create failed:", error);
      toast.success("Create failed ! ");
    },
  });

  return { updateMutation, deleteMutation, createMutation };
};

const validateQueries = (type: CardTypeDashboard) => {
  switch (type) {
    case CardTypeDashboard.Education:
      return QUERY_KEYS.EDUCATION_DASHBOARD;
    case CardTypeDashboard.Internship:
      return QUERY_KEYS.INTERNSHIP_DASHBOARD;
    case CardTypeDashboard.GithubSnippet:
      return QUERY_KEYS.GITHUB_SNIPPETS_DASHBOARD;
    case CardTypeDashboard.CodeSnippet:
      return QUERY_KEYS.CODE_SNIPPETS_DASHBOARD;
    case CardTypeDashboard.Project:
      return QUERY_KEYS.PROJECT_DASHBOARD;
    default:
      throw new Error("Unknown dashboard card type");
  }
};
