"use strict";

class PhotoGame {
    constructor(photoGameScreen, levelEditorOverlay, scoring) {
        this.photoGameScreen = photoGameScreen;
        this.levelEditorOverlay = levelEditorOverlay;
        this.levelEditorOverlay.insertGameObject = (gameObject) => { this.insertGameObject(gameObject) };
        this.scoring = scoring;

        Util.quickStructure(this.photoGameScreen.mainContainer, this,
            ["photoGameCanvas"]
        );

        this.context = this.photoGameCanvas.getContext("2d");

        this.photoGameCanvas.width = data.gameWidth;
        this.photoGameCanvas.height = data.gameHeight;

        this.gameObjects = [];

        // not in gameObjects
        this.canvasGameObject = new GameObject("canvas", { x: 0, y: 0, width: data.gameWidth, height: data.gameHeight }, 0, {}, {});
        // in gameObjects
        this.fieldGameObject = new GameObject("field", { x: (data.gameWidth - data.fieldWidth) / 2, y: (data.gameHeight - data.fieldHeight) / 2, width: data.fieldWidth, height: data.fieldHeight }, 99, { isCollidable: false, isGravitable: false, isDraggable: false }, { imagePath: "field.png" });
        this.insertGameObject(this.fieldGameObject);


        this.photoGameCanvas.addEventListener("mousedown", (event) => { this.mousedown(event); });
        this.photoGameCanvas.addEventListener("mousemove", (event) => { this.mousemove(event); });
        this.photoGameCanvas.addEventListener("mouseup", (event) => { this.mouseup(event); });
        this.photoGameCanvas.addEventListener("mouseleave", (event) => { this.mouseup(event); });

        window.addEventListener("blur", (event) => { this.pause(); });
        window.addEventListener("focus", (event) => { this.resume(); });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });

        this.grabbedGameObject = undefined;
        this.lastMousePos = { x: 0, y: 0 };

        this.lastTimeStamp = Date.now();
        this.state = "playing";

        // *************************
        // TESTING START
        // *************************
        this.mission = new MissionThree();
        // this.mission = new MissionTwo();
        // this.mission = new MissionOne();
        // *************************
        // TESTING STOP
        // *************************
        this.loadMission(this.mission.getMissionData());
        this.startMission();
        this.loop();
    }

    startMission() {
        this.missionDurationLeft = data.missionDuration;
        // for testing purposes
        // this.missionDurationLeft = 999999;
        this.missionDurationLeft = 999;
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
    end() {
        this.state = "ended";
        this.ungrab();
        this.scoring.displayScore(this.mission.getScore(this.gameObjects));
    }
    resume() {
        if (this.state === "paused") {
            this.state = "playing";
            this.lastTimeStamp = Date.now();
        }
    }
    loop() {
        const dt = this.getTimeElapsed();
        if (this.state === "playing") {
            this.move(dt);
            this.calcAndDisplayTimeLeft(dt);
            if (this.missionDurationLeft < 0) {
                this.end();
            }
        }
        this.draw();
        window.requestAnimationFrame(() => { this.loop(); });
    }
    move(dt) {
        this.gameObjects.forEach((gameObject) => {
            gameObject.move(this.gameObjects, dt);
            // si les objets quittent le canvas, on les y remet
            if (!Util.rectsCollide(gameObject, this.canvasGameObject)) {
                gameObject.reset();
            }
        });
        this.mission.missionMove(dt, this.gameObjects);
    }
    draw() {
        this.clearCanvas();
        this.gameObjects.forEach((gameObject) => {
            gameObject.draw(this.context);
        });
    }
}