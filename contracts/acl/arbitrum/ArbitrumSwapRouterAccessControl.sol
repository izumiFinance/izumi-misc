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
        0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45, // swap router address
        0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8, // usdc address
        0x82aF49447D8a07e3bd95BD0d56f35241523fBab1  // weth address
    ) {}
}