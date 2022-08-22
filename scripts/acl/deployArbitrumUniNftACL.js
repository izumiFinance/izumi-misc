const hardhat = require("hardhat");
const contracts = require("../deployed.js");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

const net = process.env.HARDHAT_NETWORK

async function main() {
    
    const nftACL = await hardhat.ethers.getContractFactory("ArbitrumNonfungiblePositionManagerAccessControl");
    const coboSafeAddress = contracts[net].coboSafeAddress
    const coboSafeModule = contracts[net].coboSafeModule

    const args = [
      coboSafeAddress,
      coboSafeModule
    ]
  
    console.log("Deploying .....")
    const nftACL = await nftACL.deploy(...args);
    await nftACL.deployed();
    console.log("nftACL address: " , nftACL.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  