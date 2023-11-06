const hardhat = require("hardhat");

// example
// HARDHAT_NETWORK='izumiTest' node deployAirdrop.js
// 

async function main() {
    
    const TestGas = await hardhat.ethers.getContractFactory("TestGas");
  
    console.log("Deploying .....")
    const testGas = await TestGas.deploy();
    await testGas.deployed();
    console.log("testGas Contract Address: " , testGas.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  