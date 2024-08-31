//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CharadeGame.sol";

contract CharadeGameFactory {
	address[] public deployedGames;
	event GameDeployed(
		address gameAddress,
		address admin,
		uint256 timeLimit,
		uint256 scorePoint
	);

	function createGame(
		address _admin,
		uint256 _timeLimit,
		uint256 _scorePoint
	) external {
		CharadeGame newGame = new CharadeGame(_admin, _timeLimit, _scorePoint);
		deployedGames.push(address(newGame));
		emit GameDeployed(address(newGame), _admin, _timeLimit, _scorePoint);
	}

	function getDeployedGames() external view returns (address[] memory) {
		return deployedGames;
	}
}
