"use strict";

class MissionSeven extends Mission {
    constructor() {
        super();
        this.countdownY = -47;
    }
    getGameRules() {
        return "be a tourist";
    }
    missionMove(dt, gameObjects) {
    }
    getScore(gameObjects) {
        let distance = 100;
        let highlights = [];
        let scoring = [];
        let mountainsMoved = false;
        gameObjects.forEach((gameObject) => {
            gameObjects.forEach((gameObject2) => {
                if (gameObject.id === "tower" && gameObject2.id === "person1") {
                    distance = Util.distance(gameObject, gameObject2);
                    highlights.push(gameObject);
                    highlights.push(gameObject2);

                    // easter egg
                    if (gameObject.x !== gameObject.idealPosition.x) {
                        mountainsMoved = true;
                    }
                }
            });
        });

        scoring.push(
            {
                points: MissionSeven.missionData.pointsPerPixel,
                text: `Pixel Perfect Picture 🙂`,
                total: MissionSeven.missionData.maxScore,
                value: Math.max(0, MissionSeven.missionData.maxScore - (Math.abs(MissionSeven.missionData.perfectDistance - Math.round(distance)))),
                highlights: highlights
            }
        );
        if (mountainsMoved) {
            scoring.push({
                points: MissionSeven.missionData.movingMountainsAchievement,
                text: `Moving Mountains 🙂`,
                total: 1,
                value: 1,
                highlights: highlights
            });
        }

        return scoring;
    }
    getMissionData() {
        const missionData = Util.deepCopy(MissionSeven.missionData);
        return missionData;
    }

    startMusic() {
        soundManager.playSound("tarantelle2", 0.15);
    }

    static missionData = {
        movingMountainsAchievement: 25,
        maxScore: 25,
        perfectDistance: 290,
        pointsPerPixel: 4,
        objectsData: [{
            "id": "person1",
            "bounds": {
                "x": 1000,
                "y": 437,
                "width": 142,
                "height": 234
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_seven/oldtourist.png"
            },
            "idealPosition": {
                "x": 540,
                "y": 437
            },
            "offset": {
                "x": 102,
                "y": 35
            }
        }, {
            "id": "panel",
            "bounds": {
                "x": 501,
                "y": 263,
                "width": 298,
                "height": 239
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_seven/signpost.png"
            },
            "idealPosition": {
                "x": 801,
                "y": 263
            },
            "offset": {
                "x": 20,
                "y": 10
            }
        },
        {
            "id": "tower",
            "bounds": {
                "x": 309,
                "y": 123,
                "width": 247,
                "height": 423
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_seven/tower.png"
            },
            "idealPosition": {
                "x": 309,
                "y": 123
            },
            "offset": {
                "x": 20,
                "y": 10
            }
        },
        {
            "id": "field",
            "bounds": {
                "x": 237,
                "y": 114,
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
                "x": 237,
                "y": 114
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
                "isDraggable": false
            },
            "style": {
                "imagePath": "mission_seven/pisa_background2.png"
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
            "id": "ground3",
            "bounds": {
                "x": -112,
                "y": 546,
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