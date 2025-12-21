"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";

// -- YOUR IMPORTS --
import ContactForm from "@/components/shared/ContactForm";
import Footer from "@/components/shared/Footer";
import { CONTACT } from "@/constants/contact";

// ==========================================
// 1. UI PRIMITIVES
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

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white" />
    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
      {children}
    </span>
  </div>
);

// A premium looking link component replacing simple HoverText
const ContactLink = ({
  href,
  label,
  value,
  icon: Icon,
}: {
  href: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className: string }>;
}) => (
  <Link
    href={href}
    className="group flex items-start gap-4 p-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-white/5"
  >
    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors border border-zinc-200 dark:border-white/5">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
          {label}
        </span>
        <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
      <span className="text-lg font-medium text-zinc-900 dark:text-zinc-200">
        {value}
      </span>
    </div>
  </Link>
);

// Widget to show current time (Professional touch)
const TimeWidget = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Assuming Azerbaijan time based on your phone number (+994)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Baku",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm font-mono text-zinc-500">
      <Clock className="w-4 h-4" />
      <span>BAKU, AZ • {time} (GMT+4)</span>
    </div>
  );
};

// ==========================================
// 2. MAIN PAGE
// ==========================================

const ContactPage = () => {
  const heroText =
    "If you prefer not to fill out forms, feel free to email me directly and let's talk about the next big thing!";

  return (
    <div className="min-h-screen  text-zinc-900 dark:text-zinc-200 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-sans">
      <NoiseOverlay />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto md:px-8 pt-24 pb-12"
      >
        {/* --- HEADER --- */}
        <header className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-200 dark:border-white/10 pb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-zinc-900 dark:bg-white" />
                <span className="text-xs font-mono uppercase tracking-[0.2em]">
                  Contact & Inquiries
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6">
                Lets Work.
              </h1>
            </div>

            {/* Status Widget */}
            <div className="flex flex-col items-start md:items-end gap-2 mb-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-mono uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for new projects
              </div>
              <TimeWidget />
            </div>
          </div>

          <p className="text-xl md:text-2xl font-light text-zinc-600 dark:text-zinc-400 max-w-4xl leading-relaxed">
            {heroText}
          </p>
        </header>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* LEFT: Contact Directory */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <SectionLabel>Direct Lines</SectionLabel>
              <div className="flex flex-col gap-2">
                <ContactLink
                  href={CONTACT.GMAIL}
                  label="Email Address"
                  value="hasanaliasadov@gmail.com"
                  icon={Mail}
                />
                <ContactLink
                  href={CONTACT.PHONE}
                  label="Mobile Number"
                  value="+994 50 206 86 05"
                  icon={Phone}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 dark:border-white/10">
              <SectionLabel>Location</SectionLabel>
              <div className="flex items-start gap-4 p-4 -mx-4">
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/5 text-zinc-500 border border-zinc-200 dark:border-white/5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-200">
                    Baku, Azerbaijan
                  </h4>
                  <p className="text-zinc-500 mt-1">
                    Remote available worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form Area */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Decorative Corner Borders */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-zinc-300 dark:border-white/20" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-zinc-300 dark:border-white/20" />

              <div className="bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-2xl p-6 md:p-10">
                <div className="mb-8">
                  <SectionLabel>Project Brief</SectionLabel>
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    Send a message
                  </h3>
                </div>

                {/* We wrap the existing ContactForm to maintain logic,
                   but we assume ContactForm handles its own internal inputs.
                   The wrapper provides the "Elite" container look.
                */}
                <div className="contact-form-theme-wrapper">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      {/* --- FOOTER --- */}
      <div className="border-t border-zinc-200 dark:border-white/10 mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
