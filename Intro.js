"use strict";

class Intro {
    constructor(introScreen, openCalendarCallback) {
        this.introScreen = introScreen;
        this.openCalendarCallback = openCalendarCallback;
        this.frame = 0;
        this.timeout = false;
        this.imageList = [
            ["intro1", 400],
            ["intro2", 1500],
            ["intro3", 1500],
            ["intro4", 400],
            ["intro5", 400],
            ["intro6", 400],
            ["intro7", 600],
            ["intro8", 400],
            ["intro9", 1300],
            ["intro10", 1300],
            ["intro11", 1500],
            ["intro12", 1500],
            ["intro13", 1000],
            ["intro14", 3000],
        ]
        this.images = []
        this.imageList.forEach((introFrame) => {
            const img = new Image();
            img.src = `${data.imagesPath}intro/${introFrame[0]}.png`;
            img.style.position = "absolute";

            Util.hide(img);
            this.introScreen.mainContainer.appendChild(img);
            this.images.push(img);
        })

        this.skipButton = Util.createButton("skipButton", this.introScreen.mainContainer, () => {
            soundManager.shutter();
            this.stop();
        });
    }

    start() {
        this.introAudio = soundManager.playSound("money_intro");
        this.frame = 0;
        clearTimeout(this.timeout);
        this.showNextFrame();
    }

    stop() {
        this.introAudio.pause();
        this.openCalendarCallback();
        for (let image of this.images) {
            Util.hide(image);
        }
        clearTimeout(this.timeout);
    }

    showNextFrame() {
        if (this.frame >= this.images.length) {
            this.stop();
        } else {
            Util.show(this.images[this.frame]);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.showNextFrame(), this.imageList[this.frame][1]);
            this.frame += 1;
        }
    }

}
