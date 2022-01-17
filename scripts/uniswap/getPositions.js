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
    
    var ret = await nftManager.methods.positions(para.nftId).call();

    console.log('ret: ', ret);
}


main().then(()=>{}).catch((err)=>{console.log(err)})
