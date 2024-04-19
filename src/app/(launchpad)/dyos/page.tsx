import React from "react";
import Image from "next/image";

export default function DyosPage() {
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="fixed h-screen w-full backdrop-blur-lg backdrop-filter flex justify-center flex-col items-center">
        <h4 className="text-[122px] leading-none font-bold max-md:text-6xl">DYOS</h4>
        <p className="text-4xl max-md:text-2xl">Coming Soon</p>
      </div>
      <Image src={"/assets/dyos.png"} alt="dyos" width={500} height={1000} />
    </div>
  );
}
