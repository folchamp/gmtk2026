"use strict";

class MissionOne extends Mission {
    constructor() {
        super();
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
            if (gameObject.idealPosition !== undefined && (Util.distance(gameObject, gameObject.idealPosition) < MissionOne.missionData.snapDistance)) {
                gameObject.x = gameObject.idealPosition.x;
                gameObject.y = gameObject.idealPosition.y;
            }
        });
    }
    getScore(gameObjects) {
        let malus = 0;
        let percentage = 0;
        gameObjects.forEach((gameObject) => {
            if (gameObject.id.startsWith("puzzle")) {
                malus += Util.distance(gameObject, gameObject.idealPosition);
            }
        });
        malus = Math.max(Math.min(MissionOne.missionData.worst, malus), MissionOne.missionData.best);
        percentage = (MissionOne.missionData.worst - (malus - MissionOne.missionData.best)) / MissionOne.missionData.worst;
        return { text: `${Math.floor(percentage * 100)}%` };
    }
    getMissionData() {
        // copie des données de mission
        const missionData = Util.deepCopy(MissionOne.missionData);
        // on shuffle la liste de positions possibles
        Util.shuffleArray(missionData.randompositions);
        // on donne une des positions à chaque objet
        missionData.objectsData.forEach((objectData) => {
            const randomPos = missionData.randompositions.shift();
            objectData.bounds.x = randomPos.x;
            objectData.bounds.y = randomPos.y;
        });
        // on shuffle les gameObjects
        Util.shuffleArray(missionData.objectsData);
        // on remet leur meilleurs position à un certain nombres d'objets (parce que le jeu est trop dur sinon), déterminé par la variable difficulty
        for (let index = 0; index < missionData.objectsData.length; index++) {
            const objectData = missionData.objectsData[index];
            if (index < missionData.difficulty) {
                objectData.bounds.x = objectData.idealPosition.x;
                objectData.bounds.y = objectData.idealPosition.y;
            }
            // et on ajuste le zindex pour que les tuiles mal placées ne soient pas cachées en dessous des tuiles bien placéees
            objectData.zIndex = index;
        }
        return missionData;
    }

    static missionData = {
        snapDistance: 15,
        difficulty: 5, // 0 = hard
        worst: 5000,
        best: 10,
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