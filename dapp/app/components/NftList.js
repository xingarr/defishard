import React, { useState, useContext } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import NftCard from "./NftCard";
import { Dialog, DialogHeader, DialogContent } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import Button from "./Button";
import UserContext from "../lib/context";
import { parseNearAmount } from "near-api-js/lib/utils/format";

export default function NftList({ nfts, collectionData }) {
  const { accountId, walletSelectorObject } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedNft, setSelectedNft] = useState({ metadata: {} });

  const burnNft = async () => {
    try {
      const burnTx = await walletSelectorObject.signAndSendTransaction({
        receiverId: collectionData.id,
        signerId: accountId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "burn",
              args: {
                token_id: selectedNft.token_id,
              },
              gas: "200000000000000",
              deposit: parseNearAmount("0.02"),
            },
          },
        ],
      });
      await burnTx.wait();
      console.log("burnTx", burnTx.hash);
      alert(burnTx);
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <>
      {nfts.map((item, _index) => (
        <NftCard
          nftDetail={item}
          key={_index}
          collectionData={collectionData}
          onClick={() => {
            setModalOpen(true);
            setSelectedNft(
              nfts.find((nft) => nft.metadata.title === item.metadata.title)
            );
          }}
        />
      ))}
      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            {collectionData.name + selectedNft.token_id}
          </DialogHeader>
          <DialogDescription>
            <AspectRatio ratio={16 / 12}>
              <Image
                src={collectionData.base_uri + selectedNft.metadata.media}
                alt="nft"
                width={400}
                height={300}
                className="h-full w-[900px] rounded-lg object-cover"
              />
            </AspectRatio>
            <p className="mt-3">
              <strong>Owner</strong>: @{selectedNft.owner_id}
            </p>
            {selectedNft.owner_id === accountId && (
              <div className="flex mt-5 justify-center">
                <Button className="" onClick={burnNft}>
                  Burn
                </Button>
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
