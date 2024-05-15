import React from "react";
import Image from "next/image";

export default function DyosPage() {
  return (
    <div className="flex items-center justify-center relative">
      <div className="absolute h-screen w-full flex justify-center flex-col items-center">
        <h4 className="text-[122px] leading-none font-bold max-md:text-6xl">DYOS</h4>
        <p className="text-4xl max-md:text-2xl">Coming Soon</p>
      </div>
      <Image src={"/assets/dyos-back.png"} alt="dyos" width={500} height={1000} className="w-full h-screen dark:hidden" />
      <Image src={"/assets/dyos-dark-back.png"} alt="dyos" width={500} height={1000} className="w-full h-screen dark:block hidden" />
    </div>
  );
}
