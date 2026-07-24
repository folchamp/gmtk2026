"use strict";

class Main {
    constructor() {

        // TODO les screens doivent-ils pouvoir se show eux-mêmes ? Avec un callback envoyé au constructeur ?
        // cette classe Main est-elle utile ?

        this.levelEditorOverlayScreen = new Screen("levelEditorOverlayScreen");
        this.levelEditorOverlay = new LevelEditorOverlay(this.levelEditorOverlayScreen);
        this.scoringScreen = new Screen("scoringScreen");
        this.scoring = new Scoring(this.scoringScreen);
        this.calendarScreen = new Screen("calendarScreen");
        this.calendar = new Calendar(this.calendarScreen);
        this.photoGameScreen = new Screen("photoGameScreen");
        this.photoGame = new PhotoGame(this.photoGameScreen, this.levelEditorOverlay, this.scoring);



        window.addEventListener("keydown", (event) => {
            // console.log(`Pressed ${event.code}`);
            // if (event.code === "KeyP") {
            //     this.setScreen("photoGameScreen");
            // } else if (event.code === "KeyO") {
            //     this.setScreen("calendarScreen");
            // } else if (event.code === "KeyN") {
            //     this.calendar.nextDay();
            // }
        });

        // testing
        this.setScreen("photoGameScreen");
        // end testing
    }

    setScreen(name, stopOthers = true) {
        if (stopOthers) {
            this.photoGameScreen.stop();
            this.calendarScreen.stop();
        }
        this[name]?.start();
    }
}
