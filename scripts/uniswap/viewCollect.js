const hardhat = require("hardhat");
const config = require("../../hardhat.config.js")


const contracts = require("../deployed.js");

const v = process.argv
const net = process.env.HARDHAT_NETWORK

const para = {
    network: net,
    rpc: config.networks[net].url,
    nftId: v[2],
}

const Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider(para.rpc));

const managerJson = require(contracts.nftManagerJson);

async function main() {
    console.log("Paramters: ");
    for ( var i in para) { console.log("    " + i + ": " + para[i]); }

   
    console.log('rpc: ', para.rpc);


    // const [deployer] = await ethers.getSigners();

    var nftManager = new web3.eth.Contract(managerJson.abi, contracts[net].nftManager);

    var owner = await nftManager.methods.ownerOf(para.nftId).call();
    console.log('owner: ', owner);
    /*

        params.tokenId = uniPositionID;
        params.recipient = recipient;
        params.amount0Max = 0xffffffffffffffffffffffffffffffff;
        params.amount1Max = 0xffffffffffffffffffffffffffffffff;
        */
    var ret = await nftManager.methods.collect({
        tokenId: para.nftId,
        recipient: owner,
        amount0Max: '0xffffffffffffffffffffffffffffffff',
        amount1Max: '0xffffffffffffffffffffffffffffffff'
    }).call({from: owner});

    console.log('ret: ', ret);
}


main().then(()=>{}).catch((err)=>{console.log(err)})
