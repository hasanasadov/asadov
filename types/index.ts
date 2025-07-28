type GithubProps = {
  repo: string;
  filePath: string;
  branch?: string;
};

export type MacCodeBlockProps = {
  title: string;
  code?: string;
  github?: GithubProps;
  collapsed?: boolean;
};

export type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export type CodeSnippet = {
  title: string;
  code?: string;
  github?: {
    repo: string;
    filePath: string;
    branch?: string;
  };
};

export type ProjectContentProps = {
  detailedDescription?: string;
  codeSnippets?: CodeSnippet[];
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
    id: number;
    title: string;
    image: string;
    href: string;
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
