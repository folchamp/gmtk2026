"use strict";

class Outro {
    constructor(outroScreen, openTitleCallback) {
        this.outroScreen = outroScreen;
        this.openTitleCallback = openTitleCallback;
        this.frame = 0;
        this.timeout = false;
        this.imageListWin = [
            ["outro1", 400],
            ["outro2", 400],
            ["outro3", 400],
            ["outro4", 600],
            ["outro5", 600],
            ["outro6", 1300],
            ["outro7", 1300],
            ["outro8w", 1200],
            ["outro9w", 1400],
            ["outro10w", 200],
            ["outro11w", 400],
            ["outro12w", 400],
            ["outro13w", 400],
            ["outro14w", 600],
            ["outro15w", 400],
            ["outro16w", 400],
            ["outro17w", 400],
            ["outro18w", 1500],
            ["outro19w", 1500],
            ["outro20w", 2000],
        ]
        this.imagesWin = []
        this.imageListWin.forEach((outroFrame) => {
            const img = new Image();
            img.src = `${data.imagesPath}outro/${outroFrame[0]}.png`;
            img.style.position = "absolute";

            Util.hide(img);
            this.outroScreen.mainContainer.appendChild(img);
            this.imagesWin.push(img);
        })

        this.imageListLoss = [
            ["outro1", 400],
            ["outro2", 400],
            ["outro3", 400],
            ["outro4", 600],
            ["outro5", 600],
            ["outro6", 1300],
            ["outro7", 1300],
            ["outro8l", 1200],
            ["outro9l", 1500],
            ["outro10l", 1500],
            ["outro11l", 2000],
        ]
        this.imagesLoss = []
        this.imageListLoss.forEach((outroFrame) => {
            const img = new Image();
            img.src = `${data.imagesPath}outro/${outroFrame[0]}.png`;
            img.style.position = "absolute";

            Util.hide(img);
            this.outroScreen.mainContainer.appendChild(img);
            this.imagesLoss.push(img);
        })

        this.skipButton = Util.createDOMElement("skipButton", "button", this.outroScreen.mainContainer);
        this.skipButton.addEventListener("click", () => {
            soundManager.shutter();
            this.stop();
        });

        this.stopped = false;
    }

    start(win=true) {
        this.win = win;
        this.frame = 0;
        clearTimeout(this.timeout);
        this.showNextFrame();
    }

    stop() {
        if (!this.stopped) { // j'ai ajouté la variable stopped parce que stopped est appelé lorsque tous les frames ont défilé
            // et quand on skippe l'animation, le stop est tout de même déclenché à la fin des frames et donc déclenché deux fois,
            // ce qui peut couper un jeu en plein milieu et renvoie le joueur au calendrier
            this.openTitleCallback();
            const images = this.win ? this.imagesWin : this.imagesLoss;
            for (let image of images) {
                Util.hide(image);
            }
        }
        this.stopped = true;
        clearTimeout(this.timeout); // et j'ai ajouté un clearTimeout (qui suffit peut-être, je n'ai pas testé)
    }

    showNextFrame() {
        const images = this.win ? this.imagesWin : this.imagesLoss;
        const imageList = this.win ? this.imageListWin : this.imageListLoss;
        if (this.frame >= images.length) {
            this.stop();
        } else {
            Util.show(images[this.frame]);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.showNextFrame(), imageList[this.frame][1]);
            this.frame += 1;
        }
    }

}
