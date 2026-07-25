"use strict";

class Scoring {
    constructor(scoringScreen, startNextDayCallback) {
        this.scoringScreen = scoringScreen;
        this.startNextDayCallback = startNextDayCallback;
        Util.quickStructure(scoringScreen.mainContainer, this,
            ["scoringContainer",
                ["scoresContainer",
                    ["scoreExplanationOneContainer", "scoreExplanationOneText", "scoreOnePointsText"],
                    ["scoreExplanationTwoContainer", "scoreExplanationTwoText", "scoreTwoPointsText"],
                    ["scoreExplanationThreeContainer", "scoreExplanationThreeText", "scoreThreePointsText"],
                    ["scoreExplanationFourContainer", "scoreExplanationFourText", "scoreFourPointsText"]],
                "scoringTotalText",
                "scoringNextDayButton"
            ]
        );
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

        this.scoringNextDayButton.addEventListener("click", (event) => {
            this.endDay();
        });

        this.total = 0;
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
        this.scoringTotalText.innerText = `total : ${this.total} $`;
        for (let index = 0; index < scores.length; index++) {
            setTimeout(() => { // montrer les éléments avec des flèches
                const scoreData = scores[index];
                const explanationElement = this.explanationElements[index];
                const scoreElement = this.scoreElements[index];
                explanationElement.innerText = `${scoreData.text} : ${scoreData.value}/${scoreData.total}`
                Util.show(explanationElement);
                for (let index = 0; index < scoreData.highlights.length; index++) {
                    const element = scoreData.highlights[index];
                    this.highlightObject(element);
                }
                setTimeout(() => { // afficher le score final
                    const partialScore = scoreData.points * scoreData.value;
                    if (scoreData.points < 0) {
                        scoreElement.innerText += `malus : ${partialScore} $`;
                    } else {
                        scoreElement.innerText += `bonus : ${partialScore} $`;
                    }
                }, data.scoreTimer);
            }, data.scoringTimer * index);
        }
        this.scoringScreen.start();
    }
}