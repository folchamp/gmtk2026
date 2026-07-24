"use strict";

class MissionFour extends Mission {
    constructor() {
        super();
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
            if (gameObject.idealPosition !== undefined && (Util.distance(gameObject, gameObject.idealPosition) < MissionFour.missionData.snapDistance)) {
                gameObject.x = gameObject.idealPosition.x;
                gameObject.y = gameObject.idealPosition.y;
            }
        });
    }
    getScore(gameObjects) {
        let wellPlacedTiles = 0;
        let totalTiles = 0;
        gameObjects.forEach((gameObject) => {
            if (gameObject.id.startsWith("puzzle")) {
                totalTiles++;
                if (gameObject.idealPosition.x === gameObject.x && gameObject.idealPosition.y === gameObject.y) {
                    wellPlacedTiles++;
                }
            }
        });
        return [{ points: MissionFour.missionData.pointsPerTile, text: `Correctly placed tiles 🙂`, total: totalTiles, value: wellPlacedTiles, highlights: [] }];
    }
    getMissionData() {
        // copie des données de mission
        const missionData = Util.deepCopy(MissionFour.missionData);
        // on shuffle la liste de positions possibles
        Util.shuffleArray(missionData.randompositions);
        // on donne une des positions à chaque objet
        missionData.objectsData.forEach((objectData) => {
            const randomPos = missionData.randompositions.shift();
            objectData.bounds.x = randomPos.x;
            objectData.bounds.y = randomPos.y;
        });
        // on shuffle les gameObjects
        Util.shuffleArray(missionData.objectsData);
        // on remet leur meilleurs position à un certain nombres d'objets (parce que le jeu est trop dur sinon), déterminé par la variable difficulty
        for (let index = 0; index < missionData.objectsData.length; index++) {
            const objectData = missionData.objectsData[index];
            if (index < missionData.difficulty) {
                objectData.bounds.x = objectData.idealPosition.x;
                objectData.bounds.y = objectData.idealPosition.y;
            }
            // et on ajuste le zindex pour que les tuiles mal placées ne soient pas cachées en dessous des tuiles bien placéees
            objectData.zIndex = index;
        }
        return missionData;
    }

    static missionData = {
        pointsPerTile: 10,
        snapDistance: 15,
        difficulty: 5, // 0 = hard
        worst: 5000,
        best: 10,
        randompositions: [{ x: 0, y: 0 }, { x: 324, y: 0 }, { x: 620, y: 0 }, { "x": 803, "y": 0 }, { "x": 1024, "y": 372 }, { "x": 739, "y": 351 }, { "x": 482, "y": 319 }, { "x": 0, "y": 358 }, { "x": 125, "y": 362 }],
        objectsData: []
    }
}