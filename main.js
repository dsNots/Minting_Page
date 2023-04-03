// main.js
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { configureChains, createClient } from '@wagmi/core';
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains';

// Configure chains and create wagmi client
const chains = [arbitrum, mainnet, polygon];
const projectId = '13128e2749093e6871d3d4b610d74ab9';

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal({ projectId }, ethereumClient);

export { web3modal };
