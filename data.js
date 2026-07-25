"use strict";

const data = {
    startingMoney: -300,

    gameWidth: 1280,
    gameHeight: 720,

    fieldWidth: 750,
    fieldHeight: 500,

    gravity: 0.008,
    friction: 0.9,

    // missionDuration: 1000000, // testing
    missionDuration: 10000, // production
    // missionDuration: 1000, // testing

    imagesPath: "images/",

    sounds: [
        "button",
        "aouh",
        "arghl",
        "arrr",
        "arrr2",
        "bonmatin",
        "button",
        "cancan",
        "chklok",
        "deprime",
        "furet",
        "han",
        "heyeuh",
        "hihan",
        "hii",
        "kodek",
        "kot",
        "kot2",
        "kot3",
        "meuh",
        "meuh2",
        "noan",
        "oldmac",
        "ouaf",
        "pimpoumpam",
        "speed",
        "ugh",
        "ugh2",
        "yay"
    ],

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
    calendarLeftShift: 190,
    scoreTimer: 2000,

    sources: [
        "https://pixabay.com/sound-effects/technology-camera-13695/", // camera stutter effect
    ],
}

Util.image("arrow", "images/common/arrow.png");

Util.texts = {
    "scoringTotalText": "Total :",
    "scoringNextDayButton": "Go to bed",
    "startButton": "Start",
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
};


