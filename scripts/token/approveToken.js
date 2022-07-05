const {ethers} = require("hardhat");
const hre = require("hardhat");
const contracts = require("../deployed.js");
const managerJson = require(contracts.nftManagerJson);

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const managerAddress = contracts[net].nftManager;

// Example: HARDHAT_NETWORK='izumiTest' node approveToken.js 'iZiT' '0xdBA594608D9941D4072F27C99B3E69565b6893Bf'

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    approveAddress: v[3],
}


//mint uniswap v3 nft
async function main() {

  console.log("Approve token: ")
  for (var i in para) { console.log("    " + i + ": " + para[i]);}

  //attach to manager
  const [deployer] = await ethers.getSigners();

  console.log('deployer address: ', deployer.address);
      
  const tokenContract = await hre.ethers.getContractFactory("TestToken");

  const token0Contract = await tokenContract.attach(para.token0Address);
  await token0Contract.approve(para.approveAddress.toLowerCase(), '1000000000000000000000000000000'); 
  console.log("addr: " + deployer.address);
  console.log("contract: ", para.approveAddress);
  console.log("	" + await token0Contract.allowance(deployer.address, para.approveAddress));
  console.log(' ' + await token0Contract.balanceOf(deployer.address));
  

}
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
