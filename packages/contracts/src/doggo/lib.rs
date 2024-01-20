#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod doggo {
    // Custom error types
    #[derive(scale::Encode, scale::Decode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        // Emitted, when no other error fits
        Unspecified,

        // Emitted, when the owner is already set
        OwnerIsAlreadySet,

        // Emitted, when the user should be an owner, but isn't
        NotTheOwner,

        // Emitted, when not enough native tokens were sent in the call
        NotEnoughBalance,

        // Emitted, when the card ID is invalid
        InvalidCardId,

        // Emitted, when the caller is not the owner of the card
        NotTheCardOwner,

        // Emitted, when the caller is not a member
        NotAMember,
    }

    #[ink(storage)]
    pub struct DoggoContract {
        // Variables for game ownership
        owner: AccountId, // Owner of the contract
        owner_set: bool, // Flag to check if owner has been set

        // Game membership
        membership_price: Balance, // Price to become a member
        membership_status: ink::storage::Mapping<AccountId, bool>, // Maps address to membership status

        // Variables for Game Card mechanisms
        card_minting_price: Balance, // Price to mint a new card
        card_id_counter: u32, // Counter to keep track of card IDs
        card_owner_mapping: ink::storage::Mapping<u32, AccountId>, // Maps card ID to owner address
        cards_of_owner_mapping: ink::storage::Mapping<AccountId, ink::prelude::vec::Vec<u32>>, // Maps owner address to card IDs

    }

    impl DoggoContract {
        /// Creates a new service contract.
        #[ink(constructor)]
        pub fn new() -> Self {
            let card_owner_mapping = ink::storage::Mapping::default();
            let membership_status = ink::storage::Mapping::default();
            let cards_of_owner_mapping = ink::storage::Mapping::default();

            Self {
                owner: AccountId::from([0xFF as u8; 32]),
                owner_set: false,

                membership_price: 0,
                membership_status: membership_status,

                card_minting_price: 0,
                card_id_counter: 0,
                card_owner_mapping: card_owner_mapping,
                cards_of_owner_mapping: cards_of_owner_mapping,
            }
        }

        /// Returns the owner of the contract.
        #[ink(message)]
        pub fn get_owner(&self) -> Result<AccountId, Error> {
            Ok(self.owner)
        }

        /// Sets the owner of the contract.
        #[ink(message)]
        pub fn claim_ownership(&mut self) -> Result<(), Error> {
            if self.owner_set {
                return Err(Error::OwnerIsAlreadySet);
            }

            self.owner = self.env().caller();
            self.owner_set = true;

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
            if self.env().caller() != self.owner {
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
            if !self.membership_status.get(&self.env().caller()).unwrap_or(false) {
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
            if self.env().caller() != self.owner {
                return Err(Error::NotTheOwner);
            }

            self.membership_price = new_price;

            Ok(())
        }

        /// Returns the membership status of an account.
        #[ink(message)]
        pub fn get_membership_status(&self, account: AccountId) -> Result<bool, Error> {
            Ok(self.membership_status.get(&account).unwrap_or(false))
        }

        /// Become a member
        #[ink(message, payable)]
        pub fn become_member(&mut self) -> Result<(), Error> {
            if self.env().transferred_value() < self.membership_price {
                return Err(Error::NotEnoughBalance);
            }

            self.membership_status.insert(self.env().caller(), &true);

            Ok(())
        }

        /// Ban a member
        #[ink(message)]
        pub fn ban_member(&mut self, account: AccountId) -> Result<(), Error> {
            if self.env().caller() != self.owner {
                return Err(Error::NotTheOwner);
            }

            self.membership_status.insert(account, &false);

            Ok(())
        }

    }
}
