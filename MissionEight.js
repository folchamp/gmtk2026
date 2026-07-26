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
        const background = gameObjects.find((gameObject) => gameObject.id === "background");
        const him = gameObjects.find((gameObject) => gameObject.id === "him");
        if (background === undefined || him === undefined) {
            return;
        }
        const minX = data.gameWidth - background.width;
        const minY = data.gameHeight - background.height;
        background.x = Math.min(0, Math.max(minX, background.x));
        background.y = Math.min(0, Math.max(minY, background.y));
        him.x = background.x + MissionEight.missionData.himPosition.x;
        him.y = background.y + MissionEight.missionData.himPosition.y;
        // petit hack : empêcher le background de passer devant les autres éléments
        gameObjects.sort((a, b) => a.zIndex - b.zIndex);
    }
    getScore(gameObjects) {
        const field = this.getField(gameObjects);
        const him = gameObjects.find((gameObject) => gameObject.id === "him");
        const reticle = { x: field.x + field.width / 2, y: field.y + field.height / 2 };
        const himCenter = { x: him.x + him.width / 2, y: him.y + him.height / 2 };
        const distance = MissionEight.missionData.minDistance - Math.min(MissionEight.missionData.minDistance, Util.distance(himCenter, reticle));
        return [
            {
                points: MissionEight.missionData.pointsPerPixel,
                text: `Where is Sasook ? 🙂`,
                total: MissionEight.missionData.maxScore,
                value: Math.round(distance / MissionEight.missionData.minDistance * 100),
                highlights: []
            }
        ];
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
        himPosition: { x: 3700, y: 1781 },
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
                "id": "background",
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
                    "imagePath": "mission_eight/find_sasook_backgroundonly.png"
                },
                "idealPosition": {
                    "x": -2000,
                    "y": -1500
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "him",
                "bounds": {
                    "x": 1200,
                    "y": 600,
                    "width": 154,
                    "height": 162
                },
                "zIndex": -1,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {
                    "imagePath": "mission_eight/him.png"
                },
                "idealPosition": {
                    "x": 1200,
                    "y": 600
                },
                "offset": {
                    "x": 0,
                    "y": 0
                }
            }
        ]
    }
}