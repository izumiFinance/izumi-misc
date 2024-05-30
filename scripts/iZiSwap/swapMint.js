const swapMintABI = require('./abi/swapMint.json')
const tokenABI = require('./abi/erc20.json')
const { calciZiLiquidityAmountDesired} = require('./funcs')
const { default: BigNumber } = require('bignumber.js')
const v = process.argv
const confJsonPath = v[2]

function getConfJson(path) {
    const fs = require('fs');
    console.log('path: ', __dirname + '/../../' + path)
    let rawdata = fs.readFileSync(path);
    let data = JSON.parse(rawdata);
    return data;
}

async function main() {

    const confJson = getConfJson(confJsonPath)
    console.log('conf json: ', confJson)

    const [deployer] = await ethers.getSigners();
    const swapMintAddress = confJson['swapMintAddress']
    const tokenAAddress = confJson['tokenAAddress']
    const tokenBAddress = confJson['tokenBAddress']
    const fee = Number(confJson['fee'])
    const swapMint = new web3.eth.Contract(swapMintABI, swapMintAddress)
    const poolAddress = await swapMint.methods.pool(tokenAAddress, tokenBAddress, fee).call()
    let swapAmountX = confJson['swapAmountA']
    let swapAmountY = confJson['swapAmountB']
    let swapMinAcquireX = confJson['swapMinAcquireA']
    let swapMinAcquireY = confJson['swapMinAcquireB']
    
    if (tokenAAddress.toLowerCase() > tokenBAddress.toLowerCase()) {
        swapAmountY = confJson['swapAmountA']
        swapAmountX = confJson['swapAmountB']
        minAcquireY = confJson['swapMinAcquireA']
        minAcquireX = confJson['swapMinAcquireB']
    }
    const targetPt = Number(confJson['targetPt'])
    const leftPt = Number(confJson['leftPt'])
    const rightPt = Number(confJson['rightPt'])
    // calc mint amount
    const amountIsTokenA = confJson['amountIsTokenA']
    const amountDecimal = confJson['amountDecimal'];
    let decimals = 0;
    if (amountIsTokenA) {
        const tokenA = new web3.eth.Contract(tokenABI, tokenAAddress);
        decimals = Number(await tokenA.methods.decimals().call());
    } else {
        const tokenB = new web3.eth.Contract(tokenABI, tokenBAddress);
        decimals = Number(await tokenB.methods.decimals().call());
    }
    const amount = new BigNumber(amountDecimal).times(10 ** decimals).toFixed(0);
    const otherAmount = calciZiLiquidityAmountDesired(
        leftPt,
        rightPt,
        targetPt,
        new BigNumber(amount),
        amountIsTokenA,
        tokenAAddress,
        tokenBAddress,
    ).toFixed(0)
    let amountA = amount;
    let amountB = otherAmount;
    if (!amountIsTokenA) {
        amountB = amount;
        amountA = otherAmount;
    }
    let amountX = amountA;
    let amountY = amountB;
    if (tokenAAddress.toLowerCase() > tokenBAddress.toLowerCase()) {
        amountX = amountB;
        amountY = amountA;
    }
    const minAmountX = new BigNumber(amountX).times(0.98).toFixed(0, 1);
    const minAmountY = new BigNumber(amountY).times(0.98).toFixed(0, 1);
    const params = {
        poolAddress,
        targetPt,
        leftPt,
        rightPt,
        amountX,
        amountY,
        minAmountX,
        minAmountY,
        swapAmountX,
        swapAmountY,
        swapMinAcquireX,
        swapMinAcquireY,
    }
    const txData = await swapMint.methods.swapMint(params).encodeABI()
    const gasLimit = await swapMint.methods.swapMint(params).estimateGas({from: deployer.address});
    console.log('gas limit: ', gasLimit);
    const signedTx = await web3.eth.accounts.signTransaction(
    {
        // nonce: 0,
        to: swapMintAddress,
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
