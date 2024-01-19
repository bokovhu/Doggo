#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod doggo {
    // Custom error types
    #[derive(scale::Encode, scale::Decode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        // Emitted, when no other error fits
        Unspecified,
    }

    #[ink(storage)]
    pub struct DoggoContract {
        value: bool,
    }

    impl DoggoContract {
        /// Creates a new service contract.
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { value: false }
        }

        /// Returns the current value.
        #[ink(message)]
        pub fn get(&self) -> Result<bool, Error> {
            Ok(self.value)
        }

        /// Sets the current value of the contract.
        #[ink(message)]
        pub fn flip(&mut self) -> Result<(), Error> {
            self.value = !self.value;
            Ok(())
        }
    }
}
