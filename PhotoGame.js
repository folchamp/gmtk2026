"use strict";

class PhotoGame {
    constructor(photoGameScreenContainer, levelEditorOverlay) {
        this.photoGameScreenContainer = photoGameScreenContainer;
        this.levelEditorOverlay = levelEditorOverlay;
        this.levelEditorOverlay.insertGameObject = (gameObject) => { this.insertGameObject(gameObject) };

        Util.quickStructure(this.photoGameScreenContainer, this,
            ["photoGameCanvas"]
        );

        this.context = this.photoGameCanvas.getContext("2d");

        this.photoGameCanvas.width = data.gameWidth;
        this.photoGameCanvas.height = data.gameHeight;

        // not in gameObjects !!!
        this.canvasGameObject = new GameObject("canvas", { x: 0, y: 0, width: data.gameWidth, height: data.gameHeight }, 0, {}, {});
        this.fieldGameObject = new GameObject("field",
            {
                x: (data.gameWidth - data.fieldWidth) / 2,
                y: (data.gameHeight - data.fieldHeight) / 2,
                width: data.fieldWidth,
                height: data.fieldHeight
            },
            99,
            { isCollidable: false, isGravitable: false, isDraggable: false },
            // { color: "rgba(0,0,200, 0.3" });
            { imagePath: "field.png" });

        this.gameObjects = [];
        this.insertGameObject(this.fieldGameObject);

        this.photoGameCanvas.addEventListener("mousedown", (event) => { this.mousedown(event); });
        this.photoGameCanvas.addEventListener("mousemove", (event) => { this.mousemove(event); });
        this.photoGameCanvas.addEventListener("mouseup", (event) => { this.mouseup(event); });
        this.photoGameCanvas.addEventListener("mouseleave", (event) => { this.mouseup(event); });

        this.grabbedGameObject = undefined;
        this.lastMousePos = { x: 0, y: 0 };

        this.lastTimeStamp = Date.now();
        this.state = "playing";
        this.loop();

        // *************************
        // TESTING START
        // *************************
        this.mission = new MissionTwo();
        // *************************
        // TESTING STOP
        // *************************
        this.loadMission(this.mission.getMissionData());
        this.startMission();
    }

    startMission() {
        this.missionDurationLeft = data.missionDuration;
        this.missionDurationLeft = 999999999999999999999999;
    }

    loadMission(mission) {
        mission.objectsData.forEach((objectData) => {
            // TODO clean up existing objects, unload previous mission
            this.insertGameObject(GameObject.load(objectData));
        });
        console.log(this.gameObjects);
    }

    insertGameObject(gameObject) {
        this.gameObjects.push(gameObject);

        let i = this.gameObjects.length - 1;
        while (i > 0 && this.gameObjects[i - 1].zIndex > gameObject.zIndex) {
            this.gameObjects[i] = this.gameObjects[i - 1];
            i--;
        }
        this.gameObjects[i] = gameObject;
    }
    mousedown(event) {
        const mousePos = Util.getMousePosition(this.photoGameCanvas, event);

        this.gameObjects.forEach((gameObject) => {
            if (Util.isInRect(mousePos, gameObject)) {
                if (gameObject.isDraggable && (this.grabbedGameObject === undefined || this.grabbedGameObject.zIndex < gameObject.zIndex)) {
                    this.grabbedGameObject = gameObject;
                    gameObject.isDragged = true;
                }
            }
        });

        this.lastMousePos = mousePos;
    }
    mousemove(event) {
        const mousePos = Util.getMousePosition(this.photoGameCanvas, event);
        const deltaPos = { x: mousePos.x - this.lastMousePos.x, y: mousePos.y - this.lastMousePos.y };

        if (this.grabbedGameObject !== undefined) {
            this.levelEditorOverlay.load(this.grabbedGameObject);
            this.grabbedGameObject.displace(deltaPos);
        }

        this.lastMousePos = mousePos;
    }
    mouseup(event) {
        this.ungrab();
    }
    ungrab() {
        if (this.grabbedGameObject) {
            this.levelEditorOverlay.load(this.grabbedGameObject);
            this.grabbedGameObject.isDragged = false;
            this.grabbedGameObject = undefined;
        }
    }
    getTimeElapsed() {
        const now = Date.now();
        let dt = now - this.lastTimeStamp;
        this.lastTimeStamp = now;
        if (this.state === "paused") {
            dt = 0;
        }
        return dt;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.photoGameCanvas.width, this.photoGameCanvas.height);
    }
    calcAndDisplayTimeLeft(dt) {
        this.missionDurationLeft -= dt;
        this.context.font = "72px Arial";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillStyle = "black";
        this.context.strokeStyle = "white";
        this.context.lineWidth = 3;
        this.context.fillText(Math.ceil(Math.max(this.missionDurationLeft, 0) / 1000), 930, 190);
        this.context.strokeText(Math.ceil(Math.max(this.missionDurationLeft, 0) / 1000), 930, 190);
    }
    pause() {
        this.state = "paused";
    }
    loop() {
        // TODO pause the game on lost focus

        const dt = this.getTimeElapsed();

        this.clearCanvas();

        this.gameObjects.forEach((gameObject) => {
            gameObject.move(this.gameObjects, dt);
            if (!Util.rectsCollide(gameObject, this.canvasGameObject)) {
                gameObject.reset();
            }
        });

        this.gameObjects.forEach((gameObject) => {
            gameObject.draw(this.context);
        });

        if (this.missionDurationLeft < 0 && dt > 0) {
            this.ungrab();
            this.mission.checkScore(this.gameObjects);
            this.pause();
        }
        this.calcAndDisplayTimeLeft(dt);

        window.requestAnimationFrame(() => { this.loop(); });
    }
}