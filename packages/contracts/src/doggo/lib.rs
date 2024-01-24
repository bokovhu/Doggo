#![cfg_attr(not(feature = "std"), no_std, no_main)]

pub mod contract;

#[ink::contract]
pub mod doggo {
    use crate::contract::Error;
    use crate::contract::IDoggoContract;

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
}
    // END Contract storage generated code

    impl DoggoContract {
        /// Creates a new contract for the Doggo game
        #[ink(constructor)]
        pub fn new() -> Self {
            // BEGIN Contract impl constructor generated code

let membership_status_init = ink::storage::Mapping::default();
let card_owner_mapping_init = ink::storage::Mapping::default();
let cards_of_owner_mapping_init = ink::storage::Mapping::default();

Self {
    owner_account_id: AccountId::from([0xFF as u8; 32]),
    owner_is_set: false,
    membership_price: 0,
    membership_status: membership_status_init,
    card_minting_price: 0,
    card_id_counter: 0,
    card_owner_mapping: card_owner_mapping_init,
    cards_of_owner_mapping: cards_of_owner_mapping_init,
}
    // END Contract impl constructor generated code
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

    }

}
