"use client";

import React, { useState, useEffect, useRef } from "react";
import { MacCodeBlockProps } from "@/types";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubCode } from "@/actions/code";

const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    return new Promise<void>((resolve, reject) => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        resolve();
      } catch {
        reject();
      }
    });
  }
};

// --- Mac düymələri (qısa) ---
const CloseButton = ({
  onClick,
  hovered,
}: {
  onClick: () => void;
  hovered: boolean;
}) => (
  <button
    onClick={onClick}
    aria-label="Close window"
    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:bg-red-700 transition relative flex items-center justify-center"
    type="button"
  >
    {hovered && (
      <span className="text-black/70 text-[10px] font-bold select-none absolute">
        &times;
      </span>
    )}
  </button>
);

const MinimizeButton = ({
  onClick,
  hovered,
}: {
  onClick: () => void;
  hovered: boolean;
}) => (
  <button
    onClick={onClick}
    aria-label="Minimize window"
    className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition relative flex items-center justify-center"
    type="button"
  >
    {hovered && <span className="w-2 h-[1.5px] bg-black/70 absolute"></span>}
  </button>
);

const FullscreenButton = ({
  onClick,
  hovered,
  isFullscreen,
}: {
  onClick: () => void;
  hovered: boolean;
  isFullscreen: boolean;
}) => (
  <button
    onClick={onClick}
    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    type="button"
    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition relative flex items-center justify-center group"
  >
    {hovered && (
      <div>
        <span className="w-[6px] h-[6px] top-[3px] left-[3px] bg-black group-hover:bg-black absolute"></span>
        <span className="w-[10px] h-[2px] bg-green-500 group-hover:bg-green-600 top-[5px] left-[1px] -rotate-45 absolute duration-75"></span>
      </div>
    )}
  </button>
);

const CopyButton = ({
  onClick,
  copied,
}: {
  onClick: () => void;
  copied: boolean;
}) => (
  <button
    onClick={onClick}
    aria-label="Copy code"
    aria-pressed={copied}
    type="button"
    className={`
      ml-auto px-3 py-1 rounded text-sm font-semibold
      focus:outline-none 
      transition-colors
      dark:hover:bg-black/70 hover:bg-black/10
      cursor-pointer
    `}
    title={copied ? "Copied!" : "Copy code"}
  >
    {copied ? "Copied ✔" : "Copy"}
  </button>
);

const MacCodeBlock: React.FC<MacCodeBlockProps> = ({
  item,
  collapsed = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: fetchedCode, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GITHUB_CODE, item],
    queryFn: () =>
      fetchGithubCode(
        item?.repo || "",
        item?.filePath || "",
        item?.branch || "main"
      ),
  });

  const codeToShow = item ? fetchedCode : "";

  const handleCopy = async () => {
    try {
      await copyToClipboard(codeToShow || "");
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy!");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    setIsMinimized(false);
    setIsFullscreen(false);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
    setIsCollapsed(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setIsCollapsed(false);
    setIsMinimized(false);
  };

  return (
    <>
      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          aria-label="Expand window"
          type="button"
          className="
             w-max px-4 h-10 !cursor-pointer mr-4 mb-4 rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-white/10 dark:hover:bg-white/5 hover:bg-black/5 z-10
            text-gray-700 dark:text-gray-300 font-semibold shadow-sm
            hover:shadow-md transition
          "
        >
          {item?.title}
        </button>
      )}

      {!isCollapsed && (
        <div
          className={`
            mb-8 rounded-lg border z-[9999999999999999] border-black/10 dark:border-white/10 bg-white dark:bg-white/10 shadow-sm overflow-hidden max-w-full
            transition-all duration-300 ease-in-out
            ${isFullscreen ? "fixed inset-0 m-4 z-[1000] rounded-lg" : ""}
            ${isMinimized ? "h-12" : ""}
          `}
          style={isFullscreen ? { maxHeight: "calc(100vh + 2rem)" } : undefined}
        >
          {/* Mac style top bar */}
          <div
            className={`flex items-center gap-2 px-3  !pr-1 py-1 bg-black/10  select-none relative
                ${isFullscreen ? "dark:bg-slate-900" : "dark:bg-white/10"} 
              `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <CloseButton onClick={toggleCollapse} hovered={hovered} />
            <MinimizeButton onClick={toggleMinimize} hovered={hovered} />
            <FullscreenButton
              onClick={toggleFullscreen}
              hovered={hovered}
              isFullscreen={isFullscreen}
            />

            <span
              className="ml-4 text-black dark:text-white font-medium truncate select-text"
              title={item?.title || ""}
            >
              {item?.title}
            </span>
            <CopyButton onClick={handleCopy} copied={copied} />
          </div>

          {!isMinimized && (
            <pre
              className="p-4  dark:bg-black overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap bg-white "
              style={{
                userSelect: "text",
                maxHeight: isFullscreen ? "calc(100vh - 4.5rem)" : undefined,
              }}
            >
              {item ? (
                isLoading ? (
                  <span>Loading...</span>
                ) : (
                  <code>{fetchedCode}</code>
                )
              ) : (
                <span className="text-gray-500">No code available</span>
              )}
            </pre>
          )}
        </div>
      )}
    </>
  );
};

export default MacCodeBlock;
