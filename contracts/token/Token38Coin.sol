// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token38Coin is ERC20 {

    constructor()
        ERC20("38Coin", "38Coin")
    {
        _mint(msg.sender, 100000000000000000000000000);
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
