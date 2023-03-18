// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MoveETH {
    constructor(address sendToAddress) payable {
        address payable addr = payable(address(sendToAddress));
        selfdestruct(addr);
    }
}
