pragma solidity 0.4.18;

import "./ERC20Interface.sol";


contract MeTakeAndGiveBack {
    function giveBack(ERC20 token, address transferAdd, uint amount) public {
        token.transfer(transferAdd, amount);
    }
}
