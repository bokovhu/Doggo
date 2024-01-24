type AccountId = <ink::env::DefaultEnvironment as ink::env::Environment>::AccountId;
type Balance = <ink::env::DefaultEnvironment as ink::env::Environment>::Balance;
type Hash = <ink::env::DefaultEnvironment as ink::env::Environment>::Hash;
type Timestamp = <ink::env::DefaultEnvironment as ink::env::Environment>::Timestamp;
type BlockNumber = <ink::env::DefaultEnvironment as ink::env::Environment>::BlockNumber;

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

/// The doggo smart contract
pub trait IDoggoContract {
    /// Returns 42, used for testing client-side of the Smart Contract
    fn hello_world(
        &self
    ) -> Result<u32, Error>;
    /// Returns an error, used for testing client-side of the Smart Contract
    fn hello_world_error(
        &self
    ) -> Result<u32, Error>;
    /// Returns the account ID of the owner of this smart contract
    fn get_owner(
        &self
    ) -> Result<AccountId, Error>;
    /// Claims the ownership of this smart contract, only callable if there is no owner yet (by anyone)
    fn claim_ownership(
        &self
    ) -> Result<(), Error>;
    /// Returns the price of minting a card
    fn get_card_minting_price(
        &self
    ) -> Result<Balance, Error>;
    /// Sets the price of minting a card, only callable by the owner
    fn set_card_minting_price(
        &self,
        // The price of minting a card
        card_minting_price: Balance
    ) -> Result<(), Error>;
    /// Returns the price of membership
    fn get_membership_price(
        &self
    ) -> Result<Balance, Error>;
    /// Sets the price of membership, only callable by the owner
    fn set_membership_price(
        &self,
        // The price of membership
        membership_price: Balance
    ) -> Result<(), Error>;
    /// Mints a card for the sender, only callable by members
    fn mint_card(
        &self
    ) -> Result<(), Error>;
    /// Returns the owner of a card
    fn get_card_owner(
        &self,
        // The ID of the card
        card_id: u32
    ) -> Result<AccountId, Error>;
    /// Returns the IDs of the cards of an account
    fn get_cards_of_owner(
        &self,
        // The account ID
        account_id: AccountId
    ) -> Result<ink::prelude::vec::Vec<u32>, Error>;
    /// Transfers a card to another account, only callable by the owner of the card
    fn transfer_card(
        &self,
        // The ID of the card
        card_id: u32,
        // The account ID of the new owner of the card
        new_owner_account_id: AccountId
    ) -> Result<(), Error>;
    /// Returns the membership status of an account
    fn get_membership_status(
        &self,
        // The account ID
        account_id: AccountId
    ) -> Result<u32, Error>;
    /// Becomes a member, only callable by non-members
    fn become_member(
        &self
    ) -> Result<(), Error>;
    /// Bans a member, only callable by the owner
    fn ban_member(
        &self,
        // The account ID of the member to ban
        account_id: AccountId
    ) -> Result<(), Error>;
    /// Unbans a member, only callable by the owner
    fn unban_member(
        &self,
        // The account ID of the member to unban
        account_id: AccountId
    ) -> Result<(), Error>;
}