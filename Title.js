"use strict";

class Title {
    constructor(titleScreen, openCalendarCallback) {
        this.openCalendarCallback = openCalendarCallback;
        this.titleScreen = titleScreen;

        this.startButton = Util.createDOMElement("startButton", "button", this.titleScreen.mainContainer);
        this.startButton.addEventListener("click", () => {
            this.openCalendarCallback();
        });
        this.startButton.style.position = "absolute";
        this.startButton.style.top = "400px";
        this.startButton.style.left = "550px";
        this.startButton.style.width = "180px";
        this.startButton.style.height = "80px";
        this.startButton.style.backgroundColor = "red";
        // this.startButton.style.backgroundColor = "red";
    }


}
