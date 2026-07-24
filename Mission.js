"use strict";

class Mission {
    constructor() {

    }
    getMissionData() {
        throw "all methods must be implemented";
    }
    getScore() {
        throw "all methods must be implemented";
    }
    missionMove() {
        throw "all methods must be implemented";
    }
    getField(gameObjects) {
        let gameObjectToReturn;
        gameObjects.forEach((gameObject) => {
            if (gameObject.id === "field") {
                gameObjectToReturn = gameObject;
            }
        });
        return gameObjectToReturn;
    }
}