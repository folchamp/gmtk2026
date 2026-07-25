"use strict";

const data = {
    gameWidth: 1280,
    gameHeight: 720,

    fieldWidth: 750,
    fieldHeight: 500,

    gravity: 0.008,
    friction: 0.9,

    missionDuration: 10000,

    imagesPath: "images/",

    arrowAmplitude: 8,
    arrowSpeed: 0.010,

    scoringTimer: 3000,
    arrowTimer: 2000,
    scoreTimer: 2000,

    weekLength: 5,
    amountOfWeeks: 1,

    calendarTopBaseOffset: 135,
    calendarTopShift: 160,
    calendarLeftBaseOffset: 100,
    calendarLeftShift: 190
}

Util.image("arrow", "images/common/arrow.png")

Util.texts = {
    "scoreExplanationOneText": "blah blah",
    "scoreExplanationTwoText": "blah blahblah blah",
    "scoreExplanationThreeText": "blah blahblah blah",
    "scoreExplanationFourText": "blah blah",
    "gameObjectOffsetXText": "offsetX",
    "gameObjectOffsetYText": "offsetY",
    "explanationsText": "E : toggle level editor\nM: move level editor\nP : display game\nO : display calendar\nN : next day",
    "setIdealButton": "ideal",
    "gameObjectDownloadFeedbackText": "",
    "gameObjectDownloadButton": "télécharger",
    "gameObjectPathText": "chemin :",
    "gameObjectPathButton": "ajouter l'objet",
    "gameObjectNameText": "nom : ",
    "gameObjectXText": "x :",
    "gameObjectYText": "y :",
    "gameObjectWidthText": "largeur",
    "gameObjectHeightText": "hauteur",
    "gameObjectZIndexText": "zIndex",
}
