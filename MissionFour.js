"use strict";

class MissionFour extends Mission {
    constructor() {
        super();
        this.chklokTimestamp = Date.now();
        this.countdownX = 50;
        this.countdownY = -30;
    }
    getGameRules() {
        return "assemble the puzzle";
    }
    startCooldownedChklok() {
        if (Date.now() - this.chklokTimestamp > data.chklokCooldown) {
            this.chklokTimestamp = Date.now();
            soundManager.playSound("chklok");
        }
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
            if (gameObject.idealPosition !== undefined
                && (Util.distance(gameObject, gameObject.idealPosition) < MissionFour.missionData.snapDistance)
                && (gameObject.x !== gameObject.idealPosition.x || gameObject.y !== gameObject.idealPosition.y)) {
                this.startCooldownedChklok();
                gameObject.x = gameObject.idealPosition.x;
                gameObject.y = gameObject.idealPosition.y;
            }
        });
    }
    getScore(gameObjects) {
        let wellPlacedTiles = 0;
        let totalTiles = 0;
        gameObjects.forEach((gameObject) => {
            if (gameObject.id.startsWith("puzzle")) {
                totalTiles++;
                if (gameObject.idealPosition.x === gameObject.x && gameObject.idealPosition.y === gameObject.y) {
                    wellPlacedTiles++;
                }
            }
        });
        return [{ points: MissionFour.missionData.pointsPerTile, text: `Correctly placed tiles 🙂`, total: totalTiles, value: wellPlacedTiles, highlights: [] }];
    }
    getMissionData() {
        // copie des données de mission
        const missionData = Util.deepCopy(MissionFour.missionData);
        Util.shuffleArray(missionData.objectsData);
        Util.shuffleArray(missionData.randomPositions);
        for (let index = 0; index < missionData.objectsData.length; index++) {
            const objectData = missionData.objectsData[index];
            if (objectData.id.startsWith("puzzle")) {
                if (Util.randomValue(1, 4) === 1) {
                    objectData.bounds.x = objectData.idealPosition.x;
                    objectData.bounds.y = objectData.idealPosition.y;
                } else {
                    let randomPosition = missionData.randomPositions.shift();
                    objectData.bounds.x = randomPosition.x;
                    objectData.bounds.y = randomPosition.y;
                }
            }
        }
        return missionData;
    }

    startMusic() {
        soundManager.playSound("speed", 0.15);
    }

    static missionData = {
        randomPositions: [{
            "x": 67,
            "y": 592
        }, {
            "x": 112,
            "y": 251
        }, {
            "x": 152,
            "y": 31
        }, {
            "x": 374,
            "y": 24
        }, {
            "x": 569,
            "y": 22
        }, {
            "x": 1076,
            "y": 31
        }, {
            "x": 1087,
            "y": 186
        }, {
            "x": 1063,
            "y": 354
        }, {
            "x": 1106,
            "y": 511
        }, {
            "x": 809,
            "y": 14
        }, {
            "x": 114,
            "y": 349
        }, {
            "x": 116,
            "y": 477
        }],
        pointsPerTile: 10,
        snapDistance: 15,
        objectsData: [
            {
                "id": "field",
                "bounds": {
                    "x": 285,
                    "y": 132,
                    "width": 750,
                    "height": 500
                },
                "zIndex": 99,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    "imagePath": "common/Camera_Overlay.png"
                },
                "idealPosition": {
                    "x": 230,
                    "y": 113
                },
                "offset": {
                    "x": 264,
                    "y": 102
                }
            },
            {
                "id": "background",
                "bounds": {
                    "x": 0,
                    "y": 0,
                    "width": 50,
                    "height": 50
                },
                "zIndex": -2,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/M_Puzzle_Background.png"
                },
                "idealPosition": {
                    "x": 0,
                    "y": 0
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "caracter",
                "bounds": {
                    "x": 0,
                    "y": 0,
                    "width": 50,
                    "height": 50
                },
                "zIndex": -1,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/M_Puzzle_Chara.png"
                },
                "idealPosition": {
                    "x": 0,
                    "y": 0
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "box",
                "bounds": {
                    "x": 0,
                    "y": 0,
                    "width": 50,
                    "height": 50
                },
                "zIndex": 0,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    "imagePath": "mission_four/M_Puzzle_box.png"
                },
                "idealPosition": {
                    "x": 0,
                    "y": 0
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "puzzle1",
                "bounds": {
                    "x": 370,
                    "y": 348,
                    "width": 127,
                    "height": 52
                },
                "zIndex": 1,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_1.png"
                },
                "idealPosition": {
                    "x": 370,
                    "y": 348
                },
                "offset": {
                    "x": 12,
                    "y": 4
                }
            },
            {
                "id": "puzzle2",
                "bounds": {
                    "x": 359,
                    "y": 400,
                    "width": 128,
                    "height": 94
                },
                "zIndex": 2,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_2.png"
                },
                "idealPosition": {
                    "x": 359,
                    "y": 400
                },
                "offset": {
                    "x": 20,
                    "y": 0
                }
            },
            {
                "id": "puzzle3",
                "bounds": {
                    "x": 1053,
                    "y": 335,
                    "width": 148,
                    "height": 130
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_3.png"
                },
                "idealPosition": {
                    "x": 326,
                    "y": 494
                },
                "offset": {
                    "x": 17,
                    "y": 26
                }
            },
            {
                "id": "puzzle4",
                "bounds": {
                    "x": 455,
                    "y": 138,
                    "width": 119,
                    "height": 66
                },
                "zIndex": 4,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_4.png"
                },
                "idealPosition": {
                    "x": 503,
                    "y": 344
                },
                "offset": {
                    "x": 9,
                    "y": 4
                }
            },
            {
                "id": "puzzle5",
                "bounds": {
                    "x": 235,
                    "y": 150,
                    "width": 129,
                    "height": 87
                },
                "zIndex": 5,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_5.png"
                },
                "idealPosition": {
                    "x": 493,
                    "y": 408
                },
                "offset": {
                    "x": 8,
                    "y": 2
                }
            },
            {
                "id": "puzzle6",
                "bounds": {
                    "x": 477,
                    "y": 496,
                    "width": 141,
                    "height": 128
                },
                "zIndex": 6,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_6.png"
                },
                "idealPosition": {
                    "x": 477,
                    "y": 496
                },
                "offset": {
                    "x": 28,
                    "y": 4
                }
            },
            {
                "id": "puzzle7",
                "bounds": {
                    "x": 138,
                    "y": 291,
                    "width": 134,
                    "height": 68
                },
                "zIndex": 7,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_7.png"
                },
                "idealPosition": {
                    "x": 621,
                    "y": 340
                },
                "offset": {
                    "x": 17,
                    "y": 2
                }
            },
            {
                "id": "puzzle8",
                "bounds": {
                    "x": 100,
                    "y": 440,
                    "width": 134,
                    "height": 102
                },
                "zIndex": 8,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_8.png"
                },
                "idealPosition": {
                    "x": 621,
                    "y": 408
                },
                "offset": {
                    "x": 6,
                    "y": 2
                }
            },
            {
                "id": "puzzle9",
                "bounds": {
                    "x": 1013,
                    "y": 163,
                    "width": 140,
                    "height": 114
                },
                "zIndex": 9,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_9.png"
                },
                "idealPosition": {
                    "x": 615,
                    "y": 509
                },
                "offset": {
                    "x": 0,
                    "y": 25
                }
            },
            {
                "id": "puzzle10",
                "bounds": {
                    "x": 619,
                    "y": 137,
                    "width": 169,
                    "height": 60
                },
                "zIndex": 10,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_10.png"
                },
                "idealPosition": {
                    "x": 754,
                    "y": 338
                },
                "offset": {
                    "x": 20,
                    "y": 4
                }
            },
            {
                "id": "puzzle11",
                "bounds": {
                    "x": 1043,
                    "y": 548,
                    "width": 192,
                    "height": 102
                },
                "zIndex": 11,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_11.png"
                },
                "idealPosition": {
                    "x": 752,
                    "y": 400
                },
                "offset": {
                    "x": 0,
                    "y": 26
                }
            },
            {
                "id": "puzzle12",
                "bounds": {
                    "x": 751,
                    "y": 506,
                    "width": 221,
                    "height": 114
                },
                "zIndex": 12,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_four/Puzzle_Piece_12.png"
                },
                "idealPosition": {
                    "x": 751,
                    "y": 506
                },
                "offset": {
                    "x": 29,
                    "y": 6
                }
            }
        ]
    }
}
