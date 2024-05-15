"use client";

import Image from "next/image";
import React from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function AssetsPage() {
  return (
    <div className="container mx-auto my-16 max-sm:px-4">
      <h2 className="text-4xl">My Holdings</h2>
      <div className="mt-10 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div className="w-full rounded-lg bg-[#F2F2F2] p-4 dark:bg-[#131315B2]">
          <AspectRatio ratio={16 / 12}>
            <Image
              src={"/assets/trending.png"}
              alt="token"
              width={400}
              height={300}
              className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
          <span className="text-xs mt-4 block">@miriamammi</span>
          <p className="my-2">DeFishard1 (DEFI1)</p>
          <p className="mb-5 mt-5 flex justify-between text-sm">
            My holdings <span>2</span>
          </p>
        </div>
      </div>
    </div>
  );
}
