module.exports = {
    "scalars": [
        1,
        3,
        5,
        11,
        16
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
            "text": [
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
        "IDInput": {
            "ne": [
                5
            ],
            "eq": [
                5
            ],
            "le": [
                5
            ],
            "lt": [
                5
            ],
            "ge": [
                5
            ],
            "gt": [
                5
            ],
            "in": [
                5
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "MutateNoteInput": {
            "id": [
                5
            ],
            "text": [
                3
            ],
            "archived": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Mutation": {
            "createNote": [
                8,
                {
                    "input": [
                        2,
                        "CreateNoteInput!"
                    ]
                }
            ],
            "updateNote": [
                8,
                {
                    "input": [
                        6,
                        "MutateNoteInput!"
                    ]
                }
            ],
            "deleteNote": [
                8,
                {
                    "input": [
                        6,
                        "MutateNoteInput!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "Note": {
            "id": [
                5
            ],
            "text": [
                3
            ],
            "archived": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "NoteFilter": {
            "id": [
                4
            ],
            "text": [
                17
            ],
            "archived": [
                0
            ],
            "and": [
                9
            ],
            "or": [
                9
            ],
            "not": [
                9
            ],
            "__typename": [
                3
            ]
        },
        "NoteResultList": {
            "items": [
                8
            ],
            "offset": [
                11
            ],
            "limit": [
                11
            ],
            "count": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "Int": {},
        "NoteSubscriptionFilter": {
            "and": [
                12
            ],
            "or": [
                12
            ],
            "not": [
                12
            ],
            "id": [
                4
            ],
            "text": [
                17
            ],
            "archived": [
                0
            ],
            "__typename": [
                3
            ]
        },
        "OrderByInput": {
            "field": [
                3
            ],
            "order": [
                16
            ],
            "__typename": [
                3
            ]
        },
        "PageRequest": {
            "limit": [
                11
            ],
            "offset": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "Query": {
            "getNote": [
                8,
                {
                    "id": [
                        5,
                        "ID!"
                    ]
                }
            ],
            "findNotes": [
                10,
                {
                    "filter": [
                        9
                    ],
                    "page": [
                        14
                    ],
                    "orderBy": [
                        13
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
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
                8,
                {
                    "filter": [
                        12
                    ]
                }
            ],
            "updatedNote": [
                8,
                {
                    "filter": [
                        12
                    ]
                }
            ],
            "deletedNote": [
                8,
                {
                    "filter": [
                        12
                    ]
                }
            ],
            "__typename": [
                3
            ]
        }
    }
}