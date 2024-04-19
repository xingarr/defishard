"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CheckIcon,
  ChevronDown,
  MenuIcon,
  Settings,
  ShoppingCartIcon,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Button, { buttonVariants } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { getCookie } from "@/lib/cookie";
import LoadingComponent from "@/components/Loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [theme, setTheme] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const theme = getCookie("theme");

    if (theme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const activeClass =
    "bg-gradient-to-r from-[#8E4CE2] to-[#E19882] bg-clip-text text-transparent";

  const toogleTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme}; path=/`;
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setTheme(theme);
  };

  return (
    <>
      <nav
        className={
          "fixed z-10 flex w-full items-center justify-between bg-background px-[72px] py-5 shadow-md max-md:px-2 dark:bg-[#09090E]"
        }
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2" onClick={() => setIsOpen(true)}>
                <MenuIcon className="hidden max-md:block" />
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">
                    <Image
                      src={"/assets/logo.webp"}
                      alt="Logo"
                      className="brightness-50 hue-rotate-180 dark:brightness-100"
                      width={40}
                      height={40}
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-2">
                  <Link
                    href={"/dyos"}
                    onClick={() => setIsOpen(false)}
                    className={`!inline-block w-full ${buttonVariants({
                      variant: "ghost",
                    })}`}
                  >
                    DYOS
                  </Link>
                  <Link
                    href={"/marketplace"}
                    onClick={() => setIsOpen(false)}
                    className={`!inline-block w-full ${buttonVariants({
                      variant: "ghost",
                    })}`}
                  >
                    MarketPlace
                  </Link>
                  <Link
                    href={"/launchpad"}
                    onClick={() => setIsOpen(false)}
                    className={`!inline-block w-full ${buttonVariants({
                      variant: "ghost",
                    })}`}
                  >
                    Launchpad
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href={"/"}>
              <Image
                src="/assets/logo.webp"
                alt="logo"
                width={40}
                height={40}
                className="brightness-50 hue-rotate-180 dark:brightness-100"
              />
            </Link>
          </div>

          <div className="flex items-center gap-10 max-md:hidden">
            <Link
              href={"/dyos"}
              className={
                "group relative " + (pathname === "/dyos" ? activeClass : "")
              }
            >
              DYOS
              <span className="absolute bottom-0 left-1/2 h-[6px]  w-[6px] -translate-x-1/2 translate-y-1 rounded-full bg-black opacity-0 blur-[1px] transition-all group-hover:opacity-100 dark:bg-white"></span>
            </Link>
            <Link
              href={"/marketplace"}
              className={
                "group relative " +
                (pathname === "/marketplace" ? activeClass : "")
              }
            >
              Marketplace
              <span className="absolute bottom-0 left-1/2 h-[6px]  w-[6px] -translate-x-1/2 translate-y-1 rounded-full bg-black opacity-0 blur-[1px] transition-all group-hover:opacity-100 dark:bg-white"></span>
            </Link>
            <Link
              href={"/launchpad"}
              className={
                "group relative " +
                (pathname === "/launchpad" ? activeClass : "")
              }
            >
              Launchpad
              <span className="absolute bottom-0 left-1/2 h-[6px]  w-[6px] -translate-x-1/2 translate-y-1 rounded-full bg-black opacity-0 blur-[1px] transition-all group-hover:opacity-100 dark:bg-white"></span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                <span className="h-8 w-8 rounded-full bg-gradient-to-r from-[#8E4CE2] to-[#E19882]"></span>
                <ChevronDown className="ml-1 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Setting</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Button>Connect Wallet</Button> */}
          <Button size={"icon"} variant={"ghost"}>
            <ShoppingCartIcon />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuItem
                  className={theme === "light" ? "pl-7" : ""}
                  onClick={() => {
                    toogleTheme("dark");
                  }}
                >
                  {theme === "dark" && <CheckIcon className="mr-1 w-4" />}
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={theme === "dark" ? "pl-7" : ""}
                  onClick={() => {
                    toogleTheme("light");
                  }}
                >
                  {theme === "light" && <CheckIcon className="mr-1 w-4" />}
                  Light
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <main className="pt-20">
        {loading && <LoadingComponent />}
        {children}
        <footer className="flex justify-center py-[85px] max-md:py-[40px]">
          <div className="flex justify-center gap-[36px] max-md:gap-[20px]">
            <span>Docs</span>
            <span>Twitter (X)</span>
            <span>Discord</span>
            <span>Telegram</span>
          </div>
        </footer>
      </main>
    </>
  );
}
