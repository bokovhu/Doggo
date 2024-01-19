# Milestone 1

:::info
This document records our progress of the first planned milestone of the Doggo project. It acts as a journal of our work, and shows the current state of the project on `2024.01.17`.
:::

## Planning

:::warning
Milestones for Doggo were not planned ahead of time, so this document contains this section for all milestones.
:::

* A mobile-focused web-based game
* Blockchain records NFTs, which are playable cards in the game
* Players build a deck by:
    * _Trading_ with other players,
    * _Minting_ for the native token,
    * Winning a _match_ against another player
* Each match is a _simulated battle_ between a selected _army_ of the players:
    * When _challenging a player_, you must _select yout bet_, and select _what you want from the opponent_ if you win. Your opponent then has the option to _accept or decline_ the challenge; they might optionally send a _new challenge_ with different terms.
    * The _first phase_ of the game is the _army assembly stage_; players have _60 seconds_ to select the _10 cards_ from the deck they want to play, and set up the AI of their army.
    * The _second phase_ of the game is the _battle stage_; a simulated battle begins, and each card summons a _squad of units_ to fight for the player. Each individual unit is _controlled by machine-learning based AI_, and the units fight until last blood, or until the _time limit_ of _5 minutes_ is reached (at which point the player with the most units wins).
* Players must _train the AI_ on their _own devices_.

_🪧 Milestone 1_

:::warning
This list must be rewritten.
:::

* Architecture assembled
* PWA manifest
* Basic UI with the following options:
    * _Challenge player_
    * _(N) challenges_ (only appears if there are challenges)
    * _Deck_
    * _Mint_
    * _Trade_
    * _AI Training_
* Package structure
    * `@doggo/model` - Contains interfaces and types for the domain of the game (such as `Card`, `Player`, etc.)
    * `@doggo/web` - The web application package, which is the game itself
    * `@doggo/contracts` - The smart contracts package, which contains the smart contracts for the game **NOT IMPLEMENTED**
    * `@doggo/docs` - The documentation package, which contains the documentation for the game
    * `@doggo/events` - Events package for decoupling different actors of the game
    * `@doggo/ecs` - The Entity-Component-System package, which contains the ECS types and interfaces
    * `@doggo/base-game` - Abstract game class for init & THREE.js setup & ECS impl
    * `@doggo/ai` - The AI package, which contains AI-stuff (running & training code)
    * `@doggo/airplane` - The airplane package, which contains the airplane game object
    * `@doggo/asteroid` - The asteroid package, which contains the asteroid game object
    * `@doggo/arena` - The arena package, which contains the arena game object
    * `@doggo/battle` - Battle simulation game logic (THREE.js) **NOT IMPLEMENTED**
    * `@doggo/training` - Training game logic (THREE.js)
    * `@doggo/app` - The `<App />` component of the application
    * `@doggo/app-training` - The `<Training />` page of the application
    * `@doggo/app-battle` - The `<Battle />` page of the application **NOT IMPLEMENTED**
    * `@doggo/app-deck` - The `<Deck />` page of the application **NOT IMPLEMENTED**
    * `@doggo/app-mint` - The `<Mint />` page of the application **NOT IMPLEMENTED**
    * `@doggo/app-trade` - The `<Trade />` page of the application **NOT IMPLEMENTED**
    * `@doggo/app-challenge` - The `<Challenge />` page of the application **NOT IMPLEMENTED**
    * `@doggo/app-challenge-list` - The `<ChallengeList />` page of the application **NOT IMPLEMENTED**

_🪧 Milestone 2_

* Smart Contract
    * Card NFT, deck building
    * Minting
    * Trading cards
    * Challenge system
    * Battle results
* Package implementation
    * `@doggo/battle` - Battle simulation game logic (THREE.js)
    * `@doggo/app-battle` - The `<Battle />` page of the application **POC IMPLEMENTED**

_🪧 Milestone 3_

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

### `@doggo/model`

It contains the interfaces and types for the domain of the game, namely:

* `Army`
* `Squad`
* `Card`
* `Deck`
* `PlayerProfile`
* `PlayerInBattle`
* `AirplaneKind`
* `Challenge`

### `@doggo/web`

It contains the web application package, which is the game itself. It is a PWA, and it is built with React.

### `@doggo/app`

It contains the `<App />` component of the application, which is the _first page_ of the application (main menu).

### `@doggo/events`

Contains the _event system_ for the game. It defines the `EventPublisher` interface for publishing events from game logic. It defines the `EventSubscriber` interface for subscribing to events from game logic.

The package also defines all events that can be emitted from game logic:

* `PlayerJoined` - emitted for each player at the beginning of the game
* `CardPlayed` - played at the beginning of the game when a card is played at
* `SquadSpawned` - played from the squads that are spawned from cards
* `UnitSpawned` - played from the units that are spawned from squads
* `UnitHit` - emitted, when a plane hits another plane
* `UnitKilled` - emitted, when a plane is killed
* `UnitAlive` - emitted regularly, when a plane is alive

### `@doggo/ecs`

It contains the _Entity-Component-System_ implementation for the game. It defines the `Entity` class, which is a universal game object. Entities contain _components_, which are _data_ that is attached to the entity. Component data can be _read_ and _written_ by the _systems_ of the game, which contain the _game logic_.

Key points of this ECS implementation:

* Accessing components of entities should be fast
* Finding entities with given type of components should be fast
* Implement _prefab system_ for creating entities from prefabs
* Hierarchical entities?
* Integrate well with scene management
* Integrate well with resource management

### `@doggo/airplane`

This package contains the `AirplaneSystem` class. It is responsible for _simulating the physics and controls_ of airplanes in the game.

Each airplane is characterized in the simulation by the `AirplaneState` interface:

```ts
interface AirplaneState {
    /** The position of the airplane in the world */
    position: THREE.Vector3;
    /** The rotation of the airplane in the world */
    rotation: THREE.Quaternion;
    /** The velocity of the airplane in the world */
    velocity: Vector3;
    /** The angular velocity of the airplane in the world */
    angularVelocity: Vector3;
    /** The controls of the airplane */
    controls: AirplaneControls;
}
```

Airplanes are controlled using the following interface:

```ts
interface AirplaneControls {
    /** In range [-1; 1], how much to yaw the plane (Up-axis rotation) */
    yaw: number;
    /** In range [-1; 1], how much to pitch the plane (Right-axis rotation) */
    pitch: number;
    /** In range [-1; 1], how much to roll the plane (Forward-axis rotation) */
    roll: number;
}
```

### `@doggo/app-training`

It contains the `<Training />` page of the application, which is the _page on which the player can train their AI model using evolution._

### `@doggo/training`

It contains the `TrainingGame` class, which is the _main class for a web-based game_. The game logic is responsible for running the _training loop_ of the AI, and emitting new models, and training progress information during the training towards the owner code.

### `@doggo/ai`


