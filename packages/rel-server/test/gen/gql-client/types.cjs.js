module.exports = {
    "scalars": [
        1,
        3,
        6,
        8,
        13,
        23,
        24,
        27,
        30,
        36
    ],
    "types": {
        "BooleanInput": {
            "ne": [
                1
            ],
            "eq": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {},
        "CreateNoteInput": {
            "body": [
                3
            ],
            "archived": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "String": {},
        "CreateUserInput": {
            "name": [
                3
            ],
            "email": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "IDInput": {
            "ne": [
                6
            ],
            "eq": [
                6
            ],
            "le": [
                6
            ],
            "lt": [
                6
            ],
            "ge": [
                6
            ],
            "gt": [
                6
            ],
            "in": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "IntInput": {
            "ne": [
                8
            ],
            "eq": [
                8
            ],
            "le": [
                8
            ],
            "lt": [
                8
            ],
            "ge": [
                8
            ],
            "gt": [
                8
            ],
            "in": [
                8
            ],
            "between": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "Int": {},
        "MutateNoteInput": {
            "body": [
                3
            ],
            "archived": [
                1
            ],
            "_id": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "MutateUserInput": {
            "name": [
                3
            ],
            "email": [
                3
            ],
            "_id": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "Mutation": {
            "createNote": [
                12,
                {
                    "input": [
                        2,
                        "CreateNoteInput!"
                    ]
                }
            ],
            "updateNote": [
                12,
                {
                    "input": [
                        9,
                        "MutateNoteInput!"
                    ]
                }
            ],
            "updateNotes": [
                15,
                {
                    "filter": [
                        14
                    ],
                    "input": [
                        9,
                        "MutateNoteInput!"
                    ]
                }
            ],
            "deleteNote": [
                12,
                {
                    "_id": [
                        6,
                        "ID!"
                    ]
                }
            ],
            "deleteNotes": [
                15,
                {
                    "filter": [
                        14
                    ]
                }
            ],
            "createUser": [
                29,
                {
                    "input": [
                        4,
                        "CreateUserInput!"
                    ]
                }
            ],
            "updateUser": [
                29,
                {
                    "input": [
                        10,
                        "MutateUserInput!"
                    ]
                }
            ],
            "updateUsers": [
                32,
                {
                    "filter": [
                        31
                    ],
                    "input": [
                        10,
                        "MutateUserInput!"
                    ]
                }
            ],
            "deleteUser": [
                29,
                {
                    "_id": [
                        6,
                        "ID!"
                    ]
                }
            ],
            "deleteUsers": [
                32,
                {
                    "filter": [
                        31
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "Note": {
            "body": [
                3
            ],
            "archived": [
                1
            ],
            "_id": [
                6
            ],
            "count": [
                8,
                {
                    "of": [
                        19
                    ],
                    "distinct": [
                        1
                    ]
                }
            ],
            "createdAt": [
                27
            ],
            "updatedAt": [
                27
            ],
            "__typename": [
                3
            ]
        },
        "NoteFieldsEnum": {},
        "NoteFilter": {
            "body": [
                25
            ],
            "archived": [
                0
            ],
            "_id": [
                5
            ],
            "and": [
                14
            ],
            "or": [
                14
            ],
            "not": [
                14
            ],
            "createdAt": [
                28
            ],
            "updatedAt": [
                28
            ],
            "__typename": [
                3
            ]
        },
        "NoteMutationResultList": {
            "items": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "NoteOrderByInput": {
            "field": [
                13
            ],
            "order": [
                24
            ],
            "__typename": [
                3
            ]
        },
        "NoteResultList": {
            "items": [
                12
            ],
            "offset": [
                8
            ],
            "limit": [
                8
            ],
            "count": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "NoteSubscriptionFilter": {
            "and": [
                18
            ],
            "or": [
                18
            ],
            "not": [
                18
            ],
            "body": [
                25
            ],
            "archived": [
                0
            ],
            "_id": [
                5
            ],
            "count": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "OfNoteInput": {
            "of": [
                13
            ],
            "__typename": [
                3
            ]
        },
        "OfUserInput": {
            "of": [
                30
            ],
            "__typename": [
                3
            ]
        },
        "PageRequest": {
            "limit": [
                8
            ],
            "offset": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "Query": {
            "getNote": [
                12,
                {
                    "_id": [
                        6,
                        "ID!"
                    ]
                }
            ],
            "findNotes": [
                17,
                {
                    "filter": [
                        14
                    ],
                    "page": [
                        21
                    ],
                    "orderBy": [
                        16,
                        "[NoteOrderByInput]"
                    ]
                }
            ],
            "getUser": [
                29,
                {
                    "_id": [
                        6,
                        "ID!"
                    ]
                }
            ],
            "findUsers": [
                34,
                {
                    "filter": [
                        31
                    ],
                    "page": [
                        21
                    ],
                    "orderBy": [
                        33,
                        "[UserOrderByInput]"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "RelDirection": {},
        "SortDirectionEnum": {},
        "StringInput": {
            "ne": [
                3
            ],
            "eq": [
                3
            ],
            "le": [
                3
            ],
            "lt": [
                3
            ],
            "ge": [
                3
            ],
            "gt": [
                3
            ],
            "in": [
                3
            ],
            "contains": [
                3
            ],
            "startsWith": [
                3
            ],
            "endsWith": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Subscription": {
            "newNote": [
                12,
                {
                    "filter": [
                        18
                    ]
                }
            ],
            "updatedNote": [
                12,
                {
                    "filter": [
                        18
                    ]
                }
            ],
            "deletedNote": [
                12,
                {
                    "filter": [
                        18
                    ]
                }
            ],
            "newUser": [
                29,
                {
                    "filter": [
                        35
                    ]
                }
            ],
            "updatedUser": [
                29,
                {
                    "filter": [
                        35
                    ]
                }
            ],
            "deletedUser": [
                29,
                {
                    "filter": [
                        35
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "Timestamp": {},
        "TimestampInput": {
            "ne": [
                27
            ],
            "eq": [
                27
            ],
            "le": [
                27
            ],
            "lt": [
                27
            ],
            "ge": [
                27
            ],
            "gt": [
                27
            ],
            "in": [
                27
            ],
            "between": [
                27
            ],
            "__typename": [
                3
            ]
        },
        "User": {
            "name": [
                3
            ],
            "email": [
                3
            ],
            "_id": [
                6
            ],
            "count": [
                8,
                {
                    "of": [
                        20
                    ],
                    "distinct": [
                        1
                    ]
                }
            ],
            "createdAt": [
                27
            ],
            "updatedAt": [
                27
            ],
            "__typename": [
                3
            ]
        },
        "UserFieldsEnum": {},
        "UserFilter": {
            "name": [
                25
            ],
            "email": [
                25
            ],
            "_id": [
                5
            ],
            "and": [
                31
            ],
            "or": [
                31
            ],
            "not": [
                31
            ],
            "createdAt": [
                28
            ],
            "updatedAt": [
                28
            ],
            "__typename": [
                3
            ]
        },
        "UserMutationResultList": {
            "items": [
                29
            ],
            "__typename": [
                3
            ]
        },
        "UserOrderByInput": {
            "field": [
                30
            ],
            "order": [
                24
            ],
            "__typename": [
                3
            ]
        },
        "UserResultList": {
            "items": [
                29
            ],
            "offset": [
                8
            ],
            "limit": [
                8
            ],
            "count": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "UserSubscriptionFilter": {
            "and": [
                35
            ],
            "or": [
                35
            ],
            "not": [
                35
            ],
            "name": [
                25
            ],
            "email": [
                25
            ],
            "_id": [
                5
            ],
            "count": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "Float": {}
    }
}