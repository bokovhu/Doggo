#!/bin/bash

alias doggo="npm run cli:doggo -- --"

# I use `screenmagic` to emulate something like `tmux` for the demo, I need help in concretizing these to actually work

# Alice claim's ownership of the contract, and configures the game parameters

doggo --suri //Alice claim-ownership
doggo --suri //Alice set-membership-price --membership-price 15
doggo --suri //Alice set-card-minting-price --card-minting-price 5

# Bob comes around, and joins the game

doggo --suri //Bob become-member --value 15

# Bob decides to mint 100 cards (paying ~500 UNITs in total)

for i in {1..15}; do
  doggo --suri //Bob mint-card --value 5
done

# Charlie becomes a member, and mints cards

doggo --suri //Charlie become-member --value 15

for i in {1..15}; do
  doggo --suri //Charlie mint-card --value 5
done

echo "*** DONE ***"
