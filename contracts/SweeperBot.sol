// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SweeperBot {
    address public goxed;
    address public recovery;
    IERC20 public token;

    constructor(address _goxed, address _recovery, address _token) {
        goxed = _goxed;
        recovery = _recovery;
        token = IERC20(_token);
    }

    //set token
    function setToken(address _token) external {
        require(msg.sender == recovery, "SweeperBot: Not recovery");
        token = IERC20(_token);
    }

    function sweep() external {
        uint256 balance = token.balanceOf(goxed);
        require(balance > 0, "SweeperBot: No tokens to sweep");
        token.transferFrom(goxed, recovery, balance);
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        if (token.balanceOf(goxed) > 0) {
            canExec = true;
            execPayload = abi.encodeWithSignature("sweep()");
        } else {
            canExec = false;
            execPayload = "cannot sweep";
        }
    }
}
