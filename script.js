const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const isWindowOpen = false


let web3;
let contract;
let initWeb3Promise;




document.getElementById('enterSite').addEventListener('click', function () {
    this.style.display = 'none'; // Remove the "Enter Site" button
    var audio = document.querySelector('audio');
    audio.volume = 0.5;
    audio.play();
    initializeParticlesAndEffects();
});

function displayLoadingDots(button) {
    let dotCount = 0;
    button.textContent = "Minting";

    const interval = setInterval(() => {
        button.textContent = "Minting" + ".".repeat(dotCount);
        dotCount = (dotCount + 1) % 4;
    }, 500);

    return () => clearInterval(interval);
}

function updateParticleColor(color) {
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 600
            },
            color: {
                value: color, // Use the color parameter
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: false
            },
            move: {
                speed: 1
            }
        }
    });
}

updateParticleColor('#000000');

const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "MetadataUri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "addressMinted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "addressMintedBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "currentIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "revealed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_maxSupply", "type": "uint256" }], "name": "setMaxSupply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_MetadataUri", "type": "string" }], "name": "setMetadataUri", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "setPaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "setRevealed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uriPrefix", "type": "string" }], "name": "setUriPrefix", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uriSuffix", "type": "string" }], "name": "setUriSuffix", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "walletOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawall", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const contractAddress = '0xE65627416aE983818a8E55f9972C86d8C2bb6140';
const mainnet = 'https://mainnet.infura.io/v3/d72497a762da4471a0ef9ebe232cd86f';

// Configure chains and create wagmi client
const chains = [mainnet];
const projectId = '13128e2749093e6871d3d4b610d74ab9';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "d72497a762da4471a0ef9ebe232cd86f"
        }
    }
};

const web3modal = new Web3Modal({

    cacheProvider: false, // optional
    providerOptions, // required
});


async function connectWallet() {

    // Initialize Web3Modal
    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        providerOptions
    });



    // Get a Web3 instance for the wallet
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // Use the provider to get the user's accounts
    const accounts = await web3.eth.getAccounts();

    // Update the button and text if a wallet is connected
    if (accounts.length > 0) {
        const button = document.getElementById('connectWallet');
        button.style.backgroundColor = 'green';
        button.textContent = 'Wallet connected';
    }

}

async function mintNFT() {
    // initWeb3Promise = initWeb3();
    try {
        // Wait for the web3 instance to be ready
        await initWeb3Promise;

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await contract.methods.mint().estimateGas({ from: account });

        // Display loading sign with three dots
        const mintButton = document.getElementById("mint");
        const stopLoadingDots = displayLoadingDots(mintButton);

        const receipt = await contract.methods.mint().send({ from: account, gasPrice, gas: gasEstimate });

        const txHash = receipt.transactionHash;

        console.log(txHash)


        // Restore the original text of the mint button after successful minting
        stopLoadingDots();
        mintButton.textContent = "Minted!";
        // add a response from the browser saying successfully minted!
        alert('Successfully minted! View your transaction on Etherscan: https://etherscan.io/tx/' + txHash);


    } catch (error) {
        console.error("Error minting NFT:", error);
        alert(error.message)

        // Restore the original text of the mint button if minting fails
        stopLoadingDots();
        mintButton.textContent = "Mint";
    }
}

document.getElementById('mint').addEventListener('click', async () => {
    await mintNFT();
});

document.getElementById('connectWallet').addEventListener('click', async () => {
    await connectWallet(); // Call the connectWallet function here
});



function initializeParticlesAndEffects() {
    const elementsToShow = document.querySelectorAll('.hidden');
    elementsToShow.forEach(element => {
        document.querySelector('.help-text').classList.remove('hidden');
        element.classList.remove('hidden');
    });

    setTimeout(() => {
        document.getElementById('connectWallet').classList.add('visible');
        document.getElementById('mint').classList.add('visible');
        document.getElementById('opensea-link').classList.add('visible');
        document.getElementById('opensea-logo').classList.add('visible');
        const helpTextElement = document.querySelector('.help-text');
        helpTextElement.classList.add('visible');
        helpTextElement.classList.remove('hidden');
        helpTextElement.style.opacity = '1'; // Add this line to set the opacity to 1
        const openseaLogo = document.getElementById('opensea-logo');
        openseaLogo.style.opacity = '1';
    }, 3000);

    document.body.addEventListener('click', dimLights);

    function dimLights() {
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        const discoBall = document.getElementById('disco-ball');
        discoBall.style.display = 'block';
        discoBall.style.top = '20%';
        discoBall.style.transform = 'translateX(-50%) translateY(-50%)';
        setTimeout(() => {
            discoBall.classList.add('visible');
        }, 3000);
        updateParticleColor('#FF10F0'); // Update particle color to purple
        document.body.removeEventListener('click', dimLights);
        document.querySelector('.help-text').style.color = 'white';
    }

    document.addEventListener('click', function () {
        var audio = document.querySelector('audio');
        audio.volume = 0.5;
        audio.play();
    });
}

document.getElementById('enterSite').addEventListener('click', function () {
    this.style.display = 'none'; // Remove the "Enter Site" button
    var audio = document.querySelector('audio');
    audio.volume = 0.5;
    audio.play();
    initializeParticlesAndEffects();
});