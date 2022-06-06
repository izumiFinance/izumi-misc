
const Web3 = require('web3');

const fixRangeABI = require('../abis/farm/MiningFixRangeBoost.json');
const poolABI = require('../abis/uniswap/UniswapV3Pool.json');
const factoryABI = require('../abis/uniswap/UniswapV3Factory.json');

async function _getPoolTick(web3, poolAddr) {
    var pool = new web3.eth.Contract(poolABI, poolAddr);
    var result = await pool.methods.slot0().call();
    return result.tick;
}

async function _getMiningContractInfo(web3, miningAddress) {
    var mining = new web3.eth.Contract(fixRangeABI, miningAddress);
    var result = await mining.methods.getMiningContractInfo().call();
    var tickDiff = result.rewardUpperTick_ - result.rewardLowerTick_;
    console.log('tickdiff: ', tickDiff);
    var totalVLiquidity = Number(result.totalVLiquidity_.toString()) / tickDiff / tickDiff;
    console.log(totalVLiquidity * 1e6);

    var totalNIZI = await mining.methods.totalNIZI().call();
    totalNIZI = Number(totalNIZI.toString());
    return {
        token0: result.token0_,
        token1: result.token1_,
        fee: result.fee_,
        rewardInfos: result.rewardInfos_,
        iZiToken: result.iziTokenAddr_,
        rewardUpperTick: result.rewardUpperTick_,
        rewardLowerTick: result.rewardLowerTick_,
        totalVLiquidity,
        totalNIZI
    };
}


function tick2PriceSqrt(tick) {
    return (1.0001 ** tick) ** 0.5;
};

function liquidity2TokenAmount(
    liquidity,
    lowerTick,
    upperTick,
    currentTick
) {
    let tokenAAmount = 0;
    let tokenBAmount = 0;

    // only tokenA
    if (currentTick < lowerTick) {
        tokenAAmount =
            liquidity *
            (1 / tick2PriceSqrt(lowerTick) - 1 / tick2PriceSqrt(upperTick));
    } else if (currentTick > upperTick) {
        tokenBAmount =
            liquidity * (tick2PriceSqrt(upperTick) - tick2PriceSqrt(lowerTick));
    } else {
        tokenAAmount =
            liquidity *
            (1 / tick2PriceSqrt(currentTick) - 1 / tick2PriceSqrt(upperTick));
        tokenBAmount =
            liquidity *
            (tick2PriceSqrt(currentTick) - tick2PriceSqrt(lowerTick));
    }

    return [tokenAAmount, tokenBAmount];
};
async function getTokenAmountList(rpc, uniswapFactoryAddr, contractAddrList) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    var factory = new web3.eth.Contract(factoryABI, uniswapFactoryAddr);

    var tokenAmountList = [];

    for (contractAddr of contractAddrList) {
        var metaInfo = await _getMiningContractInfo(web3, contractAddr);
        var poolAddr = await factory.methods.getPool(metaInfo.token0, metaInfo.token1, metaInfo.fee).call();
        var tick = await _getPoolTick(web3, poolAddr);
        var token0Amount, token1Amount;
        [token0Amount, token1Amount] = liquidity2TokenAmount(metaInfo.totalVLiquidity, metaInfo.rewardLowerTick, metaInfo.rewardUpperTick, tick);
        tokenAmountList.push({
            address: metaInfo.token0,
            amount: token0Amount * 1e6
        });
        tokenAmountList.push({
            address: metaInfo.token1,
            amount: token1Amount * 1e6
        });
        if (metaInfo.totalNIZI > 0) {
            tokenAmountList.push({
                address: metaInfo.iZiToken,
                amount: metaInfo.totalNIZI
            });
        }
    }
    return tokenAmountList;
}

async function getCapitalTokenAmountList(rpc, uniswapFactoryAddr, contractAddr) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    var factory = new web3.eth.Contract(factoryABI, uniswapFactoryAddr);

    var tokenAmountList = [];

    var metaInfo = await _getMiningContractInfo(web3, contractAddr);
    var poolAddr = await factory.methods.getPool(metaInfo.token0, metaInfo.token1, metaInfo.fee).call();
    var tick = await _getPoolTick(web3, poolAddr);
    var token0Amount, token1Amount;
    [token0Amount, token1Amount] = liquidity2TokenAmount(metaInfo.totalVLiquidity, metaInfo.rewardLowerTick, metaInfo.rewardUpperTick, tick);
    tokenAmountList.push({
        address: metaInfo.token0,
        amount: token0Amount * 1e6
    });
    tokenAmountList.push({
        address: metaInfo.token1,
        amount: token1Amount * 1e6
    });

    return tokenAmountList;
}

async function getRewardTokenAmountList(rpc, contractAddr, blockNum) {

    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    var tokenAmountList = [];
    var metaInfo = await _getMiningContractInfo(web3, contractAddr);
    for (var rewardInfo of metaInfo.rewardInfos) {
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