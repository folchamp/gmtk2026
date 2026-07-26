"use strict";

class Scoring {
    constructor(scoringScreen, startNextDayCallback) {
        this.scoringScreen = scoringScreen;
        this.startNextDayCallback = startNextDayCallback;
        Util.quickStructure(scoringScreen.mainContainer, this,
            ["scoringContainer",
                ["scoresContainer",
                    ["scoreExplanationsContainer", "scoreExplanationOneText", "scoreExplanationTwoText", "scoreExplanationThreeText", "scoreExplanationFourText"],
                    ["scorePointsContainer", "scoreOnePointsText", "scoreTwoPointsText", "scoreThreePointsText", "scoreFourPointsText"]],
                "scoringTotalText",
                "scoringNextDayButton",
                "scoringDownloadButton"
            ]
        );
        // Util.quickStructure(scoringScreen.mainContainer, this,
        //     ["scoringContainer",
        //         ["scoresContainer",
        //             ["scoreExplanationOneContainer", "scoreExplanationOneText", "scoreOnePointsText"],
        //             ["scoreExplanationTwoContainer", "scoreExplanationTwoText", "scoreTwoPointsText"],
        //             ["scoreExplanationThreeContainer", "scoreExplanationThreeText", "scoreThreePointsText"],
        //             ["scoreExplanationFourContainer", "scoreExplanationFourText", "scoreFourPointsText"]],
        //         "scoringTotalText",
        //         "scoringNextDayButton"
        //     ]
        // );
        this.explanationElements = [
            this.scoreExplanationOneText,
            this.scoreExplanationTwoText,
            this.scoreExplanationThreeText,
            this.scoreExplanationFourText];
        this.scoreElements = [
            this.scoreOnePointsText,
            this.scoreTwoPointsText,
            this.scoreThreePointsText,
            this.scoreFourPointsText
        ]

        this.scoringContainer.addEventListener("click", (event) => {
            this.scoringContainer.classList.toggle("closed");
        });

        this.scoringNextDayButton.addEventListener("click", (event) => {
            this.endDay();
        });

        this.scoringDownloadButton.addEventListener("click", () => { this.downloadPicture(); });

        this.total = 0;
        this.pictureBeingTaken = false;
    }

    downloadPicture() {
        const gameObjects = main.photoGame.gameObjects;
        gameObjects.forEach((gameObject) => {
            if (gameObject.id === "field") {
                // on copie la position du field, puis on le vire loin pour qu'il ne s'affiche pas dans le screenshot - pas encore testé
                let temporaryObject = { x: gameObject.x, y: gameObject.y, width: gameObject.width, height: gameObject.height };
                this.pictureBeingTaken = true;
                gameObject.x = 10000;
                gameObject.y = 10000;
                setTimeout(() => {
                    this.downloadCrop(main.photoGame.photoGameCanvas, temporaryObject.x, temporaryObject.y, temporaryObject.width, temporaryObject.height);
                    setTimeout(() => {
                        gameObject.x = temporaryObject.x;
                        gameObject.y = temporaryObject.y;
                        this.pictureBeingTaken = false;
                        console.log(gameObject)
                    }, 500);
                }, 250);
            }
        });
    }

    downloadCrop(sourceCanvas, x, y, width, height) {
        const crop = document.createElement("canvas");
        const context = crop.getContext("2d");

        crop.width = width;
        crop.height = height;

        context.drawImage(
            sourceCanvas,
            x, y, width, height,
            0, 0, width, height
        );

        crop.toBlob(blob => {
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "SayCheesePicture.png";
            a.click();

            URL.revokeObjectURL(url);
        });
    }
    endDay() {
        // passer au jour suivant
        this.scoringScreen.stop();
        this.scoringTotalText.innerText = Util.texts["scoringTotalText"]; // reset du texte
        this.startNextDayCallback(this.total);
        // this.total = 0;
    }
    clearScore() {
        // this.total = 0;
        this.scoreExplanationOneText.innerText = "";
        this.scoreExplanationTwoText.innerText = "";
        this.scoreExplanationThreeText.innerText = "";
        this.scoreExplanationFourText.innerText = "";
        this.scoreOnePointsText.innerText = "";
        this.scoreTwoPointsText.innerText = "";
        this.scoreThreePointsText.innerText = "";
        this.scoreFourPointsText.innerText = "";
        Util.hide(this.scoreExplanationOneText);
        Util.hide(this.scoreExplanationTwoText);
        Util.hide(this.scoreExplanationThreeText);
        Util.hide(this.scoreExplanationFourText);
    }
    highlightObject(object) {
        object.highlighted = true;
        setTimeout(() => {
            object.highlighted = false;
        }, data.arrowTimer);
    }
    calcTotalScore(scores) {
        this.total = 0;
        scores.forEach((scoreData) => {
            const partialScore = scoreData.points * scoreData.value;
            this.total += partialScore;
        });
    }
    displayScore(scores) {
        this.clearScore();
        this.calcTotalScore(scores);
        this.scoringTotalText.innerText = `${this.total}€`;
        for (let index = 0; index < scores.length; index++) {
            setTimeout(() => { // montrer les éléments avec des flèches
                const scoreData = scores[index];
                const explanationElement = this.explanationElements[index];
                const scoreElement = this.scoreElements[index];
                if (scoreData.points < 0) {
                    explanationElement.innerText = `${scoreData.text} : ${scoreData.value}`;
                } else {
                    explanationElement.innerText = `${scoreData.text} : ${scoreData.value}/${scoreData.total}`;
                }
                Util.show(explanationElement);
                for (let index = 0; index < scoreData.highlights.length; index++) {
                    const element = scoreData.highlights[index];
                    this.highlightObject(element);
                    if (scoreData.flash) {
                        element.flash(3000);
                    }
                    if (scoreData.popupScore) {
                        element.popup(scoreData.points < 0 ? `${scoreData.points}€` : `+${scoreData.points}€`);
                    }
                }
                setTimeout(() => { // afficher le score final
                    const partialScore = scoreData.points * scoreData.value;
                    if (scoreData.points < 0) {
                        scoreElement.innerText += `-${Math.abs(partialScore)}€`;
                    } else {
                        scoreElement.innerText += `+${partialScore}€`;
                    }
                }, data.scoreTimer);
            }, data.scoringTimer * index);
        }
        this.scoringScreen.start();
    }
}