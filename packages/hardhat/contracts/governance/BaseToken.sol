// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract BaseToken is ERC20, ERC20Permit, ERC20Votes {
	constructor(
		uint256 initialSupply
	) ERC20("BaseToken", "BT") ERC20Permit("BaseToken") {
		_mint(msg.sender, initialSupply);
	}
	// The functions below are overrides required by Solidity.

	function _afterTokenTransfer(
		address from,
		address to,
		uint256 amount
	) internal override(ERC20, ERC20Votes) {
		super._afterTokenTransfer(from, to, amount);
	}

	function _mint(
		address to,
		uint256 amount
	) internal override(ERC20, ERC20Votes) {
		super._mint(to, amount);
	}

	function _burn(
		address account,
		uint256 amount
	) internal override(ERC20, ERC20Votes) {
		super._burn(account, amount);
	}
}
