const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

async function main() {
    
    const factory = await hardhat.ethers.getContractFactory("SwapProxy");
  
    console.log("Deploying .....")
    const swapProxy = await factory.deploy();
    await swapProxy.deployed();
    console.log("swapProxy Contract Address: " , swapProxy.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  