const hardhat = require("hardhat");
const contracts = require("../deployed.js");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

const owner = process.argv[2]

async function main() {
    
    const Airdrop = await hardhat.ethers.getContractFactory("Airdrop");
  
    console.log("Deploying .....")
    const airdrop = await Airdrop.deploy();
    await airdrop.deployed();
    console.log("Airdrop Contract Address: " , airdrop.address);
    console.log("transfering ownership ...")
    await airdrop.transferOwnership(owner);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  