/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { viewMethod } from "@/lib/utils";
import UserContext from "@/lib/context";
import axios from "axios";
import LoadingComponent from "@/components/Loading";
import Link from "next/link";
import Button from "@/components/Button";

export default function CollectionPage() {
  const params = { id: "defin.test-defishard-launchpad.testnet" };
  const { accountId } = useContext(UserContext);

  const [collectionData, setCollectionData] = useState<any>({});
  const [mintedNFTs, setMintedNFTs] = useState<any[]>([]);
  const [myNFTs, setMyNFTs] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [mintModal, setMintModal] = useState(false);

  useEffect(() => {
    void axios
      .post(
        "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
        {
          query: `
            query collection {
              collections (where: {id: "${params.id}"}){
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
        },
      )
      .then((res) => {
        setCollectionData(res.data.data.collections[0]);
        console.log(res.data.data.collections[0]);
      });
  }, [params.id]);

  useEffect(() => {
    void (async () => {
      const mintedNFTs = (await viewMethod(params.id, "nft_tokens")) as any[];
      setMintedNFTs(mintedNFTs);
      const myNFTs = mintedNFTs.filter((nft: any) => {
        return nft.owner_id === accountId;
      });
      setMyNFTs(myNFTs);
      setNfts(mintedNFTs);
    })();
  }, [accountId, params.id]);

  if (collectionData && !collectionData.base_uri) {
    return <LoadingComponent />;
  }

  return (
    <div className="container mx-auto max-w-[1340px] pt-20 max-xl:px-4 max-sm:pt-9">
      <h3 className="flex items-center justify-between text-2xl font-bold max-sm:flex-col">
        Underground Shard Society
        <Button onClick={() => setMintModal(true)}>+ Mint NFT</Button>
      </h3>

      <div className="mt-10 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        <AspectRatio ratio={16 / 9} className="">
          <Image
            src={"/assets/launchpad.png"}
            alt="trending"
            width={500}
            height={500}
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>

        <div className="flex flex-col gap-8">
          <div className="text-md flex flex-col gap-3">
            <p className="text-lg font-bold">Description</p>
            <p>
              USS serves as a beacon of light in this new age digital world
              order where communities are built on-chain resembling our real
              life. But, there are some unanswered questions.
            </p>
          </div>
          <table>
            <thead>
              <tr className="text-left">
                <th>Foot Price</th>
                <th>Total Volume</th>
                <th>Total Items</th>
                <th>Holders</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$1.4</td>
                <td>$2332300</td>
                <td>24</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {nfts.map((item, _index) => (
          <Link
            href={`/launchpad/${item.id}`}
            className="w-full cursor-pointer rounded-lg bg-[#F2F2F2] p-4 dark:bg-[#131315B2]"
            key={_index}
          >
            <AspectRatio ratio={16 / 12}>
              <Image
                src={collectionData.base_uri + item.metadata.media}
                alt="nft"
                width={400}
                height={300}
                className="h-full w-full rounded-lg object-cover"
              />
            </AspectRatio>
            <span className="mt-4 block text-xs">@{item.owner_id}</span>
            <p className="my-2">{item.metadata.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
