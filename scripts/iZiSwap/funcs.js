const BigNumber = require('bignumber.js')

function getAmountY(
    liquidity,
    sqrtPriceL,
    sqrtPriceR,
    sqrtRate,
    upper,
) {
    const numerator = sqrtPriceR - sqrtPriceL;
    const denominator = sqrtRate - 1;
    if (!upper) {
        const amount = new BigNumber(liquidity.times(numerator).div(denominator).toFixed(0, 1));
        return amount;
    } else {
        const amount = new BigNumber(liquidity.times(numerator).div(denominator).toFixed(0, 2));
        return amount;
    }
}

function liquidity2AmountYAtPoint(
    liquidity,
    sqrtPrice,
    upper
) {
    const amountY = liquidity.times(sqrtPrice);
    if (!upper) {
        return new BigNumber(amountY.toFixed(0, 1));
    } else {
        return new BigNumber(amountY.toFixed(0, 2));
    }
}

function getAmountX(
    liquidity,
    leftPt,
    rightPt,
    sqrtPriceR,
    sqrtRate,
    upper,
) {
    const sqrtPricePrPc = Math.pow(sqrtRate, rightPt - leftPt + 1);
    const sqrtPricePrPd = Math.pow(sqrtRate, rightPt + 1);

    const numerator = sqrtPricePrPc - sqrtRate;
    const denominator = sqrtPricePrPd - sqrtPriceR;

    if (!upper) {
        const amount = new BigNumber(liquidity.times(numerator).div(denominator).toFixed(0, 1));
        return amount;
    } else {
        const amount = new BigNumber(liquidity.times(numerator).div(denominator).toFixed(0, 2));
        return amount;
    }
}

function liquidity2AmountXAtPoint(
    liquidity,
    sqrtPrice,
    upper
) {
    const amountX = liquidity.div(sqrtPrice);
    if (!upper) {
        return new BigNumber(amountX.toFixed(0, 1));
    } else {
        return new BigNumber(amountX.toFixed(0, 2));
    }
}

function getAmountYNoRound(
    liquidity,
    sqrtPriceL,
    sqrtPriceR,
    sqrtRate,
) {
    const numerator = sqrtPriceR - sqrtPriceL;
    const denominator = sqrtRate - 1;
    const amount = liquidity.times(numerator).div(denominator);
    return amount;
};

function getAmountXNoRound(
    liquidity,
    leftPt,
    rightPt,
    sqrtPriceR,
    sqrtRate,
) {
    const sqrtPricePrPc = Math.pow(sqrtRate, rightPt - leftPt + 1);
    const sqrtPricePrPd = Math.pow(sqrtRate, rightPt + 1);

    const numerator = sqrtPricePrPc - sqrtRate;
    const denominator = sqrtPricePrPd - sqrtPriceR;

    const amount = liquidity.times(numerator).div(denominator);
    return amount;
}

function _calciZiLiquidityAmountY(
    amountX,
    tickLower,
    tickUpper,
    currentPt
) {
    console.log(' -- calc amount of iZiSwapPool::tokenY');
    if (tickLower > currentPt) {
        console.log(' -- no need to deposit iZiSwapPool::tokenY');
        return new BigNumber(0);
    }
    if (tickUpper <= currentPt) {
        console.log(' -- no need to deposit iZiSwapPool::tokenX');
        return new BigNumber(0);
    }
    console.log(' -- tickLower: ', tickLower);
    console.log(' -- currentPt: ', currentPt);
    console.log(' -- tickUpper: ', tickUpper);

    const sqrtRate = Math.sqrt(1.0001);
    const sqrtPriceR = Math.pow(sqrtRate, tickUpper);
    const unitLiquidityAmountX = getAmountXNoRound(new BigNumber(1), currentPt + 1, tickUpper, sqrtPriceR, sqrtRate);
    const liquidityFloat = amountX.div(unitLiquidityAmountX);

    console.log(' -- liquidityFloat: ', liquidityFloat.toFixed(10));

    const sqrtPriceL = Math.pow(sqrtRate, tickLower);
    const sqrtPriceCurrentPtA1 = Math.pow(sqrtRate, currentPt + 1);
    const amountY = getAmountY(liquidityFloat, sqrtPriceL, sqrtPriceCurrentPtA1, sqrtRate, true);

    console.log(' -- amount of iZiSwapPool::tokenY: ', amountY.toFixed(0));
    return amountY;
}

function _calciZiLiquidityAmountX(
    amountY,
    tickLower,
    tickUpper,
    currentPt
) {
    console.log(' -- calc amount of iZiSwapPool::tokenX');
    if (tickUpper <= currentPt) {
        console.log(' -- no need to deposit iZiSwapPool::tokenX');
        return new BigNumber(0);
    }
    if (tickLower > currentPt) {
        console.log(' -- no need to deposit iZiSwapPool::tokenY');
        return new BigNumber(0);
    }

    console.log(' -- tickLower: ', tickLower);
    console.log(' -- currentPt: ', currentPt);
    console.log(' -- tickUpper: ', tickUpper);

    const sqrtRate = Math.sqrt(1.0001);
    const sqrtPriceL = Math.pow(sqrtRate, tickLower);
    const sqrtPriceCurrentPtA1 = Math.pow(sqrtRate, currentPt + 1);
    const unitLiquidityAmountY = getAmountYNoRound(new BigNumber(1), sqrtPriceL, sqrtPriceCurrentPtA1, sqrtRate);
    const liquidityFloat = amountY.div(unitLiquidityAmountY);

    console.log(' -- liquidityFloat: ', liquidityFloat.toFixed(10));

    const sqrtPriceR = Math.pow(sqrtRate, tickUpper);
    const amountX = getAmountX(liquidityFloat, currentPt + 1, tickUpper, sqrtPriceR, sqrtRate, true);

    console.log(' -- amount of iZiSwapPool::tokenX: ', amountX.toFixed(0));
    return amountX;
}

function calciZiLiquidityAmountDesired(
    tickLeft,
    tickUpper,
    currentPt,
    amount,
    amountIsTokenA,
    tokenAAddress,
    tokenBAddress,
) {
    if (amountIsTokenA) {
        if (tokenAAddress.toLowerCase() < tokenBAddress.toLowerCase()) {
            return _calciZiLiquidityAmountY(amount, tickLeft, tickUpper, currentPt);
        } else {
            return _calciZiLiquidityAmountX(amount, tickLeft, tickUpper, currentPt);
        }
    } else {
        if (tokenAAddress.toLowerCase() < tokenBAddress.toLowerCase()) {
            return _calciZiLiquidityAmountX(amount, tickLeft, tickUpper, currentPt);
        } else {
            return _calciZiLiquidityAmountY(amount, tickLeft, tickUpper, currentPt);
        }
    }
}

module.exports={
    calciZiLiquidityAmountDesired,
}