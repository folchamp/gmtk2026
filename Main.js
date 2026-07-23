"use strict";

class Main {
    constructor() {
        this.levelEditorOverlayScreen = new Screen("levelEditorOverlayScreen");
        this.levelEditorOverlay = new LevelEditorOverlay(this.levelEditorOverlayScreen.mainContainer);
        this.photoGameScreen = new Screen("photoGameScreen");
        this.photoGame = new PhotoGame(this.photoGameScreen.mainContainer, this.levelEditorOverlay);

        this.calendarScreen = new Screen("calendarScreen");

        this.calendar = new Calendar(this.calendarScreen);

        window.addEventListener("keydown", (event) => {
            console.log(`Pressed ${event.code}`);
            if (event.code === "KeyP") {
                this.setScreen("photoGameScreen");
            } else if (event.code === "KeyO") {
                this.setScreen("calendarScreen");
            } else if (event.code === "KeyN") {
                this.calendar.nextDay();
            }
        });
    }

    setScreen(name) {
        this.photoGameScreen.stop();
        this.calendarScreen.stop();
        this[name]?.start();
    }
}
