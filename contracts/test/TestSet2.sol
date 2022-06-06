// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/structs/EnumerableSet.sol)

pragma solidity ^0.8.0;


contract TestSet2 {

    struct NFT {
        uint256 id;
        bool active;
    }

    NFT[] public nfts;

    function replaceMultiAt(uint256 start, uint256[] calldata a) external {
        for (uint256 i = 0; i < a.length; i ++) {
            nfts[start].id = a[i];
            nfts[start].active = true;
            start ++;
        }
    }

    function addMulti(uint256[] calldata a) external {
        for (uint256 i = 0; i < a.length; i ++) {
            nfts.push(NFT({id: a[i], active: true}));
        }
    }

    function deactive(uint256 from, uint256 to) external {
        for (uint256 i = from; i < to; i ++) {
            nfts[i].active = false;
        }
    }

    function actives(uint256 capacity) external view returns (uint256[] memory a) {
        a = new uint256[](capacity);
        uint256 num = 0;
        for (uint256 i = 0; i < nfts.length; i ++) {
            if (nfts[i].active) {
                a[num] = nfts[i].id;
                num ++;
            }
        }
    }

    function deactives(uint256 capacity) external view returns (uint256[] memory b) {
        b = new uint256[](capacity);
        uint256 num = 0;
        for (uint256 i = 0; i < nfts.length; i ++) {
            if (!nfts[i].active) {
                b[num] = nfts[i].id;
                num ++;
            }
        }
    }

}