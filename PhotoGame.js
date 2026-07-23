"use strict";

class PhotoGame {
    constructor(photoGameScreenContainer) {
        this.photoGameScreenContainer = photoGameScreenContainer;

        Util.quickStructure(photoGameScreenContainer, this,
            ["photoGameCanvas"]
        )

        this.context = this.photoGameCanvas.getContext("2d");

        this.photoGameCanvas.width = data.gameWidth;
        this.photoGameCanvas.height = data.gameHeight;

        // not in gameObjects !!!
        this.canvasGameObject = new GameObject("canvas", { x: 0, y: 0, width: data.gameWidth, height: data.gameHeight }, 0, {}, {});

        this.gameObjects = [];

        // *************************
        // TESTING START
        // *************************
        this.insertGameObject(new GameObject(
            "redSquare", { x: 10, y: 10, width: 200, height: 240 }, 1,
            { isCollidable: false, isGravitable: true, isDraggable: true },
            { image: undefined, color: "red" }));
        this.insertGameObject(new GameObject(
            "blueSquare", { x: 30, y: 30, width: 200, height: 240 }, 3,
            { isCollidable: false, isGravitable: true, isDraggable: true },
            { image: undefined, color: "blue" }));
        this.insertGameObject(new GameObject(
            "blackSquare", { x: 20, y: 20, width: 200, height: 240 }, 2,
            { isCollidable: false, isGravitable: true, isDraggable: true },
            { image: undefined, color: "black" }));
        this.insertGameObject(new GameObject(
            "ground", { x: -1280, y: 600, width: 1280 * 4, height: 600 }, 0,
            { isCollidable: true, isGravitable: false, isDraggable: false },
            { image: undefined, color: "black" }));
        // *************************
        // TESTING STOP
        // *************************

        this.photoGameCanvas.addEventListener("mousedown", (event) => { this.mousedown(event); });
        this.photoGameCanvas.addEventListener("mousemove", (event) => { this.mousemove(event); });
        this.photoGameCanvas.addEventListener("mouseup", (event) => { this.mouseup(event); });
        this.photoGameCanvas.addEventListener("mouseleave", (event) => { this.mouseup(event); });

        this.grabbedGameObject = undefined;
        this.lastMousePos = { x: 0, y: 0 };

        this.lastTimeStamp = Date.now();
        this.loop();
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
            this.grabbedGameObject.displace(deltaPos);
        }

        this.lastMousePos = mousePos;
    }
    mouseup(event) {
        if (this.grabbedGameObject) {
            this.grabbedGameObject.isDragged = false;
            this.grabbedGameObject = undefined;
        }
    }
    getTimeElapsed() {
        const now = Date.now();
        const dt = now - this.lastTimeStamp;
        this.lastTimeStamp = now;
        return dt;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.photoGameCanvas.width, this.photoGameCanvas.height);
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

        window.requestAnimationFrame(() => { this.loop(); });
    }
}