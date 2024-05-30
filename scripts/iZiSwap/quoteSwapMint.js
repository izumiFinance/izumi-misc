const quoterABI = require('./abi/quoterSwapMint.json')
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
    const quoterSwapMintAddress = confJson['quoterSwapMintAddress']
    const tokenAAddress = confJson['tokenAAddress']
    const tokenBAddress = confJson['tokenBAddress']
    const fee = Number(confJson['fee'])
    const quoterSwapMint = new web3.eth.Contract(quoterABI, quoterSwapMintAddress)
    const poolAddress = await quoterSwapMint.methods.pool(tokenAAddress, tokenBAddress, fee).call()
    const targetPt = Number(confJson['targetPt'])
    const {
        payAmountX, 
        payAmountY,
        acquireAmountX,
        acquireAmountY,
        finalPt
    } = await quoterSwapMint.methods.swap({
        poolAddress,
        targetPt,
    }).call()

    let swapAmountA = payAmountX.toString()
    let swapAmountB = payAmountY.toString()
    let acquireA = acquireAmountX.toString()
    let acquireB = acquireAmountY.toString()
    
    if (tokenAAddress.toLowerCase() > tokenBAddress.toLowerCase()) {
        swapAmountA = payAmountY.toString()
        swapAmountB = payAmountX.toString()
        acquireA = acquireAmountY.toString()
        acquireB = acquireAmountX.toString()
    }

    console.log('============================')

    console.log('finalPt: ', Number(finalPt));
    console.log('swapAmountA: ', swapAmountA)
    console.log('swapAmountB: ', swapAmountB)
    console.log('acquireA: ', acquireA)
    console.log('acquireB: ', acquireB)

    const swapMinAcquireA = new BigNumber(acquireA).times(0.985).toFixed(0, 1)
    const swapMinAcquireB = new BigNumber(acquireB).times(0.985).toFixed(0, 1)
    console.log('swapMinAcquireA: ', swapMinAcquireA)
    console.log('swapMinAcquireB: ', swapMinAcquireB)
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
})

module.exports = main;
