"use strict";

class Mission {
    constructor() {
        this.countdownX = 0;
        this.countdownY = 0;
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

    // Retourne les sujets partiellement cachés par un autre sujet dans le cadre
    getSuperposedSubjects(gameObjects, isSubject) {
        const field = this.getField(gameObjects);
        const superposed = [];
        gameObjects.forEach((subject, subjectIndex) => {
            if (!isSubject(subject) || !Util.rectsCollide(subject, field)) {
                return;
            }
            const hiddenByAnother = gameObjects.some((other, otherIndex) => {
                return isSubject(other)
                    && other.id !== subject.id
                    && otherIndex > subjectIndex
                    && Util.rectsCollide(other, field)
                    && Util.rectsCollide(subject, other);
            });
            if (hiddenByAnother) {
                superposed.push(subject);
            }
        });
        return superposed;
    }
}