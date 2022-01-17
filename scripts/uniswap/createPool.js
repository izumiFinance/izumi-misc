const hardhat = require("hardhat");

const secret = require('../../.secret.js');
const pk = secret.pk;

const config = require("../../hardhat.config.js");

const { BigNumber } = require("bignumber.js");

//Example:
//HARDHAT_NETWORK='izumiTest' node createPool.js MIM USDC 500 1
//


const contracts = require("../deployed.js");
const managerJson = require(contracts.nftManagerJson);

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const rpc = config.networks[net].url
const {getWeb3, getContractABI} = require('../libraries/getWeb3');

const web3 = getWeb3();

const managerAddress = contracts[net].nftManager;
const para = {
    token0Symbol: v[2],
    token0Address: contracts[net][v[2]],
    token1Symbol: v[3],
    token1Address: contracts[net][v[3]],
    fee: v[4],
    priceToken0By1: v[5],
}

var testTokenABI = getContractABI(__dirname + '/../../artifacts/contracts/test/TestToken.sol/TestToken.json');

async function createPool(manager, token0Address, token1Address, fee, priceToken0By1SqrtX96) {
  const txData = await manager.methods.createAndInitializePoolIfNecessary(token0Address, token1Address, fee, priceToken0By1SqrtX96).encodeABI();
  const gasLimit = await manager.methods.createAndInitializePoolIfNecessary(token0Address, token1Address, fee, priceToken0By1SqrtX96).estimateGas();
  console.log('gas limit: ', gasLimit);
  console.log('manager address: ', managerAddress);
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: managerAddress,
      data: txData,
      gas: BigNumber(gasLimit * 1.1).toFixed(0, 2),
    },
    pk
  )
  const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return tx;
}

async function main() {

  para.priceToken0By1 = Number(para.priceToken0By1);

  if (para.token1Address.toUpperCase() < para.token0Address.toUpperCase()) {
    var tmp = para.token0Symbol;
    para.token0Symbol = para.token1Symbol;
    para.token1Symbol = tmp;
    tmp = para.token0Address;
    para.token0Address = para.token1Address;
    para.token1Address = tmp;
    
    para.priceToken0By1 = 1.0 / para.priceToken0By1;
  }

  var token0 = new web3.eth.Contract(testTokenABI, para.token0Address);
  var token1 = new web3.eth.Contract(testTokenABI, para.token1Address);

  var decimal0 = await token0.methods.decimals().call();
  console.log('decimal0: ', decimal0);
  var decimal1 = await token1.methods.decimals().call();
  console.log('decimal1: ', decimal1);
  var priceToken0By1 = para.priceToken0By1 * (10 ** decimal1) / (10 ** decimal0);
  console.log("token0: ", para.token0Symbol, " ", para.token0Address, " decimal: ", decimal0);
  console.log("token1: ", para.token1Symbol, " ", para.token1Address, " decimal: ", decimal1);
  console.log("origin price: ", para.priceToken0By1);
  console.log("new price: ", priceToken0By1);

  var priceToken0By1Sqrt = BigNumber(priceToken0By1).sqrt();
  console.log('priceSqrt: ', priceToken0By1Sqrt.toString());

  var priceToken0By1SqrtX96 = priceToken0By1Sqrt.times(BigNumber(2).pow(96)).toFixed(0);

  console.log('priceSqrtX96: ', priceToken0By1SqrtX96);

  const manager = new web3.eth.Contract(managerJson.abi, managerAddress);

  //Check whether attach successfully
  console.log(await manager.methods.factory().call(), " attach successfully");
  
  const tx = await createPool(manager, para.token0Address, para.token1Address, para.fee, priceToken0By1SqrtX96);
  console.log(tx);
  console.log("Create pool transaction send!");
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})
