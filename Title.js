"use strict";

class Title {
    constructor(titleScreen, openCalendarCallback) {
        this.openCalendarCallback = openCalendarCallback;
        this.titleScreen = titleScreen;

        this.startButton = Util.createDOMElement("startButton", "button", this.titleScreen.mainContainer);
        this.startButton.addEventListener("click", () => {
            soundManager.shutter();
            this.openCalendarCallback();
        });
    }
}
