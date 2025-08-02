import { Project } from "@prisma/client";

export type MacCodeBlockProps = {
  item?: CodeSnippet;
  collapsed?: boolean;
};

export type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export type CodeSnippet = {
  id: string;
  title: string;
  repo?: string;
  filePath?: string;
  branch?: string;
};

export type ProjectContentProps = {
  detailedDescription?: string;
  codeSnippets: CodeSnippet[];
};

export type ProjectSidebarProps = {
  title: string;
  image: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export type FilterDropdownProps = {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
};

export type ProjectCardProps = {
  project: {
    id: number | string;
    title: string;
    image: string;
    description: string;
  };
};

export type SearchInputProps = {
  searchTerm: string;
  onSearchChange: (val: string) => void;
};

export type SelectedFiltersProps = {
  selectedCategories: string[];
  onRemoveCategory: (cat: string) => void;
};

export type InternshipModel = {
  id: string;
  start: Date;
  end: Date | null;
  title1: string;
  title2: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EducationModel = {
  id: string;
  start: Date | string;
  end: Date | string | null;
  title1: string;
  title2: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum CardTypeDashboard {
  Education = "education",
  Internship = "internship",
  Project = "project",
  CodeSnippet = "codeSnippet",
}

export type GithubSnippet = {
  id: string;
  repo: string;
  filePath: string;
  branch: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectWithSnippets = Project & {
  codeSnippets: CodeSnippet[];
};

export type SelectOptionType = {
  value: string;
  label: string;
};

export type ProjectInput = {
  title: string;
  image: string;
  category: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  codeSnippets: { id: string }[];
};
