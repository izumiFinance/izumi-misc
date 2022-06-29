// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import "../multicall.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Champion is Ownable, Multicall, ReentrancyGuard {
    using SafeERC20 for IERC20;

    mapping(address => mapping(address => uint)) public amountMap;
    mapping(address => address) public tokenProviders;
    
    event _claim(address token, uint amount, address account);

    function setUserBalance(address[] memory account, address[] memory token, uint[] memory amount) public onlyOwner{
        require((account.length == token.length) && (token.length == amount.length), "PARAMS_LENGTH_NOT_MATCH");
        for(uint256 i = 0; i < amount.length; i++) {
            require(account[i] != address(0), "ACCOUNT_INVALID");
            require(token[i] != address(0), "TOKEN_INVALID");
            amountMap[account[i]][token[i]] = amount[i];
        }
    }

    function modityUserBalance(address[] memory account, address[] memory token, uint[] memory amount, bool[] memory isAdd) public onlyOwner{
        require((account.length == token.length) && (token.length == amount.length) && (amount.length == isAdd.length), "PARAMS_LENGTH_NOT_MATCH");
        for(uint256 i = 0; i < amount.length; i++) {
            require(account[i] != address(0), "ACCOUNT_INVALID");
            require(token[i] != address(0), "TOKEN_INVALID");
            if(isAdd[i]){
                uint _amount = amountMap[account[i]][token[i]];
                _amount = _amount + amount[i];
                amountMap[account[i]][token[i]] = _amount;
            }else{
                uint _amount = amountMap[account[i]][token[i]];
                _amount = _amount > amount[i] ? (_amount - amount[i]) : 0;
                amountMap[account[i]][token[i]] = _amount;
            }
            
        }
    }

    function setProvider(address token, address provider) public onlyOwner {
        tokenProviders[token] = provider;
    }

    function claim(address token, uint maxAmount) public nonReentrant{
        address provider = tokenProviders[token];
        require(provider != address(0), "No Provider");
        uint _amount = amountMap[msg.sender][token];
        uint amount = maxAmount < _amount ? maxAmount : _amount;
        IERC20(token).safeTransferFrom(provider, msg.sender, amount);
        _amount = _amount - amount;
        amountMap[msg.sender][token] = _amount;
        emit _claim(token, amount, msg.sender);
    }

    function balance(address account, address token) public view returns(uint) {
        require(account != address(0), "ACCOUNT_INVALID");
        require(token != address(0), "TOKEN_INVALID");
        uint amount = amountMap[account][token];
        return amount;
    }
    
}