"use strict";

class LevelEditorOverlay {
    constructor(levelEditorOverlayScreen) {
        this.levelEditorOverlayScreen = levelEditorOverlayScreen;

        Util.quickStructure(this.levelEditorOverlayScreen.mainContainer, this,
            ["addGameObjectFormContainer",
                "explanationsText",
                // "addGameObjectMoveButton",
                ["gameObjectPathLabel", "gameObjectPathText", "gameObjectPathInput", "gameObjectPathButton"],
                ["gameObjectNameLabel", "gameObjectNameText", "gameObjectNameInput"],
                ["gameObjectPositionContainer",
                    ["gameObjectXLabel", "gameObjectXText", "gameObjectXInput"],
                    ["gameObjectYLabel", "gameObjectYText", "gameObjectYInput"],
                    // "gameObjectUploadPositionButton"
                ],
                ["gameObjectWidthLabel", "gameObjectWidthText", "gameObjectWidthInput"],
                ["gameObjectHeightLabel", "gameObjectHeightText", "gameObjectHeightInput"],
                ["gameObjectZIndexLabel", "gameObjectZIndexText", "gameObjectZIndexInput"],
                // ["gameObjectIdealPositionContainer",
                //     ["gameObjectIdealXLabel", "gameObjectIdealXText", "gameObjectIdealXInput"],
                //     ["gameObjectIdealYLabel", "gameObjectIdealYText", "gameObjectIdealYInput"],
                //     "gameObjectUploadIdealButton"],
                "setIdealButton",
                ["gameObjectDownloadContainer", "gameObjectDownloadButton", "gameObjectDownloadFeedbackText"]
            ]


        );

        this.gameObjectXInput.type = "number";
        this.gameObjectYInput.type = "number";
        this.gameObjectWidthInput.type = "number";
        this.gameObjectHeightInput.type = "number";
        this.gameObjectZIndexInput.type = "number";

        this.gameObjectXInput.step = 1;
        this.gameObjectYInput.step = 1;
        this.gameObjectWidthInput.step = 1;
        this.gameObjectHeightInput.step = 1;
        this.gameObjectZIndexInput.step = 1;

        this.gameObjectXInput.addEventListener("change", (event) => { this.change(); });
        this.gameObjectYInput.addEventListener("change", (event) => { this.change(); });
        this.gameObjectWidthInput.addEventListener("change", (event) => { this.change(); });
        this.gameObjectHeightInput.addEventListener("change", (event) => { this.change(); });
        this.gameObjectZIndexInput.addEventListener("change", (event) => { this.change(); });

        // this.addGameObjectMoveButton.addEventListener("click", (event) => {
        //     this.levelEditorOverlayScreenContainer.classList.toggle("right");
        // });

        this.gameObjectDownloadButton.addEventListener("click", (event) => {
            this.download();
        });

        this.gameObjectPathButton.addEventListener("click", (event) => {
            this.createGameObject();
        });

        this.setIdealButton.addEventListener("click", (event) => {
            this.setIdeal();
        });

        window.addEventListener("keydown", (event) => {
            // console.log(event.code);
            if (event.code === "KeyE") {
                this.toggleVisibility();
            }
            if (event.code === "Semicolon") {
                this.levelEditorOverlayScreen.mainContainer.classList.toggle("right");
            }

            if (this.lastGameObject !== undefined) {
                if (event.code === "KeyW") {
                    this.lastGameObject.y--;
                }
                if (event.code === "KeyS") {
                    this.lastGameObject.y++;
                }
                if (event.code === "KeyA") {
                    this.lastGameObject.x--;
                }
                if (event.code === "KeyD") {
                    this.lastGameObject.x++;
                }
                this.load(this.lastGameObject);
            }
        });

        // this level editor is a Screen.js, thus inactive when created
        this.active = false;
    }

    toggleVisibility() {
        this.active = !this.active;
        this.levelEditorOverlayScreen.mainContainer.classList.toggle("hidden");
        this.removeLastGameObject();
    }

    createGameObject() {
        const basicObjectData = {
            id: "unnamed",
            bounds: { x: 0, y: 0, width: 50, height: 50 },
            zIndex: 3,
            caracs: { isCollidable: false, isGravitable: false, isDraggable: true },
            style: { color: undefined, imagePath: this.gameObjectPathInput.value },
            idealPosition: { x: 0, y: 0 }
        }
        const gameObject = GameObject.load(basicObjectData);
        this.load(gameObject);
        // method insertGameObject is added somewhere else (PhotoGame.js);
        this.insertGameObject(gameObject);
    }

    async download() {
        const objectData = {
            id: this.gameObjectNameInput.value,
            bounds: {
                x: this.gameObjectXInput.valueAsNumber,
                y: this.gameObjectYInput.valueAsNumber,
                width: this.gameObjectWidthInput.valueAsNumber,
                height: this.gameObjectHeightInput.valueAsNumber
            },
            zIndex: this.gameObjectZIndexInput.valueAsNumber,
            caracs: { isCollidable: false, isGravitable: false, isDraggable: true }, // changer manuellement
            style: { color: undefined, imagePath: this.gameObjectPathInput.value },
            idealPosition: {
                x: this.gameObjectXInput.valueAsNumber,
                y: this.gameObjectYInput.valueAsNumber,
            }
        };
        await navigator.clipboard.writeText(JSON.stringify(objectData, null, 4));
        this.gameObjectDownloadFeedbackText.innerText = "téléchargé !";
        setTimeout(() => {
            this.gameObjectDownloadFeedbackText.innerText = "";
        }, 750);

    }

    setIdeal() {
        this.lastGameObject.x = this.lastGameObject.idealPosition.x;
        this.lastGameObject.y = this.lastGameObject.idealPosition.y;
        this.load(this.lastGameObject);
    }

    change() {
        this.lastGameObject.id = this.gameObjectNameInput.value;
        this.lastGameObject.x = this.gameObjectXInput.valueAsNumber;
        this.lastGameObject.y = this.gameObjectYInput.valueAsNumber;
        this.lastGameObject.width = this.gameObjectWidthInput.valueAsNumber;
        this.lastGameObject.height = this.gameObjectHeightInput.valueAsNumber;
        this.lastGameObject.zIndex = this.gameObjectZIndexInput.valueAsNumber;
    }

    removeLastGameObject() {
        if (this.lastGameObject !== undefined) {
            this.lastGameObject.style.color = undefined;
            this.lastGameObject = undefined;
        }
    }

    load(gameObject) {
        if (this.active) {
            this.removeLastGameObject();
            this.lastGameObject = gameObject;
            gameObject.style.color = "rgba(100, 0, 0, 0.5)";
        }

        // fill
        this.gameObjectPathInput.value = gameObject.style.imagePath;
        this.gameObjectNameInput.value = gameObject.id;
        this.gameObjectXInput.value = gameObject.x;
        this.gameObjectYInput.value = gameObject.y;
        this.gameObjectWidthInput.value = gameObject.width;
        this.gameObjectHeightInput.value = gameObject.height;
        this.gameObjectZIndexInput.value = gameObject.zIndex;
    }
}