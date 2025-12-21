"use client";

import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send, Loader2, AlertCircle } from "lucide-react";

// --- Schema & Constants ---
const projectTypes = [
  "Full Stack Development",
  "API Integration",
  "Frontend Architecture",
  "Backend Systems",
  "UI/UX Implementation",
  "Performance Optimization",
  "Consultation & Strategy",

  "Maintenance & Support",
];

const budgetRanges = ["$0.5k - $1k", "$1k - $2k", "$2k - $3k", "> $3k"];

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Please provide more details (10+ chars)"),
  selectedProjects: z.array(z.string()).min(1, "Select at least one service"),
  selectedBudget: z.string().min(1, "Select a budget range"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// --- Helper Components ---

const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
    {children}
  </label>
);

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 mt-2 text-red-500"
    >
      <AlertCircle className="w-3 h-3" />
      <span className="text-[10px] font-medium uppercase tracking-wide">
        {message}
      </span>
    </motion.div>
  );
};

// --- Main Component ---

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
      selectedProjects: [],
      selectedBudget: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (response.success) {
        toast.success("Message transmitted.");
        reset();
      } else {
        toast.error("Transmission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // Shared Input Styles
  const inputClasses =
    "w-full bg-transparent border-b border-zinc-200 dark:border-white/10 px-0 py-3 text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors duration-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      {/* 1. Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
        <div className="group">
          <FormLabel>Identity</FormLabel>
          <input
            {...register("fullName")}
            placeholder="John Doe"
            className={inputClasses}
          />
          <ErrorMessage message={errors.fullName?.message} />
        </div>

        <div className="group">
          <FormLabel>Coordinates</FormLabel>
          <input
            {...register("email")}
            placeholder="john@company.com"
            className={inputClasses}
          />
          <ErrorMessage message={errors.email?.message} />
        </div>
      </div>

      {/* 2. Project Selection (Tags) */}
      <div>
        <FormLabel>Service Required</FormLabel>
        <Controller
          name="selectedProjects"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2 mt-3">
              {projectTypes.map((item) => {
                const isSelected = field.value.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      isSelected
                        ? field.onChange(field.value.filter((v) => v !== item))
                        : field.onChange([...field.value, item])
                    }
                    className={`
                      px-4 py-2 rounded-lg text-sm transition-all duration-300 border
                      ${
                        isSelected
                          ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white"
                          : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30"
                      }
                    `}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        />
        <ErrorMessage message={errors.selectedProjects?.message} />
      </div>

      {/* 3. Budget Selection (Segments) */}
      <div>
        <FormLabel>Investment Range</FormLabel>
        <Controller
          name="selectedBudget"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {budgetRanges.map((budget) => {
                const isSelected = field.value === budget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => field.onChange(budget)}
                    className={`
                      px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border text-center
                      ${
                        isSelected
                          ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-md"
                          : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>
          )}
        />
        <ErrorMessage message={errors.selectedBudget?.message} />
      </div>

      {/* 4. Message Area */}
      <div>
        <FormLabel>Project Brief</FormLabel>
        <textarea
          {...register("message")}
          placeholder="Describe your project goals, timeline, and any specific requirements..."
          className={`${inputClasses} min-h-[120px] resize-none`}
        />
        <div className="flex justify-between items-start mt-2">
          <ErrorMessage message={errors.message?.message} />
          <span className="text-[10px] text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">
            Markdown Supported
          </span>
        </div>
      </div>

      {/* 5. Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`
            group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 
            bg-zinc-900 dark:bg-white text-white dark:text-black 
            rounded-xl font-medium text-sm uppercase tracking-wider 
            transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg hover:shadow-xl
          `}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
