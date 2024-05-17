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
  const ref3 = useRef<any>();
  const isVisible1 = useIsVisible(ref1);
  const isVisible3 = useIsVisible(ref3);

  return (
    <main className="overflow-hidden dark:bg-[#09090E]">
      <section className="min-h-screen">
        <div className="relative w-full flex justify-center">
          <Image
            src="/assets/wave.png"
            alt="hero"
            width={1600}
            height={900}
            className="h-screen w-full max-md:min-h-screen max-md:object-cover hidden dark:block"
          />
          <Image
            src="/assets/wave-light.png"
            alt="hero"
            width={1600}
            height={900}
            className="h-screen w-full max-md:min-h-screen max-md:object-cover dark:hidden"
          />
          <div className="absolute top-0 mx-auto flex h-full w-full max-w-[1400px] justify-center gap-5 px-4">
            <div className="flex w-1/2 flex-col justify-center max-md:w-full max-md:gap-4">
              <h1 className="animate-fade-up text-[96px] font-bold uppercase italic leading-none animate-once animate-ease-in max-md:text-[45px]">
                Defishards
              </h1>
              <p className="text-[48px] max-md:text-[24px]">Stay Liquid, Not Illiquid.</p>
              <Button
                className="flex w-[200px] px-8 py-6 text-xl"
                onClick={() => {
                  router.push("/marketplace");
                }}
              >
                Launch App
              </Button>
            </div>
            <div className="w-1/2 flex items-center max-md:hidden">
              <Image src={"/assets/hero-logo.png"} alt="hero logo" className="w-full " width={500} height={500} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-20 pt-20 max-md:px-4">
        <h3
          className={`relative z-10 mb-20 text-center text-[48px] font-bold animate-once animate-ease-in max-md:px-4 max-md:text-[24px]  ${isVisible1 ? "animate-fade-up" : "animate-jump-out"}`}
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
        <div className="container relative z-10 mx-auto flex w-full max-w-[1168px] justify-center max-md:mt-[64px]">
          <div className="max-md relative flex w-full justify-center gap-4 max-md:w-full max-md:flex-col">
            <Card className="relative z-10 flex max-w-[440px]  flex-col items-center justify-center p-12 max-md:p-4">
              <div className="w-[350px] rounded-md bg-white p-4 shadow-md dark:bg-gradient-to-b dark:from-[#1F1F24] dark:to-[#09090E]">
                <div className="relative flex w-full items-center justify-center">
                  <Image
                    src={"/assets/gold-store.webp"}
                    alt="builder"
                    width={400}
                    height={400}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                  {/* <Image
                    src={"/assets/card-back.png"}
                    alt="builder"
                    width={400}
                    height={400}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  /> */}
                  <span className="pt-[100%]"></span>
                </div>
              </div>

              <p className="mt-4 text-center">
                Create smart vaults for your NFTs to store fungible assets
              </p>
            </Card>
            <Card className="relative z-10 flex max-w-[440px] flex-col items-center justify-center p-12 max-md:p-4">
              <div className="w-[350px] rounded-md bg-white p-4 shadow-md dark:bg-gradient-to-b dark:from-[#1F1F24] dark:to-[#09090E]">
                <div className="relative flex w-full items-center justify-center">
                  <Image
                    src={"/assets/builder.webp"}
                    alt="builder"
                    width={200}
                    height={200}
                    className="relative z-10"
                  />
                  <Image
                    src={"/assets/card-back.png"}
                    alt="builder"
                    width={400}
                    height={400}
                    className="absolute left-0 top-0 h-full w-full rounded-2xl object-cover"
                  />
                  <span className="pt-[100%]"></span>
                </div>
              </div>

              <p className="mt-4 text-center">
                Experience the new meta-standard of NFTs on Near
              </p>
            </Card>
          </div>
        </div>
        <div className="relative z-10 pt-20">
          <h4
            className={`text-center text-5xl font-bold animate-once animate-ease-in max-md:text-[24px]`}
            // ref={ref2}
          >
            For Creators & Collectors
          </h4>
        </div>
        <Image
          src={"/assets/dark-card-panel-back.png"}
          alt=""
          className="absolute left-0 top-0 hidden h-full w-full object-cover dark:block"
          width={1400}
          height={1400}
        />
        <Image
          src={"/assets/light-card-panel-back.png"}
          alt=""
          className="absolute left-0 top-0 h-full w-full object-cover dark:hidden"
          width={1400}
          height={1400}
        />
      </section>
      <section className="relative">
        <div className="container mx-auto flex flex-col items-center max-md:px-4"></div>
        <Image
          src={"/assets/creators-1.png"}
          alt="creators"
          width={880}
          height={770}
          className="w-full"
        />
      </section>

      <section className="relative z-10 pb-6 pt-10 md:pb-24 md:pt-20">
        <div className="absolute left-0 top-0 -z-[1] h-full w-full">
          <Image
            src={"/assets/nft-back.png"}
            alt="watch"
            className="h-full w-full object-cover dark:hidden dark:opacity-20"
            width={1400}
            height={800}
          />
          <Image
            src={"/assets/dark-bitcoin-bg.png"}
            alt="watch"
            className="hidden h-full w-full object-cover dark:block dark:opacity-20"
            width={1400}
            height={800}
          />
        </div>
        <h4
          className={`relative z-10 mb-8 text-center text-5xl font-bold leading-normal animate-once animate-ease-in max-md:text-[24px] ${isVisible3 ? "animate-fade-up" : ""}`}
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
        <div className="container relative z-10 mx-auto mt-[80px] flex max-w-[1168px] items-center gap-[138px] max-md:mt-[12px] max-md:flex-col-reverse max-md:gap-[64px] max-md:px-4">
          <div className="w-full max-w-[550px] rounded-lg bg-white bg-opacity-20 p-4 shadow-xl">
            <Image
              src={"/assets/watch.png"}
              alt="watch"
              className="w-full rounded-lg"
              width={900}
              height={900}
            />
          </div>
          <div className="flex flex-col gap-8 text-2xl max-md:gap-2 max-md:text-center max-md:text-[14px]">
            <p>Enabling true asset ownership</p>
            <p>Promoting robust security</p>
            <p>Enhancing creative freedom</p>
          </div>
        </div>
      </section>
      {/* <section className="mt-[180px] max-md:mt-[98px]">
        <h3 className="text-center text-8xl max-md:text-[24px]">
          Stay Liquid, Not Illiquid.
        </h3>
      </section> */}
      <footer className="flex justify-center py-[85px] max-md:py-[20px]">
        <div className="flex justify-center gap-[36px] max-md:gap-[20px] max-md:text-sm">
          <span>Docs</span>
          <span>Twitter (X)</span>
          <span>Discord</span>
          <span>Telegram</span>
        </div>
      </footer>
    </main>
  );
}
