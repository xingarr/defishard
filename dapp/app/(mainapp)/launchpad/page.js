"use client";

import Button from "../../components/Button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserContext from "../../lib/context";
import { useContext } from "react";
import axios from "axios";
import { viewMethod } from "../../lib/utils";
import {
  formatNearAmount,
  parseNearAmount,
} from "near-api-js/lib/utils/format";
import LoadingComponent from "../../components/Loading";

export default function LanuchpadPage() {
  const collection_id = "defin.test-defishard-launchpad.testnet";
  const [collection, setCollectionData] = useState({});
  const { accountId, walletSelector, signInModal, walletSelectorObject } =
    useContext(UserContext);

  useEffect(() => {
    void axios
      .post(
        "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
        {
          query: `
            query collection {
              collections (where: {id: "${collection_id}"}){
                id
                name
                symbol
                totalSupply
                price
                base_uri
                currency
                payment_split_percent
              }
            }
          `,
        }
      )
      .then((res) => {
        setCollectionData(res.data.data.collections[0]);
      });
  }, [collection_id]);

  const mintNFT = async () => {
    if (walletSelector.isSignedIn()) {
      const index = Number(await viewMethod(collection.id, "index"));
      const token_id = (index + 1).toString();
      const transactions = [];

      if (collection.currency) {
        transactions.push({
          receiverId: collection.id,
          signerId: accountId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "storage_deposit",
                args: {
                  account_id: accountId,
                },
                gas: "100000000000000",
                deposit: parseNearAmount("0.01"),
              },
            },
          ],
        });
        transactions.push({
          receiverId: collection.currency,
          signerId: accountId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "storage_deposit",
                args: {
                  account_id: collection.id,
                },
                gas: "100000000000000",
                deposit: parseNearAmount("0.01"),
              },
            },
          ],
        });
        transactions.push({
          receiverId: collection.currency,
          signerId: accountId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "ft_transfer_call",
                args: {
                  receiver_id: collection.id,
                  amount: Number(collection.price).toString(),
                  msg: "",
                },
                gas: "100000000000000",
                deposit: "1",
              },
            },
          ],
        });
      }

      transactions.push({
        receiverId: collection.id,
        signerId: accountId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "nft_mint",
              args: {
                token_id: token_id,
                token_owner_id: accountId,
                token_metadata: {
                  title: token_id,
                  description: "",
                  media: `${token_id}.png`,
                },
              },
              gas: "300000000000000",
              deposit: collection.currency
                ? parseNearAmount("2")
                : parseNearAmount(
                    (Number(formatNearAmount(collection.price)) + 2).toString()
                  ),
            },
          },
        ],
      });

      console.log(transactions);

      const mintTx = await walletSelectorObject.signAndSendTransactions({
        transactions,
      });
      await mintTx.wait();
    } else {
      signInModal.show();
    }
  };

  if (!collection.currency) {
    return <LoadingComponent />;
  }

  return (
    <div className="container mx-auto mt-[22px] max-w-[1340px] max-md:px-4">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="grid w-full grid-cols-2 gap-8 max-md:grid-cols-1">
            <div className="rounded-lg px-8 py-6 dark:bg-[#707077]">
              <AspectRatio ratio={16 / 13}>
                <Image
                  src={"/assets/launchpad.png"}
                  alt="trending"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col justify-between pb-8 max-md:gap-10 dark:text-[#BDBDBD]">
              <div className="mt-[10px] text-[24px] max-md:text-[16px] dark:text-white">
                Underground Shard Society
                {/* <div className="mt-3 flex text-[14px] max-md:text-[12px]">
                  <Image
                    src={"/assets/avatar.png"}
                    alt="avatar"
                    width={18}
                    height={18}
                    className="mr-1 w-[18px] shrink-0"
                  />
                </div> */}
              </div>
              <p className="text-[16px] max-md:text-[14px]">
                USS serves as a beacon of light in this new age digital world
                order where communities are built on-chain resembling our real
                life. But, there are some unanswered questions.
              </p>
              <p className="text-[16px] font-bold max-md:text-[14px]">
                - What inspires us? <br />
                - Why we do what we do? <br />
                - Who we are? <br />- What keeps us going?
              </p>
              <p className="text-[16px] max-md:text-[14px]">
                There's only one way to unravel these secret mysteries.
                <br />
                Are you ready?
              </p>
              <p className="text-[16px] font-bold max-md:text-[14px]">
                Mint info
              </p>
              <div className="flex justify-between max-md:text-[14px]">
                <div>
                  Assets Wrapped %
                  <p className="relative mt-4 after:absolute after:left-0 after:top-0 after:block after:h-full after:w-[40px] after:bg-yellow-50 dark:after:bg-[#131315]">
                    50%
                  </p>
                </div>
                <div>
                  Total Supply
                  <p className="relative mt-4 after:absolute after:left-0 after:top-0 after:block after:h-full after:w-[50px] after:bg-yellow-50 dark:after:bg-[#131315]">
                    10,000
                  </p>
                </div>
                <div>
                  Date
                  <p className="relative mt-4 after:absolute after:left-0 after:top-0 after:block after:h-full after:w-[120px] after:bg-yellow-50 dark:after:bg-[#131315]">
                    4d 16h 32m 10s
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between max-md:text-[14px]">
                <span>Mint Fee</span>
                <span className="relative font-bold text-white after:absolute after:left-0 after:top-0 after:block after:h-full after:w-[64px] after:bg-yellow-50 dark:after:bg-[#131315]">
                  10 NEAR
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={mintNFT}
            className="effect-shadow-button inline-flex h-10 w-1/2 items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-[#8E4CE2] to-[#E19882] px-4 py-2 text-lg font-medium text-button-text ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-md:w-full"
          >
            Mint
          </Button>
        </div>
      </div>
    </div>
  );
}
