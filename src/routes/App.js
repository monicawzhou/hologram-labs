import "../styles.css";
import PostsList from "../components/PostsList";
import MainHeader from "../components/MainHeader";
import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet
} from "@wagmi/core";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZD4dooPVWqoVVBEtXLTBwKMNG6V2VSLH",
  network: Network.ETH_MAINNET
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Get all NFTs
  const nfts = await alchemy.nft.getNftsForOwner(
    "0x5e765C6A318502FF2F6eF0D951e84F8dAE7FA3c9"
  );
  return nfts;
};

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "ZD4dooPVWqoVVBEtXLTBwKMNG6V2VSLH" }),
    publicProvider()
  ]
);

export default function App() {
  const { posts } = useLoaderData();

  return (
    <>
      <Outlet />
      <main>
        <PostsList posts={posts} />
      </main>
    </>
  );
}

export async function loader({ params }) {
  const data = await main();
  console.log(data);
  const posts = data.ownedNfts.map((elem) => {
    return {
      id: elem.contract.address,
      title: elem.title,
      description: elem.description,
      lastUpdated: elem.timeLastUpdated,
      ...elem.media[0]
    };
  });

  return { posts };
}
