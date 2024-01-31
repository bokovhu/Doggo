<div align="center">
<img src="https://i.ibb.co/F6NMTSd/DALL-E-2024-01-11-17-03-47-A-playful-and-engaging-logo-for-a-simulation-game-application-named-Dogo.png" alt="logo" width="120" height="120" />
</div>

<h3 align="center">Doggo</h3>
  <p align="center">
  Aleph Hack
        <br />
    <a href="">Docs</a>
    .
    <a href="">Live</a>
    ·
    <a href="">Youtube</a>
    ·
    <a href="https://github.com/bokovhu/doggo">Code</a>
  </p>
</div>

### Screenshots

* The app supports `--help`, which makes it completely _self-documenting_

![This GIF shows the help option for various commands](cmd-help.gif)

* The Smart Contract stores ownership of cards, and one feature of the app is that it allows interacting with this contract

![This GIF shows how to get the owner account ID of a card](cmd-get-card-owner.gif)

![This GIF shows how to get all owned cards of an account](cmd-get-cards-of-owner.gif)

* The app also supports _minting_ new cards

![This GIF shows how to mint a new card](cmd-mint.gif)

* The app also supports _transferring_ (gifting) cards to other accounts

![This GIF shows how to transfer a card to another account](cmd-transfer-card.gif)

* The app supports the `--result-json` flag to output the result of a command in JSON format (which is useful for scripting)

![This GIF shows various use-cases of the JSON output](cmd-json.gif)

### Summary

Doggo is a dogfighting simulation card game, where cards are NFTs on the blockchain.

### Quickstart

First, refer to the [Assembling the development environment](./packages/docs/02-Main/01-DevEnv.md) guide to get all the tools you need to play with the project.

![](./quickstart.gif)

To build & test the app locally, you need to do a following:

* Open a **new terminal**, and run the following command in it before anything else to install NPM dependencies

```bash
npm install
```

* In the _same terminal_, run the following command in it to start the _Substrate Contract Node_ in the background

```bash
npm run dev:contract-node
```

* Open a **new terminal**, and run the following command in it to build the app, and deploy it to the _local development environment_

```bash
npm run build:dev
```

* Then, in the _building terminal_, you can run the following command to get the final _binaries_, and install them locally for testing

```bash
npm run package && npm run install:linux
```

* Finally, you can run the following command to start the app

```bash
# To claim ownership of the new contract with Alice
doggo --suri //Alice claim-ownership
```

## Team

| Name          | Discord   | Telegram   | E-mail                        |
| :------------ | :-------- | :--------- | :---------------------------- |
| Frank Dierolf | frankbevr | @frankbevr | `frank_dierolf@web.de`        |
| Botond Kovacs | -         | -          | `botondjanoskovacs@gmail.com` |
