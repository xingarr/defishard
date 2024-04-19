"use client";

import React, { useCallback, useRef } from "react";

import { isDesktop } from "react-device-detect";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";

export default function MarketPlacePage() {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="container mx-auto max-w-[1340px] pt-9 max-xl:px-4">
      <h2 className="text-5xl max-md:text-[24px]">Trending</h2>

      <div className="relative mt-20 select-none bg-[#f1eeee] px-8 max-md:mt-[14px] dark:bg-[#09090E]">
        <Swiper
          slidesPerView={isDesktop ? 3 : 1.2}
          centeredSlides
          initialSlide={2}
          spaceBetween={20}
          ref={sliderRef}
          loop
          autoplay={{ delay: 2500 }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="rounded-md p-4 dark:bg-[#131315B2]  bg-[#F2F2F2]">
              <AspectRatio ratio={16 / 13}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded-md p-4 dark:bg-[#131315B2]  bg-[#F2F2F2]">
              <AspectRatio ratio={16 / 13}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={50}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded-md p-4 dark:bg-[#131315B2]  bg-[#F2F2F2]">
              <AspectRatio ratio={16 / 13}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={50}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded-md p-4 dark:bg-[#131315B2]  bg-[#F2F2F2]">
              <AspectRatio ratio={16 / 13}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={50}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded-md p-4 dark:bg-[#131315B2]  bg-[#F2F2F2]">
              <AspectRatio ratio={16 / 13}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={50}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          className={`absolute left-0 top-1/2 z-10 h-0 w-full -translate-y-[32px] justify-between flex max-md:hidden`}
        >
          <button
            onClick={handlePrev}
            className="- flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#8E4CE2] to-[#E19882]"
          >
            <ChevronLeft className="w-6" />
          </button>
          <button
            onClick={handleNext}
            className=" flex h-16 w-16  items-center justify-center rounded-full bg-gradient-to-r from-[#8E4CE2] to-[#E19882]"
          >
            <ChevronRight className="w-6" />
          </button>
        </div>
      </div>

      <div className="mt-[55px] flex w-full gap-10 max-md:flex-col-reverse">
        <div className="w-full">
          <p className="text-[24px] max-md:text-[14px]">Fine Digital Art</p>
          <div className="mt-[20px] rounded-md px-6 py-4 dark:bg-[#131315B2] bg-[#F2F2F2]">
            <AspectRatio ratio={16 / 7} className="">
              <Image
                src={"/assets/trending.png"}
                alt="fine art"
                className="h-full w-full rounded-md object-cover"
                width={500}
                height={500}
              />
            </AspectRatio>
          </div>
          <p className="mt-[24px] text-[24px] max-md:text-[14px]">
            Live Auctions
          </p>
          <div className="mt-[20px] rounded-md px-6 py-4 dark:bg-[#131315B2] bg-[#F2F2F2]">
            <AspectRatio ratio={16 / 16} className="">
              <Image
                src={"/assets/trending.png"}
                alt="fine art"
                className="h-full w-full rounded-md object-cover"
                width={500}
                height={500}
              />
            </AspectRatio>
          </div>
        </div>

        <div className="w-full">
          <p className="text-[24px] max-md:text-[14px]">Collections 1/1</p>
          <div className="mt-[20px] rounded-md px-6 py-4 dark:bg-[#131315B2] bg-[#F2F2F2]">
            <div className="group relative">
              <AspectRatio ratio={16 / 16} className="">
                <Image
                  src={"/assets/trending.png"}
                  alt="fine art"
                  className="h-full w-full rounded-md object-cover"
                  width={500}
                  height={500}
                />
              </AspectRatio>
              <div className="absolute bottom-0 left-0 flex w-full flex-col justify-between gap-6 overflow-hidden bg-gradient-to-b from-transparent to-[#111010] px-5 pb-5 text-white max-md:px-[6px] max-md:pb-[6px] max-md:text-[12px]">
                <div className="flex items-center justify-between">
                  <p>Defishard 1</p>{" "}
                  <span className="rounded-lg bg-[#131315B2] px-3 py-2">
                    10 NEAR
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <div className="">
                    <span>Payment Split %</span>
                    <p>50%</p>
                  </div>
                  <div className="">
                    <span>Total Supply</span>
                    <p>10,000</p>
                  </div>
                  <div className="">
                    <span>Date</span>
                    <p>4d 16h 32m 10s</p>
                  </div>
                </div>
                <Button className="h-0 w-full py-0 text-xl opacity-0 transition-all duration-300 ease-linear group-hover:h-10 group-hover:py-6 group-hover:opacity-100 max-md:text-lg group-hover:max-md:h-7 max-md:group-hover:py-5">
                  Mint
                </Button>
              </div>
            </div>
          </div>
          <p className="mt-[24px] text-[24px] max-md:text-[14px]">
            Photography
          </p>
          <div className="mt-[20px] rounded-md px-6 py-4 dark:bg-[#131315B2] bg-[#F2F2F2]">
            <AspectRatio ratio={16 / 7} className="">
              <Image
                src={"/assets/trending.png"}
                alt="fine art"
                className="h-full w-full rounded-md object-cover"
                width={500}
                height={500}
              />
            </AspectRatio>
          </div>
        </div>
      </div>

      <div className="mt-[30px]">
        <p className="text-[24px] max-md:text-[14px]">Featured Artist</p>
        <div className="mt-[20px] flex justify-between gap-[56px] rounded-md p-4 dark:bg-[#0A0A0D] bg-[#F2F2F2]">
          <Swiper
            slidesPerView={isDesktop ? 6 : 2.2}
            spaceBetween={isDesktop ? 20 : 10}
          >
            <SwiperSlide>
              <AspectRatio ratio={16 / 16}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </SwiperSlide>
            <SwiperSlide>
              <AspectRatio ratio={16 / 16}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </SwiperSlide>
            <SwiperSlide>
              <AspectRatio ratio={16 / 16}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </SwiperSlide>
            <SwiperSlide>
              <AspectRatio ratio={16 / 16}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </SwiperSlide>
            <SwiperSlide>
              <AspectRatio ratio={16 / 16}>
                <Image
                  src={"/assets/trending.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex h-full w-full items-center justify-end">
                <Link href={"/"} className="text-nowrap">
                  See more
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-[24px] max-md:text-[14px]">AI Scopes</h3>
        <Swiper
          slidesPerView={isDesktop ? 4 : 2}
          spaceBetween={isDesktop ? 20 : 10}
          autoplay={{delay: 4000}}
          modules={[Autoplay]}
        >
          <SwiperSlide className="rounded-md p-4 dark:bg-[#0A0A0D] bg-[#F2F2F2]">
            <AspectRatio ratio={16 / 16}>
              <Image
                src={"/assets/trending.png"}
                alt="trending"
                width={500}
                height={500}
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </SwiperSlide>
          <SwiperSlide className="rounded-md p-4 dark:bg-[#0A0A0D] bg-[#F2F2F2]">
            <AspectRatio ratio={16 / 16}>
              <Image
                src={"/assets/trending.png"}
                alt="trending"
                width={500}
                height={500}
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </SwiperSlide>
          <SwiperSlide className="rounded-md p-4 dark:bg-[#0A0A0D] bg-[#F2F2F2]">
            <AspectRatio ratio={16 / 16}>
              <Image
                src={"/assets/trending.png"}
                alt="trending"
                width={500}
                height={500}
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </SwiperSlide>
          <SwiperSlide className="rounded-md p-4 dark:bg-[#0A0A0D] bg-[#F2F2F2]">
            <AspectRatio ratio={16 / 16}>
              <Image
                src={"/assets/trending.png"}
                alt="trending"
                width={500}
                height={500}
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
