export default {
    "scalars": [
        1,
        2,
        4,
        5,
        14,
        21,
        29
    ],
    "types": {
        "CreatePostInput": {
            "body": [
                1
            ],
            "ownerId": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "ID": {},
        "CreateUserInput": {
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EnumPostFields": {},
        "EnumUserFields": {},
        "IDInput": {
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
            "__typename": [
                1
            ]
        },
        "MutatePostInput": {
            "id": [
                2
            ],
            "body": [
                1
            ],
            "ownerId": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "MutateUserInput": {
            "id": [
                2
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "createPost": [
                15,
                {
                    "input": [
                        0,
                        "CreatePostInput!"
                    ]
                }
            ],
            "updatePost": [
                15,
                {
                    "input": [
                        7,
                        "MutatePostInput!"
                    ]
                }
            ],
            "updatePosts": [
                17,
                {
                    "filter": [
                        16
                    ],
                    "input": [
                        7,
                        "MutatePostInput!"
                    ]
                }
            ],
            "deletePost": [
                15,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "deletePosts": [
                17,
                {
                    "filter": [
                        16
                    ]
                }
            ],
            "createUser": [
                24,
                {
                    "input": [
                        3,
                        "CreateUserInput!"
                    ]
                }
            ],
            "updateUser": [
                24,
                {
                    "input": [
                        8,
                        "MutateUserInput!"
                    ]
                }
            ],
            "updateUsers": [
                26,
                {
                    "filter": [
                        25
                    ],
                    "input": [
                        8,
                        "MutateUserInput!"
                    ]
                }
            ],
            "deleteUser": [
                24,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "deleteUsers": [
                26,
                {
                    "filter": [
                        25
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "OfPostInput": {
            "of": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "OfUserInput": {
            "of": [
                5
            ],
            "__typename": [
                1
            ]
        },
        "OrderByInput": {
            "field": [
                1
            ],
            "order": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "PageRequest": {
            "limit": [
                14
            ],
            "offset": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "Post": {
            "id": [
                2
            ],
            "body": [
                1
            ],
            "owner": [
                24
            ],
            "count": [
                14,
                {
                    "of": [
                        10
                    ]
                }
            ],
            "avg": [
                14,
                {
                    "of": [
                        10
                    ]
                }
            ],
            "max": [
                14,
                {
                    "of": [
                        10
                    ]
                }
            ],
            "min": [
                14,
                {
                    "of": [
                        10
                    ]
                }
            ],
            "sum": [
                14,
                {
                    "of": [
                        10
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "PostFilter": {
            "id": [
                6
            ],
            "body": [
                22
            ],
            "ownerId": [
                6
            ],
            "and": [
                16
            ],
            "or": [
                16
            ],
            "not": [
                16
            ],
            "__typename": [
                1
            ]
        },
        "PostMutationResultList": {
            "items": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "PostResultList": {
            "items": [
                15
            ],
            "offset": [
                14
            ],
            "limit": [
                14
            ],
            "count": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "PostSubscriptionFilter": {
            "and": [
                19
            ],
            "or": [
                19
            ],
            "not": [
                19
            ],
            "id": [
                6
            ],
            "body": [
                22
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "getPost": [
                15,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "findPosts": [
                18,
                {
                    "filter": [
                        16
                    ],
                    "page": [
                        13
                    ],
                    "orderBy": [
                        12
                    ]
                }
            ],
            "getUser": [
                24,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "findUsers": [
                27,
                {
                    "filter": [
                        25
                    ],
                    "page": [
                        13
                    ],
                    "orderBy": [
                        12
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
            "newPost": [
                15,
                {
                    "filter": [
                        19
                    ]
                }
            ],
            "updatedPost": [
                15,
                {
                    "filter": [
                        19
                    ]
                }
            ],
            "deletedPost": [
                15,
                {
                    "filter": [
                        19
                    ]
                }
            ],
            "newUser": [
                24,
                {
                    "filter": [
                        28
                    ]
                }
            ],
            "updatedUser": [
                24,
                {
                    "filter": [
                        28
                    ]
                }
            ],
            "deletedUser": [
                24,
                {
                    "filter": [
                        28
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "id": [
                2
            ],
            "name": [
                1
            ],
            "posts": [
                15,
                {
                    "filter": [
                        16
                    ]
                }
            ],
            "count": [
                14,
                {
                    "of": [
                        11
                    ]
                }
            ],
            "avg": [
                14,
                {
                    "of": [
                        11
                    ]
                }
            ],
            "max": [
                14,
                {
                    "of": [
                        11
                    ]
                }
            ],
            "min": [
                14,
                {
                    "of": [
                        11
                    ]
                }
            ],
            "sum": [
                14,
                {
                    "of": [
                        11
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "UserFilter": {
            "id": [
                6
            ],
            "name": [
                22
            ],
            "and": [
                25
            ],
            "or": [
                25
            ],
            "not": [
                25
            ],
            "__typename": [
                1
            ]
        },
        "UserMutationResultList": {
            "items": [
                24
            ],
            "__typename": [
                1
            ]
        },
        "UserResultList": {
            "items": [
                24
            ],
            "offset": [
                14
            ],
            "limit": [
                14
            ],
            "count": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "UserSubscriptionFilter": {
            "and": [
                28
            ],
            "or": [
                28
            ],
            "not": [
                28
            ],
            "id": [
                6
            ],
            "name": [
                22
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {}
    }
}