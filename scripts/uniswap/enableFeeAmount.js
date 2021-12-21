const { BigNumber } = require("bignumber.js");
const hardhat = require("hardhat");

//Example:
//HARDHAT_NETWORK='izumiTest' node enableFeeAmount.js 100 1
//


const contracts = require("../deployed.js");
const factoryJson = require(contracts.factoryJson);

const v = process.argv

const para = {
    fee: v[2],
    tickSpacing: v[3],
}
const net = process.env.HARDHAT_NETWORK
const factoryAddress = contracts[net].factory;

async function main() {
  // We get the signer's info
  const [deployer] = await hardhat.ethers.getSigners();


  const factoryContract = await hardhat.ethers.getContractFactory(factoryJson.abi, factoryJson.bytecode, deployer);
  const factory = factoryContract.attach(factoryAddress);

  console.log(await factory.deployed());

  await factory.enableFeeAmount(para.fee, para.tickSpacing);

  console.log('tickspacing: ', await factory.feeAmountTickSpacing(para.fee));
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
