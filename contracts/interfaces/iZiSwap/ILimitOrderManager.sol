// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.4;
interface ILimitOrderManager {
    
    struct AddLimOrderParam {
        address tokenX;
        address tokenY;
        uint24 fee;
        int24 pt;
        uint128 amount;
        bool sellXEarnY;
        uint256 deadline;
    }
        
}