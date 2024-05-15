/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { viewMethod } from "@/lib/utils";
import LoadingComponent from "@/components/Loading";

import UserContext from "@/lib/context";
import Link from "next/link";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function CollectionPage({ params }: { params: { id: string } }) {
  const { accountId } = useContext(UserContext);

  const [collectionData, setCollectionData] = useState<any>({});
  const [mintedNFTs, setMintedNFTs] = useState<any[]>([]);
  const [myNFTs, setMyNFTs] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);

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

  if (!collectionData.base_uri) {
    return <LoadingComponent />;
  }

  return (
    <div className="container mx-auto my-20 max-sm:px-4">
      <h2 className="text-4xl">
        {collectionData.name} ({collectionData.symbol})
      </h2>
      <p className="mt-5">Minted NFTs: {nfts.length}</p>
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
