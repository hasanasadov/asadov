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
  Layers,
  Calendar,
  ChevronRight,
  Command,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

// -- MOCK IMPORTS (Keep your existing paths) --
import { ProjectGetItem } from "@/actions/project";
import { fetchGithubCode } from "@/actions/code";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ProjectDetailPageProps } from "@/types";

// ==========================================
// 1. ELITE UI PRIMITIVES
// ==========================================

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.6"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="flex items-center gap-2 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
    <span className="w-2 h-2 rounded-full bg-blue-500" />
    {children}
  </h3>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 custom-button text-[11px] font-mono tracking-wide uppercase rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10">
    {children}
  </span>
);

// ==========================================
// 2. COMPONENT: MACK-OS STYLE CODE WINDOW
// ==========================================

interface CodeSnippet {
  title: string;
  filePath: string;
  repo: string;
  branch: string | null;
}

const EditorWindow = ({ item }: { item: CodeSnippet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: code, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GITHUB_CODE, item],
    queryFn: () =>
      fetchGithubCode(
        item?.repo || "",
        item?.filePath || "",
        item?.branch || "main",
      ),
    enabled: isOpen,
  });

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="group relative w-full mb-6 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0C0C0C] overflow-hidden transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/20"
    >
      {/* Window Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 cursor-pointer bg-white dark:bg-[#0C0C0C] border-b border-zinc-200 dark:border-white/5"
      >
        <div className="flex items-center gap-4">
          {/* Traffic Lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          {/* File Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-white/10">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
              {item.title}
            </span>
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
              — {item.filePath}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            {isOpen ? "Hide Source" : "View Source"}
          </span>
          <ChevronRight
            className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {/* Window Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="relative bg-[#09090b] dark:bg-[#050505]">
              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 z-20 p-2 rounded bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-colors border border-white/5 backdrop-blur-sm"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              <div className="p-6 overflow-x-auto">
                {isLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-white/5 rounded w-1/3" />
                    <div className="h-4 bg-white/5 rounded w-2/3" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                  </div>
                ) : (
                  <pre className="font-mono text-xs sm:text-sm leading-6 text-zinc-300">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/5 border-r border-white/5 z-0" />
                    <code className="relative z-10 block pl-8">
                      {code || "// Content unavailable"}
                    </code>
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ==========================================
// 3. MAIN PAGE: "THE STUDIO LAYOUT"
// ==========================================

const ProjectDetailPage = (props: ProjectDetailPageProps) => {
  const params = React.use(props.params);
  const projectId = params.id;
  const containerRef = useRef<HTMLDivElement>(null);

  // -- Scroll Animations --
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, projectId],
    queryFn: () => ProjectGetItem(projectId),
  });

  if (isLoading) return <LoadingScreen />;
  if (isError || !project) return <ErrorScreen />;

  return (
    <div className="min-h-screen] text-zinc-900 dark:text-zinc-200 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      <NoiseOverlay />

      {/* --- HERO SECTION: Full Screen & Cinematic --- */}
      <header className="relative h-[90vh] flex flex-col justify-end overflow-hidden border-b border-zinc-200 dark:border-white/10">
        <motion.div
          style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* Gradient Mesh for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#050505] z-10" />
          <div className="absolute inset-0 bg-zinc-900/10 dark:bg-black/40 z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="relative z-20 w-full  mx-auto  md:px-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-zinc-900 dark:bg-white" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-900 dark:text-white">
                Case Study .0{projectId}
              </span>
            </div>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white mix-blend-difference mb-8">
              {project.title}
            </h1>
            <p className="max-w-xl text-xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </header>

      {/* --- SPLIT LAYOUT: Sticky Sidebar + Scrollable Content --- */}
      <main ref={containerRef} className="relative  mx-auto  md:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LEFT: Sticky Metadata (The "Specifications") */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-12 space-y-12">
              {/* Actions */}
              <div className="flex flex-col gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="group flex items-center justify-between p-4 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                  >
                    <span className="text-sm font-medium flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Live Deployment
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    className="group flex items-center justify-between p-4 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                  >
                    <span className="text-sm font-medium flex items-center gap-3">
                      <Github className="w-4 h-4" />
                      Source Code
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="p-4 rounded-lg border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 text-sm font-mono text-center">
                    Private Repository
                  </div>
                )}
              </div>

              {/* Data Points */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-100 dark:border-white/5">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-zinc-400">
                      <Layers className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">
                        Type
                      </span>
                    </div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      Full Stack App
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">
                        Timeline
                      </span>
                    </div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      4 Weeks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Narrative Content (The "Story") */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading>Architectural Overview</SectionHeading>

              {/* Typography Styles */}
              <div
                className="prose prose-xl prose-zinc dark:prose-invert max-w-none 
                prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:font-light prose-p:leading-8 
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-a:text-blue-500 hover:prose-a:text-blue-400 prose-a:no-underline
                prose-strong:font-medium prose-strong:text-zinc-900 dark:prose-strong:text-white"
              >
                <p className="whitespace-pre-line leading-relaxed">
                  {project.detailedDescription}
                </p>
              </div>
            </motion.div>

            {/* Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent my-16" />

            {/* Code Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <SectionHeading>Implementation Details</SectionHeading>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Command className="w-3 h-3" />
                  <span>READ_ONLY_MODE</span>
                </div>
              </div>

              {project.codeSnippets && project.codeSnippets.length > 0 ? (
                <div className="space-y-2">
                  {project.codeSnippets.map((snippet, i) => (
                    <EditorWindow key={i} item={snippet} />
                  ))}
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
                  <Code2 className="w-6 h-6 text-zinc-300 mb-2" />
                  <span className="text-sm text-zinc-400">
                    Source restricted
                  </span>
                </div>
              )}
            </motion.div>
            {/* Impact CTA */}
            <div className="mt-16 rounded-2xl border border-zinc-100 dark:border-white/5 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-400/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-2">
                  Next Steps
                </p>
                <h4 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white">
                  Want a similar build for your product?
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 max-w-xl">
                  I can adapt this stack to your roadmap, ship MVPs quickly, and
                  document everything for easy handoff.
                </p>
              </div>
              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="px-4 flex items-center !py-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90 transition"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    <p className="whitespace-nowrap">View Live</p>
                  </a>
                )}
                <a
                  href="/contact"
                  className="px-4 !py-3 flex items-center rounded-lg border border-zinc-300 dark:border-white/20 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-white/10 transition"
                >
                  <Calendar className="w-3 h-3 mr-2" />
                  <p className="whitespace-nowrap">Book a call</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-white/5 text-center">
        <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
          End of Document
        </p>
      </footer>
    </div>
  );
};

// --- Helper Components for Loading/Error ---

const LoadingScreen = () => (
  <div className="h-screen w-full  flex items-center justify-center">
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-t border-zinc-200 dark:border-white/20 rounded-full animate-spin" />
        <div className="absolute inset-2 border-t border-zinc-800 dark:border-white rounded-full animate-spin [animation-direction:reverse]" />
      </div>
      <span className="text-xs font-mono tracking-[0.3em] animate-pulse">
        LOADING DATA
      </span>
    </div>
  </div>
);

const ErrorScreen = () => (
  <div className="h-screen w-full  flex flex-col items-center justify-center gap-4">
    <div className="p-4 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500">
      <Layers className="w-8 h-8" />
    </div>
    <h1 className="text-xl font-medium">Project Unavailable</h1>
    <p className="text-zinc-500">The requested resource could not be found.</p>
  </div>
);

export default ProjectDetailPage;
