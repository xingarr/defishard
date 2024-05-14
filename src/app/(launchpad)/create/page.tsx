/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useState, useContext } from "react";

import { Input } from "@/components/ui/input";

import UserContext from "@/lib/context";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import router from "next/router";

export default function CreatePage() {
  const [baseURI, setBaseURI] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [mintPrice, setMintPrice] = useState(0);
  const [mintCurrency, setMintCurrency] = useState("");
  const [royaltyFee, setRoyaltyFee] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  const { walletSelectorObject, accountId, signInModal } =
    useContext(UserContext);

  const launchNewCollection = async () => {
    if (!walletSelectorObject) {
      return signInModal.show();
    }

    if (!name || !symbol || !mintPrice || !royaltyFee || !baseURI) {
      alert("Please input all the collection information");
      return;
    }

    try {
      const launchTx = await walletSelectorObject.signAndSendTransaction({
        signerId: accountId,
        receiverId: process.env.NEXT_PUBLIC_LAUNCHPAD_CONTRACT_ID,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "launch",
              args: {
                metadata: {
                  spec: "nft-1.0.0",
                  name: name,
                  symbol: symbol,
                  base_uri: baseURI,
                },
                total_supply: totalSupply.toString(),
                mint_price: mintCurrency
                  ? (mintPrice * 1000000).toString()
                  : parseNearAmount(mintPrice.toString()),
                mint_currency: mintCurrency ? mintCurrency : undefined,
                payment_split_percent: royaltyFee.toString(),
              },
              gas: "100000000000000",
              deposit: parseNearAmount("7"),
            },
          },
        ],
      });
      await launchTx.wait();
      void router.push("/collections");
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <section className="my-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-4 max-w-lg rounded bg-card px-8 pb-8 pt-6 shadow-md">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Create Collection
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Collection Name
              </label>
              <Input
                className="form-input mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter collection name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Collection Symbol
              </label>
              <Input
                className="form-input mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter collection symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Base Uri
              </label>
              <Input
                className="form-input mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter base URI"
                value={baseURI}
                onChange={(e) => setBaseURI(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Payment Split Percent(%)
              </label>
              <Input
                type="number"
                className="form-input mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter payment split percent"
                value={royaltyFee}
                onChange={(e) => setRoyaltyFee(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Mint Price
              </label>
              <Input
                type="number"
                className="form-input mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter mint price"
                value={mintPrice}
                min={0}
                onChange={(e) => setMintPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Mint Currency
              </label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={mintCurrency}
                onChange={(e) => setMintCurrency(e.target.value)}
              >
                <option value="">Near</option>
                <option value="usdc.fakes.testnet">USDC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Total Supply
              </label>
              <Input
                type="number"
                className="form-input mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter total supply"
                value={totalSupply}
                min={0}
                onChange={(e) => setTotalSupply(Number(e.target.value))}
              />
            </div>
          </div>
          <button
            className="focus:shadow-outline mt-6 w-full rounded bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600 focus:outline-none"
            onClick={launchNewCollection}
          >
            Create Collection
          </button>
          {/* {router.query.transactionHashes && (
            <div className="mt-4 text-center text-gray-700 dark:text-white">
              Successfully Created New Collection
              <br />
              <a
                href={`https://testnet.nearblocks.io/txns/${router.query.transactionHashes}`}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                View on Nearscan
              </a>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}
