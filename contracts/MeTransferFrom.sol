pragma solidity ^0.4.0;

import "./ERC20Interface.sol";
import "./MeTakeAndGiveBack.sol";


contract MeTransferFrom {
    MeTakeAndGiveBack public meGiveBack;

    function MeTransferFrom() public {
        meGiveBack = new MeTakeAndGiveBack();
    }

    function takeMyTokensAndGiveBack(ERC20 token, uint amount) public {
        token.transferFrom(msg.sender, address(meGiveBack), amount);
        meGiveBack.giveBack(token, msg.sender, amount - 1);
    }

    function onlyTakeMyTokens(ERC20 token, uint amount) public {
        token.transferFrom(msg.sender, address(meGiveBack), amount);
    }

    function askGiveBack(ERC20 token, uint amount) public {
        meGiveBack.giveBack(token, msg.sender, amount - 1);
    }
}
