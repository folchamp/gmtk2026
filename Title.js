"use strict";

class Title {
    constructor(callbacks, titleScreen) {
        this.callbacks = callbacks;
        this.screen = titleScreen;
        this.screen.mainContainer.style.backgroundImage = "url('images/title/placeholderTitle.png')";


        this.startButton = Util._createElement("startButton", this.screen.mainContainer);
        this.startButton.addEventListener("click", () => {
            this.callbacks.playSound("button");
            this.callbacks.setScreen("introScreen");
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
