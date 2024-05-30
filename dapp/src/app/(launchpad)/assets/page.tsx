/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import LoadingComponent from "@/components/Loading";
import UserContext from "@/lib/context";
import axios from "axios";

export default function AssetsPage() {
  const [totalCollections, setTotalCollections] = useState<any[]>([]);
  const [myCollections, setMyCollections] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { accountId } = React.useContext(UserContext);

  useEffect(() => {
    void axios
      .post(
        "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
        {
          query: `
            query collection {
              collections {
                id
                name
                symbol
                price
                base_uri
                currency
                payment_split_percent
                totalSupply
                creator {id}
              }
            }
          `,
        },
      )
      .then((res) => {
        const totalCollections = res.data.data.collections;
        setTotalCollections(totalCollections);
        const myCollections = totalCollections.filter((collection: any) => {
          return collection.creator.id === accountId;
        });
        setMyCollections(myCollections);
        setCollections(totalCollections);
      });
  }, [accountId]);

  if (totalCollections.length === 0) {
    return <LoadingComponent />;
  }

  
  return (
    <div className="container mx-auto my-16 max-sm:px-4">
      <h2 className="text-4xl">My Holdings</h2>
      <div className="mt-10 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div className="w-full rounded-lg bg-[#F2F2F2] p-4 dark:bg-[#131315B2]">
          <AspectRatio ratio={16 / 12}>
            <Image
              src={"/assets/trending.png"}
              alt="token"
              width={400}
              height={300}
              className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
          <span className="text-xs mt-4 block">@miriamammi</span>
          <p className="my-2">DeFishard1 (DEFI1)</p>
          <p className="mb-5 mt-5 flex justify-between text-sm">
            My holdings <span>2</span>
          </p>
        </div>
      </div>
    </div>
  );
}
