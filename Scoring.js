"use strict";

class Scoring {
    constructor(scoringScreen) {
        this.scoringScreen = scoringScreen;
        Util.quickStructure(scoringScreen.mainContainer, this,
            ["scoringContainer",
                ["scoresContainer",
                    ["scoreExplanationOneContainer", "scoreExplanationOneText", "scoreOnePointsText"],
                    ["scoreExplanationTwoContainer", "scoreExplanationTwoText", "scoreTwoPointsText"],
                    ["scoreExplanationThreeContainer", "scoreExplanationThreeText", "scoreThreePointsText"],
                    ["scoreExplanationFourContainer", "scoreExplanationFourText", "scoreFourPointsText"]]
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
    }
    clearScore() {
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
    displayScore(scores) {
        this.clearScore();
        for (let index = 0; index < scores.length; index++) {
            setTimeout(() => {
                const scoreData = scores[index];
                const explanationElement = this.explanationElements[index];
                const scoreElement = this.scoreElements[index];
                explanationElement.innerText = `${scoreData.text} : ${scoreData.value}/${scoreData.total}`
                Util.show(explanationElement);
                for (let index = 0; index < scoreData.highlights.length; index++) {
                    const element = scoreData.highlights[index];
                    this.highlightObject(element);
                }
                setTimeout(() => {
                    scoreElement.innerText += `score : ${scoreData.points * scoreData.value} $`;
                }, data.scoreTimer);
            }, data.scoringTimer * index);
        }
        this.scoringScreen.start();
    }
}