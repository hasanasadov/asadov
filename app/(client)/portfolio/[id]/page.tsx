"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Terminal,
  Copy,
  Check,
  Code2,
  Maximize2,
  Minimize2,
  Database,
  Globe,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

// -- MOCK IMPORTS --
import { ProjectGetItem } from "@/actions/project";
import { fetchGithubCode } from "@/actions/code";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ProjectDetailPageProps } from "@/types";

// ==========================================
// 1. UI PRIMITIVES (Theme Aware)
// ==========================================

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    {/* Grid Pattern: Adapts opacity for light/dark */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

    {/* Radial Fade: White in light mode, Black in dark mode */}
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-[#030303] dark:via-transparent dark:to-transparent" />
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="h-[1px] w-8 bg-blue-600/50 dark:bg-blue-500/50" />
    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase font-bold">
      {children}
    </span>
  </div>
);

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`
    relative overflow-hidden rounded-2xl 
    bg-white/60 dark:bg-white/[0.02] 
    border border-zinc-200 dark:border-white/5 
    backdrop-blur-xl shadow-sm dark:shadow-none
    hover:border-zinc-300 dark:hover:border-white/10 hover:bg-white/80 dark:hover:bg-white/[0.04] 
    transition-all duration-500
    ${className}
  `}
  >
    {children}
  </div>
);

// ==========================================
// 2. COMPONENT: CODE TERMINAL
// ==========================================

interface CodeSnippet {
  title: string;
  filePath: string;
  repo: string;
  branch: string | null;
}

const FuturisticCodeBlock = ({ item }: { item: CodeSnippet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: code, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GITHUB_CODE, item],
    queryFn: () =>
      fetchGithubCode(
        item?.repo || "",
        item?.filePath || "",
        item?.branch || "main"
      ),
    enabled: isOpen,
  });

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Code copied");
    }
  };

  return (
    <div className="w-full mb-4">
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group cursor-pointer relative rounded-xl border transition-all duration-300 overflow-hidden
          ${
            isOpen
              ? "bg-white dark:bg-[#0A0A0A] border-blue-500/50 shadow-lg dark:shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]"
              : "bg-white/50 dark:bg-[#0A0A0A] border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50/50 dark:bg-transparent">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg transition-colors ${
                isOpen
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                  : "bg-zinc-200/50 text-zinc-500 dark:bg-white/5 dark:text-zinc-500"
              }`}
            >
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                {item.title}
              </h4>
              <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 uppercase tracking-wider mt-0.5">
                {item.filePath}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
              {isOpen ? "ACTIVE_SESSION" : "OFFLINE"}
            </span>
            {isOpen ? (
              <Minimize2 className="w-4 h-4 text-zinc-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-zinc-400" />
            )}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="border-t border-zinc-100 dark:border-white/5"
            >
              <div className="relative">
                {/* Accent Line */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 z-10 p-2 rounded-md bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5 transition-all"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {/* Inner Code Area - Always Dark for best syntax highlighting */}
                <div className="p-6 overflow-x-auto bg-[#09090b]">
                  {isLoading ? (
                    <div className="flex flex-col gap-2 animate-pulse">
                      <div className="h-4 bg-zinc-800 rounded w-1/4" />
                      <div className="h-4 bg-zinc-800 rounded w-1/2" />
                      <div className="h-4 bg-zinc-800 rounded w-1/3" />
                    </div>
                  ) : (
                    <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                      <code>{code || "// No snippet data retrieved."}</code>
                    </pre>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ==========================================
// 3. MAIN PAGE
// ==========================================

const ProjectDetailPage = (props: ProjectDetailPageProps) => {
  const params = React.use(props.params);
  const projectId = params.id;
  const containerRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, projectId],
    queryFn: () => ProjectGetItem(projectId),
  });

  if (isLoading)
    return (
      <div className="h-screen bg-zinc-50 dark:bg-[#030303] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-zinc-500 font-mono text-xs animate-pulse">
            INITIALIZING SYSTEM...
          </span>
        </div>
      </div>
    );

  if (isError || !project)
    return (
      <div className="h-screen bg-zinc-50 dark:bg-[#030303] flex items-center justify-center text-red-500 font-mono">
        ERROR: PROJECT_NOT_FOUND
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-zinc-50 dark:bg-[#030303] text-zinc-900 dark:text-zinc-200 selection:bg-blue-500/20 font-sans overflow-x-hidden transition-colors duration-500"
    >
      <BackgroundGrid />

      <section className="relative h-[85vh] w-full flex items-end justify-start overflow-hidden">
        {/* Background Image Parallax */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* Gradient Overlay: Fades to Zinc-50 (Light) or Black (Dark) at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/20 to-transparent dark:from-[#030303] dark:via-[#030303]/40 dark:to-transparent z-10" />

          {/* Image Scrim: Darkens image slightly in both modes so text pops, but lighter in light mode */}
          <div className="absolute inset-0 bg-white/10 dark:bg-black/40 z-10" />

          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 w-full  mx-auto md:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[0.9]">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed border-l-2 border-blue-600 dark:border-blue-500/50 pl-6">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <main className="relative z-20  mx-auto md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* 1. Main Stats / Actions (Top Row) */}
          <div className="col-span-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live Demo Card */}
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between group h-full min-h-[160px]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-zinc-100 dark:bg-white/5 rounded-lg text-zinc-400 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-1">
                  Live Deployment
                </h3>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    Access Server{" "}
                    <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-green-500 block" />
                  </a>
                ) : (
                  <span className="text-sm text-zinc-500">
                    Deployment Restricted
                  </span>
                )}
              </div>
            </GlassCard>

            {/* Source Code Card */}
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between group h-full min-h-[160px]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-zinc-100 dark:bg-white/5 rounded-lg text-zinc-400 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-1">
                  Source Repository
                </h3>
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    View Architecture
                  </a>
                ) : (
                  <span className="text-sm text-zinc-500">
                    Private Repository
                  </span>
                )}
              </div>
            </GlassCard>
          </div>

          {/* 2. Tech Stack (Right Side - Tall) */}
          <div className="col-span-1 lg:col-span-4 row-span-2">
            <GlassCard className="h-full p-6 md:p-8">
              <div className="flex items-center gap-2 mb-8 text-zinc-400 dark:text-zinc-500">
                <Database className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  Tech Stack
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="
                                    px-3 py-1.5 rounded text-xs font-mono cursor-default transition-all
                                    bg-zinc-100 dark:bg-white/5 
                                    border border-zinc-200 dark:border-white/5 
                                    text-zinc-600 dark:text-zinc-300
                                    hover:border-zinc-300 dark:hover:border-white/20 
                                    hover:bg-white dark:hover:bg-white/10
                                    hover:text-zinc-900 dark:hover:text-white
                                "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-zinc-200 dark:border-white/5">
                <div className="flex items-center gap-2 mb-4 text-zinc-400 dark:text-zinc-500">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-widest">
                    Metadata
                  </span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Client
                    </span>
                    <span className="text-zinc-800 dark:text-zinc-300">
                      Confidential
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Timeline
                    </span>
                    <span className="text-zinc-800 dark:text-zinc-300">
                      4 Weeks
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Role
                    </span>
                    <span className="text-zinc-800 dark:text-zinc-300">
                      Full Stack Eng.
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* 3. Detailed Description (Middle Left) */}
          <div className="col-span-1 lg:col-span-8">
            <GlassCard className="p-8 md:p-12">
              <SectionLabel>SYSTEM OVERVIEW</SectionLabel>
              <div
                className="prose prose-lg max-w-none 
                        prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-8 
                        prose-headings:text-zinc-900 dark:prose-headings:text-white prose-headings:font-bold 
                        prose-strong:text-zinc-900 dark:prose-strong:text-white 
                        prose-a:text-blue-600 dark:prose-a:text-blue-400
                     "
              >
                <p className="whitespace-pre-line">
                  {project.detailedDescription}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* 4. Code Section (Bottom Full Width) */}
          <div className="col-span-1 lg:col-span-12 mt-8">
            <SectionLabel>CORE ARCHITECTURE</SectionLabel>
            {project.codeSnippets && project.codeSnippets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {project.codeSnippets.map((snippet, i) => (
                  <FuturisticCodeBlock key={i} item={snippet} />
                ))}
              </div>
            ) : (
              <div className="p-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-xl flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600">
                <Code2 className="w-8 h-8 mb-4 opacity-50" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  No Source Code Exposed
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Decorative Footer Gradient */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-50 to-transparent dark:from-[#030303] dark:to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default ProjectDetailPage;
