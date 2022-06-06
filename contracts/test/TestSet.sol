// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

contract TestSet {

    using EnumerableSet for EnumerableSet.UintSet;

    EnumerableSet.UintSet private activeSet;
    EnumerableSet.UintSet private deactiveSet;

    function addMulti(uint256[] calldata a) external {
        for (uint256 i = 0; i < a.length; i ++) {
            activeSet.add(a[i]);
        }
    }

    function deactive(uint256[] calldata a) external {
        for (uint256 i = 0; i < a.length; i ++) {
            activeSet.remove(a[i]);
            deactiveSet.add(a[i]);
        }
    }

    function actives() external view returns (uint256[] memory) {
        return activeSet.values();
    }

    function deactives() external view returns (uint256[] memory) {
        return deactiveSet.values();
    }

}