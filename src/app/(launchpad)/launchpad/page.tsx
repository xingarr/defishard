"use client";

import Button from "@/components/Button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";

export default function LanuchpadPage() {
  return (
    <div className="container mx-auto mt-[42px] max-w-[1340px] max-md:px-4">
      <div className="flex h-[calc(100vh-300px)] max-md:h-auto w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="grid w-full grid-cols-2 gap-8 max-md:grid-cols-1">
            <div className="rounded-lg bg-[#F2F2F2] px-8 py-6 dark:bg-[#131315B2]">
              <AspectRatio ratio={16 / 13}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col justify-between pb-8 dark:text-[#BDBDBD] max-md:gap-10">
              <div className="mt-[10px] text-[24px] dark:text-white max-md:text-[16px]">
                DeFishard1 (DEFI1){" "}
                <div className="flex text-[14px] mt-3 max-md:text-[12px]">
                  <Image
                    src={"/assets/avatar.png"}
                    alt="avatar"
                    width={18}
                    height={18}
                    className="mr-1 w-[18px] shrink-0"
                  />
                  @miriamammi
                </div>
              </div>
              <p className="text-[16px] max-md:text-[14px]">
                We all just want to be celebrated; not only for the things we
                do, but more importantly, for who we are and how we show up in
                the world. Don’t forget to give out flowers while you can. To
                others, and to yourself. c. Sean Wiliams, 2024
              </p>
              <p className="text-[16px] max-md:text-[14px]">
                We all just want to be celebrated; not only for the things we
                do, but more importantly, for who we are and how we show up in
                the world.{" "}
              </p>
              <div className="grid grid-cols-3 max-md:text-[14px]">
                <div>
                  Payment Split %<p className="mt-4">50%</p>
                </div>
                <div>
                  Total Supply<p className="mt-4">10,000</p>
                </div>
                <div>
                  Date<p className="mt-4">4d 16h 32m 10s</p>
                </div>
              </div>
              <div className="flex justify-between max-md:text-[14px]">
                <span>Mint Fee</span>
                <span className="font-bold dark:text-white">10 NEAR</span>
              </div>
            </div>
          </div>
          <Button className="w-1/2 text-lg max-md:w-full">Mint</Button>
        </div>
      </div>
    </div>
  );
}
