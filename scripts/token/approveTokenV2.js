const {ethers} = require("hardhat");
const hre = require("hardhat");
const contracts = require("../deployed.js");

const v = process.argv
const net = process.env.HARDHAT_NETWORK

// Example: HARDHAT_NETWORK='izumiTest' node approveToken.js 'BIT' '0x9a807F7aaBbc502b11434e069187Df8E78c0a599'

const para = {
    token0Address: v[2],
    approveAddress: v[3],
    amount: v[4],
}


//mint uniswap v3 nft
async function main() {

  console.log("Approve token: ")
  for (var i in para) { console.log("    " + i + ": " + para[i]);}

  //attach to manager
  const [deployer] = await ethers.getSigners();
      
  const tokenContract = await hre.ethers.getContractFactory("TestToken");



  const token0Contract = await tokenContract.attach(para.token0Address);
  await token0Contract.approve(para.approveAddress, para.amount); 
  console.log("addr: " + deployer.address);
  console.log("contract: ", para.approveAddress);
  console.log("	" + await token0Contract.allowance(deployer.address, para.approveAddress));
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
