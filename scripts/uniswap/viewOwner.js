const {ethers} = require("hardhat");
const hre = require("hardhat");
const contracts = require("../deployed.js");
const managerJson = require(contracts.nftManagerJson);
const net = process.env.HARDHAT_NETWORK
const managerAddress = contracts[net].nftManager;

const v = process.argv


// Example: HARDHAT_NETWORK='izumiTest' node viewOwner.js 1415

const para = {
    nftid: v[2]
}


//mint uniswap v3 nft
async function main() {

  //attach to manager
  const [deployer] = await ethers.getSigners();
  const positionManagerContract = await ethers.getContractFactory(managerJson.abi, managerJson.bytecode, deployer);
  const positionsManager = positionManagerContract.attach(managerAddress);
  console.log(await positionsManager.ownerOf(para.nftid));
}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
