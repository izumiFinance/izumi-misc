const hardhat = require("hardhat");

const v = process.argv
const composer = v[2];

async function main() {
    
    const StargateTest = await hardhat.ethers.getContractFactory("StargateTest");
  
    console.log("Deploying .....")
    const stargateTest = await StargateTest.deploy(composer);

    console.log("stargateTest Contract Address: " , stargateTest.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  