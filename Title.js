"use strict";

class Title {
    constructor(titleScreen, openCalendarCallback) {
        this.openCalendarCallback = openCalendarCallback;
        this.titleScreen = titleScreen;

        this.startButton = Util.createButton("startButton", this.titleScreen.mainContainer, () => {
            soundManager.shutter();
            this.openCalendarCallback();
        });
    }
}
