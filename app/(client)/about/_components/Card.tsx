import React from "react";

export const Card = ({
  start,
  end,
  title1,
  title2,
  description,
  loading = false,
}: {
  start: Date;
  end?: Date | null;
  title1: string;
  title2?: string | null;
  description: string;
  loading?: boolean;
}) => {
  const startDate = start instanceof Date ? start : new Date(start);
  const endDate = end instanceof Date ? end : end ? new Date(end) : undefined;

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="md:w-1/2 flex w-full gap-8">
          <div className="w-1/2 h-5 bg-black/20 dark:bg-white/15 rounded mb-2" />
          <div className="w-1/2">
            <div className="h-5 bg-black/20 dark:bg-white/15 rounded mb-2" />
            <div className="h-4 bg-black/20 dark:bg-white/15 rounded" />
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="h-4 bg-black/20 dark:bg-white/15 rounded mb-2" />
          <div className="h-4 bg-black/20 dark:bg-white/15 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 ">
      <div className="md:w-1/2 flex  w-full gap-8">
        <div className="w-1/2 text-[14px] md:text-[16px]">
          {`${startDate.getFullYear()}/${startDate.getMonth() + 1}`} -{" "}
          {endDate
            ? `${endDate.getFullYear()}/${endDate.getMonth() + 1}`
            : "Present"}
        </div>
        <div className="w-1/2 text-[16px] md:text-[20px] text-left">
          <p>{title1}</p>
          <p>{title2}</p>
        </div>
      </div>
      <div className="md:w-1/2 dark:text-white/80 text-black/80 text-left text-[14px] md:text-[16px]">
        <p>{description}</p>
      </div>
    </div>
  );
};
