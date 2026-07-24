"use strict";

class Scoring {
    constructor(scoringScreen) {
        this.scoringScreen = scoringScreen;
        Util.quickStructure(scoringScreen.mainContainer, this,
            ["scoringContainer",
                ["scoresContainer",
                    "scoreExplanationOneText",
                    "scoreExplanationTwoText",
                    "scoreExplanationThreeText",
                    "scoreExplanationFourText"]
            ]
        )
    }
    clearScore() {
        this.scoreExplanationOneText.innerText = "";
        this.scoreExplanationTwoText.innerText = "";
        this.scoreExplanationThreeText.innerText = "";
        this.scoreExplanationFourText.innerText = "";
        Util.hide(this.scoreExplanationOneText);
        Util.hide(this.scoreExplanationTwoText);
        Util.hide(this.scoreExplanationThreeText);
        Util.hide(this.scoreExplanationFourText);
    }
    displayScore(scores) {
        // TODO categories
        // TODO highlights per category
        this.clearScore();
        this.scoringScreen.start();
        
    }
}