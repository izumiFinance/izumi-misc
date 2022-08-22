// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../base/SwapRouterAccessControl.sol";


contract EthSwapRouterAccessControl is SwapRouterAccessControl {


    constructor(
        address _safeAddress,
        address _safeModule
    ) SwapRouterAccessControl(
        _safeAddress, 
        _safeModule,
        0xE592427A0AEce92De3Edee1F18E0157C05861564 // swap router address
    ) {
        // usdc
        tokenWhiteList[0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48] = true;
        // weth
        tokenWhiteList[0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2] = true;
    }
}