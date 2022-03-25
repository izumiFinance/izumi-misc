// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

contract TestArbitrumBlock {

    uint256 public lastSetBlock;
    uint256 public lastSetTimestamp;
    function setBlock() external {
        lastSetBlock = block.number;
        lastSetTimestamp = block.timestamp;
    }
    function getBlock() external view returns(uint256, uint256){
        return (block.number, block.timestamp);
    }
}