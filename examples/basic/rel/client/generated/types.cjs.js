module.exports = {
    "scalars": [
        0,
        1,
        2,
        7,
        8,
        15
    ],
    "types": {
        "Boolean": {},
        "DateTime": {},
        "Float": {},
        "Genre": {
            "createdAt": [
                1
            ],
            "id": [
                7
            ],
            "movies": [
                9,
                {
                    "limit": [
                        8
                    ],
                    "skip": [
                        8
                    ],
                    "where": [
                        12
                    ]
                }
            ],
            "name": [
                15
            ],
            "updatedAt": [
                1
            ],
            "__typename": [
                15
            ]
        },
        "GenreCreateInput": {
            "name": [
                15
            ],
            "__typename": [
                15
            ]
        },
        "GenreUpdateInput": {
            "name": [
                15
            ],
            "__typename": [
                15
            ]
        },
        "GenreWhere": {
            "AND": [
                6
            ],
            "NOT": [
                6
            ],
            "OR": [
                6
            ],
            "id": [
                7
            ],
            "name": [
                15
            ],
            "__typename": [
                15
            ]
        },
        "ID": {},
        "Int": {},
        "Movie": {
            "createdAt": [
                1
            ],
            "genres": [
                3,
                {
                    "limit": [
                        8
                    ],
                    "skip": [
                        8
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "id": [
                7
            ],
            "rating": [
                2
            ],
            "title": [
                15
            ],
            "updatedAt": [
                1
            ],
            "year": [
                8
            ],
            "__typename": [
                15
            ]
        },
        "MovieCreateInput": {
            "rating": [
                2
            ],
            "title": [
                15
            ],
            "year": [
                8
            ],
            "__typename": [
                15
            ]
        },
        "MovieUpdateInput": {
            "rating": [
                2
            ],
            "title": [
                15
            ],
            "year": [
                8
            ],
            "__typename": [
                15
            ]
        },
        "MovieWhere": {
            "AND": [
                12
            ],
            "NOT": [
                12
            ],
            "OR": [
                12
            ],
            "id": [
                7
            ],
            "rating": [
                2
            ],
            "title": [
                15
            ],
            "year": [
                8
            ],
            "__typename": [
                15
            ]
        },
        "Mutation": {
            "createGenre": [
                3,
                {
                    "data": [
                        4,
                        "GenreCreateInput!"
                    ]
                }
            ],
            "createMovie": [
                9,
                {
                    "data": [
                        10,
                        "MovieCreateInput!"
                    ]
                }
            ],
            "deleteGenre": [
                3,
                {
                    "where": [
                        6,
                        "GenreWhere!"
                    ]
                }
            ],
            "deleteManyGenre": [
                8,
                {
                    "where": [
                        6,
                        "GenreWhere!"
                    ]
                }
            ],
            "deleteManyMovie": [
                8,
                {
                    "where": [
                        12,
                        "MovieWhere!"
                    ]
                }
            ],
            "deleteMovie": [
                9,
                {
                    "where": [
                        12,
                        "MovieWhere!"
                    ]
                }
            ],
            "mergeGenre": [
                3,
                {
                    "data": [
                        5
                    ],
                    "where": [
                        6,
                        "GenreWhere!"
                    ]
                }
            ],
            "mergeMovie": [
                9,
                {
                    "data": [
                        11
                    ],
                    "where": [
                        12,
                        "MovieWhere!"
                    ]
                }
            ],
            "updateGenre": [
                3,
                {
                    "data": [
                        5,
                        "GenreUpdateInput!"
                    ],
                    "where": [
                        6,
                        "GenreWhere!"
                    ]
                }
            ],
            "updateManyGenre": [
                3,
                {
                    "data": [
                        5,
                        "GenreUpdateInput!"
                    ],
                    "where": [
                        6,
                        "GenreWhere!"
                    ]
                }
            ],
            "updateManyMovie": [
                9,
                {
                    "data": [
                        11,
                        "MovieUpdateInput!"
                    ],
                    "where": [
                        12,
                        "MovieWhere!"
                    ]
                }
            ],
            "updateMovie": [
                9,
                {
                    "data": [
                        11,
                        "MovieUpdateInput!"
                    ],
                    "where": [
                        12,
                        "MovieWhere!"
                    ]
                }
            ],
            "__typename": [
                15
            ]
        },
        "Query": {
            "countGenres": [
                8,
                {
                    "where": [
                        6
                    ]
                }
            ],
            "countMovies": [
                8,
                {
                    "where": [
                        12
                    ]
                }
            ],
            "findManyGenres": [
                3,
                {
                    "limit": [
                        8
                    ],
                    "offset": [
                        8
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "findManyMovies": [
                9,
                {
                    "limit": [
                        8
                    ],
                    "offset": [
                        8
                    ],
                    "where": [
                        12
                    ]
                }
            ],
            "findOneGenre": [
                3,
                {
                    "where": [
                        6
                    ]
                }
            ],
            "findOneMovie": [
                9,
                {
                    "where": [
                        12
                    ]
                }
            ],
            "__typename": [
                15
            ]
        },
        "String": {}
    }
}