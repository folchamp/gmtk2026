"use strict";

class Main {
    constructor() {

        this.levelEditorOverlayScreen = new Screen("levelEditorOverlayScreen");

        this.levelEditorOverlay = new LevelEditorOverlay(this.levelEditorOverlayScreen.mainContainer);

        this.photoGameScreen = new Screen("photoGameScreen");

        this.photoGame = new PhotoGame(this.photoGameScreen.mainContainer, this.levelEditorOverlay);
    }
}