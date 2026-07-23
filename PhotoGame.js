"use strict";

class PhotoGame {
    constructor(photoGameScreenContainer) {
        this.photoGameScreenContainer = photoGameScreenContainer;

        Util.quickStructure(photoGameScreenContainer, this,
            ["photoGameCanvas"]
        )

        this.photoGameCanvas.width = data.gameWidth;
        this.photoGameCanvas.height = data.gameHeight;
    }
}