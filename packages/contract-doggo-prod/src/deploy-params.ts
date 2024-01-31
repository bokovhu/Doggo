export const PROD_CONTRACT_ADDRESS = "5DB7pvfWbysmyncLwhCaT1JxwNAqJ92GC4wVQt8K4KQQkSJk";
export const PROD_CONTRACT_NODE_URL = "ws://127.0.0.1:9944";
export const PROD_CONTRACT_ABI = {
    "source": {
        "hash": "0x27528aca15be2338aa48d727490ae278c5dba389805e962afd16d65e07af7dae"
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
                    "type": 8
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
                "type": 25
            },
            "hash": {
                "displayName": [
                    "Hash"
                ],
                "type": 24
            },
            "maxEventTopics": 4,
            "timestamp": {
                "displayName": [
                    "Timestamp"
                ],
                "type": 7
            }
        },
        "events": [],
        "lang_error": {
            "displayName": [
                "ink",
                "LangError"
            ],
            "type": 10
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
                    "type": 11
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
                    "type": 14
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
                    "type": 16
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
                    "type": 14
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
                    "type": 18
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
                    "type": 14
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
                    "type": 11
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
                    "type": 20
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
                    "type": 14
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
                    "type": 16
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
                    "type": 14
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
                    "type": 18
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
                    "type": 14
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
                    "type": 14
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
                    "type": 18
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
                    "type": 14
                },
                "selector": "0xb47dc824"
            },
            {
                "args": [
                    {
                        "label": "opponent_account_id",
                        "type": {
                            "displayName": [
                                "AccountId"
                            ],
                            "type": 0
                        }
                    },
                    {
                        "label": "offered_cards",
                        "type": {
                            "displayName": [
                                "ink",
                                "prelude",
                                "vec",
                                "Vec"
                            ],
                            "type": 6
                        }
                    },
                    {
                        "label": "wanted_cards",
                        "type": {
                            "displayName": [
                                "ink",
                                "prelude",
                                "vec",
                                "Vec"
                            ],
                            "type": 6
                        }
                    },
                    {
                        "label": "wanted_pot_tokens",
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
                    " Challenge another player for battle"
                ],
                "label": "challenge",
                "mutates": true,
                "payable": true,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 14
                },
                "selector": "0xf755a053"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Accept a challenge"
                ],
                "label": "accept_challenge",
                "mutates": true,
                "payable": true,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 14
                },
                "selector": "0x0ddca1ac"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
                        "type": {
                            "displayName": [
                                "u32"
                            ],
                            "type": 5
                        }
                    },
                    {
                        "label": "cards",
                        "type": {
                            "displayName": [
                                "ink",
                                "prelude",
                                "vec",
                                "Vec"
                            ],
                            "type": 6
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Submit cards for battle (by the challenger)"
                ],
                "label": "submit_challenger_cards",
                "mutates": true,
                "payable": true,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 14
                },
                "selector": "0xff71970e"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
                        "type": {
                            "displayName": [
                                "u32"
                            ],
                            "type": 5
                        }
                    },
                    {
                        "label": "cards",
                        "type": {
                            "displayName": [
                                "ink",
                                "prelude",
                                "vec",
                                "Vec"
                            ],
                            "type": 6
                        }
                    }
                ],
                "default": false,
                "docs": [
                    " Submit cards for battle (by the opponent)"
                ],
                "label": "submit_opponent_cards",
                "mutates": true,
                "payable": true,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 14
                },
                "selector": "0x235fc81d"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
                        "type": {
                            "displayName": [
                                "u32"
                            ],
                            "type": 5
                        }
                    },
                    {
                        "label": "winner_account_id",
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
                    " Record the winner of a game"
                ],
                "label": "record_game_winner",
                "mutates": true,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 14
                },
                "selector": "0x0c15132d"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the status of a challenge"
                ],
                "label": "get_challenge_status",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 18
                },
                "selector": "0x4006a34b"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the timestamp of the last challenge submission"
                ],
                "label": "get_challenge_submission_timestamp",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 22
                },
                "selector": "0x4794293d"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the timestamp of the challenge accept deadline"
                ],
                "label": "get_challenge_accept_deadline_timestamp",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 22
                },
                "selector": "0xff7978b1"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the account ID of the challenger"
                ],
                "label": "get_challenge_challenger_account_id",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 11
                },
                "selector": "0xd6867a90"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the account ID of the opponent"
                ],
                "label": "get_challenge_opponent_account_id",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 11
                },
                "selector": "0xe594d9d9"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the bet pot tokens of the challenge"
                ],
                "label": "get_challenge_bet_pot_tokens",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 16
                },
                "selector": "0x17d6e95e"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the wanted pot tokens of the challenge"
                ],
                "label": "get_challenge_wanted_pot_tokens",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 16
                },
                "selector": "0x6c7deb3b"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the offered cards of the challenge"
                ],
                "label": "get_challenge_offered_cards",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0x38301f67"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the wanted cards of the challenge"
                ],
                "label": "get_challenge_wanted_cards",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0x52360229"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the challenger's cards of the challenge"
                ],
                "label": "get_challenge_challenger_cards",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0x69404a37"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the opponent's cards of the challenge"
                ],
                "label": "get_challenge_opponent_cards",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0x0f5b8519"
            },
            {
                "args": [
                    {
                        "label": "challenge_id",
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
                    " Returns the account ID of the winner"
                ],
                "label": "get_challenge_winner_account_id",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 11
                },
                "selector": "0x6d7a38a9"
            },
            {
                "args": [
                    {
                        "label": "account_id",
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
                    " Returns the list of challenges of a member as a challenger"
                ],
                "label": "get_challenges_of_member_as_challenger",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0xc0772324"
            },
            {
                "args": [
                    {
                        "label": "account_id",
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
                    " Returns the list of challenges of a member as an opponent"
                ],
                "label": "get_challenges_of_member_as_opponent",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0x4b7a1834"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Returns the list of cards of the caller"
                ],
                "label": "get_cards_of_caller",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0xe55a0d50"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Returns the list of challenges of the caller as a challenger"
                ],
                "label": "get_challenges_of_caller_as_challenger",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0x0f1c05a7"
            },
            {
                "args": [],
                "default": false,
                "docs": [
                    " Returns the list of challenges of the caller as an opponent"
                ],
                "label": "get_challenges_of_caller_as_opponent",
                "mutates": false,
                "payable": false,
                "returnType": {
                    "displayName": [
                        "ink",
                        "MessageResult"
                    ],
                    "type": 20
                },
                "selector": "0x696cdff0"
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
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x60642645",
                                            "ty": 5
                                        }
                                    },
                                    "root_key": "0x60642645"
                                }
                            },
                            "name": "challenge_statuses"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0xd7a1a7cd",
                                            "ty": 7
                                        }
                                    },
                                    "root_key": "0xd7a1a7cd"
                                }
                            },
                            "name": "challenge_submission_timestamps"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0xdb80e779",
                                            "ty": 7
                                        }
                                    },
                                    "root_key": "0xdb80e779"
                                }
                            },
                            "name": "challenge_accept_deadline_timestamps"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x9e51c91e",
                                            "ty": 7
                                        }
                                    },
                                    "root_key": "0x9e51c91e"
                                }
                            },
                            "name": "challenge_battle_deadline_timestamps"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x766cfe2e",
                                            "ty": 0
                                        }
                                    },
                                    "root_key": "0x766cfe2e"
                                }
                            },
                            "name": "challenge_challenger_account_ids"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x48327b02",
                                            "ty": 0
                                        }
                                    },
                                    "root_key": "0x48327b02"
                                }
                            },
                            "name": "challenge_opponent_account_ids"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x832ad0ed",
                                            "ty": 4
                                        }
                                    },
                                    "root_key": "0x832ad0ed"
                                }
                            },
                            "name": "challenge_bet_pot_tokens"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x9cffb3be",
                                            "ty": 4
                                        }
                                    },
                                    "root_key": "0x9cffb3be"
                                }
                            },
                            "name": "challenge_wanted_pot_tokens"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0xe31cbdbb",
                                            "ty": 6
                                        }
                                    },
                                    "root_key": "0xe31cbdbb"
                                }
                            },
                            "name": "challenge_offered_cards"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0xd47da0d4",
                                            "ty": 6
                                        }
                                    },
                                    "root_key": "0xd47da0d4"
                                }
                            },
                            "name": "challenge_wanted_cards"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x68f9832c",
                                            "ty": 6
                                        }
                                    },
                                    "root_key": "0x68f9832c"
                                }
                            },
                            "name": "challenge_challenger_cards"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x15147db5",
                                            "ty": 6
                                        }
                                    },
                                    "root_key": "0x15147db5"
                                }
                            },
                            "name": "challenge_opponent_cards"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x89084ee8",
                                            "ty": 0
                                        }
                                    },
                                    "root_key": "0x89084ee8"
                                }
                            },
                            "name": "challenge_winner_account_ids"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x6d587acb",
                                            "ty": 6
                                        }
                                    },
                                    "root_key": "0x6d587acb"
                                }
                            },
                            "name": "members_as_challengers_to_challenges"
                        },
                        {
                            "layout": {
                                "root": {
                                    "layout": {
                                        "leaf": {
                                            "key": "0x7fff2fd1",
                                            "ty": 6
                                        }
                                    },
                                    "root_key": "0x7fff2fd1"
                                }
                            },
                            "name": "members_as_opponents_to_challenges"
                        },
                        {
                            "layout": {
                                "leaf": {
                                    "key": "0x00000000",
                                    "ty": 5
                                }
                            },
                            "name": "challenge_id_counter"
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
                    "primitive": "u64"
                }
            }
        },
        {
            "id": 8,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 9
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 10
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
                        "type": 9
                    },
                    {
                        "name": "E",
                        "type": 10
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 9,
            "type": {
                "def": {
                    "tuple": []
                }
            }
        },
        {
            "id": 10,
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
            "id": 11,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 12
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 10
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
                        "type": 12
                    },
                    {
                        "name": "E",
                        "type": 10
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
                                        "type": 13
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
                        "type": 13
                    }
                ],
                "path": [
                    "Result"
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
                            },
                            {
                                "index": 8,
                                "name": "InvalidChallengeId"
                            },
                            {
                                "index": 9,
                                "name": "NotTheChallenger"
                            },
                            {
                                "index": 10,
                                "name": "NotTheOpponent"
                            },
                            {
                                "index": 11,
                                "name": "BadChallengeStatus"
                            },
                            {
                                "index": 12,
                                "name": "BattleSubmissionExpired"
                            },
                            {
                                "index": 13,
                                "name": "ChallengeExpired"
                            }
                        ]
                    }
                },
                "path": [
                    "doggo",
                    "doggo",
                    "Error"
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
                                        "type": 15
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 10
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
                        "type": 15
                    },
                    {
                        "name": "E",
                        "type": 10
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
                                        "type": 9
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 13
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
                        "type": 9
                    },
                    {
                        "name": "E",
                        "type": 13
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
                                        "type": 17
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 10
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
                        "type": 17
                    },
                    {
                        "name": "E",
                        "type": 10
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
                                        "type": 4
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 13
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
                        "type": 13
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
                                        "type": 19
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 10
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
                        "type": 19
                    },
                    {
                        "name": "E",
                        "type": 10
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
                                        "type": 5
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 13
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
                        "type": 13
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
                                        "type": 21
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 10
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
                        "type": 21
                    },
                    {
                        "name": "E",
                        "type": 10
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
                                        "type": 13
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
                        "type": 13
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 22,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 23
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 10
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
                        "type": 23
                    },
                    {
                        "name": "E",
                        "type": 10
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 23,
            "type": {
                "def": {
                    "variant": {
                        "variants": [
                            {
                                "fields": [
                                    {
                                        "type": 7
                                    }
                                ],
                                "index": 0,
                                "name": "Ok"
                            },
                            {
                                "fields": [
                                    {
                                        "type": 13
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
                        "type": 7
                    },
                    {
                        "name": "E",
                        "type": 13
                    }
                ],
                "path": [
                    "Result"
                ]
            }
        },
        {
            "id": 24,
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
            "id": 25,
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
