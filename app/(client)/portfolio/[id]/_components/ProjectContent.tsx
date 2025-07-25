"use client";

import React from "react";
import MacCodeBlock from "./MacCodeBlock";

type CodeSnippet = {
  title: string;
  code?: string;
  github?: {
    repo: string;
    filePath: string;
    branch?: string;
  };
};

type ProjectContentProps = {
  detailedDescription?: string;
  codeSnippets?: CodeSnippet[];
};

const ProjectContent: React.FC<ProjectContentProps> = ({
  detailedDescription,
  codeSnippets,
}) => {
  return (
    <section
      className="
        overflow-y-visible md:overflow-y-auto
        max-h-full md:max-h-[calc(100vh-5rem)]
        mt-8 md:mt-0 pr-2 md:pr-6
        scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-thumb-rounded
        hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600
      "
    >
      {detailedDescription && (
        <section className="prose prose-indigo dark:prose-invert max-w-none mb-10 md:mb-12">
          <h2 className="text-2xl font-semibold mb-6">Detailed Description</h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-900 dark:text-gray-100">
            {detailedDescription}
          </p>
        </section>
      )}

      {codeSnippets && (
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
            Code Examples
          </h2>
          {codeSnippets.map(({ title, code, github }, idx) => (
            <MacCodeBlock
              key={idx}
              title={title}
              code={code}
              github={github}
              collapsed={idx != codeSnippets.length - 1}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default ProjectContent;
