module.exports = {
    "scalars": [
        1,
        2,
        7,
        16,
        17,
        24,
        25,
        28,
        31,
        37
    ],
    "types": {
        "CreatePostInput": {
            "title": [
                1
            ],
            "author": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "ID": {},
        "CreatePostRelationInput": {
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateUserInput": {
            "name": [
                1
            ],
            "posts": [
                3
            ],
            "__typename": [
                1
            ]
        },
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
        "IntInput": {
            "ne": [
                7
            ],
            "eq": [
                7
            ],
            "le": [
                7
            ],
            "lt": [
                7
            ],
            "ge": [
                7
            ],
            "gt": [
                7
            ],
            "in": [
                7
            ],
            "between": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "MutatePostInput": {
            "title": [
                1
            ],
            "author": [
                2
            ],
            "_id": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "MutatePostRelationInput": {
            "title": [
                1
            ],
            "_id": [
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
            "posts": [
                9
            ],
            "_id": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "createUser": [
                30,
                {
                    "input": [
                        4,
                        "CreateUserInput!"
                    ]
                }
            ],
            "updateUser": [
                30,
                {
                    "input": [
                        10,
                        "MutateUserInput!"
                    ]
                }
            ],
            "updateUsers": [
                33,
                {
                    "filter": [
                        32
                    ],
                    "input": [
                        10,
                        "MutateUserInput!"
                    ]
                }
            ],
            "deleteUser": [
                30,
                {
                    "_id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "deleteUsers": [
                33,
                {
                    "filter": [
                        32
                    ]
                }
            ],
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
                        8,
                        "MutatePostInput!"
                    ]
                }
            ],
            "updatePosts": [
                19,
                {
                    "filter": [
                        18
                    ],
                    "input": [
                        8,
                        "MutatePostInput!"
                    ]
                }
            ],
            "deletePost": [
                15,
                {
                    "_id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "deletePosts": [
                19,
                {
                    "filter": [
                        18
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "OfPostInput": {
            "of": [
                17
            ],
            "__typename": [
                1
            ]
        },
        "OfUserInput": {
            "of": [
                31
            ],
            "__typename": [
                1
            ]
        },
        "PageRequest": {
            "limit": [
                7
            ],
            "offset": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "Post": {
            "title": [
                1
            ],
            "author": [
                30
            ],
            "_id": [
                2
            ],
            "count": [
                7,
                {
                    "of": [
                        12
                    ],
                    "distinct": [
                        16
                    ]
                }
            ],
            "createdAt": [
                28
            ],
            "updatedAt": [
                28
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "PostFieldsEnum": {},
        "PostFilter": {
            "title": [
                26
            ],
            "author": [
                32
            ],
            "_id": [
                5
            ],
            "and": [
                18
            ],
            "or": [
                18
            ],
            "not": [
                18
            ],
            "createdAt": [
                29
            ],
            "updatedAt": [
                29
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
        "PostOrderByInput": {
            "field": [
                17
            ],
            "order": [
                25
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
                7
            ],
            "limit": [
                7
            ],
            "count": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "PostSubscriptionFilter": {
            "and": [
                22
            ],
            "or": [
                22
            ],
            "not": [
                22
            ],
            "title": [
                26
            ],
            "_id": [
                5
            ],
            "count": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "getUser": [
                30,
                {
                    "_id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "findUsers": [
                35,
                {
                    "filter": [
                        32
                    ],
                    "page": [
                        14
                    ],
                    "orderBy": [
                        34,
                        "[UserOrderByInput]"
                    ]
                }
            ],
            "getPost": [
                15,
                {
                    "_id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "findPosts": [
                21,
                {
                    "filter": [
                        18
                    ],
                    "page": [
                        14
                    ],
                    "orderBy": [
                        20,
                        "[PostOrderByInput]"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "RelDirection": {},
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
                30,
                {
                    "filter": [
                        36
                    ]
                }
            ],
            "updatedUser": [
                30,
                {
                    "filter": [
                        36
                    ]
                }
            ],
            "deletedUser": [
                30,
                {
                    "filter": [
                        36
                    ]
                }
            ],
            "newPost": [
                15,
                {
                    "filter": [
                        22
                    ]
                }
            ],
            "updatedPost": [
                15,
                {
                    "filter": [
                        22
                    ]
                }
            ],
            "deletedPost": [
                15,
                {
                    "filter": [
                        22
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
                28
            ],
            "eq": [
                28
            ],
            "le": [
                28
            ],
            "lt": [
                28
            ],
            "ge": [
                28
            ],
            "gt": [
                28
            ],
            "in": [
                28
            ],
            "between": [
                28
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "name": [
                1
            ],
            "posts": [
                15
            ],
            "_id": [
                2
            ],
            "count": [
                7,
                {
                    "of": [
                        13
                    ],
                    "distinct": [
                        16
                    ]
                }
            ],
            "createdAt": [
                28
            ],
            "updatedAt": [
                28
            ],
            "__typename": [
                1
            ]
        },
        "UserFieldsEnum": {},
        "UserFilter": {
            "name": [
                26
            ],
            "posts": [
                18
            ],
            "_id": [
                5
            ],
            "and": [
                32
            ],
            "or": [
                32
            ],
            "not": [
                32
            ],
            "createdAt": [
                29
            ],
            "updatedAt": [
                29
            ],
            "__typename": [
                1
            ]
        },
        "UserMutationResultList": {
            "items": [
                30
            ],
            "__typename": [
                1
            ]
        },
        "UserOrderByInput": {
            "field": [
                31
            ],
            "order": [
                25
            ],
            "__typename": [
                1
            ]
        },
        "UserResultList": {
            "items": [
                30
            ],
            "offset": [
                7
            ],
            "limit": [
                7
            ],
            "count": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "UserSubscriptionFilter": {
            "and": [
                36
            ],
            "or": [
                36
            ],
            "not": [
                36
            ],
            "name": [
                26
            ],
            "_id": [
                5
            ],
            "count": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "Float": {}
    }
}