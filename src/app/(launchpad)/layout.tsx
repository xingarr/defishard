/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { utils } from "near-api-js";
import {
  setupWalletSelector,
  type NetworkId,
} from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupLedger } from "@near-wallet-selector/ledger";

import {
  CheckIcon,
  ChevronDown,
  ChevronRight,
  LogOut,
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
import {
  prettyTruncate,
  viewMethod,
  getBalance,
  fetchNearUsdtPrice,
} from "@/lib/utils";

import UserContext from "@/lib/context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [theme, setTheme] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [walletSelector, setWalletSelector] = useState<any>({});
  const [initWalletSelector, setInitWalletSelector] = useState(false);
  const [accountId, setAccountId] = useState<any>(null);
  const [accountBalance, setAccountBalance] = useState<any>(null);
  const [walletSelectorObject, setWalletSelectorObject] = useState<any>({});
  const [signInModal, setSignInModal] = useState<any>(null);
  const [nftMetadata, setNftMetadata] = useState<any>({});
  const [price, setPrice] = useState(0);

  const _initWallet = async () => {
    const selector = await setupWalletSelector({
      network: process.env.NEXT_PUBLIC_APP_ENV! as NetworkId,
      modules: [
        setupMyNearWallet(),
        setupMeteorWallet(),
        setupHereWallet(),
        // setupMintbaseWallet({
        //   networkId: process.env.NEXT_PUBLIC_APP_ENV,
        //   walletUrl: "https://wallet.mintbase.xyz",
        //   callbackUrl: "https://www.mywebsite.com",
        //   deprecated: false,
        // }),
        setupSender(),
        setupLedger(),
      ],
    });
    const modal = setupModal(selector, {
      contractId: "test.testnet",
    });

    // const modal = setupModal(selector, {
    //   contractId: process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
    //   description: "Please connect your wallet",
    // });

    const isSignedIn = selector.isSignedIn();

    let wallet;
    let accountIdWallet;
    let balance;

    if (isSignedIn) {
      wallet = await selector.wallet();

      accountIdWallet = selector.store.getState().accounts[0]!.accountId;
      balance = await getBalance(accountIdWallet);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const nftMetadata = await viewMethod(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ID!,
      "nft_metadata",
    );

    const price = await fetchNearUsdtPrice();

    return {
      selector,
      wallet,
      accountIdWallet,
      modal,
      nftMetadata,
      balance,
      price,
    };
  };

  useEffect(() => {
    if (!initWalletSelector) {
      void _initWallet().then(
        ({
          selector,
          wallet,
          accountIdWallet,
          modal,
          nftMetadata,
          balance,
          price,
        }) => {
          setWalletSelector(selector);
          setWalletSelectorObject(wallet);
          setAccountId(accountIdWallet);
          setSignInModal(modal);
          setInitWalletSelector(true);
          setNftMetadata(nftMetadata);
          setAccountBalance(balance);
          setPrice(Number(price));
        },
      );
    }
  }, [initWalletSelector, walletSelector]);

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

  if (!initWalletSelector) {
    return <LoadingComponent />;
  }

  return (
    <UserContext.Provider
      value={{
        walletSelector,
        walletSelectorObject,
        accountId,
        signInModal,
        nftMetadata,
        accountBalance,
      }}
    >
      <nav
        className={
          "fixed z-50 flex w-full items-center justify-between bg-background px-[72px] py-5 shadow-md max-md:px-2 dark:bg-[#09090E]"
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
          {walletSelector.isSignedIn() && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"sm"}>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-r from-[#8E4CE2] to-[#E19882]"></span>
                  <ChevronDown className="ml-1 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[250px]">
                <div className="mt-2 flex items-center justify-center gap-4 text-sm">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-r from-[#8E4CE2] to-[#E19882]"></span>
                  {prettyTruncate(accountId as string, 18, "address")}
                </div>
                <div className="my-6 flex flex-col items-center gap-1">
                  <p className="text-xl font-bold">
                    $
                    {(
                      Number(
                        utils.format.formatNearAmount(
                          accountBalance.available as string,
                          2,
                        ),
                      ) * 7.27
                    ).toFixed(2)}
                  </p>
                  <span className="text-sm text-[#BDBDBD]">
                    {utils.format.formatNearAmount(
                      accountBalance.available as string,
                      2,
                    )}{" "}
                    Near
                  </span>
                </div>
                <DropdownMenuItem className="flex justify-between">
                  My Account <ChevronRight className="w-5" />
                </DropdownMenuItem>
                <Link href={"/assets"} className="">
                  <DropdownMenuItem className="flex justify-between">
                    My Assets <ChevronRight className="w-5" />
                  </DropdownMenuItem>
                </Link>

                <Link href={"/create"} className="">
                  <DropdownMenuItem className="flex w-full justify-between">
                    Creators Mode <ChevronRight className="w-5" />
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem
                  onClick={async () => {
                    await walletSelectorObject.signOut();
                    location.href = "";
                  }}
                  className="flex justify-between text-red-500"
                >
                  Logout
                  <LogOut className="w-5" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!walletSelector.isSignedIn() && (
            <Button
              onClick={() => {
                signInModal.show();
              }}
            >
              Connect Wallet
            </Button>
          )}

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
      <main className="py-20">
        {loading && !initWalletSelector && <LoadingComponent />}
        {children}
        {/* <footer className="flex justify-center py-[85px] max-md:py-[40px]">
          <div className="flex justify-center gap-[36px] max-md:gap-[20px]">
            <span>Docs</span>
            <span>Twitter (X)</span>
            <span>Discord</span>
            <span>Telegram</span>
          </div>
        </footer> */}
      </main>
    </UserContext.Provider>
  );
}
