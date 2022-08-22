// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../base/NonfungiblePositionManagerAccessControl.sol";


contract EthNonfungiblePositionManagerAccessControl is NonfungiblePositionManagerAccessControl {

    constructor(
        address _safeAddress,
        address _safeModule
    ) NonfungiblePositionManagerAccessControl(
        _safeAddress, 
        _safeModule,
        0xC36442b4a4522E871399CD717aBDD847Ab11FE88 // nft address
    ) {
        // usdc
        tokenWhiteList[0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48] = true;
        // weth
        tokenWhiteList[0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2] = true;
    }
}