const hardhat = require("hardhat");
const contracts = require("../deployed.js");
const BigNumber = require("bignumber.js");


const v = process.argv
const net = process.env.HARDHAT_NETWORK

function getContractJson(path) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path);
    let data = JSON.parse(rawdata);
    return data;
}
async function getWETH9(signer, wethAddr) {
    var WETH9Json = getContractJson(__dirname + '/../externBuild/WETH9.json').WETH9;
    console.log('weth9json: ', WETH9Json.abi);
    var WETH9Factory = await hardhat.ethers.getContractFactory(WETH9Json.abi, WETH9Json.bytecode, signer);
    var WETH9 = WETH9Factory.attach(wethAddr);
    return WETH9;
}


async function main() {
    
  const [deployer, tester] = await hardhat.ethers.getSigners();
  const wethAddr = contracts[net].WETH9;

  console.log('weth addr: ', wethAddr);
  weth9 = await getWETH9(deployer, wethAddr);

  console.log('balance of weth9: ', (await weth9.balanceOf(tester.address)).toString());

  await weth9.connect(tester).withdraw('100000000');


  console.log('------balance of weth9: ', (await weth9.balanceOf(tester.address)).toString());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
