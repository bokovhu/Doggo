#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod generated {
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
    }

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

    pub trait IDoggoContract {
        /// Returns 42, used for testing client-side of the Smart Contract
        fn hello_world(&self) -> Result<u32, Error>;
        /// Returns an error, used for testing client-side of the Smart Contract
        fn hello_world_error(&self) -> Result<u32, Error>;
    }

    pub fn init_default_doggo() -> DoggoContract {
        let membership_status_init = ink::storage::Mapping::default();
        let card_owner_mapping_init = ink::storage::Mapping::default();
        let cards_of_owner_mapping_init = ink::storage::Mapping::default();

        DoggoContract {
            owner_account_id: AccountId::from([0xFF as u8; 32]),
            owner_is_set: false,
            membership_price: 0,
            membership_status: membership_status_init,
            card_minting_price: 0,
            card_id_counter: 0,
            card_owner_mapping: card_owner_mapping_init,
            cards_of_owner_mapping: cards_of_owner_mapping_init,
        }
    }

}