const hardhat = require("hardhat");

async function main() {

  // We get the contract to deploy
  const tokenFactory = await hardhat.ethers.getContractFactory("Token38Coin")
  const token = await tokenFactory.deploy();
  
  await token.deployed();

  console.log("Token Deployed Address:", token.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
