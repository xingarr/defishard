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
          "" +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}
