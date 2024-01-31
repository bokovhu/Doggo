#!/bin/bash

pushd $PWD/../../

SESSION_NAME="root"
PANE_ALICE="root:0.0"
PANE_BOB="root:0.0"
PANE_CHARLIE="root:0.1"
PANE_BUILD="root:0.0"

typeout() {
    local pane=$1
    local text=$2
    local line_delay=$3
    local text_delay=0.015  # Delay between each character

    for (( i=0; i<${#text}; i++ )); do
        tmux send-keys -t $pane "${text:$i:1}" 1>/dev/null 2>/dev/null
        sleep $text_delay 1>/dev/null 2>/dev/null
    done

    tmux send-keys -t $pane Enter 1>/dev/null 2>/dev/null
    sleep $line_delay 1>/dev/null 2>/dev/null
}

paneltitle() {
    local pane=$1
    local title=$2

    tmux select-pane -t $pane 1>/dev/null 2>/dev/null
    tmux send-keys -t $pane "wintitle \"$title\"" 1>/dev/null 2>/dev/null
    tmux send-keys -t $pane Enter 1>/dev/null 2>/dev/null
}

# Kill the session if it exists
tmux kill-session -t root 1>/dev/null 2>/dev/null

# Start a new tmux session
tmux new-session -d -s root 1>/dev/null 2>/dev/null

# Configure tmux session
tmux setw -g pane-border-status top \; \
  setw -g pane-border-format " #{pane_title} " \; \
  set -g status-left "CTRL+HACK+ZK DEMO" \; \
  set -g status-right "Frank & Botond" \; \
  rename-window 'Demonstration'

# Attach to the session
tmux attach-session -t root &

demo0_build() {

sleep 1
paneltitle $PANE_BUILD "Build & deploy"
sleep 1
typeout $PANE_BUILD "npm run build:dev" 45
typeout $PANE_BUILD "npm run package" 25
typeout $PANE_BUILD "npm run install:linux" 3
typeout $PANE_BUILD "clear" 0.5

}

demo0_build

# Pane for Alice

demo1_alice() {

sleep 1
paneltitle $PANE_ALICE "Alice"
sleep 1
typeout $PANE_ALICE "doggo --suri //Alice claim-ownership" 1
typeout $PANE_ALICE "doggo --suri //Alice --result-only set-membership-price --membership-price 15" 1
typeout $PANE_ALICE "doggo --suri //Alice --result-only set-card-minting-price --card-minting-price 5" 1
sleep 5

}

demo1_alice

# Split, panes for Bob (0.0) & Charlie (0.1)

tmux split-window -h
tmux select-pane -t $PANE_CHARLIE

demo2_bob() {

paneltitle $PANE_BOB "Bob"
sleep 1
typeout $PANE_BOB "clear" 1
typeout $PANE_BOB "doggo --suri //Bob become-member --value 15" 1
for i in {1..15}; do
  typeout $PANE_BOB "doggo --suri //Bob --result-only mint-card --value 5" 1
done
typeout $PANE_BOB "clear" 5

}

demo2_charlie() {

sleep 1
paneltitle $PANE_CHARLIE "Charlie"
sleep 1
typeout $PANE_CHARLIE "doggo --suri //Charlie become-member --value 15" 1
for i in {1..15}; do
  typeout $PANE_CHARLIE "doggo --suri //Charlie --result-only mint-card --value 5" 1
done
typeout $PANE_CHARLIE "clear" 5

}


demo2_charlie & disown
demo2_bob

demo3_bob() {

sleep 1
typeout $PANE_BOB "doggo --suri //Bob --result-only get-cards-of-caller" 5
typeout $PANE_BOB "clear" 1
# typeout $PANE_CHARLIE "exit" 1

}

demo3_charlie() {

sleep 1
typeout $PANE_CHARLIE "doggo --suri //Charlie --result-only get-cards-of-caller" 5
typeout $PANE_CHARLIE "clear" 1
# typeout $PANE_CHARLIE "exit" 1

}

demo3_charlie & disown
demo3_bob

demo4_bob() {

sleep 1
typeout $PANE_BOB 'export bet_card_id=$(doggo --suri //Bob --result-json --result-only get-cards-of-caller | jq -r ".[5][0]")' 1
typeout $PANE_BOB 'export want_card_id=$(doggo --suri //Bob --result-json --result-only get-cards-of-owner --account-id 5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y | jq -r ".[5][0]")' 1
typeout $PANE_BOB 'echo "Bet on card: $bet_card_id"' 1
typeout $PANE_BOB 'echo "Want card: $want_card_id"' 1
typeout $PANE_BOB 'doggo --suri //Bob --result-only challenge --offered-cards $bet_card_id --wanted-cards $want_card_id --opponent-account-id 5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y --value 0' 20
typeout $PANE_BOB "clear" 1

}

demo4_charlie() {

sleep 18
typeout $PANE_CHARLIE 'doggo --suri //Charlie --result-only get-challenges-of-caller-as-opponent' 5
typeout $PANE_CHARLIE 'doggo --suri //Charlie --result-only accept-challenge --challenge-id 0 --value 0' 2
typeout $PANE_CHARLIE "clear" 1

}

demo4_charlie & disown
demo4_bob

demo5_bob() {

sleep 1
typeout $PANE_BOB 'export challenge_id=$(doggo --suri //Bob --result-json --result-only get-challenges-of-caller-as-challenger | jq -r ".[1][0]")' 2
typeout $PANE_BOB 'export first_6_cards=$(doggo --suri //Bob --result-json --result-only get-cards-of-caller | jq -r ".[5][0:6] | @csv")' 2
typeout $PANE_BOB 'echo "Challenge id: $challenge_id"' 1
typeout $PANE_BOB 'echo "First 6 cards: $first_6_cards"' 1
typeout $PANE_BOB 'doggo --suri //Bob --result-only submit-challenger-cards --challenge-id $challenge_id --cards $first_6_cards' 1
typeout $PANE_BOB "clear" 5
# typeout $PANE_BOB "exit" 1

}

demo5_charlie() {
  
sleep 1
typeout $PANE_CHARLIE 'export challenge_id=$(doggo --suri //Charlie --result-json --result-only get-challenges-of-caller-as-opponent | jq -r ".[1][0]")' 2
typeout $PANE_CHARLIE 'export first_6_cards=$(doggo --suri //Charlie --result-json --result-only get-cards-of-caller | jq -r ".[5][0:6] | @csv")' 2
typeout $PANE_CHARLIE 'echo "Challenge id: $challenge_id"' 1
typeout $PANE_CHARLIE 'echo "First 6 cards: $first_6_cards"' 1
typeout $PANE_CHARLIE 'doggo --suri //Charlie --result-only submit-opponent-cards --challenge-id $challenge_id --cards $first_6_cards' 1
typeout $PANE_CHARLIE "clear" 1
typeout $PANE_CHARLIE "exit" 1

}

demo5_charlie & disown
demo5_bob

demo6_alice() {

paneltitle $PANE_ALICE "Alice"
sleep 1
typeout $PANE_ALICE "clear" 1
typeout $PANE_BOB 'export want_card_id=$(doggo --suri //Bob --result-json --result-only get-cards-of-owner --account-id 5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y | jq -r ".[5][0]")' 1
typeout $PANE_ALICE "doggo --suri //Alice --result-only battle --challenge-id 0" 1
typeout $PANE_ALICE "doggo --suri //Alice --result-only record-game-winner --challenge-id 0 --winner-account-id 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty" 5
typeout $PANE_ALICE 'doggo --suri //Alice --result-only get-card-owner --card-id $want_card_id' 5
typeout $PANE_BOB "clear" 1
typeout $PANE_BOB "exit" 1

}

demo6_alice

pkill tmux
popd

echo "*** DONE ***"
