"use strict";

class MissionEight extends Mission {
    constructor() {
        super();
        this.countdownY = -47;
        this.himPosition = MissionEight.missionData.himPosition;
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
        const rawX = background.x;
        const rawY = background.y;
        background.x = Math.min(0, Math.max(minX, rawX));
        background.y = Math.min(0, Math.max(minY, rawY));
        him.x = background.x + this.himPosition.x;
        him.y = background.y + this.himPosition.y;
        this.fadeEdge(gameObjects, "edgeLeft", rawX > 0);
        this.fadeEdge(gameObjects, "edgeRight", rawX < minX);
        this.fadeEdge(gameObjects, "edgeTop", rawY > 0);
        this.fadeEdge(gameObjects, "edgeBottom", rawY < minY);
        // petit hack : empêcher le background de passer devant les autres éléments
        gameObjects.sort((a, b) => a.zIndex - b.zIndex);
    }
    fadeEdge(gameObjects, id, pushed) {
        const edge = gameObjects.find((gameObject) => gameObject.id === id);
        edge.edgeAlpha = pushed ? 0.25 : Math.max(0, (edge.edgeAlpha || 0) - 0.01);
        edge.style.color = edge.edgeAlpha > 0 ? `rgba(230, 60, 60, ${edge.edgeAlpha})` : undefined;
    }
    getScore(gameObjects) {
        const field = this.getField(gameObjects);
        const him = gameObjects.find((gameObject) => gameObject.id === "him");
        ["edgeLeft", "edgeRight", "edgeTop", "edgeBottom"].forEach((id) => {
            gameObjects.find((gameObject) => gameObject.id === id).style.color = undefined;
        });
        const reticle = { x: field.x + field.width / 2, y: field.y + field.height / 2 };
        const himCenter = { x: him.x + him.width / 2, y: him.y + him.height / 2 };
        const distance = MissionEight.missionData.minDistance - Math.min(MissionEight.missionData.minDistance, Util.distance(himCenter, reticle));
        return [
            {
                points: MissionEight.missionData.pointsPerPixel,
                text: `Where is Sasook ? 🙂`,
                total: MissionEight.missionData.maxScore,
                value: Math.round(distance / MissionEight.missionData.minDistance * 100),
                highlights: [him],
                flash: true,
                popupScoreTotal: true,
                arrow: false
            }
        ];
    }
    getMissionData() {
        const missionData = Util.deepCopy(MissionEight.missionData);
        this.himPosition = this.pickHimPosition();
        return missionData;
    }

    pickHimPosition() {
        let x, y;
        do {
            x = Util.randomValue(655, 3659);
            y = Util.randomValue(403, 2649);
        } while (x > 1846 && x < 3280 && y > 1338 && y < 2220); // empêcher qu'il soit visible dès le départ
        return { x, y };
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
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "him",
                "bounds": {
                    "x": -200,
                    "y": -200,
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
                "offset": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "id": "edgeLeft",
                "bounds": {
                    "x": 0,
                    "y": 0,
                    "width": 20,
                    "height": 720
                },
                "zIndex": 100,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {}
            },
            {
                "id": "edgeRight",
                "bounds": {
                    "x": 1260,
                    "y": 0,
                    "width": 20,
                    "height": 720
                },
                "zIndex": 100,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {}
            },
            {
                "id": "edgeTop",
                "bounds": {
                    "x": 0,
                    "y": 0,
                    "width": 1280,
                    "height": 20
                },
                "zIndex": 100,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {}
            },
            {
                "id": "edgeBottom",
                "bounds": {
                    "x": 0,
                    "y": 700,
                    "width": 1280,
                    "height": 20
                },
                "zIndex": 100,
                "caracs": {
                    "isCollidable": false,
                    "isGravitable": false,
                    "isDraggable": false
                },
                "style": {}
            }
        ]
    }
}
