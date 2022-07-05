const hardhat = require("hardhat");
const deployed = require('../deployed.js');

const net = process.env.HARDHAT_NETWORK;

//Example:
//HARDHAT_NETWORK='izumiTest' node deployCoreFactory.js 
//

async function main() {


    const swapRouterJson = require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json');

    const factory = deployed[net].factory;
    const weth9 = deployed[net].WETH9;

    // We get the contract to deploy
    const SwapRouter = await hardhat.ethers.getContractFactory(swapRouterJson.abi, swapRouterJson.bytecode)
    const swapRouter = await SwapRouter.deploy(factory, weth9);
  
    await swapRouter.deployed();

    console.log("swapRouter Deployed Address:", swapRouter.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
