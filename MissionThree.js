"use strict";

class MissionThree extends Mission {
    constructor() {
        super();
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
        });
    }
    getScore(gameObjects) {
        let charactersOnScreen = 0;
        const field = this.getField(gameObjects);
        let superpositionsIDs = {};
        let charactersSuperposed = [];
        let charactersNotInField = [];
        let amountOfSuperpositions = 0;
        gameObjects.forEach((gameObject) => {
            if (MissionThree.missionData.characters.includes(gameObject.id)) {
                if (Util.rectsCollide(gameObject, field)) {
                    charactersOnScreen++;
                    gameObjects.forEach((gameObject2) => {
                        if (MissionThree.missionData.characters.includes(gameObject2.id)
                            && superpositionsIDs[gameObject.id] === undefined
                            && Util.rectsCollide(gameObject, gameObject2)
                            && gameObject.id !== gameObject2.id) {
                            amountOfSuperpositions++;
                            superpositionsIDs[gameObject.id] = true;
                            charactersSuperposed.push(gameObject);
                        }
                    });
                } else {
                    charactersNotInField.push(gameObject);
                }
            }
        });
        return [
            { bonus: true, text: `Characters in field`, total: MissionThree.missionData.characters.length, value: charactersOnScreen, highlights: charactersNotInField },
            { malus: true, text: `Superpositions`, total: MissionThree.missionData.characters.length, value: amountOfSuperpositions, highlights: charactersSuperposed }
        ];
    }
    getMissionData() {
        // copie des données de mission
        const missionData = Util.deepCopy(MissionThree.missionData);
        return missionData;
    }

    static missionData = {
        characters: [
            "robot2",
            "robot3",
            "zombie1",
            "zombie2",
            "zombie3",
            "robot1",
            "girl1",
            "girl2",
            "girl3",
            "girl4",
            "girl5",
            "guy1",
            "guy2",
            "guy3",
            "guy4",
            "guy5"
        ],
        objectsData: [
            {
                id: "ground", bounds: { x: -200, y: 551, width: 1980, height: 300 }, zIndex: 0,
                caracs: { isCollidable: true, isGravitable: false, isDraggable: false },
                style: { imagePath: "mission_two/ground.png", color: undefined },
                idealPosition: { x: 1000, y: 10 }
            },
            {
                "id": "ground4",
                "bounds": {
                    "x": 554,
                    "y": 264,
                    "width": 200,
                    "height": 30
                },
                "zIndex": 0,
                "caracs": {
                    "isCollidable": true,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    color: "black"
                },
                "idealPosition": {
                    "x": 313,
                    "y": 357
                }
            },
            {
                "id": "ground3",
                "bounds": {
                    "x": 782,
                    "y": 393,
                    "width": 200,
                    "height": 30
                },
                "zIndex": 0,
                "caracs": {
                    "isCollidable": true,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    color: "black"
                },
                "idealPosition": {
                    "x": 313,
                    "y": 357
                }
            },
            {
                "id": "ground2",
                "bounds": {
                    "x": 313,
                    "y": 357,
                    "width": 200,
                    "height": 30
                },
                "zIndex": 0,
                "caracs": {
                    "isCollidable": true,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    color: "black"
                },
                "idealPosition": {
                    "x": 313,
                    "y": 357
                }
            },
            {
                "id": "zombie1",
                "bounds": {
                    "x": 606.4182330305919,
                    "y": 155,
                    "width": 42,
                    "height": 75
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/zombie1.png"
                },
                "idealPosition": {
                    "x": 606.4182330305919,
                    "y": 155
                },
                "offset": {
                    "x": 18,
                    "y": 27
                }
            },
            {
                "id": "zombie2",
                "bounds": {
                    "x": 614.7206275121831,
                    "y": 171,
                    "width": 73,
                    "height": 57
                },
                "zIndex": 4,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/zombie2.png"
                },
                "idealPosition": {
                    "x": 614.7206275121831,
                    "y": 171
                },
                "offset": {
                    "x": 12,
                    "y": 23
                }
            },
            {
                "id": "zombie3",
                "bounds": {
                    "x": 602.6982713548294,
                    "y": 152,
                    "width": 40,
                    "height": 76
                },
                "zIndex": 5,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/zombie3.png"
                },
                "idealPosition": {
                    "x": 602.6982713548294,
                    "y": 152
                },
                "offset": {
                    "x": 18,
                    "y": 23
                }
            },
            {
                "id": "robot1",
                "bounds": {
                    "x": 614.9072408395728,
                    "y": 180,
                    "width": 73,
                    "height": 55
                },
                "zIndex": 6,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/robot1.png"
                },
                "idealPosition": {
                    "x": 614.9072408395728,
                    "y": 180
                },
                "offset": {
                    "x": 13,
                    "y": 21
                }
            },
            {
                "id": "robot2",
                "bounds": {
                    "x": 678.4853327741619,
                    "y": 147,
                    "width": 50,
                    "height": 77
                },
                "zIndex": 1,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/robot2.png"
                },
                "idealPosition": {
                    "x": 678.4853327741619,
                    "y": 147
                },
                "offset": {
                    "x": 4,
                    "y": 16
                }
            },
            {
                "id": "robot3",
                "bounds": {
                    "x": 619.599812004525,
                    "y": 148,
                    "width": 40,
                    "height": 76
                },
                "zIndex": 2,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/robot3.png"
                },
                "idealPosition": {
                    "x": 619.599812004525,
                    "y": 148
                },
                "offset": {
                    "x": 14,
                    "y": 17
                }
            },
            {
                "id": "girl1",
                "bounds": {
                    "x": 609.2150464137742,
                    "y": 141,
                    "width": 59,
                    "height": 70
                },
                "zIndex": 7,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/girl1.png"
                },
                "idealPosition": {
                    "x": 609.2150464137742,
                    "y": 141
                },
                "offset": {
                    "x": 5,
                    "y": 27
                }
            },
            {
                "id": "girl2",
                "bounds": {
                    "x": 592.224817240439,
                    "y": 127,
                    "width": 51,
                    "height": 76
                },
                "zIndex": 8,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/girl2.png"
                },
                "idealPosition": {
                    "x": 592.224817240439,
                    "y": 127
                },
                "offset": {
                    "x": 26,
                    "y": 23
                }
            },
            {
                "id": "girl3",
                "bounds": {
                    "x": 670.0850269096975,
                    "y": 165,
                    "width": 43,
                    "height": 77
                },
                "zIndex": 9,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/girl3.png"
                },
                "idealPosition": {
                    "x": 670.0850269096975,
                    "y": 165
                },
                "offset": {
                    "x": 9,
                    "y": 21
                }
            },
            {
                "id": "girl4",
                "bounds": {
                    "x": 607.2275068218362,
                    "y": 166,
                    "width": 45,
                    "height": 78
                },
                "zIndex": 10,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/girl4.png"
                },
                "idealPosition": {
                    "x": 607.2275068218362,
                    "y": 166
                },
                "offset": {
                    "x": 7,
                    "y": 20
                }
            },
            {
                "id": "girl5",
                "bounds": {
                    "x": 635.5471288768241,
                    "y": 168,
                    "width": 48,
                    "height": 72
                },
                "zIndex": 11,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/girl5.png"
                },
                "idealPosition": {
                    "x": 635.5471288768241,
                    "y": 168
                },
                "offset": {
                    "x": 15,
                    "y": 23
                }
            }, {
                "id": "guy1",
                "bounds": {
                    "x": 800.0716941765951,
                    "y": 244,
                    "width": 52,
                    "height": 74
                },
                "zIndex": 12,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/guy1.png"
                },
                "idealPosition": {
                    "x": 800.0716941765951,
                    "y": 244
                },
                "offset": {
                    "x": 10,
                    "y": 33
                }
            },
            {
                "id": "guy2",
                "bounds": {
                    "x": 659.7983814345852,
                    "y": 164,
                    "width": 69,
                    "height": 66
                },
                "zIndex": 13,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/guy2.png"
                },
                "idealPosition": {
                    "x": 659.7983814345852,
                    "y": 164
                },
                "offset": {
                    "x": 18,
                    "y": 20
                }
            },
            {
                "id": "guy3",
                "bounds": {
                    "x": 566.5879931843103,
                    "y": 140,
                    "width": 54,
                    "height": 69
                },
                "zIndex": 14,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/guy3.png"
                },
                "idealPosition": {
                    "x": 566.5879931843103,
                    "y": 140
                },
                "offset": {
                    "x": 15,
                    "y": 35
                }
            },
            {
                "id": "guy4",
                "bounds": {
                    "x": 363.4925193196797,
                    "y": 262,
                    "width": 49,
                    "height": 64
                },
                "zIndex": 15,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/guy4.png"
                },
                "idealPosition": {
                    "x": 363.4925193196797,
                    "y": 262
                },
                "offset": {
                    "x": 8,
                    "y": 29
                }
            },
            {
                "id": "guy5",
                "bounds": {
                    "x": 376,
                    "y": 279,
                    "width": 64,
                    "height": 63
                },
                "zIndex": 16,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_three/guy5.png"
                },
                "idealPosition": {
                    "x": 376,
                    "y": 279
                },
                "offset": {
                    "x": 11,
                    "y": 11
                }
            }
        ]
    }
}