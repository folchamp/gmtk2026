"use strict";

class MissionEight extends Mission {
    constructor() {
        super();
        this.countdownY = -47;
    }
    getGameRules() {
        return "find him";
    }
    missionMove(dt, gameObjects) {
    }
    getScore(gameObjects) {
        let distance = 100;
        let highlights = [];
        let scoring = [];
        gameObjects.forEach((gameObject) => {
            if (gameObject.id === "findSasook") {
                distance = MissionEight.missionData.minDistance - Math.min(MissionEight.missionData.minDistance, Util.distance(gameObject, gameObject.idealPosition));
                console.log(Util.distance(gameObject, gameObject.idealPosition));
                console.log(distance);
            }
        });
        scoring.push(
            {
                points: MissionEight.missionData.pointsPerPixel,
                text: `Where is Sasook ? 🙂`,
                total: MissionEight.missionData.maxScore,
                value: Math.round(distance / MissionEight.missionData.minDistance * 100),
                highlights: []
            }
        );
        return scoring;
    }
    getMissionData() {
        const missionData = Util.deepCopy(MissionEight.missionData);
        return missionData;
    }

    startMusic() {
        soundManager.playSound("furet", 0.15);
    }

    static missionData = {
        minDistance: 720,
        maxScore: 100,
        pointsPerPixel: 1,
        objectsData: [
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
                "id": "black_background",
                "bounds": {
                    "x": -0,
                    "y": -0,
                    "width": 1280,
                    "height": 720
                },
                "zIndex": -3,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    color: "black",
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
                "id": "findSasook",
                "bounds": {
                    "x": -2000,
                    "y": -1500,
                    "width": 4524,
                    "height": 3206
                },
                "zIndex": -2,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": true
                },
                "style": {
                    "imagePath": "mission_eight/find_sasook_full.png"
                },
                "idealPosition": {
                    "x": -3259,
                    "y": -1498
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            }
        ]
    }
}