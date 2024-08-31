# Daomify

Welcome to the Project README! This repository includes two main components: a decentralized Game and a Decentralized Autonomous Organization (DAO). Both components are built on the Ethereum blockchain and utilize smart contracts for their core functionalities.

## Technologies Used

- **The Graph**: Used for indexing and querying blockchain data efficiently. The Subgraph allows you to fetch detailed game and DAO data easily. You can view the subgraph [here](https://api.studio.thegraph.com/query/87865/ethaccrav3/version/latest).
- **Scaffold-ETH**: A development framework used to bootstrap the Ethereum dApp quickly. It provides a pre-configured environment, making the development process faster and more efficient.
- **Optimism**: The Game is deployed on the Optimism network, a Layer 2 scaling solution for Ethereum that offers lower transaction costs and faster confirmations. Optimism was chosen for its scalability, making it ideal for frequent transactions. You can view a sample transaction on Optimism [here](https://sepolia-optimistic.etherscan.io/tx/0x2da6427f83a220b0c652c7009e17184f277b1bb46f58b4c31fcead1afa719e2d).

## Table of Contents

- [Game Documentation](#game-documentation)
  - [Overview](#overview)
  - [Architecture](#architecture)
  - [Smart Contracts](#smart-contracts)
  - [Subgraph](#subgraph)
  - [Setup Instructions](#setup-instructions)
  - [Game Mechanics](#game-mechanics)
  - [API Reference](#api-reference)
  - [Frontend](#frontend)
  - [Contributing](#contributing)
  - [License](#license)
- [DAO Documentation](#dao-documentation)
  - [Overview](#overview-1)
  - [Architecture](#architecture-1)
  - [Smart Contracts](#smart-contracts-1)
  - [Governance Process](#governance-process)
  - [Setup Instructions](#setup-instructions-1)
  - [Voting Mechanics](#voting-mechanics)
  - [API Reference](#api-reference-1)
  - [Frontend](#frontend-1)
  - [Contributing](#contributing-1)
  - [License](#license-1)

---

## Game Documentation

### Overview

The Game is a decentralized application (dApp) built on the Ethereum blockchain that allows players to form teams, participate in rounds, and compete by scoring points. The game logic is enforced through smart contracts, ensuring fairness and transparency. This document provides an overview of the architecture, setup instructions, and key features.

### Architecture

The Game consists of the following main components:

1. **Smart Contracts**: Deployed on the Ethereum blockchain to manage game logic, player accounts, and scoring.
2. **Subgraph**: Utilizes The Graph to index and query blockchain data related to the game. You can view the subgraph [here](https://api.studio.thegraph.com/query/87865/ethaccrav3/version/latest).
3. **Frontend**: A React-based interface that interacts with the smart contracts and displays game data to users. The frontend is built using [Scaffold-ETH](https://github.com/scaffold-eth/scaffold-eth), a development framework that provides a pre-configured environment for Ethereum dApps.

### Smart Contracts

- **Game.sol**: Manages the overall game, including teams, rounds, and scores.
- **Team.sol**: Handles team creation, management, and player assignments.
- **Player.sol**: Manages player participation, scores, and roles.

### Subgraph

The Subgraph is used to index data from the smart contracts, allowing for efficient queries of game-related information, such as player stats, team performance, and round outcomes. We use [The Graph](https://thegraph.com) to power these queries, providing a seamless and efficient way to access decentralized data.

### Deployment on Optimism

The Game is deployed on the Optimism network, a Layer 2 scaling solution for Ethereum that provides lower transaction costs and faster confirmations. Optimism is chosen for its scalability, making it ideal for a dApp with frequent transactions like this game. You can view a sample transaction on Optimism [here](https://sepolia-optimistic.etherscan.io/tx/0x2da6427f83a220b0c652c7009e17184f277b1bb46f58b4c31fcead1afa719e2d).

### Setup Instructions

#### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- Hardhat (for Ethereum development)
- Metamask (for interacting with the dApp)
- The Graph CLI (for deploying the Subgraph)

#### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/game-repo.git
   cd game-repo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Compile the smart contracts**:

   ```bash
   npx hardhat compile
   ```

4. **Deploy the contracts (local network)**:

   ```bash
   npx hardhat node
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Start the development server**:
   ```bash
   npm start
   ```

#### Running Tests

To run the test suite, use the following command:

```bash
npx hardhat test
```

### Game Mechanics

#### Teams

Players can form teams, which are essential for participating in rounds. Each team has a unique name, members, and a score.

#### Rounds

Rounds are the primary units of gameplay. During each round, teams compete to score points by completing various challenges.

#### Scoring

Points are awarded based on performance in rounds. The team with the highest score at the end of the game wins.

### API Reference

#### Smart Contract Functions

- **createTeam(name: string): void**

  - Creates a new team with the specified name.

- **joinTeam(teamId: uint256): void**

  - Adds a player to the specified team.

- **startRound(): void**

  - Starts a new round.

- **submitScore(teamId: uint256, score: uint256): void**
  - Submits a score for a team in the current round.

### Frontend

The frontend of the game is built using React and interacts with the smart contracts via web3.js or ethers.js. It provides a user-friendly interface for creating teams, starting rounds, and viewing scores. Scaffold-ETH was used to quickly bootstrap the development process, providing a robust environment for building Ethereum dApps.

### Contributing

We welcome contributions! Please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## DAO Documentation

### Overview

This DAO (Decentralized Autonomous Organization) provides a governance framework where token holders can propose, discuss, and vote on changes to the project. The DAO is fully decentralized and operates on the Ethereum blockchain, ensuring transparency and security.

### Architecture

The DAO consists of several key components:

1. **Governance Smart Contracts**: Manage proposal creation, voting, and execution.
2. **Token Contract**: ERC20 token used for voting and governance participation.
3. **Timelock Contract**: Ensures that proposals are executed after a delay, allowing for community review.
4. **Subgraph**: Indexes and queries governance data, including proposals, votes, and execution.

### Smart Contracts

- **Governance.sol**: Core contract that manages proposals, voting, and execution.
- **Token.sol**: ERC20 token contract that is used for voting.
- **Timelock.sol**: Ensures a delay before the execution of approved proposals, allowing for review and potential cancellation.

### Governance Process

1. **Proposal Creation**: Any token holder can create a proposal if they hold the minimum required tokens.
2. **Discussion Period**: The community discusses the proposal and its potential impact.
3. **Voting Period**: Token holders vote on the proposal within a specified time frame.
4. **Execution**: If the proposal passes, it is queued in the Timelock contract and executed after a delay.

### Setup Instructions

#### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- Hardhat (for Ethereum development)
- Metamask (for interacting with the dApp)
- The Graph CLI (for deploying the Subgraph)

#### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/dao-repo.git
   cd dao-repo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Compile the smart contracts**:

   ```bash
   npx hardhat compile
   ```

4. **Deploy the contracts (local network)**:

   ```bash
   npx hardhat node
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Start the development server**:
   ```bash
   npm start
   ```

#### Running Tests

To run the test suite, use the following command:

```bash
npx hardhat test
```

### Voting Mechanics

- **Quorum**: The minimum number of votes required for a proposal to be considered valid.
- **Threshold**: The minimum percentage of "yes" votes required for a proposal to pass.
- **Voting Power**: Determined by the number of tokens a user holds.

### API Reference

#### Smart Contract Functions

- **createProposal(description: string, actions: Action[]): uint256**

  - Creates a new proposal with the specified description and actions.

- **castVote(proposalId: uint256, support: boolean): void**

  - Casts a vote on a proposal.

- **queueProposal(proposalId: uint256): void**

  - Queues a proposal in the Timelock contract for execution.

- **executeProposal(proposalId: uint256): void**
  - Executes an approved proposal after the timelock delay.

### Frontend

The frontend for the DAO is built using React and allows users to create proposals, vote on existing proposals, and view the current status of proposals. It interacts with the governance contracts via web3.js or ethers.js. Scaffold-ETH was chosen for its ease of use in rapidly developing Ethereum dApps, providing pre-configured tools and examples that are essential for a smooth development experience.

### Contributing

We welcome contributions! Please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
