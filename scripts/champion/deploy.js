const hardhat = require("hardhat");

async function main() {
    
  const Champion = await hardhat.ethers.getContractFactory("Champion");

  console.log("Deploying .....")
  const champion = await Champion.deploy();
  await champion.deployed();
  console.log("Champion Contract Address: " , champion.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });