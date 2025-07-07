"use client";

import Footer from "@/components/shared/Footer";
import HoverText from "@/components/shared/HoverText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React, { useState } from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className=" text-[26px] md:text-[36px] lg:text-[48px]  leading-tight lg:w-8/12 mb-12">
        If you prefer not to fill out forms, feel free to email me directly and
        let&#39;s talk about the next big thing!
      </h1>

      <div className="flex flex-col md:flex-row md:gap-24 gap-6 justify-between w-full">
        <div className="md:w-1/3 w-full">
          <div className="w-full md:w-1/2 flex flex-col md:gap-4 gap-2 text-2xl">
            <Link href={"mailto:hasanaliasadov@gmail.com"}>
              <HoverText text="hasanaliasadov@gmail.com" />
            </Link>
            <Link href={"tel:+994502068605"}>
              <HoverText text="+994 50 206 86 05" />
            </Link>
          </div>
        </div>
        <div className="md:w-2/3 w-full">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const projectTypes = [
  "Multipage Website Design",
  "Landing Page Design",
  "Framer Website Development",
  "Framer Landing Page Development",
];

const budgetRanges = ["$1k – $5k", "$5k – $10k", "$10k – $20k", "> $20k"];

const ContactForm = () => {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  const toggleProject = (project: string) => {
    setSelectedProjects((prev) =>
      prev.includes(project)
        ? prev.filter((p) => p !== project)
        : [...prev, project]
    );
  };

  return (
    <div className="w-full shadow-inner shadow-gray-800 rounded-3xl dark:bg-white/5 bg-black/30 lg:p-10 md:p-8 p-6">
      <form
        className="flex flex-col gap-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Full Name</label>
          <Input
            className="!p-6 bg-white/5 rounded-xl border-white/10 focus:outline-0"
            type="text"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Email</label>
          <Input
            className="!p-6 bg-white/5 rounded-xl border-white/10 focus:outline-0"
            type="email"
            placeholder="Your email"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <p className="mb-4 text-lg">What’s Your Project About?</p>
            <div className="flex flex-col gap-4">
              {projectTypes.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-md border ${
                      selectedProjects.includes(item)
                        ? "bg-white border-white"
                        : "border-white/30"
                    } transition`}
                    onClick={() => toggleProject(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className="mb-4 text-lg">Project Budget</p>
            <div className="flex flex-col gap-4">
              {budgetRanges.map((budget) => (
                <label
                  key={budget}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full border ${
                      selectedBudget === budget
                        ? "bg-white border-white"
                        : "border-white/30"
                    } transition`}
                    onClick={() => setSelectedBudget(budget)}
                  />
                  <span>{budget}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex-1">
            <p className="mb-4 text-lg">Share More Details</p>
          </div>
          <div>
            <Textarea
              className="!p-6 bg-white/5 rounded-xl border-white/10 focus:outline-0 min-h-[200px]"
              placeholder="About your project"
            />
          </div>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="!py-6 !px-10 text-lg bg-white/5 rounded-xl border-white/10 focus:outline-0"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AboutPage;
