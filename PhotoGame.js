"use strict";

class PhotoGame {
    constructor(photoGameScreen, levelEditorOverlay, scoring) {
        this.photoGameScreen = photoGameScreen;
        this.levelEditorOverlay = levelEditorOverlay;
        this.levelEditorOverlay.insertGameObject = (gameObject) => { this.insertGameObject(gameObject) };
        this.scoring = scoring;

        Util.quickStructure(this.photoGameScreen.mainContainer, this, ["photoGameCanvas"]);

        this.context = this.photoGameCanvas.getContext("2d");

        this.photoGameCanvas.width = data.gameWidth;
        this.photoGameCanvas.height = data.gameHeight;

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

        this.gameObjects = [];
        this.loop();
    }

    startMission(givenMission) {
        this.gameObjects = [];

        this.canvasGameObject = new GameObject("canvas", { x: 0, y: 0, width: data.gameWidth, height: data.gameHeight }, 0, {}, {});

        this.grabbedGameObject = undefined;
        this.lastMousePos = { x: 0, y: 0 };

        this.lastTimeStamp = Date.now();
        this.state = "paused";
        this.missionDurationLeft = data.missionDuration;

        this.mission = givenMission;
        // *************************
        // TESTING START
        // *************************
        // this.missionDurationLeft = 999999;
        // this.missionDurationLeft = 30000;
        // *************************
        // TESTING STOP
        // *************************

        this.loadMission(this.mission.getMissionData());
        this.mission.startMusic();
        this.resume();
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
    displayTimeLeft(dt) {
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
        if (this.state === "playing") {
            this.state = "paused";
        }
    }
    end() {
        soundManager.shutter();
        this.state = "ended";
        this.scoring.displayScore(this.mission.getScore(this.gameObjects));
        this.ungrab();
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
            this.missionDurationLeft -= dt;
            this.move(dt);
            if (this.missionDurationLeft < 0) {
                this.end();
            }
        }
        this.draw();
        this.displayTimeLeft(dt);
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

    loadMission(mission) {
        mission.objectsData.forEach((objectData) => {
            // TODO clean up existing objects, unload previous mission
            this.insertGameObject(GameObject.load(objectData));
        });
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
                    gameObject.drag();
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
}