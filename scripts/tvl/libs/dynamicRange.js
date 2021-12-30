
const Web3 = require('web3');

const dynamicRangeABI = require('../abis/farm/MiningDynamicRangeBoost.json');

async function _getRewardInfo(web3, miningAddress) {

    var mining = new web3.eth.Contract(dynamicRangeABI, miningAddress);
    var rewardInfosLen = Number(await mining.methods.rewardInfosLen().call());
    var rewardInfos = [];
    for (var i = 0; i < rewardInfosLen; i ++) {
        var rewardInfo = await mining.methods.rewardInfos(i).call();
        rewardInfos.push(rewardInfo);
    }
    return rewardInfos;
}

async function _getMiningContractInfo(web3, miningAddress) {
    var mining = new web3.eth.Contract(dynamicRangeABI, miningAddress);
    /*

            address token0_,
            address token1_,
            uint24 fee_,
            address iziTokenAddr_,
            uint256 lastTouchBlock_,
            uint256 totalVLiquidity_,
            uint256 totalToken0_,
            uint256 totalToken1_,
            uint256 totalNIZI_,
            uint256 startBlock_,
            uint256 endBlock_
    */
    var result = await mining.methods.getMiningContractInfo().call();
    var totalToken0 = Number(result.totalToken0_);
    var totalToken1 = Number(result.totalToken1_);
    var totalNIZI = Number(result.totalNIZI_);

    return {
        token0: result.token0_,
        token1: result.token1_,
        iZiToken: result.iziTokenAddr_,
        totalToken0,
        totalToken1,
        totalNIZI,
    };
}

async function getTokenAmountList(rpc, contractAddrList) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

    var tokenAmountList = [];

    for (contractAddr of contractAddrList) {
        var metaInfo = await _getMiningContractInfo(web3, contractAddr);
        tokenAmountList.push({
            address: metaInfo.token0,
            amount: metaInfo.totalToken0
        });
        tokenAmountList.push({
            address: metaInfo.token1,
            amount: metaInfo.totalToken1,
        });
        if (metaInfo.totalNIZI > 0) {
            tokenAmountList.push({
                address: metaInfo.iZiToken,
                amount: metaInfo.totalNIZI,
            });
        }
    }
    return tokenAmountList;
}

async function getCapitalTokenAmountList(rpc, contractAddr) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

    var tokenAmountList = [];

    var metaInfo = await _getMiningContractInfo(web3, contractAddr);
    tokenAmountList.push({
        address: metaInfo.token0,
        amount: metaInfo.totalToken0
    });
    tokenAmountList.push({
        address: metaInfo.token1,
        amount: metaInfo.totalToken1,
    });

    return tokenAmountList;
}

async function getRewardTokenAmountList(rpc, contractAddr, blockNum) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    var tokenAmountList = [];
    var rewardInfos = await _getRewardInfo(web3, contractAddr);
    for (var rewardInfo of rewardInfos) {
        var address = rewardInfo.rewardToken;
        var amount = Number(rewardInfo.rewardPerBlock) * blockNum;

        tokenAmountList.push({address, amount});
    }
    return tokenAmountList;
}
module.exports = {
    getTokenAmountList,
    getCapitalTokenAmountList,
    getRewardTokenAmountList
};