"use client";

import { educationExperience } from "@/constants/experience";
import { EducationGetItems } from "@/actions/education";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./Card";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const EduExperience = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.EDUCATION],
    queryFn: () => EducationGetItems(),
  });

  const displayData = !data?.length || isError ? educationExperience : data;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col border-t border-neutral-200 dark:border-neutral-800"
    >
      {/* If loading, show skeletons. If loaded, show real data */}
      {isLoading
        ? Array.from({ length: 2 }).map((_, i) => (
            <Card
              key={i}
              loading={true}
              start={new Date()}
              title1=""
              description=""
            />
          ))
        : displayData?.map((item) => (
            <Card
              key={item.id}
              start={
                typeof item.start === "string"
                  ? new Date(item.start)
                  : item.start
              }
              end={typeof item.end === "string" ? new Date(item.end) : item.end}
              title1={item.title1}
              title2={item.title2}
              description={item.description}
            />
          ))}
    </motion.div>
  );
};
