"use strict";

class MissionThree extends Mission {
    constructor() {
        super();
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
        });
    }
    checkScore(gameObjects) {
        alert("no scoring yet");
    }
    getMissionData() {
        // copie des données de mission
        const missionData = Util.deepCopy(MissionThree.missionData);
        return missionData;
    }

    static missionData = {
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
                    "x": 592,
                    "y": 445,
                    "width": 89,
                    "height": 105
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
                    "x": 592,
                    "y": 355
                }
            },
            {
                "id": "zombie2",
                "bounds": {
                    "x": 827,
                    "y": 445,
                    "width": 93,
                    "height": 85
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
                    "x": 827,
                    "y": 363
                }
            },
            {
                "id": "zombie3",
                "bounds": {
                    "x": 444,
                    "y": 445,
                    "width": 76,
                    "height": 102
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
                    "x": 444,
                    "y": 397
                }
            },
            {
                "id": "robot1",
                "bounds": {
                    "x": 708,
                    "y": 445,
                    "width": 92,
                    "height": 80
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
                    "x": 708,
                    "y": 312
                }
            },
            {
                "id": "robot2",
                "bounds": {
                    "x": 692,
                    "y": 445,
                    "width": 63,
                    "height": 95
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
                    "x": 692,
                    "y": 199
                }
            },
            {
                "id": "robot3",
                "bounds": {
                    "x": 464,
                    "y": 445,
                    "width": 70,
                    "height": 95
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
                    "x": 464,
                    "y": 222
                }
            },
            {
                "id": "girl1",
                "bounds": {
                    "x": 729,
                    "y": 445,
                    "width": 70,
                    "height": 99
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
                    "x": 729,
                    "y": 445
                }
            },
            {
                "id": "girl2",
                "bounds": {
                    "x": 570,
                    "y": 445,
                    "width": 97,
                    "height": 100
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
                    "x": 570,
                    "y": 207
                }
            },
            {
                "id": "girl3",
                "bounds": {
                    "x": 351,
                    "y": 445,
                    "width": 59,
                    "height": 99
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
                    "x": 351,
                    "y": 364
                }
            },
            {
                "id": "girl4",
                "bounds": {
                    "x": 889,
                    "y": 445,
                    "width": 63,
                    "height": 99
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
                    "x": 889,
                    "y": 263
                }
            },
            {
                "id": "girl5",
                "bounds": {
                    "x": 330,
                    "y": 445,
                    "width": 69,
                    "height": 97
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
                    "x": 330,
                    "y": 163
                }
            }, {
                "id": "guy1",
                "bounds": {
                    "x": 522,
                    "y": 445,
                    "width": 71,
                    "height": 109
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
                    "x": 522,
                    "y": 337
                }
            },
            {
                "id": "guy2",
                "bounds": {
                    "x": 329,
                    "y": 445,
                    "width": 95,
                    "height": 90
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
                    "x": 329,
                    "y": 170
                }
            },
            {
                "id": "guy3",
                "bounds": {
                    "x": 772,
                    "y": 445,
                    "width": 89,
                    "height": 106
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
                    "x": 772,
                    "y": 195
                }
            },
            {
                "id": "guy4",
                "bounds": {
                    "x": 522,
                    "y": 445,
                    "width": 64,
                    "height": 95
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
                    "x": 522,
                    "y": 152
                }
            },
            {
                "id": "guy5",
                "bounds": {
                    "x": 376,
                    "y": 276,
                    "width": 93,
                    "height": 78
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
                    "y": 276
                }
            }
        ]
    }
}