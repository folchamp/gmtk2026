"use strict";

class Main {
    constructor() {
        // Screens
        this.titleScreen = new Screen("titleScreen");
        this.title = new Title(this.titleScreen, () => { this.openIntroCallback(); });  // Note: remplacer par openCalendarCallback pour virer l'intro
        this.introScreen = new Screen("introScreen");
        this.intro = new Intro(this.introScreen, () => { this.openCalendarCallback(); });
        this.outroScreen = new Screen("outroScreen");
        this.outro = new Outro(this.outroScreen, () => { this.openTitleCallback(); });

        this.levelEditorOverlayScreen = new Screen("levelEditorOverlayScreen");
        this.levelEditorOverlay = new LevelEditorOverlay(this.levelEditorOverlayScreen);
        this.scoringScreen = new Screen("scoringScreen");
        this.scoring = new Scoring(this.scoringScreen, (total) => { this.startNextDayCallback(total); });
        this.calendarScreen = new Screen("calendarScreen");
        this.calendar = new Calendar(this.calendarScreen, () => { this.startTheDayMissionCallback(); }, (win) => { this.openOutroCallback(win); });
        this.photoGameScreen = new Screen("photoGameScreen");
        this.photoGame = new PhotoGame(this.photoGameScreen, this.levelEditorOverlay, this.scoring);

        this.actualMission = 0;
        this.gameList = [new MissionEight(), new MissionFive(), new MissionFour(), new MissionSeven(), new MissionSix()]; //, new MissionOne(), new MissionThree(), new MissionTwo()];

        this.screens = [
            this.titleScreen,
            this.introScreen,
            this.outroScreen,
            this.levelEditorOverlayScreen,
            this.calendarScreen,
            this.photoGameScreen
        ];

        this.setScreen("titleScreen");
    }

    openIntroCallback() {
        this.setScreen("introScreen");
        this.intro.start();
    }

    openOutroCallback(win=true) {
        this.setScreen("outroScreen");
        this.outro.start(win);
    }

    openTitleCallback() {
        this.setScreen("titleScreen");
        this.calendar.reset();
    }

    openCalendarCallback() {
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
