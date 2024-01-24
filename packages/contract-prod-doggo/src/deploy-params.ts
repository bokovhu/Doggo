export const PROD_CONTRACT_ADDRESS = "5F5WdA2scouqRF7Vujwh4ZFwgEGGA35jGZGiAg3wwc8VKP32";
export const PROD_CONTRACT_NODE_URL = "ws://127.0.0.1:9944";
export const PROD_CONTRACT_ABI = {
    "source": {
        "hash": "0x1678f16d422c8e5d82e007b5338c97631a442f8a3341402eac529e889da4177b"
    },
    "contract": {
        "name": "doggo",
        "version": "0.0.1",
        "authors": [
            "Botond János Kovács <botondjanoskovacs@gmail.com>"
        ]
    },
    "spec": {
        "constructors": [
            {
                "args": [],
                "default": false,
                "docs": [
                    "Creates a new contract for the Doggo game"
                ],
                "label": "new",
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink_primitives",
                        "ConstructorResult"
                    ],
                    "type": 7
                },
                "selector": "0x9bae9d5e"
            }
        ],
        "docs": [],
        "environment": {
            "accountId": {
                "displayName": [
                    "AccountId"
                ],
                "type": 0
            },
            "balance": {
                "displayName": [
                    "Balance"
                ],
                "type": 4
            },
            "blockNumber": {
                "displayName": [
                    "BlockNumber"
                ],
                "type": 5
            },
            "chainExtension": {
                "displayName": [
                    "ChainExtension"
                ],
                "type": 23
            },
            "hash": {
                "displayName": [
                    "Hash"
                ],
                "type": 21
            },
            "maxEventTopics": 4,
            "timestamp": {
                "displayName": [
                    "Timestamp"
                ],
                "type": 22
            }
        },
        "events": [],
        "lang_error": {
            "displayName": [
                "ink",
                "LangError"
            ],
            "type": 9
        },
        "messages": [
            {
                "args": [],
                "default": false,
                "docs": [
                    " Returns the owner of the contract."
                ],
                "label": "get_owner",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 10
                },
                "selector": "0x07fcd0b1"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Sets the owner of the contract."
                ],
                "label": "claim_ownership",
                "mutates": true,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0x21b1ad4f"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Returns the price to mint a new card."
                ],
                "label": "get_card_minting_price",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 15
                },
                "selector": "0x5a183d0e"
            },
            {
                "args": [
                    {
                        "label": "new_price",
                        "type": {
                            "displayName": [
                                "Balance"
                            ],
                            "type": 4
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Sets the price to mint a new card."
                ],
                "label": "set_card_minting_price",
                "mutates": true,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0x8fca4200"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Returns the last valid card ID."
                ],
                "label": "get_card_id_counter",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 17
                },
                "selector": "0x5fab7899"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Mints a new card"
                ],
                "label": "mint_card",
                "mutates": true,
                "payable": true,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0xa4b9aeb7"
            },
            {
                "args": [
                    {
                        "label": "card_id",
                        "type": {
                            "displayName": [
                                "u32"
                            ],
                            "type": 5
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Returns the owner of a card"
                ],
                "label": "get_card_owner",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 10
                },
                "selector": "0xeb46d090"
            },
            {
                "args": [
                    {
                        "label": "account",
                        "type": {
                            "displayName": [
                                "AccountId"
                            ],
                            "type": 0
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Returns the list of cards owned by an account"
                ],
                "label": "get_cards_of_owner",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 19
                },
                "selector": "0x23189574"
            },
            {
                "args": [
                    {
                        "label": "card_id",
                        "type": {
                            "displayName": [
                                "u32"
                            ],
                            "type": 5
                        }
                    },
                    {
                        "label": "new_owner",
                        "type": {
                            "displayName": [
                                "AccountId"
                            ],
                            "type": 0
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Transfers a card to a new owner"
                ],
                "label": "transfer_card",
                "mutates": true,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0x8eda2a6e"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Returns the membership price."
                ],
                "label": "get_membership_price",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 15
                },
                "selector": "0x30f6c02d"
            },
            {
                "args": [
                    {
                        "label": "new_price",
                        "type": {
                            "displayName": [
                                "Balance"
                            ],
                            "type": 4
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Sets the membership price."
                ],
                "label": "set_membership_price",
                "mutates": true,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0xafc91d5e"
            },
            {
                "args": [
                    {
                        "label": "account",
                        "type": {
                            "displayName": [
                                "AccountId"
                            ],
                            "type": 0
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Returns the membership status of an account."
                ],
                "label": "get_membership_status",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 17
                },
                "selector": "0x233b4dff"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Become a member"
                ],
                "label": "become_member",
                "mutates": true,
                "payable": true,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0xe94fc5c9"
            },
            {
                "args": [
                    {
                        "label": "account",
                        "type": {
                            "displayName": [
                                "AccountId"
                            ],
                            "type": 0
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Ban a member"
                ],
                "label": "ban_member",
                "mutates": true,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0x26b71ea2"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Hello, world endpoint for development purposes"
                ],
                "label": "hello_world",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 17
                },
                "selector": "0x2be4771c"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Hello, world error endpoint for development purposes"
                ],
                "label": "hello_world_error",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 13
                },
                "selector": "0xb47dc824"
            }
        ]
    },
    "storage": {
        "root": {
            "layout": {
                "struct": {
                    "fields": [
                        {
                            "layout": {
                                "leaf": {
                                    "key": "0x00000000",
                                    "ty": 0
                                }
                            },
                            "name": "owner_account_id"
                        },
                        {
                            "layout": {
                                "leaf": {
                                    "key": "0x00000000",
                                    "ty": 3
                                }
                            },
                            "name": "owner_is_set"
                        },
                        {
                            "layout": {
                                "leaf": {
                                    "key": "0x00000000",
                                    "ty": 4
                                }
                            },
                            "name": "membership_price"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x1f4f8cd5",
                                            "ty": 5
                                        }
                                    },
                                    "root_key": "0x1f4f8cd5"
                                }
                            },
                            "name": "membership_status"
                        },
                        {
                            "layout": {
                                "leaf": {
                                    "key": "0x00000000",
                                    "ty": 4
                                }
                            },
                            "name": "card_minting_price"
                        },
                        {
                            "layout": {
                                "leaf": {
                                    "key": "0x00000000",
                                    "ty": 5
                                }
                            },
                            "name": "card_id_counter"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0xcfa5efb4",
                                            "ty": 0
                                        }
                                    },
                                    "root_key": "0xcfa5efb4"
                                }
                            },
                            "name": "card_owner_mapping"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x3904c82f",
                                            "ty": 6
                                        }
                                    },
                                    "root_key": "0x3904c82f"
                                }
                            },
                            "name": "cards_of_owner_mapping"
                        }
                    ],
                    "name": "DoggoContract"
                }
            },
            "root_key": "0x00000000"
        }
    },
    "types": [
        {
            "id": 0,
            "type": {
                "def": {
                    "composite": {
                        "fields": [
                            {
                                "type": 1,
                                "typeName": "[u8; 32]"
                            }
                        ]
                    }
                },
                "path": [
                    "ink_primitives",
                    "types",
                    "AccountId"
                ]
            }
        },
        {
            "id": 1,
            "type": {
                "def": {
                    "array": {
                        "len": 32,
                        "type": 2
                    }
                }
            }
        },
        {
            "id": 2,
            "type": {
                "def": {
                    "primitive": "u8"
                }
            }
        },
        {
            "id": 3,
            "type": {
                "def": {
                    "primitive": "bool"
                }
            }
        },
        {
            "id": 4,
            "type": {
                "def": {
                    "primitive": "u128"
                }
            }
        },
        {
            "id": 5,
            "type": {
                "def": {
                    "primitive": "u32"
                }
            }
        },
        {
            "id": 6,
            "type": {
                "def": {
                    "sequence": {
                        "type": 5
                    }
                }
            }
        },
        {
            "id": 7,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 8
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 9
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 8
                    },
                    {
                        "name": "E",
                        "type": 9
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 8,
            "type": {
                "def": {
                    "tuple": []
                }
            }
        },
        {
            "id": 9,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "index": 1,
                                "name": "CouldNotReadInput"
                            }
                        ]
                    }
                },
                "path": [
                    "ink_primitives",
                    "LangError"
                ]
            }
        },
        {
            "id": 10,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 11
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 9
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 11
                    },
                    {
                        "name": "E",
                        "type": 9
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 11,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 0
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 12
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 0
                    },
                    {
                        "name": "E",
                        "type": 12
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 12,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "index": 0,
                                "name": "DevelopmentError"
                            },
                            {
                                "index": 1,
                                "name": "Unspecified"
                            },
                            {
                                "index": 2,
                                "name": "NotEnoughBalance"
                            },
                            {
                                "index": 3,
                                "name": "InvalidCardId"
                            },
                            {
                                "index": 4,
                                "name": "NotTheCardOwner"
                            },
                            {
                                "index": 5,
                                "name": "NotAMember"
                            },
                            {
                                "index": 6,
                                "name": "OwnerIsAlreadySet"
                            },
                            {
                                "index": 7,
                                "name": "NotTheOwner"
                            }
                        ]
                    }
                },
                "path": [
                    "doggo",
                    "contract",
                    "Error"
                ]
            }
        },
        {
            "id": 13,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 14
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 9
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 14
                    },
                    {
                        "name": "E",
                        "type": 9
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 14,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 8
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 12
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 8
                    },
                    {
                        "name": "E",
                        "type": 12
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 15,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 16
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 9
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 16
                    },
                    {
                        "name": "E",
                        "type": 9
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 16,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 4
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 12
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 4
                    },
                    {
                        "name": "E",
                        "type": 12
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 17,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 18
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 9
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 18
                    },
                    {
                        "name": "E",
                        "type": 9
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 18,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 5
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 12
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 5
                    },
                    {
                        "name": "E",
                        "type": 12
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 19,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 20
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 9
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 20
                    },
                    {
                        "name": "E",
                        "type": 9
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 20,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 6
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 12
                                    }
                                ],
                                "index": 1,
                                "name": "Err"
                            }
                        ]
                    }
                },
                "params": [
                    {
                        "name": "T",
                        "type": 6
                    },
                    {
                        "name": "E",
                        "type": 12
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 21,
            "type": {
                "def": {
                    "composite": {
                        "fields": [
                            {
                                "type": 1,
                                "typeName": "[u8; 32]"
                            }
                        ]
                    }
                },
                "path": [
                    "ink_primitives",
                    "types",
                    "Hash"
                ]
            }
        },
        {
            "id": 22,
            "type": {
                "def": {
                    "primitive": "u64"
                }
            }
        },
        {
            "id": 23,
            "type": {
                "def": {
                    "variant": {}
                },
                "path": [
                    "ink_env",
                    "types",
                    "NoChainExtension"
                ]
            }
        }
    ],
    "version": "4"
};
