"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { viewMethod } from "../../lib/utils";
import LoadingComponent from "../../components/Loading";

import UserContext from "../../lib/context";
import NftList from "../../components/NftList";

export default function CollectionPage() {
  const { accountId } = useContext(UserContext);
  const params = { id: "defin.test-defishard-launchpad.testnet" };

  const [collectionData, setCollectionData] = useState({});
  const [myNFTs, setMyNFTs] = useState([]);

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
        }
      )
      .then((res) => {
        setCollectionData(res.data.data.collections[0]);
      });
  }, [params.id]);

  useEffect(() => {
    void (async () => {
      const mintedNFTs = await viewMethod(params.id, "nft_tokens");
      const myNFTs = mintedNFTs.filter((nft) => {
        return nft.owner_id === accountId;
      });
      setMyNFTs(myNFTs);
    })();
  }, [accountId, params.id]);

  if (!collectionData.base_uri) {
    return <LoadingComponent />;
  }

  console.log(collectionData.id);

  return (
    <div className="container mx-auto my-20 max-sm:px-4">
      <h2 className="text-4xl">My NFTs</h2>
      <div className="mt-10 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <NftList nfts={myNFTs} collectionData={collectionData} />
      </div>
    </div>
  );
}
