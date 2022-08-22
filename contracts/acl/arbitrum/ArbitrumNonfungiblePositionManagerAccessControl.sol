// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "../base/NonfungiblePositionManagerAccessControl.sol";


contract ArbitrumNonfungiblePositionManagerAccessControl is NonfungiblePositionManagerAccessControl {

    constructor(
        address _safeAddress,
        address _safeModule
    ) NonfungiblePositionManagerAccessControl(
        _safeAddress, 
        _safeModule,
        0xC36442b4a4522E871399CD717aBDD847Ab11FE88 // nft address
    ) {
        // usdc
        tokenWhiteList[0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8] = true;
        // weth
        tokenWhiteList[0x82aF49447D8a07e3bd95BD0d56f35241523fBab1] = true;
    }
}