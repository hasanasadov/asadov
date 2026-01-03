"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  Shield,
  Calendar,
  HardDrive,
  Hash,
  ChevronRight,
} from "lucide-react";
import Footer from "@/components/shared/Footer";

// --- UTILS ---
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

const ResumePage = () => {
  const [copied, setCopied] = useState(false);

  // --- CONFIGURATION ---
  const RESUME_URL = "/resume.pdf";
  const EMAIL = "hasanaliasadov@gmail.com";
  const FILE_NAME = "Hasanali_Asadov_CV.pdf";
  const LAST_UPDATED = "October 24, 2024";

  const handlePrint = () => {
    window.open(RESUME_URL, "_blank");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between  text-zinc-900 dark:text-zinc-200 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <NoiseOverlay />

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full  mx-auto md:px-8 py-10"
      >
        {/* --- HEADER --- */}
        <div className="mb-12 border-b border-zinc-200 dark:border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800">
              <FileText className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </span>
            <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
              Document Repository
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-2">
            Hasanali Asadov
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Professional Curriculum Vitae & Technical Summary
          </p>
        </div>

        {/* --- MAIN DOCUMENT CARD --- */}
        <div className="bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden mb-8">
          {/* Top Section: Primary Action */}
          <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-start gap-5">
              <div className="p-4 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl hidden md:block">
                <FileText className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-medium text-zinc-900 dark:text-white">
                  Full Stack Developer Resume
                </h3>
                <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
                  Comprehensive overview of experience, stack, and education.
                  Optimized for ATS and print.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-medium">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                  <span className="text-xs text-zinc-400">PDF • 2.4 MB</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href={RESUME_URL}
                download={FILE_NAME}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-200 dark:shadow-none"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </a>
            </div>
          </div>

          {/* Bottom Section: Metadata Table */}
          <div className="bg-zinc-50/50 dark:bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-white/5">
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase">
                  <Calendar className="w-3 h-3" /> Last Updated
                </div>
                <span className="text-sm font-medium">{LAST_UPDATED}</span>
              </div>

              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase">
                  <HardDrive className="w-3 h-3" /> Version
                </div>
                <span className="text-sm font-medium">v2.4.0 (Stable)</span>
              </div>

              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase">
                  <Hash className="w-3 h-3" /> Reference ID
                </div>
                <span className="text-sm font-mono text-zinc-500">
                  HA-2024-CV-PDF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECONDARY ACTIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Print Action */}
          <button
            onClick={handlePrint}
            className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-100 dark:bg-white/5 rounded-lg text-zinc-500">
                <Printer className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                  Print Document
                </span>
                <span className="text-xs text-zinc-500">System dialog</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500" />
          </button>

          {/* Email Action */}
          <button
            onClick={handleCopyEmail}
            className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg transition-colors ${
                  copied
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-zinc-100 dark:bg-white/5 text-zinc-500"
                }`}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                  {copied ? "Address Copied" : "Copy Email Address"}
                </span>
                <span className="text-xs text-zinc-500">{EMAIL}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500" />
          </button>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default ResumePage;
