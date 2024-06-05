import React from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function NftCard({ nftDetail, collectionData, onClick }) {
  return (
    <div
      className="w-full cursor-pointer rounded-lg bg-[#F2F2F2] p-4 dark:bg-[#131315B2]"
      onClick={onClick}
    >
      <AspectRatio ratio={16 / 12}>
        <Image
          src={collectionData.base_uri + nftDetail.metadata.media}
          alt="nft"
          width={400}
          height={300}
          className="h-full w-full rounded-lg object-cover"
        />
      </AspectRatio>
      <span className="mt-4 block text-xs">@{nftDetail.owner_id}</span>
      <p className="my-2">{nftDetail.metadata.title}</p>
    </div>
  );
}
