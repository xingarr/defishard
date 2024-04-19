"use client";

/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";

import Card from "@/components/Card";
import { useRef } from "react";
import { useIsVisible } from "@/hooks/useIsVisible";

export default function HomePage() {
  const router = useRouter();
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const isVisible1 = useIsVisible(ref1);
  const isVisible2 = useIsVisible(ref2);
  const isVisible3 = useIsVisible(ref3);

  return (
    <main className="overflow-hidden dark:bg-[#09090E]">
      <section className="min-h-screen">
        <div className="relative w-full">
          <Image
            src="/assets/wave.png"
            alt="hero"
            width={1600}
            height={900}
            className="w-full max-md:min-h-screen max-md:object-cover"
          />
          <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-20">
            <h1 className="animate-fade-up text-[96px] font-bold uppercase italic animate-once animate-ease-in max-md:text-[40px]">
              Defishards
            </h1>
            <Button
              className="px-8 py-6 text-xl max-md:px-6 max-md:py-4 max-md:text-[14px]"
              onClick={() => {
                router.push("/marketplace");
              }}
            >
              Launch App
            </Button>
          </div>
        </div>
        <h3
          className={`text-center text-[48px] font-bold animate-once animate-ease-in max-md:px-4 max-md:text-[24px]  ${isVisible1 ? "animate-fade-up" : "animate-jump-out"}`}
          ref={ref1}
        >
          Your one stop{" "}
          <span className="bg-gradient-to-r from-[#8E4CE2] to-[#E19882] bg-clip-text text-transparent">
            DEFI
          </span>{" "}
          x NFT{" "}
          <span className="bg-gradient-to-r from-[#8E4CE2] to-[#E19882] bg-clip-text text-transparent">
            platform
          </span>{" "}
        </h3>
      </section>

      <section className="container mx-auto py-40 max-md:px-4">
        <p className="w-1/2 text-[18px] max-md:w-full max-md:text-[14px]">
          We're using NFT to store multiple Fungible Tokens inside using the
          vault system so every users can have their own unique vault.
        </p>
        <div className="flex w-full justify-end max-md:mt-[64px]">
          <div className="relative flex w-2/3 gap-4 max-md:w-full">
            <Card className="relative z-10 flex max-w-[440px] translate-y-2/3 flex-col items-center justify-center p-12 max-md:p-4">
              <Image
                src={"/assets/gold-store.webp"}
                alt="gold store"
                width={200}
                height={200}
              />
              <p className="mt-4 text-center">
                Create smart vaults for your NFTs to store fungible assets
              </p>
            </Card>
            <Card className="relative z-10 flex max-w-[440px] flex-col items-center justify-center p-12 max-md:p-4">
              <Image
                src={"/assets/builder.webp"}
                alt="builder"
                width={200}
                height={200}
              />
              <p className="mt-4 text-center">
                Experience the new meta-standard of NFTs on Near
              </p>
            </Card>
            <div className="absolute h-1/2 w-1/2 translate-x-1/2 translate-y-3/4 border-l-2 border-t-2 border-dashed dark:border-white"></div>
          </div>
        </div>
      </section>
      <section className="relative mt-40 pb-10 pt-40 max-md:px-4 max-md:pt-10">
        <div className="container mx-auto flex flex-col items-center">
          <div className="">
            <h4
              className={`text-center text-5xl font-bold animate-once animate-ease-in max-md:text-[24px] ${isVisible2 ? "animate-fade-up" : ""}`}
              ref={ref2}
            >
              For Creators & Collectors
            </h4>
          </div>
          <Image
            src={"/assets/creators-1.png"}
            alt="creators"
            width={880}
            height={770}
            className="mt-20 w-full max-md:mt-[48px]"
          />
        </div>
      </section>
      <section className="container mx-auto mt-56 flex max-w-[1168px] gap-[138px] max-md:mt-[128px] max-md:flex-col-reverse max-md:gap-[64px] max-md:px-4">
        <Image
          src={"/assets/watch.png"}
          alt="watch"
          className="w-full max-w-[550px]"
          width={700}
          height={500}
        />
        <div className="flex flex-col gap-8 text-2xl max-md:gap-2 max-md:text-center max-md:text-[14px]">
          <h4
            className={`text-5xl font-bold leading-normal max-md:text-[24px] animate-once animate-ease-in ${isVisible3 ? "animate-shake" : ""}`}
            ref={ref3}
          >
            Where{" "}
            <span className="bg-gradient-to-r from-[#8E4CE2] to-[#E19882] bg-clip-text text-transparent">
              NFT
            </span>{" "}
            meets{" "}
            <span className="bg-gradient-to-r from-[#8E4CE2] to-[#E19882] bg-clip-text text-transparent">
              DeFi
            </span>
          </h4>

          <p>Enabling true asset ownership</p>
          <p>Promoting robust security</p>
          <p>Enhancing creative freedom</p>
        </div>
      </section>
      <section className="mt-[180px] max-md:mt-[98px]">
        <h3 className="text-center text-8xl max-md:text-[24px]">
          Stay Liquid, Not Illiquid.
        </h3>
      </section>
      <footer className="flex justify-center py-[85px] max-md:py-[40px]">
        <div className="flex justify-center gap-[36px] max-md:gap-[20px]">
          <span>Docs</span>
          <span>Twitter (X)</span>
          <span>Discord</span>
          <span>Telegram</span>
        </div>
      </footer>
    </main>
  );
}
