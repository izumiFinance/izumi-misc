const hardhat = require("hardhat");
const web3 = require("web3")
const config = require("../hardhat.config.js")

const v = process.argv


const para = {
    network: process.env.HARDHAT_NETWORK,
    rpc: config.networks[process.env.HARDHAT_NETWORK].url,
    tx: v[2],
}


async function main() {
    console.log("Paramters: ");
    for ( var i in para) { console.log("    " + i + ": " + para[i]); }

    const w3 = new web3(para.rpc);
    const tx = await w3.eth.getTransaction(para.tx);
    console.log('tx: ', tx);
    const ret = await w3.eth.call(tx, tx.blockNumber-1);
    // console.log('ret: ', ret);
    // console.log('len: ', (ret.length - 2) / 8);
    // console.log('ret[0]: ', ret.slice(2 + 208 * 7, 2 + 208*8))

    // const decodeParams = w3.eth.abi.decodeParameters([['string'],['string'],['string'],['string'],['string'],['string'],['string'],['string']], ret);
    console.log('ret:' , ret);
    const decodeArray = w3.eth.abi.decodeParameter('bytes[]', ret);
    console.log('decode array: ', decodeArray);
    for (let item of decodeArray) {
        console.log('item: ', item);
        const bytes = w3.eth.abi.decodeParameter('uint256', item);
        console.log(bytes);
    }


}


main().then(()=>{}).catch((err)=>{console.log(err)})
