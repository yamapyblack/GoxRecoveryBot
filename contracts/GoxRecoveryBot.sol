// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GoxRecoveryBot {
    address public goxed;
    address public recovery;
    IERC20[] public tokens;

    constructor(address _goxed, address _recovery) {
        goxed = _goxed;
        recovery = _recovery;
    }

    function _onlyRecovery() internal view {
        require(msg.sender == recovery, "GoxRecoveryBot: Not recovery");
    }

    // onlyRecovery functions
    function pushToken(address _token) external {
        _onlyRecovery();
        tokens.push(IERC20(_token));
    }

    function popToken(address _token) external {
        _onlyRecovery();
        uint256 len = tokens.length;
        for (uint256 i = 0; i < len; i++) {
            if (address(tokens[i]) == _token) {
                tokens[i] = tokens[len - 1];
                tokens.pop();
                break;
            }
        }
    }

    function setGoxed(address _goxed) external {
        _onlyRecovery();
        goxed = _goxed;
    }

    function sweep() external {
        //check balance of tokens
        uint256 len = tokens.length;
        for (uint256 i = 0; i < len; i++) {
            IERC20 token = tokens[i];
            uint256 balance = token.balanceOf(goxed);
            if (balance > 0) {
                token.transferFrom(goxed, recovery, balance);
            }
        }
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        //check balance of tokens
        uint256 len = tokens.length;
        for (uint256 i = 0; i < len; i++) {
            IERC20 token = tokens[i];
            if (token.balanceOf(goxed) > 0) {
                canExec = true;
                execPayload = abi.encodeWithSignature("sweep()");
                return (canExec, execPayload);
            }
        }

        canExec = false;
        execPayload = "cannot sweep";
    }
}
