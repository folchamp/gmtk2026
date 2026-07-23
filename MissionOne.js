"use strict";

class MissionOne extends Mission {
    constructor() {
        super();
    }
    checkScore(gameObjects) {
        let malus = 0;
        let percentage = 0;
        gameObjects.forEach((gameObject) => {
            if (gameObject.id.startsWith("puzzle")) {
                malus += Util.distance(gameObject, gameObject.idealPosition);
            }
        });
        malus = Math.max(Math.min(MissionOne.missionData.worst, malus), MissionOne.missionData.best);
        percentage = (MissionOne.missionData.worst - (malus - MissionOne.missionData.best)) / MissionOne.missionData.worst;
        // console.log(MissionOne.missionData.worst - (malus - MissionOne.missionData.best));
        // console.log(malus);
        alert(percentage);
    }
    getMissionData() {
        const missionData = Util.deepCopy(MissionOne.missionData);
        Util.shuffleArray(missionData.randompositions);
        missionData.objectsData.forEach((objectData) => {
            const randomPos = missionData.randompositions.shift();
            objectData.bounds.x = randomPos.x;
            objectData.bounds.y = randomPos.y;
        });
        return missionData;
    }

    static missionData = {
        worst: 5000,
        best: 500,
        randompositions: [{ x: 0, y: 0 }, { x: 324, y: 0 }, { x: 620, y: 0 }, { "x": 803, "y": 0 }, { "x": 1024, "y": 372 }, { "x": 739, "y": 351 }, { "x": 482, "y": 319 }, { "x": 0, "y": 358 }, { "x": 125, "y": 362 }],
        objectsData: [
            {
                "id": "puzzle1",
                "bounds": {
                    "x": 1,
                    "y": 0,
                    "width": 379,
                    "height": 375
                },
                "zIndex": 1,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle1.png"
                },
                "idealPosition": {
                    "x": 1,
                    "y": 0
                }
            },
            {
                "id": "puzzle2",
                "bounds": {
                    "x": 380,
                    "y": 0,
                    "width": 473,
                    "height": 285
                },
                "zIndex": 2,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle2.png"
                },
                "idealPosition": {
                    "x": 380,
                    "y": 0
                }
            },
            {
                "id": "puzzle3",
                "bounds": {
                    "x": 853,
                    "y": 0,
                    "width": 428,
                    "height": 470
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle3.png"
                },
                "idealPosition": {
                    "x": 853,
                    "y": 0
                }
            },
            {
                "id": "puzzle4",
                "bounds": {
                    "x": 1,
                    "y": 375,
                    "width": 379,
                    "height": 345
                },
                "zIndex": 4,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle4.png"
                },
                "idealPosition": {
                    "x": 1,
                    "y": 375
                }
            }, {
                "id": "puzzle5",
                "bounds": {
                    "x": 380,
                    "y": 285,
                    "width": 326,
                    "height": 325
                },
                "zIndex": 5,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle5.png"
                },
                "idealPosition": {
                    "x": 380,
                    "y": 285
                }
            }, {
                "id": "puzzle6",
                "bounds": {
                    "x": 380,
                    "y": 610,
                    "width": 388,
                    "height": 110
                },
                "zIndex": 6,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle6.png"
                },
                "idealPosition": {
                    "x": 380,
                    "y": 610
                }
            }, {
                "id": "puzzle7",
                "bounds": {
                    "x": 706,
                    "y": 285,
                    "width": 147,
                    "height": 325
                },
                "zIndex": 7,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle7.png"
                },
                "idealPosition": {
                    "x": 706,
                    "y": 285
                }
            }, {
                "id": "puzzle8",
                "bounds": {
                    "x": 853,
                    "y": 470,
                    "width": 428,
                    "height": 140
                },
                "zIndex": 8,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle8.png"
                },
                "idealPosition": {
                    "x": 853,
                    "y": 470
                }
            }, {
                "id": "puzzle9",
                "bounds": {
                    "x": 768,
                    "y": 610,
                    "width": 513,
                    "height": 110
                },
                "zIndex": 9,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_one/puzzle9.png"
                },
                "idealPosition": {
                    "x": 768,
                    "y": 610
                }
            }]
    }
}