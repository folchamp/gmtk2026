"use strict";

class Main {
    constructor() {
        // this.callbacks = {
        //     "buttonAction": (button, method) => this.buttonAction(button, method),
        //     "setScreen": (screen) => this.setScreen(screen),
        //     "getCurrentScreenName": () => this.getCurrentScreenName(),
        //     "playSound": (sound) => this.playSound(sound),
        //     "soundMute": () => this.toggleSoundMute(),
        // }

        // Screens
        this.titleScreen = new Screen("titleScreen");
        this.title = new Title(this.titleScreen, () => { this.openCalendarCallback(); });
        this.introScreen = new IntroScreen("introScreen");

        this.levelEditorOverlayScreen = new Screen("levelEditorOverlayScreen");
        this.levelEditorOverlay = new LevelEditorOverlay(this.levelEditorOverlayScreen);
        this.scoringScreen = new Screen("scoringScreen");
        this.scoring = new Scoring(this.scoringScreen, (total) => { this.startNextDayCallback(total); });
        this.calendarScreen = new Screen("calendarScreen");
        this.calendar = new Calendar(this.calendarScreen, () => { this.startTheDayMissionCallback(); });
        this.photoGameScreen = new Screen("photoGameScreen");
        this.photoGame = new PhotoGame(this.photoGameScreen, this.levelEditorOverlay, this.scoring);

        this.actualMission = 0;
        this.gameList = [new MissionFour(), new MissionSix(), new MissionFive(), new MissionOne(), new MissionThree(), new MissionTwo()];

        this.screens = [
            this.titleScreen,
            this.levelEditorOverlayScreen,
            this.calendarScreen,
            this.photoGameScreen
        ];

        // ********************************************
        // TODO : TEMPORARY HELPER, DELETE LATER
        // ********************************************
        window.addEventListener("keydown", (event) => {
            // console.log(`Pressed ${event.code}`);
            if (event.code === "KeyP") {
                this.setScreen("photoGameScreen");
            } else if (event.code === "KeyO") {
                this.setScreen("calendarScreen");
            } else if (event.code === "KeyN") {
                this.calendar.nextDay();
            } else if (event.code === "KeyI") {
                this.setScreen("titleScreen");
            } else if (event.code === "KeyM") {
                soundManager.toggleSoundMute();
            }
        });
        // ********************************************
        // ********************************************
        // ********************************************

        this.setScreen("titleScreen");
        // this.setScreen("calendarScreen");
    }

    openCalendarCallback() {
        // soundManager.playSound("button");
        this.setScreen("calendarScreen");
        setTimeout(() => {
            this.calendar.start();
        }, 250);

        // TODO launch calendar animations

    }

    startTheDayMissionCallback() {
        this.setScreen("photoGameScreen");
        this.photoGame.startMission(this.gameList[this.actualMission]);
        this.actualMission = (this.actualMission + 1) % this.gameList.length; // on monte déjà le compteur pour la prochaine fois
    }

    startNextDayCallback(total) {
        this.setScreen("calendarScreen");
        this.calendar.nextDay(total);
    }

    // interactions
    stopAllScreens() {
        this.screens.forEach((screen) => screen.stop());
    }

    setScreen(name) {
        this.stopAllScreens();
        if (this[name]) {
            this[name]?.start();
        } else {
            console.error(`No screen named ${name}`);
        }
    }
}
