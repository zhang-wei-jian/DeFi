import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider, Chain,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


import { ToastContainer, } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';




const avalanche = {
  id: 31337,
  name: 'Hardhat',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    // default: { http: ['http://127.0.0.1:8545'] },
    default: { http: ['http://192.168.31.64:8545'] },
  },
  blockExplorers: {
    // default: { name: 'Localhost Explorer', url: 'http://localhost:8545' },
    default: { name: 'Localhost Explorer', url: 'http://192.168.31.64:8545' },
  },
  contracts: {
    multicall3: {
      address: '0x1696C7203769A71c97Ca725d42b13270ee493526', // 替换为实际地址
      blockCreated: 0,
    },
  },
} as const satisfies Chain;

// const config = getDefaultConfig({
//   appName: 'My RainbowKit Hardhat',
//   projectId: 'YOUR_PROJECT_ID',
//   // chains: [mainnet, polygon, optimism, arbitrum, base],
//   chains: [avalanche],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });

const config = getDefaultConfig({
  appName: 'http://aisuperhero.xyz/',
  projectId: 'f0667b58f29a44264a41a7cc9f9612a0',
  chains: [avalanche],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(



  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider locale="zh-CN">

        <ToastContainer />
        <BrowserRouter>
          <Provider>
            <App />
          </Provider>
        </BrowserRouter>


      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>

);
