"use strict";

class Main {
    constructor() {

        // TODO les screens doivent-ils pouvoir se show eux-mêmes ? Avec un callback envoyé au constructeur ?
        // cette classe Main est-elle utile ?
        this.callbacks = {
            "buttonAction": (button, method) => this.buttonAction(button, method),
            "setScreen": (screen) => this.setScreen(screen),
            "getCurrentScreenName": () => this.getCurrentScreenName(),
            "playSound": (sound) => this.playSound(sound),
            "soundMute": () => this.toggleSoundMute(),
        }

        // Sound
        this.soundMute = false;
        this.sounds = {}
        data.sounds.forEach((name) => {
            this.sounds[name] = new Audio(`sounds/${name}.mp3`);
        });

        // Screens
        this.titleScreen = new Screen("titleScreen");
        this.title = new Title(this.callbacks, this.titleScreen);
        this.introScreen = new IntroScreen("introScreen");

        this.levelEditorOverlayScreen = new Screen("levelEditorOverlayScreen");
        this.levelEditorOverlay = new LevelEditorOverlay(this.levelEditorOverlayScreen);
        this.scoringScreen = new Screen("scoringScreen");
        this.scoring = new Scoring(this.scoringScreen);
        this.calendarScreen = new Screen("calendarScreen");
        this.calendar = new Calendar(this.calendarScreen);
        this.photoGameScreen = new Screen("photoGameScreen");
        this.photoGame = new PhotoGame(this.photoGameScreen, this.levelEditorOverlay, this.scoring);


        this.screens = [
            this.titleScreen,
            this.levelEditorOverlayScreen,
            this.calendarScreen,
            this.photoGameScreen,
        ];
        this.setScreen("titleScreen");

        // ********************************************
        // TODO : TEMPORARY HELPER, TO DELETE
        // ********************************************
        window.addEventListener("keydown", (event) => {
            // console.log(`Pressed ${event.code}`);
            if (event.code === "KeyP") {
                this.setScreen("photoGameScreen");
            } else if (event.code === "KeyO") {
                this.setScreen("calendarScreen");
            } else if (event.code === "KeyI") {
                this.setScreen("titleScreen");
            } else if (event.code === "KeyN") {
                this.calendar.nextDay();
            } else if (event.code === "KeyM") {
                this.toggleSoundMute();
            }
        });
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

    //Sound Management
    toggleSoundMute() {
        this.soundMute = !this.soundMute;
    }

    playSound(sound) {
        if (this.soundMute) { return; }
        const audio = this.sounds[sound]; // on utilise la version pré-chargée pour éviter une latence la première fois qu'on joue un son
        audio.play();
        this.sounds[sound] = new Audio(this.sounds[sound].src); // on remplace pour s'assurer de pouvoir jouer le même son (sans devoir attendre la fin du précédent)
    }

    playRandomSound(array) {
        const sound = Util.randomFromArray(array);
        this.playSound(sound);
    }
}
