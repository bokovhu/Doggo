#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod doggo {

    // BEGIN Errors generated code
// Custom error types
#[derive(scale::Encode, scale::Decode, Debug, PartialEq, Eq, Copy, Clone)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    /// Emitted for development purposes
    DevelopmentError,

    /// Emitted, when no other error fits
    Unspecified,

    /// Not enough native tokens were sent in the transaction
    NotEnoughBalance,
    /// The card ID is invalid
    InvalidCardId,
    /// The sender is not the owner of the card
    NotTheCardOwner,
    /// The sender is not a member
    NotAMember,
    /// The owner is already set
    OwnerIsAlreadySet,
    /// The sender is not the owner
    NotTheOwner,
    /// The challenge ID is invalid
    InvalidChallengeId,
    /// The sender is not the challenger
    NotTheChallenger,
    /// The sender is not the opponent
    NotTheOpponent,
    /// The challenge status is bad
    BadChallengeStatus,
    /// The battle submission expired
    BattleSubmissionExpired,
    /// The challenge expired
    ChallengeExpired,
}  // END Errors generated code

    // BEGIN Contract storage generated code

#[ink(storage)]
pub struct DoggoContract {
    /// The account ID of the owner of this smart contract
    owner_account_id: AccountId,
    /// Whether the owner of this smart contract is set
    owner_is_set: bool,
    /// The price of membership
    membership_price: Balance,
    /// The membership status of an account
    membership_status: ink::storage::Mapping<AccountId, u32>,
    /// The price of minting a card
    card_minting_price: Balance,
    /// The counter for card IDs
    card_id_counter: u32,
    /// The mapping from card IDs to account IDs
    card_owner_mapping: ink::storage::Mapping<u32, AccountId>,
    /// The mapping from account IDs to card IDs
    cards_of_owner_mapping: ink::storage::Mapping<AccountId, ink::prelude::vec::Vec<u32>>,
    /// The mapping from challenge IDs to statuses
    challenge_statuses: ink::storage::Mapping<u32, u32>,
    /// The mapping from challenge IDs to timestamps of the last challenge submissions
    challenge_submission_timestamps: ink::storage::Mapping<u32, u64>,
    /// The mapping from challenge IDs to timestamps of the challenge accept deadlines
    challenge_accept_deadline_timestamps: ink::storage::Mapping<u32, u64>,
    /// The mapping from challenge IDs to timestamps of the challenge battle submission deadlines
    challenge_battle_deadline_timestamps: ink::storage::Mapping<u32, u64>,
    /// The mapping from challenge IDs to account IDs of the challengers
    challenge_challenger_account_ids: ink::storage::Mapping<u32, AccountId>,
    /// The mapping from challenge IDs to account IDs of the opponents
    challenge_opponent_account_ids: ink::storage::Mapping<u32, AccountId>,
    /// The mapping from challenge IDs to bet pot tokens
    challenge_bet_pot_tokens: ink::storage::Mapping<u32, Balance>,
    /// The mapping from challenge IDs to wanted pot tokens
    challenge_wanted_pot_tokens: ink::storage::Mapping<u32, Balance>,
    /// The mapping from challenge IDs to offered cards
    challenge_offered_cards: ink::storage::Mapping<u32, ink::prelude::vec::Vec<u32>>,
    /// The mapping from challenge IDs to wanted cards
    challenge_wanted_cards: ink::storage::Mapping<u32, ink::prelude::vec::Vec<u32>>,
    /// The mapping from challenge IDs to challenger cards in battle
    challenge_challenger_cards: ink::storage::Mapping<u32, ink::prelude::vec::Vec<u32>>,
    /// The mapping from challenge IDs to opponent cards in battle
    challenge_opponent_cards: ink::storage::Mapping<u32, ink::prelude::vec::Vec<u32>>,
    /// The mapping from challenge IDs to account IDs of the winners
    challenge_winner_account_ids: ink::storage::Mapping<u32, AccountId>,
    /// The mapping from account IDs to challenge IDs of challenges where the account is the challenger
    members_as_challengers_to_challenges: ink::storage::Mapping<AccountId, ink::prelude::vec::Vec<u32>>,
    /// The mapping from account IDs to challenge IDs of challenges where the account is the opponent
    members_as_opponents_to_challenges: ink::storage::Mapping<AccountId, ink::prelude::vec::Vec<u32>>,
    /// The counter for challenge IDs
    challenge_id_counter: u32,
}

// The contract implements the following messages:
// #[ink(message)]
// pub fn hello_world(&mut self) -> Result<u32, Error>
// #[ink(message)]
// pub fn hello_world_error(&mut self) -> Result<u32, Error>
// #[ink(message)]
// pub fn get_owner(&mut self) -> Result<AccountId, Error>
// #[ink(message)]
// pub fn claim_ownership(&mut self) -> Result<(), Error>
// #[ink(message)]
// pub fn get_card_minting_price(&mut self) -> Result<Balance, Error>
// #[ink(message)]
// pub fn set_card_minting_price(&mut self, card_minting_price: Balance) -> Result<(), Error>
// #[ink(message)]
// pub fn get_membership_price(&mut self) -> Result<Balance, Error>
// #[ink(message)]
// pub fn set_membership_price(&mut self, membership_price: Balance) -> Result<(), Error>
// #[ink(message, payable)]
// pub fn mint_card(&mut self) -> Result<(), Error>
// #[ink(message)]
// pub fn get_card_owner(&mut self, card_id: u32) -> Result<AccountId, Error>
// #[ink(message)]
// pub fn get_cards_of_owner(&mut self, account_id: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn transfer_card(&mut self, card_id: u32, new_owner_account_id: AccountId) -> Result<(), Error>
// #[ink(message)]
// pub fn get_membership_status(&mut self, account_id: AccountId) -> Result<u32, Error>
// #[ink(message, payable)]
// pub fn become_member(&mut self) -> Result<(), Error>
// #[ink(message)]
// pub fn ban_member(&mut self, account_id: AccountId) -> Result<(), Error>
// #[ink(message)]
// pub fn unban_member(&mut self, account_id: AccountId) -> Result<(), Error>
// #[ink(message, payable)]
// pub fn challenge(&mut self, opponent_account_id: AccountId, offered_cards: ink::prelude::vec::Vec<u32>, wanted_cards: ink::prelude::vec::Vec<u32>, wanted_pot_tokens: Balance) -> Result<(), Error>
// #[ink(message, payable)]
// pub fn accept_challenge(&mut self, challenge_id: u32) -> Result<(), Error>
// #[ink(message)]
// pub fn submit_challenger_cards(&mut self, challenge_id: u32, cards: ink::prelude::vec::Vec<u32>) -> Result<(), Error>
// #[ink(message)]
// pub fn submit_opponent_cards(&mut self, challenge_id: u32, cards: ink::prelude::vec::Vec<u32>) -> Result<(), Error>
// #[ink(message)]
// pub fn record_game_winner(&mut self, challenge_id: u32, winner_account_id: AccountId) -> Result<(), Error>
// #[ink(message)]
// pub fn get_challenge_status(&mut self, challenge_id: u32) -> Result<u32, Error>
// #[ink(message)]
// pub fn get_challenge_submission_timestamp(&mut self, challenge_id: u32) -> Result<u64, Error>
// #[ink(message)]
// pub fn get_challenge_accept_deadline_timestamp(&mut self, challenge_id: u32) -> Result<u64, Error>
// #[ink(message)]
// pub fn get_challenge_challenger_account_id(&mut self, challenge_id: u32) -> Result<AccountId, Error>
// #[ink(message)]
// pub fn get_challenge_opponent_account_id(&mut self, challenge_id: u32) -> Result<AccountId, Error>
// #[ink(message)]
// pub fn get_challenge_bet_pot_tokens(&mut self, challenge_id: u32) -> Result<Balance, Error>
// #[ink(message)]
// pub fn get_challenge_wanted_pot_tokens(&mut self, challenge_id: u32) -> Result<Balance, Error>
// #[ink(message)]
// pub fn get_challenge_offered_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_challenge_wanted_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_challenge_challenger_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_challenge_opponent_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_challenge_winner_account_id(&mut self, challenge_id: u32) -> Result<AccountId, Error>
// #[ink(message)]
// pub fn get_challenges_of_member_as_challenger(&mut self, account_id: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_challenges_of_member_as_opponent(&mut self, account_id: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_cards_of_caller(&mut self) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_challenges_of_caller_as_challenger(&mut self) -> Result<ink::prelude::vec::Vec<u32>, Error>
// #[ink(message)]
// pub fn get_challenges_of_caller_as_opponent(&mut self) -> Result<ink::prelude::vec::Vec<u32>, Error>
    // END Contract storage generated code

    impl DoggoContract {
        /// Creates a new contract for the Doggo game
        #[ink(constructor)]
        pub fn new() -> Self {
            // BEGIN Contract impl constructor generated code
let membership_status_init = ink::storage::Mapping::default();
let card_owner_mapping_init = ink::storage::Mapping::default();
let cards_of_owner_mapping_init = ink::storage::Mapping::default();
let challenge_statuses_init = ink::storage::Mapping::default();
let challenge_submission_timestamps_init = ink::storage::Mapping::default();
let challenge_accept_deadline_timestamps_init = ink::storage::Mapping::default();
let challenge_battle_deadline_timestamps_init = ink::storage::Mapping::default();
let challenge_challenger_account_ids_init = ink::storage::Mapping::default();
let challenge_opponent_account_ids_init = ink::storage::Mapping::default();
let challenge_bet_pot_tokens_init = ink::storage::Mapping::default();
let challenge_wanted_pot_tokens_init = ink::storage::Mapping::default();
let challenge_offered_cards_init = ink::storage::Mapping::default();
let challenge_wanted_cards_init = ink::storage::Mapping::default();
let challenge_challenger_cards_init = ink::storage::Mapping::default();
let challenge_opponent_cards_init = ink::storage::Mapping::default();
let challenge_winner_account_ids_init = ink::storage::Mapping::default();
let members_as_challengers_to_challenges_init = ink::storage::Mapping::default();
let members_as_opponents_to_challenges_init = ink::storage::Mapping::default();

Self {
    owner_account_id: AccountId::from([0xFF as u8; 32]),
    owner_is_set: false,
    membership_price: 0,
    membership_status: membership_status_init,
    card_minting_price: 0,
    card_id_counter: 0,
    card_owner_mapping: card_owner_mapping_init,
    cards_of_owner_mapping: cards_of_owner_mapping_init,
    challenge_statuses: challenge_statuses_init,
    challenge_submission_timestamps: challenge_submission_timestamps_init,
    challenge_accept_deadline_timestamps: challenge_accept_deadline_timestamps_init,
    challenge_battle_deadline_timestamps: challenge_battle_deadline_timestamps_init,
    challenge_challenger_account_ids: challenge_challenger_account_ids_init,
    challenge_opponent_account_ids: challenge_opponent_account_ids_init,
    challenge_bet_pot_tokens: challenge_bet_pot_tokens_init,
    challenge_wanted_pot_tokens: challenge_wanted_pot_tokens_init,
    challenge_offered_cards: challenge_offered_cards_init,
    challenge_wanted_cards: challenge_wanted_cards_init,
    challenge_challenger_cards: challenge_challenger_cards_init,
    challenge_opponent_cards: challenge_opponent_cards_init,
    challenge_winner_account_ids: challenge_winner_account_ids_init,
    members_as_challengers_to_challenges: members_as_challengers_to_challenges_init,
    members_as_opponents_to_challenges: members_as_opponents_to_challenges_init,
    challenge_id_counter: 0,
}    // END Contract impl constructor generated code
        }

        /// Returns the owner of the contract.
        #[ink(message)]
        pub fn get_owner(&self) -> Result<AccountId, Error> {
            Ok(self.owner_account_id)
        }

        /// Sets the owner of the contract.
        #[ink(message)]
        pub fn claim_ownership(&mut self) -> Result<(), Error> {
            if self.owner_is_set {
                return Err(Error::OwnerIsAlreadySet);
            }

            self.owner_account_id = self.env().caller();
            self.owner_is_set = true;

            Ok(())
        }

        /// Returns the price to mint a new card.
        #[ink(message)]
        pub fn get_card_minting_price(&self) -> Result<Balance, Error> {
            Ok(self.card_minting_price)
        }

        /// Sets the price to mint a new card.
        #[ink(message)]
        pub fn set_card_minting_price(&mut self, new_price: Balance) -> Result<(), Error> {
            if self.env().caller() != self.owner_account_id {
                return Err(Error::NotTheOwner);
            }

            self.card_minting_price = new_price;

            Ok(())
        }

        /// Returns the last valid card ID.
        #[ink(message)]
        pub fn get_card_id_counter(&self) -> Result<u32, Error> {
            Ok(self.card_id_counter - 1)
        }

        /// Mints a new card
        #[ink(message, payable)]
        pub fn mint_card(&mut self) -> Result<(), Error> {
            // Check if caller is a member
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }

            if self.env().transferred_value() < self.card_minting_price {
                return Err(Error::NotEnoughBalance);
            }

            let new_card_id = self.card_id_counter;
            self.card_id_counter += 1;
            self.card_owner_mapping.insert(new_card_id, &self.env().caller());

            // Add card ID to owner's card list
            let mut cards_of_owner = self.cards_of_owner_mapping.get(&self.env().caller()).unwrap_or(ink::prelude::vec::Vec::new());
            cards_of_owner.push(new_card_id);
            self.cards_of_owner_mapping.insert(self.env().caller(), &cards_of_owner);

            Ok(())
        }

        /// Returns the owner of a card
        #[ink(message)]
        pub fn get_card_owner(&self, card_id: u32) -> Result<AccountId, Error> {
            if card_id >= self.card_id_counter {
                return Err(Error::InvalidCardId);
            }

            Ok(self.card_owner_mapping.get(&card_id).unwrap())
        }

        /// Returns the list of cards owned by an account
        #[ink(message)]
        pub fn get_cards_of_owner(&self, account: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            Ok(self.cards_of_owner_mapping.get(&account).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        /// Transfers a card to a new owner
        #[ink(message)]
        pub fn transfer_card(&mut self, card_id: u32, new_owner: AccountId) -> Result<(), Error> {
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }

            if card_id >= self.card_id_counter {
                return Err(Error::InvalidCardId);
            }

            let card_owner = self.card_owner_mapping.get(&card_id).unwrap();
            if card_owner != self.env().caller() {
                return Err(Error::NotTheCardOwner);
            }

            self.card_owner_mapping.insert(card_id, &new_owner);

            // Remove card ID from old owner's card list
            let mut cards_of_old_owner = self.cards_of_owner_mapping.get(&card_owner).unwrap_or(ink::prelude::vec::Vec::new());
            let index = cards_of_old_owner.iter().position(|&r| r == card_id).unwrap();
            cards_of_old_owner.remove(index);

            // Add card ID to new owner's card list
            let mut cards_of_new_owner = self.cards_of_owner_mapping.get(&new_owner).unwrap_or(ink::prelude::vec::Vec::new());
            cards_of_new_owner.push(card_id);
            self.cards_of_owner_mapping.insert(new_owner, &cards_of_new_owner);

            Ok(())
        }

        /// Returns the membership price.
        #[ink(message)]
        pub fn get_membership_price(&self) -> Result<Balance, Error> {
            Ok(self.membership_price)
        }

        /// Sets the membership price.
        #[ink(message)]
        pub fn set_membership_price(&mut self, new_price: Balance) -> Result<(), Error> {
            if self.env().caller() != self.owner_account_id {
                return Err(Error::NotTheOwner);
            }

            self.membership_price = new_price;

            Ok(())
        }

        /// Returns the membership status of an account.
        #[ink(message)]
        pub fn get_membership_status(&self, account: AccountId) -> Result<u32, Error> {
            Ok(self.membership_status.get(&account).unwrap_or(0))
        }

        /// Become a member
        #[ink(message, payable)]
        pub fn become_member(&mut self) -> Result<(), Error> {
            if self.env().transferred_value() < self.membership_price {
                return Err(Error::NotEnoughBalance);
            }

            self.membership_status.insert(self.env().caller(), &1);

            Ok(())
        }

        /// Ban a member
        #[ink(message)]
        pub fn ban_member(&mut self, account: AccountId) -> Result<(), Error> {
            if self.env().caller() != self.owner_account_id {
                return Err(Error::NotTheOwner);
            }

            self.membership_status.insert(account, &0);

            Ok(())
        }

        /// Hello, world endpoint for development purposes
        #[ink(message)]
        pub fn hello_world(&self) -> Result<u32, Error> {
            Ok(42)
        }

        /// Hello, world error endpoint for development purposes
        #[ink(message)]
        pub fn hello_world_error(&self) -> Result<(), Error> {
            Err(Error::DevelopmentError)
        }

        // #[ink(message, payable)]
        // pub fn challenge(&mut self, opponent_account_id: AccountId, offered_cards: ink::prelude::vec::Vec<u32>, wanted_cards: ink::prelude::vec::Vec<u32>, wanted_pot_tokens: Balance) -> Result<(), Error>

        /// Challenge another player for battle
        #[ink(message, payable)]
        pub fn challenge (&mut self, opponent_account_id: AccountId, offered_cards: ink::prelude::vec::Vec<u32>, wanted_cards: ink::prelude::vec::Vec<u32>, wanted_pot_tokens: Balance) -> Result<(), Error> {
            // Check if caller is a member
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }

            // Check if opponent is a member
            if self.membership_status.get(&opponent_account_id).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }

            // Check if each card of offered_cards is owned by the caller
            for card_id in &offered_cards {
                if self.card_owner_mapping.get(card_id).unwrap() != self.env().caller() {
                    return Err(Error::NotTheCardOwner);
                }
            }

            // Check if each card of wanted_cards is owned by the opponent
            for card_id in &wanted_cards {
                if self.card_owner_mapping.get(card_id).unwrap() != opponent_account_id {
                    return Err(Error::NotTheCardOwner);
                }
            }

            // Insert challenge
            self.challenge_statuses.insert(self.challenge_id_counter, &0); // 0 = open, 1 = accepted, 2 = finished, 999 = cancelled
            self.challenge_submission_timestamps.insert(self.challenge_id_counter, &self.env().block_timestamp());
            self.challenge_accept_deadline_timestamps.insert(self.challenge_id_counter, &(self.env().block_timestamp() + 86400 * 1000));
            self.challenge_challenger_account_ids.insert(self.challenge_id_counter, &self.env().caller());
            self.challenge_opponent_account_ids.insert(self.challenge_id_counter, &opponent_account_id);
            self.challenge_bet_pot_tokens.insert(self.challenge_id_counter, &self.env().transferred_value());
            self.challenge_wanted_pot_tokens.insert(self.challenge_id_counter, &wanted_pot_tokens);
            self.challenge_offered_cards.insert(self.challenge_id_counter, &offered_cards);
            self.challenge_wanted_cards.insert(self.challenge_id_counter, &wanted_cards);

            // Add challenge ID to challenger's challenge list
            let mut challenges_of_challenger = self.members_as_challengers_to_challenges.get(&self.env().caller()).unwrap_or(ink::prelude::vec::Vec::new());
            challenges_of_challenger.push(self.challenge_id_counter);
            self.members_as_challengers_to_challenges.insert(self.env().caller(), &challenges_of_challenger);

            // Add challenge ID to opponent's challenge list
            let mut challenges_of_opponent = self.members_as_opponents_to_challenges.get(&opponent_account_id).unwrap_or(ink::prelude::vec::Vec::new());
            challenges_of_opponent.push(self.challenge_id_counter);
            self.members_as_opponents_to_challenges.insert(opponent_account_id, &challenges_of_opponent);

            self.challenge_id_counter += 1;

            Ok(())
        }

        // #[ink(message, payable)]
        // pub fn accept_challenge(&mut self, challenge_id: u32) -> Result<(), Error>

        /// Accept a challenge
        #[ink(message, payable)]
        pub fn accept_challenge(&mut self, challenge_id: u32) -> Result<(), Error> {
            // Check if caller is a member
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }

            // Check if challenge exists
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            // Check if caller is the opponent
            if self.challenge_opponent_account_ids.get(&challenge_id).unwrap() != self.env().caller() {
                return Err(Error::NotTheOpponent);
            }

            // Check deadline
            if self.env().block_timestamp() > self.challenge_accept_deadline_timestamps.get(&challenge_id).unwrap() {
                return Err(Error::ChallengeExpired);
            }

            // Check if there is a wanted pot
            if self.challenge_wanted_pot_tokens.get(&challenge_id).unwrap_or(0) != 0 {
                // Check if enough value was transferred
                if self.env().transferred_value() < self.challenge_wanted_pot_tokens.get(&challenge_id).unwrap() {
                    return Err(Error::NotEnoughBalance);
                }

                // Add to bet pot
                let currentPot = self.challenge_bet_pot_tokens.get(&challenge_id).unwrap();
                self.challenge_bet_pot_tokens.insert(challenge_id, &(currentPot + self.env().transferred_value()));
            }

            // Set status to 1 (accepted)
            self.challenge_statuses.insert(challenge_id, &1);

            // Set battle deadline to now + 8 hours
            self.challenge_battle_deadline_timestamps.insert(challenge_id, &(self.env().block_timestamp() + 28800 * 1000));

            Ok(())
        }

        // #[ink(message, payable)]
        // pub fn submit_challenger_cards(&mut self, challenge_id: u32, cards: ink::prelude::vec::Vec<u32>) -> Result<(), Error>

        /// Submit cards for battle (by the challenger)
        #[ink(message, payable)]
        pub fn submit_challenger_cards(&mut self, challenge_id: u32, cards: ink::prelude::vec::Vec<u32>) -> Result<(), Error> {
            // Check if caller is a member
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }

            // Check if challenge exists
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            // Check if caller is the challenger
            if self.challenge_challenger_account_ids.get(&challenge_id).unwrap() != self.env().caller() {
                return Err(Error::NotTheChallenger);
            }

            // Check if challenge is accepted
            if self.challenge_statuses.get(&challenge_id).unwrap() != 1 {
                return Err(Error::BadChallengeStatus);
            }

            // Check if time is before the battle submission deadline
            if self.env().block_timestamp() > self.challenge_battle_deadline_timestamps.get(&challenge_id).unwrap() {
                return Err(Error::BattleSubmissionExpired);
            }

            // Check if cards are valid
            for card_id in &cards {
                if self.card_owner_mapping.get(card_id).unwrap() != self.env().caller() {
                    return Err(Error::NotTheCardOwner);
                }
            }

            // Insert cards
            self.challenge_challenger_cards.insert(challenge_id, &cards);

            Ok(())
        }

        // #[ink(message, payable)]
        // pub fn submit_opponent_cards(&mut self, challenge_id: u32, cards: ink::prelude::vec::Vec<u32>) -> Result<(), Error>

        /// Submit cards for battle (by the opponent)
        #[ink(message, payable)]
        pub fn submit_opponent_cards(&mut self, challenge_id: u32, cards: ink::prelude::vec::Vec<u32>) -> Result<(), Error> {
            // Check if caller is a member
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }

            // Check if challenge exists
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            // Check if caller is the opponent
            if self.challenge_opponent_account_ids.get(&challenge_id).unwrap() != self.env().caller() {
                return Err(Error::NotTheOpponent);
            }

            // Check if challenge is accepted
            if self.challenge_statuses.get(&challenge_id).unwrap() != 1 {
                return Err(Error::BadChallengeStatus);
            }

            // Check if cards are valid
            for card_id in &cards {
                if self.card_owner_mapping.get(card_id).unwrap() != self.env().caller() {
                    return Err(Error::NotTheCardOwner);
                }
            }

            // Insert cards
            self.challenge_opponent_cards.insert(challenge_id, &cards);

            Ok(())
        }

        // #[ink(message)]
        // pub fn record_game_winner(&mut self, challenge_id: u32, winner_account_id: AccountId) -> Result<(), Error>

        /// Record the winner of a game
        #[ink(message)]
        pub fn record_game_winner(&mut self, challenge_id: u32, winner_account_id: AccountId) -> Result<(), Error> {
            // Check if caller is the owner
            if self.env().caller() != self.owner_account_id {
                return Err(Error::NotTheOwner);
            }

            // Check if challenge exists
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            // Check if challenge is accepted
            if self.challenge_statuses.get(&challenge_id).unwrap() != 1 {
                return Err(Error::BadChallengeStatus);
            }

            // Record winner
            self.challenge_winner_account_ids.insert(challenge_id, &winner_account_id);
            // Record status as finished (2)
            self.challenge_statuses.insert(challenge_id, &2);

            // Transfer pot to winner
            let pot = self.challenge_bet_pot_tokens.get(&challenge_id).unwrap_or(0);

            if pot > 0 {
                self.env().transfer(winner_account_id, pot).unwrap();
            }

            // Check if challenger is the winner
            if winner_account_id == self.challenge_challenger_account_ids.get(&challenge_id).unwrap() {
                // Transfer wanted cards to challenger
                let wanted_cards = self.challenge_wanted_cards.get(&challenge_id).unwrap();
                let new_owner = self.challenge_challenger_account_ids.get(&challenge_id).unwrap();
                let card_owner = self.challenge_opponent_account_ids.get(&challenge_id).unwrap();
                for card_id in wanted_cards {
                            
                    self.card_owner_mapping.insert(card_id, &new_owner);

                    // Remove card ID from old owner's card list
                    let mut cards_of_old_owner = self.cards_of_owner_mapping.get(&card_owner).unwrap_or(ink::prelude::vec::Vec::new());
                    let index = cards_of_old_owner.iter().position(|&r| r == card_id).unwrap();
                    cards_of_old_owner.remove(index);

                    // Add card ID to new owner's card list
                    let mut cards_of_new_owner = self.cards_of_owner_mapping.get(&new_owner).unwrap_or(ink::prelude::vec::Vec::new());
                    cards_of_new_owner.push(card_id);
                    self.cards_of_owner_mapping.insert(new_owner, &cards_of_new_owner);

                }
            }

            // Check if opponent is the winner
            if winner_account_id == self.challenge_opponent_account_ids.get(&challenge_id).unwrap() {
                // Transfer offered cards to opponent
                let offered_cards = self.challenge_offered_cards.get(&challenge_id).unwrap();
                let new_owner = self.challenge_opponent_account_ids.get(&challenge_id).unwrap();
                let card_owner = self.challenge_challenger_account_ids.get(&challenge_id).unwrap();
                for card_id in offered_cards {
                            
                    self.card_owner_mapping.insert(card_id, &new_owner);

                    // Remove card ID from old owner's card list
                    let mut cards_of_old_owner = self.cards_of_owner_mapping.get(&card_owner).unwrap_or(ink::prelude::vec::Vec::new());
                    let index = cards_of_old_owner.iter().position(|&r| r == card_id).unwrap();
                    cards_of_old_owner.remove(index);

                    // Add card ID to new owner's card list
                    let mut cards_of_new_owner = self.cards_of_owner_mapping.get(&new_owner).unwrap_or(ink::prelude::vec::Vec::new());
                    cards_of_new_owner.push(card_id);
                    self.cards_of_owner_mapping.insert(new_owner, &cards_of_new_owner);

                }
            }

            Ok(())
        }

        // #[ink(message)]
        // pub fn get_challenge_status(&mut self, challenge_id: u32) -> Result<u32, Error>

        /// Returns the status of a challenge
        #[ink(message)]
        pub fn get_challenge_status(&self, challenge_id: u32) -> Result<u32, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_statuses.get(&challenge_id).unwrap_or(0))
        }

        // #[ink(message)]
        // pub fn get_challenge_submission_timestamp(&mut self, challenge_id: u32) -> Result<u64, Error>

        /// Returns the timestamp of the last challenge submission
        #[ink(message)]
        pub fn get_challenge_submission_timestamp(&self, challenge_id: u32) -> Result<u64, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_submission_timestamps.get(&challenge_id).unwrap_or(0))
        }

        // #[ink(message)]
        // pub fn get_challenge_accept_deadline_timestamp(&mut self, challenge_id: u32) -> Result<u64, Error>

        /// Returns the timestamp of the challenge accept deadline
        #[ink(message)]
        pub fn get_challenge_accept_deadline_timestamp(&self, challenge_id: u32) -> Result<u64, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_accept_deadline_timestamps.get(&challenge_id).unwrap_or(0))
        }

        // #[ink(message)]
        // pub fn get_challenge_challenger_account_id(&mut self, challenge_id: u32) -> Result<AccountId, Error>

        /// Returns the account ID of the challenger
        #[ink(message)]
        pub fn get_challenge_challenger_account_id(&self, challenge_id: u32) -> Result<AccountId, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_challenger_account_ids.get(&challenge_id).unwrap_or(self.owner_account_id))
        }

        // #[ink(message)]
        // pub fn get_challenge_opponent_account_id(&mut self, challenge_id: u32) -> Result<AccountId, Error>

        /// Returns the account ID of the opponent
        #[ink(message)]
        pub fn get_challenge_opponent_account_id(&self, challenge_id: u32) -> Result<AccountId, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_opponent_account_ids.get(&challenge_id).unwrap_or(self.owner_account_id))
        }

        // #[ink(message)]
        // pub fn get_challenge_bet_pot_tokens(&mut self, challenge_id: u32) -> Result<Balance, Error>

        /// Returns the bet pot tokens of the challenge
        #[ink(message)]
        pub fn get_challenge_bet_pot_tokens(&self, challenge_id: u32) -> Result<Balance, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_bet_pot_tokens.get(&challenge_id).unwrap_or(0))
        }

        // #[ink(message)]
        // pub fn get_challenge_wanted_pot_tokens(&mut self, challenge_id: u32) -> Result<Balance, Error>

        /// Returns the wanted pot tokens of the challenge
        #[ink(message)]
        pub fn get_challenge_wanted_pot_tokens(&self, challenge_id: u32) -> Result<Balance, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }
            
            Ok(self.challenge_wanted_pot_tokens.get(&challenge_id).unwrap_or(0))
        }

        // #[ink(message)]
        // pub fn get_challenge_offered_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the offered cards of the challenge
        #[ink(message)]
        pub fn get_challenge_offered_cards(&self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_offered_cards.get(&challenge_id).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_challenge_wanted_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the wanted cards of the challenge
        #[ink(message)]
        pub fn get_challenge_wanted_cards(&self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            Ok(self.challenge_wanted_cards.get(&challenge_id).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_challenge_challenger_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the challenger's cards of the challenge
        #[ink(message)]
        pub fn get_challenge_challenger_cards(&self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            if self.challenge_statuses.get(&challenge_id).unwrap_or(0) == 0 {
                return Err(Error::BadChallengeStatus);
            }

            Ok(self.challenge_challenger_cards.get(&challenge_id).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_challenge_opponent_cards(&mut self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the opponent's cards of the challenge
        #[ink(message)]
        pub fn get_challenge_opponent_cards(&self, challenge_id: u32) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            if self.challenge_statuses.get(&challenge_id).unwrap_or(0) == 0 {
                return Err(Error::BadChallengeStatus);
            }

            Ok(self.challenge_opponent_cards.get(&challenge_id).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_challenge_winner_account_id(&mut self, challenge_id: u32) -> Result<AccountId, Error>

        /// Returns the account ID of the winner
        #[ink(message)]
        pub fn get_challenge_winner_account_id(&self, challenge_id: u32) -> Result<AccountId, Error> {
            if challenge_id >= self.challenge_id_counter {
                return Err(Error::InvalidChallengeId);
            }

            if self.challenge_statuses.get(&challenge_id).unwrap_or(0) != 2 {
                return Err(Error::BadChallengeStatus);
            }

            Ok(self.challenge_winner_account_ids.get(&challenge_id).unwrap_or(self.owner_account_id))
        }

        // #[ink(message)]
        // pub fn get_challenges_of_member_as_challenger(&mut self, account_id: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the list of challenges of a member as a challenger
        #[ink(message)]
        pub fn get_challenges_of_member_as_challenger(&self, account_id: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if self.membership_status.get(&account_id).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }
            Ok(self.members_as_challengers_to_challenges.get(&account_id).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_challenges_of_member_as_opponent(&mut self, account_id: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the list of challenges of a member as an opponent
        #[ink(message)]
        pub fn get_challenges_of_member_as_opponent(&self, account_id: AccountId) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if self.membership_status.get(&account_id).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }
            Ok(self.members_as_opponents_to_challenges.get(&account_id).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_cards_of_caller(&mut self) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the list of cards of the caller
        #[ink(message)]
        pub fn get_cards_of_caller(&self) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }
            Ok(self.cards_of_owner_mapping.get(&self.env().caller()).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_challenges_of_caller_as_challenger(&mut self) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the list of challenges of the caller as a challenger
        #[ink(message)]
        pub fn get_challenges_of_caller_as_challenger(&self) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }
            Ok(self.members_as_challengers_to_challenges.get(&self.env().caller()).unwrap_or(ink::prelude::vec::Vec::new()))
        }

        // #[ink(message)]
        // pub fn get_challenges_of_caller_as_opponent(&mut self) -> Result<ink::prelude::vec::Vec<u32>, Error>

        /// Returns the list of challenges of the caller as an opponent
        #[ink(message)]
        pub fn get_challenges_of_caller_as_opponent(&self) -> Result<ink::prelude::vec::Vec<u32>, Error> {
            if self.membership_status.get(&self.env().caller()).unwrap_or(0) != 1 {
                return Err(Error::NotAMember);
            }
            Ok(self.members_as_opponents_to_challenges.get(&self.env().caller()).unwrap_or(ink::prelude::vec::Vec::new()))
        }

    }

}
