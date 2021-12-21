// example
// HARDHAT_NETWORK='izumiTest' \
//     node deploy.js
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const IZiDODOIDOWhiteList = await hre.ethers.getContractFactory("iZiDODOIDOWhiteList");
  const iZiDODOIDOWhiteList = await IZiDODOIDOWhiteList.deploy();

  var tx = iZiDODOIDOWhiteList.deployTransaction;
  console.log('tx: ', tx);

  await iZiDODOIDOWhiteList.deployed();

  console.log("iZiDODOIDOWhiteList deployed to:", iZiDODOIDOWhiteList.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
