"use strict";

class Main {
    constructor() {

        this.photoGameScreen = new Screen("photoGameScreen");

        this.photoGame = new PhotoGame(this.photoGameScreen.mainContainer);
    }
}