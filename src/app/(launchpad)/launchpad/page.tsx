/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { AspectRatio } from "@radix-ui/react-aspect-ratio";

// import axios from "axios";
// import UserContext from "@/lib/context";
// import Link from "next/link";
// import LoadingComponent from "@/components/Loading";

// export default function LanuchpadPage() {
//   const [totalCollections, setTotalCollections] = useState<any[]>([]);
//   const [myCollections, setMyCollections] = useState<any[]>([]);
//   const [collections, setCollections] = useState<any[]>([]);

//   const { accountId } = React.useContext(UserContext);

//   useEffect(() => {
//     void axios
//       .post(
//         "https://api.thegraph.com/subgraphs/name/icetrust0212/defishards-test",
//         {
//           query: `
//             query collection {
//               collections {
//                 id
//                 name
//                 symbol
//                 price
//                 base_uri
//                 currency
//                 payment_split_percent
//                 totalSupply
//                 creator {id}
//               }
//             }
//           `,
//         },
//       )
//       .then((res) => {
//         const totalCollections = res.data.data.collections;
//         setTotalCollections(totalCollections);
//         const myCollections = totalCollections.filter((collection: any) => {
//           return collection.creator.id === accountId;
//         });
//         setMyCollections(myCollections);
//         setCollections(totalCollections);
//       });
//   }, [accountId]);

//   if (totalCollections.length === 0) {
//     return <LoadingComponent />;
//   }

//   return (
//     <div className="container mx-auto my-16 max-sm:px-4">
//       <h2 className="flex items-center justify-between text-4xl max-sm:flex-col gap-4">
//         Total Collections
//         <Link
//           href={"/create"}
//           className="effect-shadow-button inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-[#8E4CE2] to-[#E19882] px-4 py-2 text-sm font-medium text-button-text ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
//         >
//           Create a new collection
//         </Link>
//       </h2>
//       <div className="mt-10 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
//         {totalCollections.map((item, _index) => (
//           <Link
//             href={`/launchpad/${item.id}`}
//             className="w-full cursor-pointer rounded-lg bg-[#F2F2F2] p-4 dark:bg-[#131315B2]"
//             key={_index}
//           >
//             <AspectRatio ratio={16 / 12}>
//               <Image
//                 src={`${item.base_uri}0.png`}
//                 alt="collection"
//                 width={400}
//                 height={300}
//                 className="h-full w-full rounded-lg object-cover"
//               />
//             </AspectRatio>
//             <span className="mt-4 block text-xs">@{item.creator.id}</span>
//             <p className="my-2">
//               {item.name} ({item.symbol})
//             </p>
//             <p className="mb-5 mt-5 flex justify-between text-sm">
//               My holdings <span>2</span>
//             </p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

import Button from "@/components/Button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";

export default function LanuchpadPage() {
  return (
    <div className="container mx-auto mt-[42px] max-w-[1340px] max-md:px-4">
      <div className="flex h-[calc(100vh-300px)] w-full items-center justify-center max-md:h-auto">
        <div className="flex w-full flex-col items-center justify-center gap-10">
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
                Mint info below ⬇️
              </p>
              <div className="flex justify-between max-md:text-[14px]">
                <div>
                  Payment Split %
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
                <span className="relative font-bold after:absolute after:left-0 after:top-0 after:block after:h-full after:w-[64px] dark:after:bg-[#131315] after:bg-yellow-50 text-white">
                  10 NEAR
                </span>
              </div>
            </div>
          </div>
          <Button className="w-1/2 text-lg max-md:w-full">Mint</Button>
        </div>
      </div>
    </div>
  );
}
