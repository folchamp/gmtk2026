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
        const tower = gameObjects.find((gameObject) => gameObject.id === "tower");
        const person = gameObjects.find((gameObject) => gameObject.id === "person1");
        const distance = Util.distance(tower, person);
        const mountainsMoved = tower.x !== tower.idealPosition.x; // easter egg
        const scoring = [];

        scoring.push(
            {
                points: MissionSeven.missionData.pointsPerPixel,
                text: `Pixel Perfect Picture 🙂`,
                total: MissionSeven.missionData.maxScore,
                value: Math.max(0, MissionSeven.missionData.maxScore - (Math.abs(MissionSeven.missionData.perfectDistance - Math.round(distance)))),
                highlights: [tower, person],
                flash: true
            }
        );
        if (mountainsMoved) {
            scoring.push({
                points: MissionSeven.missionData.movingMountainsAchievement,
                text: `Moving Mountains 🙂`,
                total: 1,
                value: 1,
                highlights: [tower],
                flash: true
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
        perfectDistance: 226,
        pointsPerPixel: 4,
        objectsData: [
            {
                "id": "person1",
                "bounds": {
                    "x": 880,
                    "y": 315,
                    "width": 131,
                    "height": 190
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
                    "x": 880,
                    "y": 315
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "tower",
                "bounds": {
                    "x": 670,
                    "y": 123,
                    "width": 119,
                    "height": 386
                },
                "zIndex": 3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": true,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_seven/pisa_tower.png"
                },
                "idealPosition": {
                    "x": 670,
                    "y": 123
                },
                "offset": {
                    "x": 2,
                    "y": 24
                }
            },
            {
                "id": "panel",
                "bounds": {
                    "x": 394,
                    "y": 307,
                    "width": 77,
                    "height": 107
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
                    "x": 394.366624190196,
                    "y": 307
                },
                "offset": {
                    "x": -1,
                    "y": 0
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
                    "imagePath": "mission_seven/pisa_background.png"
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