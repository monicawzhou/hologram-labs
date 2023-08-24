import Profile from "../components/Profile";
import Modal from "../components/Modal";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: "yourAlchemyApiKey" }), publicProvider()]
);

// NOTE:
// I keep getting the error createConfig is not a function

// // Set up wagmi config
// const config = createConfig({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName: "wagmi"
//       }
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         projectId: "..."
//       }
//     }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: "Injected",
//         shimDisconnect: true
//       }
//     })
//   ],
//   publicClient,
//   webSocketPublicClient
// });
const config = {
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi"
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "..."
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
};

// Pass config to React Context Provider

function ConnectWallet() {
  return (
    <Modal>
      <WagmiConfig config={config}>
        <Profile />
      </WagmiConfig>
    </Modal>
  );
}

export default ConnectWallet;
