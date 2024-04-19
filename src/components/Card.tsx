import React from "react";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={
          "w-full rounded-md shadow-md dark:bg-gradient-to-b dark:from-[#1F1F24] dark:to-[#09090E] bg-white " +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}
