"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { utils } from "near-api-js";
import {
  setupWalletSelector,
} from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupLedger } from "@near-wallet-selector/ledger";

import {
  ChevronDown,
  ChevronRight,
  LogOut,
  MenuIcon,
  Moon,
  ShoppingCartIcon,
  Sun,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

import Button, { buttonVariants } from "../components/Button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { getCookie } from "../lib/cookie";
import LoadingComponent from "../components/Loading";
import {
  prettyTruncate,
  viewMethod,
  getBalance,
  fetchNearUsdtPrice,
} from "../lib/utils";

import UserContext from "../lib/context";

export default function Layout({ children }) {
  const pathname = usePathname();

  const [theme, setTheme] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [walletSelector, setWalletSelector] = useState({});
  const [initWalletSelector, setInitWalletSelector] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);
  const [walletSelectorObject, setWalletSelectorObject] = useState({});
  const [signInModal, setSignInModal] = useState(null);
  const [nftMetadata, setNftMetadata] = useState({});
  const [price, setPrice] = useState(0);

  const _initWallet = async () => {
    const selector = await setupWalletSelector({
      network: process.env.NEXT_PUBLIC_APP_ENV,
      modules: [
        setupMyNearWallet(),
        setupMeteorWallet(),
        setupHereWallet(),
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

      accountIdWallet = selector.store.getState().accounts[0].accountId;
      balance = await getBalance(accountIdWallet);
    }

    const nftMetadata = await viewMethod(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ID,
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
  }, [initWalletSelector, setAccountBalance, setAccountId, setNftMetadata, setSignInModal, setWalletSelector, setWalletSelectorObject, walletSelector]);

  useEffect(() => {
    const theme = getCookie("theme");

    if (theme === undefined) {
      setTheme("dark");
      document.cookie = `theme=dark; path=/`;
    }

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

  const toogleTheme = (theme) => {
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
          "fixed top-0 z-50 flex w-full items-center justify-between bg-background px-[72px] py-8 shadow-md max-md:px-2 max-sm:py-5 dark:bg-[#09090E]"
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
                  {prettyTruncate(accountId, 18, "address")}
                </div>
                <div className="my-6 flex flex-col items-center gap-1">
                  <p className="text-xl font-bold">
                    $
                    {(
                      Number(
                        utils.format.formatNearAmount(
                          accountBalance.available,
                          2,
                        ),
                      ) * 7.27
                    ).toFixed(2)}
                  </p>
                  <span className="text-sm text-[#BDBDBD]">
                    {utils.format.formatNearAmount(
                      accountBalance.available,
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
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              if (theme === "dark") {
                toogleTheme("light");
              } else {
                toogleTheme("dark");
              }
            }}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </nav>
      <main className="pt-20">
        {loading && !initWalletSelector && <LoadingComponent />}
        {children}
        <footer className="mt-24 flex justify-center py-[30px]">
          <div className="flex justify-center gap-[36px] max-md:gap-[20px]">
            <span>Docs</span>
            <a
              href="https://x.com/defishardsxyz?s=11&t=p0b7ivp_onsJbfa8lLsVpw"
              target="_blank"
            >
              Twitter (X)
            </a>
            <span>Discord</span>
            <a href="https://t.me/HouseofShards" target="_blank">
              Telegram
            </a>
          </div>
        </footer>
      </main>
    </UserContext.Provider>
  );
}
