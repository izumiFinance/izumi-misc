const hardhat = require("hardhat");
const { modules } = require("web3");
const contracts = require("../deployed.js");

const BigNumber = require('bignumber.js');

const Web3 = require("web3");
const secret = require('../../.secret.js');
const pk = secret.pk;

const config = require("../../hardhat.config.js");

const managerJson = require(contracts.nftManagerJson);

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const rpc = config.networks[net].url
const managerAddress = contracts[net].nftManager;
var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    token1Symbol: v[3],
    token1Address: contracts[net][v[3]],
    fee: v[4],
    nftId: v[5],
    rate: Number(v[6])
}

async function main() {


  console.log("Paramters: ");
  for ( var i in para) { console.log("    " + i + ": " + para[i]); }
  
  const [deployer] = await hardhat.ethers.getSigners();


  const manager = new web3.eth.Contract(managerJson.abi, managerAddress);

  const position = await manager.methods.positions(para.nftId).call();
  
  console.log('liquidity: ', position.liquidity.toString());

  const txData = await manager.methods.decreaseLiquidity({
        tokenId: para.nftId,
        liquidity: BigNumber(position.liquidity.toString()).times(para.rate).toFixed(0, 3),
        amount0Min: '0',
        amount1Min: '0',
        deadline: '0xffffffff',
    }).encodeABI();
    const gasLimit = await manager.methods.decreaseLiquidity({
        tokenId: para.nftId,
        liquidity: BigNumber(position.liquidity.toString()).times(para.rate).toFixed(0, 3),
        amount0Min: '0',
        amount1Min: '0',
        deadline: '0xffffffff',
    }).estimateGas();

  const signedTx = await web3.eth.accounts.signTransaction(
      {
          // nonce: 0,
          to: managerAddress,
          data:txData,
          gas: BigNumber(gasLimit * 1.1).toFixed(0, 2),
      }, 
      pk
  );
  // nonce += 1;
  const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('tx: ', tx);
  
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
