export default {
    "scalars": [
        1,
        2,
        4,
        11,
        14,
        17,
        18,
        24
    ],
    "types": {
        "CreateUserInput": {
            "name": [
                1
            ],
            "email": [
                1
            ],
            "count": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "Int": {},
        "IDInput": {
            "ne": [
                4
            ],
            "eq": [
                4
            ],
            "le": [
                4
            ],
            "lt": [
                4
            ],
            "ge": [
                4
            ],
            "gt": [
                4
            ],
            "in": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ID": {},
        "IntInput": {
            "ne": [
                2
            ],
            "eq": [
                2
            ],
            "le": [
                2
            ],
            "lt": [
                2
            ],
            "ge": [
                2
            ],
            "gt": [
                2
            ],
            "in": [
                2
            ],
            "between": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "MutateUserInput": {
            "name": [
                1
            ],
            "email": [
                1
            ],
            "_id": [
                4
            ],
            "count": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "createUser": [
                16,
                {
                    "input": [
                        0,
                        "CreateUserInput!"
                    ]
                }
            ],
            "updateUser": [
                16,
                {
                    "input": [
                        6,
                        "MutateUserInput!"
                    ]
                }
            ],
            "updateUsers": [
                20,
                {
                    "filter": [
                        19
                    ],
                    "input": [
                        6,
                        "MutateUserInput!"
                    ]
                }
            ],
            "deleteUser": [
                16,
                {
                    "_id": [
                        4,
                        "ID!"
                    ]
                }
            ],
            "deleteUsers": [
                20,
                {
                    "filter": [
                        19
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "OfUserInput": {
            "of": [
                18
            ],
            "__typename": [
                1
            ]
        },
        "PageRequest": {
            "limit": [
                2
            ],
            "offset": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "getUser": [
                16,
                {
                    "_id": [
                        4,
                        "ID!"
                    ]
                }
            ],
            "findUsers": [
                22,
                {
                    "filter": [
                        19
                    ],
                    "page": [
                        9
                    ],
                    "orderBy": [
                        21,
                        "[UserOrderByInput]"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "SortDirectionEnum": {},
        "StringInput": {
            "ne": [
                1
            ],
            "eq": [
                1
            ],
            "le": [
                1
            ],
            "lt": [
                1
            ],
            "ge": [
                1
            ],
            "gt": [
                1
            ],
            "in": [
                1
            ],
            "contains": [
                1
            ],
            "startsWith": [
                1
            ],
            "endsWith": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Subscription": {
            "newUser": [
                16,
                {
                    "filter": [
                        23
                    ]
                }
            ],
            "updatedUser": [
                16,
                {
                    "filter": [
                        23
                    ]
                }
            ],
            "deletedUser": [
                16,
                {
                    "filter": [
                        23
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Timestamp": {},
        "TimestampInput": {
            "ne": [
                14
            ],
            "eq": [
                14
            ],
            "le": [
                14
            ],
            "lt": [
                14
            ],
            "ge": [
                14
            ],
            "gt": [
                14
            ],
            "in": [
                14
            ],
            "between": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "name": [
                1
            ],
            "email": [
                1
            ],
            "_id": [
                4
            ],
            "count": [
                2,
                {
                    "of": [
                        8
                    ],
                    "distinct": [
                        17
                    ]
                }
            ],
            "createdAt": [
                14
            ],
            "updatedAt": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "UserFieldsEnum": {},
        "UserFilter": {
            "name": [
                12
            ],
            "email": [
                12
            ],
            "_id": [
                3
            ],
            "count": [
                5
            ],
            "and": [
                19
            ],
            "or": [
                19
            ],
            "not": [
                19
            ],
            "createdAt": [
                15
            ],
            "updatedAt": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "UserMutationResultList": {
            "items": [
                16
            ],
            "__typename": [
                1
            ]
        },
        "UserOrderByInput": {
            "field": [
                18
            ],
            "order": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "UserResultList": {
            "items": [
                16
            ],
            "offset": [
                2
            ],
            "limit": [
                2
            ],
            "count": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "UserSubscriptionFilter": {
            "and": [
                23
            ],
            "or": [
                23
            ],
            "not": [
                23
            ],
            "name": [
                12
            ],
            "email": [
                12
            ],
            "_id": [
                3
            ],
            "count": [
                5
            ],
            "__typename": [
                1
            ]
        },
        "Float": {}
    }
}