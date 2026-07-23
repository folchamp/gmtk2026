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
        this.canvasGameObject = new GameObject(0, 0, data.gameWidth, data.gameHeight, 0, false, false, "white");

        this.gameObjects = [];

        // *************************
        // TESTING START
        // *************************
        this.insertGameObject(new GameObject(10, 10, 200, 240, 1, false, true, "red"));
        this.insertGameObject(new GameObject(30, 30, 200, 240, 3, false, true, "blue"));
        this.insertGameObject(new GameObject(20, 20, 200, 240, 2, false, true, "black"));

        this.insertGameObject(new GameObject(-1280, 600, 1280 * 4, 600, 0, true, false, "black"));
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
                if (this.grabbedGameObject === undefined || this.grabbedGameObject.zIndex < gameObject.zIndex) {
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
        this.grabbedGameObject.isDragged = false;
        this.grabbedGameObject = undefined;
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