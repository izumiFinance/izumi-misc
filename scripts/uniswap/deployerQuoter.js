const hardhat = require("hardhat");
const deployed = require('../deployed.js');

const net = process.env.HARDHAT_NETWORK;

//Example:
//HARDHAT_NETWORK='izumiTest' node deployCoreFactory.js 
//

const weth = process.argv[2]

async function main() {


    const quoterJson = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');

    const factory = deployed[net].factory;

    // We get the contract to deploy
    const Quoter = await hardhat.ethers.getContractFactory(quoterJson.abi, quoterJson.bytecode)
    const quoter = await Quoter.deploy(factory, weth);
  
    await quoter.deployed();

    console.log("quoter Deployed Address:", quoter.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
