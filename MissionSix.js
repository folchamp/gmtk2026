"use strict";

class MissionSix extends Mission {
    constructor() {
        super();
        this.countdownY = -47;
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
        });
    }
    getScore(gameObjects) {
        const field = this.getField(gameObjects);
        let charactersInField = [];
        gameObjects.forEach((gameObject) => {
            if (this.isCat(gameObject) && Util.rectsCollide(gameObject, field)) {
                charactersInField.push(gameObject);
            }
        });
        const charactersSuperposed = this.getSuperposedSubjects(gameObjects, this.isCat);

        return [
            { points: MissionSix.missionData.pointsPerCharacterInField, text: `Cats in field 🙂`, total: MissionSix.missionData.characters.length, value: charactersInField.length, highlights: charactersInField },
            { points: MissionSix.missionData.pointsPerSuperposition, text: `Superpositions ☹️`, total: MissionSix.missionData.characters.length, value: charactersSuperposed.length, highlights: charactersSuperposed }
        ];
    }
    getMissionData() {
        // copie des données de mission
        const missionData = Util.deepCopy(MissionSix.missionData);
        missionData.objectsData.forEach((objectData) => {
            if (MissionSix.missionData.characters.includes(objectData.id)) {
                objectData.bounds.x = Util.randomValue(0 + objectData.bounds.width, data.gameWidth - objectData.bounds.width);
                objectData.bounds.y = Util.randomValue(0 + objectData.bounds.height, data.gameHeight - objectData.bounds.height);
            }
        });
        return missionData;
    }

    isCat(gameObject) {
        return MissionSix.missionData.characters.includes(gameObject.id);
    }

    startMusic() {
        soundManager.playSound("cancan", 0.15);
    }

    static missionData = {
        pointsPerCharacterInField: 5,
        pointsPerSuperposition: -2,
        characters: [
            "cat1",
            "cat10",
            "cat11",
            "cat12",
            "cat13",
            "cat14",
            "cat15",
            "cat16",
            "cat2",
            "cat3",
            "cat4",
            "cat5",
            "cat6",
            "cat7",
            "cat8",
            "cat9"
        ],
        objectsData: [
            {
                "id": "field",
                "bounds": {
                    "x": 230,
                    "y": 113,
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
                "id": "cat16",
                "bounds": {
                    "x": 586,
                    "y": 274,
                    "width": 79,
                    "height": 84
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat16.png"
                },
                "idealPosition": {
                    "x": 586,
                    "y": 274
                },
                "offset": {
                    "x": 7,
                    "y": 9
                }
            },
            {
                "id": "cat15",
                "bounds": {
                    "x": 301,
                    "y": 498,
                    "width": 63,
                    "height": 78
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat15.png"
                },
                "idealPosition": {
                    "x": 301,
                    "y": 498
                },
                "offset": {
                    "x": 20,
                    "y": 14
                }
            },
            {
                "id": "cat14",
                "bounds": {
                    "x": 740,
                    "y": 263,
                    "width": 87,
                    "height": 80
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat14.png"
                },
                "idealPosition": {
                    "x": 740,
                    "y": 263
                },
                "offset": {
                    "x": 2,
                    "y": 11
                }
            },
            {
                "id": "cat13",
                "bounds": {
                    "x": 252,
                    "y": 163,
                    "width": 87,
                    "height": 84
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat13.png"
                },
                "idealPosition": {
                    "x": 252,
                    "y": 163
                },
                "offset": {
                    "x": 2,
                    "y": 6
                }
            },
            {
                "id": "cat12",
                "bounds": {
                    "x": 466,
                    "y": 542,
                    "width": 65,
                    "height": 82
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat12.png"
                },
                "idealPosition": {
                    "x": 466,
                    "y": 542
                },
                "offset": {
                    "x": 5,
                    "y": 10
                }
            },
            {
                "id": "cat11",
                "bounds": {
                    "x": 943,
                    "y": 527,
                    "width": 76,
                    "height": 82
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat11.png"
                },
                "idealPosition": {
                    "x": 943,
                    "y": 527
                },
                "offset": {
                    "x": 9,
                    "y": 10
                }
            },
            {
                "id": "cat10",
                "bounds": {
                    "x": 672,
                    "y": 557,
                    "width": 70,
                    "height": 57
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat10.png"
                },
                "idealPosition": {
                    "x": 672,
                    "y": 557
                },
                "offset": {
                    "x": 17,
                    "y": 35
                }
            },
            {
                "id": "cat9",
                "bounds": {
                    "x": 299,
                    "y": 366,
                    "width": 77,
                    "height": 76
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat9.png"
                },
                "idealPosition": {
                    "x": 299,
                    "y": 366
                },
                "offset": {
                    "x": 4,
                    "y": 14
                }
            },
            {
                "id": "cat8",
                "bounds": {
                    "x": 900,
                    "y": 254,
                    "width": 62,
                    "height": 76
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat8.png"
                },
                "idealPosition": {
                    "x": 900,
                    "y": 254
                },
                "offset": {
                    "x": 15,
                    "y": 15
                }
            },
            {
                "id": "cat7",
                "bounds": {
                    "x": 445,
                    "y": 231,
                    "width": 81,
                    "height": 72
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat7.png"
                },
                "idealPosition": {
                    "x": 445,
                    "y": 231
                },
                "offset": {
                    "x": 7,
                    "y": 16
                }
            },
            {
                "id": "cat6",
                "bounds": {
                    "x": 536,
                    "y": 435,
                    "width": 84,
                    "height": 68
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat6.png"
                },
                "idealPosition": {
                    "x": 536,
                    "y": 435
                },
                "offset": {
                    "x": 4,
                    "y": 20
                }
            },
            {
                "id": "cat5",
                "bounds": {
                    "x": 843,
                    "y": 436,
                    "width": 75,
                    "height": 77
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat5.png"
                },
                "idealPosition": {
                    "x": 843,
                    "y": 436
                },
                "offset": {
                    "x": 9,
                    "y": 15
                }
            },
            {
                "id": "cat4",
                "bounds": {
                    "x": 697,
                    "y": 423,
                    "width": 72,
                    "height": 76
                },
                "zIndex": 5,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat4.png"
                },
                "idealPosition": {
                    "x": 697,
                    "y": 423
                },
                "offset": {
                    "x": 11,
                    "y": 14
                }
            },
            {
                "id": "cat3",
                "bounds": {
                    "x": 664,
                    "y": 483,
                    "width": 67,
                    "height": 82
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat3.png"
                },
                "idealPosition": {
                    "x": 664,
                    "y": 483
                },
                "offset": {
                    "x": 10,
                    "y": 10
                }
            },
            {
                "id": "cat2",
                "bounds": {
                    "x": 787,
                    "y": 358,
                    "width": 62,
                    "height": 64
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat2.png"
                },
                "idealPosition": {
                    "x": 787,
                    "y": 358
                },
                "offset": {
                    "x": 16,
                    "y": 24
                }
            },
            {
                "id": "cat1",
                "bounds": {
                    "x": 549,
                    "y": 318,
                    "width": 68,
                    "height": 80
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_six/Cat1.png"
                },
                "idealPosition": {
                    "x": 549,
                    "y": 318
                },
                "offset": {
                    "x": 20,
                    "y": 10
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
                "zIndex": 0,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    "imagePath": "mission_six/background_street.png"
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
                "id": "ground1",
                "bounds": {
                    "x": 624,
                    "y": 214,
                    "width": 259,
                    "height": 10
                },
                "zIndex": 0,
                "caracs": {
                    "isCollidable": true,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                },
                "idealPosition": {
                    "x": 624,
                    "y": 214
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "ground2",
                "bounds": {
                    "x": 365,
                    "y": 359,
                    "width": 832,
                    "height": 10
                },
                "zIndex": 0,
                "caracs": {
                    "isCollidable": true,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                },
                "idealPosition": {
                    "x": 365,
                    "y": 359
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "ground3",
                "bounds": {
                    "x": -91,
                    "y": 549,
                    "width": 1600,
                    "height": 1000
                },
                "zIndex": 0,
                "caracs": {
                    "isCollidable": true,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                },
                "idealPosition": {
                    "x": -91,
                    "y": 549
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            }
        ]
    }
}