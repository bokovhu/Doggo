# Milestone 1

:::info
This document records our progress of the first planned milestone of the Doggo project. It acts as a journal of our work, and shows the current state of the project on `2024.01.17`.
:::

## Goals

:::info
The goals for the first milestone of the project can be summarized as follows.
:::

* ✅ Architecture assembled
* ❌ PWA manifest
* ✅ Basic UI with the following options:
    * _Challenge player_
    * _(N) challenges_ (only appears if there are challenges)
    * _Deck_
    * _Mint_
    * _Trade_
    * _AI Training_
* Package structure
    * `@doggo/model` - Contains interfaces and types for the domain of the game (such as `Card`, `Player`, etc.)
    * `@doggo/web` - The web application package, which is the game itself
    * `@doggo/contracts` - The smart contracts package, which contains the smart contracts for the game
    * `@doggo/docs` - The documentation package, which contains the documentation for the game
    * `@doggo/card-game` - The card game simulation, usable both in the browser and in the backend
    * `@doggo/game-arbiter-node` - A "node", that interacts with the smart contract to publish winners of games
    * `@doggo/app` - The `<App />` component of the application
    * `@doggo/app-battle` - The `<Battle />` page of the application
    * `@doggo/app-deck` - The `<Deck />` page of the application
    * `@doggo/app-mint` - The `<Mint />` page of the application
    * `@doggo/app-trade` - The `<Trade />` page of the application
    * `@doggo/app-challenge` - The `<Challenge />` page of the application
    * `@doggo/app-challenge-list` - The `<ChallengeList />` page of the application
* Smart Contract
    * Card NFT, deck building
    * Minting
    * Trading cards
    * Challenge system
    * Battle results

## Building

:::info
To build `Doggo`, you need to have a couple of build dependencies satisfied. We begin explanation of the build process by building a _new local development environment from scratch_ first. We do this in _WSL / Ubuntu_, using a fresh _rootfs installation_, but you should be able to do this in _any Linux distribution_.
:::

:::warning
This section needs to be completed:

* Same instructions as for `Deploy Cash`
* Add `python3` to `apt-get install` command
* Add `apt-get -y install python-is-python3`
* Add `apt-get -y install pkgconf`
* Add `apt-get -y install mesa-utils` (check if really needed)
* Add `apt-get -y install libx11-dev libxi-dev libxext-dev`
* Add `apt-get -y install libglx-dev`
* Add `apt-get -y install libgl-dev`
:::

:::::details Creating a new WSL distro for Doggo development
* We begin our journey by acquiring the latest Ubuntu rootfs `tar.gz` file. We use this one:

```
https://cloud-images.ubuntu.com/wsl/jammy/20240117/ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz
```
:::::

## Packages

:::info
In this section we give detailed information about the _design_ of all packages in the project.
:::

### `@doggo/card-game`

It contains the card game simulation, usable both in the browser and in the backend. Usage:

```ts
import * as cardgame from '@doggo/card-game'; // Import the package

// Generate cards from **card identifiers**
const cardId = 123;
const cardGenerator = new cardgame.CardGenerator();
const card = cardGenerator.generateCard(cardId);
// Format cards to human readable **descriptions**
const cardDescription = cardgame.formatCardDescription(card);
console.log(cardDescription); // Prints: SPAWN | Spawns **1** plane(s) of the **fighter** kind
// Simulate battles
const player1Cards = [123, 456, 789];
const player2Cards = [321, 654, 987];
const matchSeed = 0xDEADBEEF;
const gameSimulator = new cardgame.GameSimulator();
const simulationResult = gameSimulator.simulateMatch(player1Cards, player2Cards, matchSeed);
console.log(`Winner: ${simulationResult.winner}`); // Prints: Winner: 1
```

## Next 🪧 Milestone goals

* Nicey docs
* Package implementation
    * `@doggo/app-deck` - The `<Deck />` page of the application
    * `@doggo/app-mint` - The `<Mint />` page of the application
    * `@doggo/app-trade` - The `<Trade />` page of the application
    * `@doggo/app-challenge` - The `<Challenge />` page of the application
    * `@doggo/app-challenge-list` - The `<ChallengeList />` page of the application
    * `@doggo/app-battle` - The `<Battle />` page of the application
* Nicey UI
* YouTube Video
* Testing
