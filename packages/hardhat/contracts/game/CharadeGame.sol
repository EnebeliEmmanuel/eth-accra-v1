//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
error CharadeGame__NotAuthorized();
error CharadeGame__NotPlayerOfActiveTeam();
error CharadeGame__WordAlreadyChecked();
error CharadeGame__CardAlreadyUsed();
error CharadeGame__CardNotUsedYet();
error CharadeGame__WordAlreadyRevealed();
error CharadeGame__NotActiveTeam();
error CharadeGame__TeamDoesNotExist();
error CharadeGame__YouHaveAlreadyPlayed();
error CharadeGame__GameHasNotStarted();
contract CharadeGame {
	struct Team {
		string name;
		address[] members;
		uint256 score;
	}

	struct Card {
		string encryptedWord; // Store the encrypted word
		string word; // Store the plaintext word after it's used
		bool isUsed;
		uint256 teamId;
		address player;
	}

	Team[] public teams;
	Card[] public cards;
	mapping(uint256 => mapping(address => bool)) public activeTeamPlayer;
	uint256 public totalTeams;

	address public admin;
	uint256 public currentTeam;
	uint256 public currentRound;
	bool public isGameStarted;
	mapping(address => bool) public hasCheckedWord;
	mapping(uint256 => uint256) public wordCheckTime; // Tracks the timestamp when the word was checked

	uint256 public immutable TIME_LIMIT; // Time limit for updating the score
	uint256 public immutable SCORE_POINT; // Points for each correct guess
	event RoundStarted(uint256 indexed round, uint256 team);
	event WordChecked(
		uint256 team,
		address indexed player,
		string encryptedWord
	);
	event ScoreUpdated(uint256 team, uint256 score, string word);
	event PlayerJoinedTeam(uint256 team, address indexed player);
	event GameStarted();
	event CardAdded();
	constructor(address _admin, uint256 _timeLimit, uint256 _scorePoint) {
		admin = _admin;
		TIME_LIMIT = _timeLimit;
		SCORE_POINT = _scorePoint;
	}

	modifier onlyAdmin() {
		if (msg.sender != admin) {
			revert CharadeGame__NotAuthorized();
		}
		_;
	}

	modifier onlyActivePlayer() {
		if (activeTeamPlayer[currentTeam][msg.sender] == false) {
			revert CharadeGame__NotPlayerOfActiveTeam();
		}
		_;
	}
	//check if a team exist or not
	modifier teamExist(uint256 teamId) {
		if (teamId >= totalTeams) {
			revert CharadeGame__TeamDoesNotExist();
		}
		_;
	}
	//check if game is started or not
	modifier hasGmeStarted() {
		if (!isGameStarted) {
			revert CharadeGame__GameHasNotStarted();
		}
		_;
	}

	function addTeam(
		string memory name,
		address[] memory members
	) public onlyAdmin {
		teams.push(Team(name, members, 0));
		for (uint256 i = 0; i < members.length; i++) {
			activeTeamPlayer[totalTeams][members[i]] = true;
		}
		totalTeams++;
	}

	function addCard(string[] memory encryptedCardWords) public onlyAdmin {
		for (uint256 i = 0; i < encryptedCardWords.length; i++) {
			cards.push(Card(encryptedCardWords[i], "", false, 0, address(0)));
		}
		emit CardAdded();
	}

	function joinTeam(uint256 teamId) public {
		// if the team does not exist
		//cannot join anyother team if you are already in a team
		for (uint256 i = 0; i < totalTeams; i++) {
			if (activeTeamPlayer[i][msg.sender]) {
				revert CharadeGame__NotPlayerOfActiveTeam();
			}
		}
		activeTeamPlayer[teamId][msg.sender] = true;
		//update the team members
		teams[teamId].members.push(msg.sender);
		emit PlayerJoinedTeam(teamId, msg.sender);
	}
	function stateGame() public onlyAdmin {
		isGameStarted = true;
		nextTeamTurn(currentTeam);
		emit GameStarted();
	}

	function nextTeamTurn(uint256 teamId) public onlyAdmin teamExist(teamId) {
		currentTeam = teamId;
		currentRound++;
		emit RoundStarted(currentRound, currentTeam);
	}

	function checkWord(
		uint256 cardId
	) public hasGmeStarted onlyActivePlayer returns (string memory) {
		if (hasCheckedWord[msg.sender]) {
			revert CharadeGame__YouHaveAlreadyPlayed();
		}
		Card storage card = cards[cardId];
		if (card.isUsed) {
			revert CharadeGame__CardAlreadyUsed();
		}

		// Mark the card as used and the player as having checked the word
		card.isUsed = true;
		card.player = msg.sender;
		card.teamId = currentTeam;
		hasCheckedWord[msg.sender] = true;
		wordCheckTime[currentTeam] = block.timestamp; // Record the time when the word was checked

		// Emit the event with the decrypted word for off-chain handling
		emit WordChecked(currentTeam, msg.sender, card.encryptedWord);
		return cards[cardId].encryptedWord;
	}

	function _revealWord(uint256 cardId, string memory word) private onlyAdmin {
		if (!cards[cardId].isUsed) {
			revert CharadeGame__CardNotUsedYet();
		}
		if (bytes(cards[cardId].word).length != 0) {
			revert CharadeGame__WordAlreadyRevealed();
		}

		// Store the revealed word on-chain
		cards[cardId].word = word;
	}

	function updateScore(
		uint256 teamId,
		uint256 cardId,
		string memory guessedWord
	) public onlyAdmin teamExist(teamId) {
		if (teamId != currentTeam) {
			revert CharadeGame__NotActiveTeam();
		}

		// Check if the time limit has passed
		uint256 timeElapsed = block.timestamp - wordCheckTime[teamId];
		_revealWord(cardId, guessedWord);
		if (timeElapsed <= TIME_LIMIT) {
			teams[teamId].score += SCORE_POINT;
		}
		//update time
		wordCheckTime[teamId] = 0;
		emit ScoreUpdated(teamId, teams[teamId].score, guessedWord);
	}
	//this will be use to show all the cards, as soon as someone checks the card, it will be flip and when the word is set , everyone will see it
	function getAllCards() public view returns (Card[] memory) {
		return cards;
	}

	function getAllTeams() public view returns (Team[] memory) {
		return teams;
	}
}
