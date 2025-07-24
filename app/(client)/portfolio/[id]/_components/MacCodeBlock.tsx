"use client";

import React, { useState, useEffect, useRef } from "react";

type MacCodeBlockProps = {
  title: string;
  code: string;
};

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

// Qırmızı düymə (Close/Collapse)
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

// Sarı düymə (Minimize)
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
    {hovered && (
      <>
        <span className="text-white text-xs font-bold select-none absolute"></span>
        <span className="w-2 h-[1.5px] bg-black/70 absolute"></span>
      </>
    )}
  </button>
);

// Yaşıl düymə (Fullscreen)
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
      <>
        <span className="text-white absolute top-[3.22px] left-[3.22px] w-[5.5px] h-[5.5px] bg-black/50"></span>
        <span className="w-[10px] h-[2px] bg-green-500 group-hover:bg-green-600 top-[5px] left-[0.7px] -rotate-45 absolute"></span>
      </>
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

const MacCodeBlock: React.FC<MacCodeBlockProps> = ({ title, code }) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await copyToClipboard(code);
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
             w-max px-4 h-10 mr-4 mb-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-300 font-semibold shadow-sm
            hover:shadow-md transition
          "
        >
          {title}
        </button>
      )}

      {!isCollapsed && (
        <div
          className={`
            mb-8 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden max-w-full
            transition-all duration-300 ease-in-out
            ${isFullscreen ? "fixed inset-0 m-4 z-[1000] rounded-lg" : ""}
            ${isMinimized ? "h-12" : ""}
            ${!isMinimized ? "max-h-[calc(100vh-2rem)]" : ""}
          `}
          style={isFullscreen ? { maxHeight: "calc(100vh - 2rem)" } : undefined}
        >
          {/* Mac style top bar */}
          <div
            className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 select-none relative"
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

            {/* Başlıq */}
            <span
              className="ml-4 text-gray-700 dark:text-gray-300 font-medium truncate select-text"
              title={title}
            >
              {title}
            </span>

            <CopyButton onClick={handleCopy} copied={copied} />
          </div>

          {!isMinimized && (
            <pre
              className="p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap bg-white dark:bg-gray-900"
              style={{
                userSelect: "text",
                maxHeight: isFullscreen ? "calc(100vh - 3.5rem)" : undefined,
              }}
            >
              <code>{code}</code>
            </pre>
          )}
        </div>
      )}
    </>
  );
};

export default MacCodeBlock;
