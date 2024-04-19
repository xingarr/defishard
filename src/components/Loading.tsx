import React from "react";
import Image from "next/image";

import { ClipLoader } from "react-spinners";

export default function LoadingComponent() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-background">
      <div className="relative flex justify-center items-center">
        <ClipLoader color="#36d7b7" size={120}/>
        <ClipLoader color="#8E4CE2" size={150} className="absolute rotate-12"/>
        <ClipLoader color="#36d7b7" size={180} className="absolute rotate-12"/>
        <Image
          src={"/assets/logo.webp"}
          alt="Logo"
          className="brightness-50 hue-rotate-180 dark:brightness-100 absolute "
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}
