//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SharedLiquidityToken is ERC20, Ownable {
    uint8 decimal;
    mapping(address => bool) public blackList;
    bool public pause;

    constructor(string memory _name, string memory _symbol, uint8 _decimal, uint256 amount)
        ERC20(_name, _symbol)
    {
        _mint(msg.sender, amount);
        decimal=_decimal;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(uint amount) public {
        _burn(msg.sender, amount);
    }

    function decimals() public view override returns (uint8) {
        return decimal;
    }

    function freezeAccount(address account) external onlyOwner {
        blackList[account] = true;
    }

    function unfreezeAccount(address account) external onlyOwner {
        delete blackList[account];
    }

    function setPause(bool _pause) external onlyOwner {
        pause = _pause;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256
    ) internal view override {
        require(!pause, "paused!");
        require(!blackList[from], "from is baned!");
        require(!blackList[to], "to is baned!");
    }
}
