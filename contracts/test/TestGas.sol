// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

contract TestGas {

    mapping(address => uint256) public balance;

    mapping(address => uint256) public gasUsed;
    mapping(address => uint256) public gasCost;

    function mint(uint256 amount) external {
        balance[msg.sender] += amount;
    }

    function test(address to, uint256 amount, uint256 iter) external returns (uint256[] memory) {
        uint256 startGas = gasleft();
        for (uint256 i = 0; i < iter; i ++) {
            balance[msg.sender] -= amount;
            balance[to] += amount;
            gasUsed[msg.sender] = i;
            gasCost[msg.sender] = i + 1;
        }
        uint256 gas = gasleft() - startGas;
        uint256 cost = tx.gasprice * gas;
        gasUsed[msg.sender] = gas;
        gasCost[msg.sender] = cost;
    }

}