"use strict";

class MissionFive extends Mission {
    constructor() {
        super();
        this.countdownY = -47;
    }
    getScore(gameObjects) {
        let animalsInField = [];
        let superpositions = [];
        let partiallyOutside = [];
        let score = [];
        let alreadyCounted = [];

        const field = this.getField(gameObjects);
        // checker si tous les animaux sont dans le cadre
        // checker si les animaux sont bien éparpillés et ne se superposent pas
        gameObjects.forEach((gameObject) => {
            if (this.isAnimal(gameObject) && Util.rectsCollide(gameObject, field)) {
                animalsInField.push(gameObject);
                gameObjects.forEach((gameObject2) => {
                    if (this.isAnimal(gameObject2)
                        && gameObject.id !== gameObject2.id
                        && Util.rectsCollide(gameObject, gameObject2)
                        && !alreadyCounted.includes(gameObject.id)) {
                        superpositions.push(gameObject);
                        alreadyCounted.push(gameObject.id);
                    }
                    if (((gameObject2.id === "left_boundary") || (gameObject2.id === "right_boundary")) && Util.rectsCollide(gameObject, gameObject2)) {
                        partiallyOutside.push(gameObject);
                    }
                });
            }
        });
        score.push({ points: MissionFive.missionData.pointsPerCharacterInField, text: `Animals in field 🙂`, total: MissionFive.missionData.allAnimals.length, value: animalsInField.length, highlights: animalsInField });
        score.push({ points: MissionFive.missionData.pointsPerSuperposition, text: `Superpositions ☹️`, total: MissionFive.missionData.allAnimals.length, value: superpositions.length, highlights: superpositions });
        score.push({ points: MissionFive.missionData.pointsPerOutside, text: `Partially outside ☹️`, total: MissionFive.missionData.allAnimals.length, value: partiallyOutside.length, highlights: partiallyOutside });
        if (this.isMoneyGrabbed(gameObjects)) {
            score.push({ points: MissionFive.missionData.pointsIfMoneyGrabbed, text: `Money grabbed 🙂`, total: 1, value: 1, highlights: [this.getMoney(gameObjects)] });

        }
        return score;
    }
    isMoneyGrabbed(gameObjects) {
        const money = this.getMoney(gameObjects);
        return money.isDragged;
    }
    getMoney(gameObjects) {
        let item;
        gameObjects.forEach((gameObject) => {
            if (gameObject.id === "item2") {
                item = gameObject;
            }
        });
        return item;
    }
    getMissionData() {
        const missionData = Util.deepCopy(MissionFive.missionData);
        return missionData;
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
            if (this.isAnimal(gameObject)) {
                const favoriteFood = MissionFive.missionData.animals[gameObject.id];
                gameObjects.forEach((foodIHope) => {
                    if (foodIHope.id === favoriteFood) {
                        const animalToMove = gameObject;
                        const foodToEat = foodIHope;
                        this.calcSpeed(animalToMove, foodToEat, dt);
                    }
                });
            }
        });
    }
    calcSpeed(animal, food, dt) {
        const directionToFood = Math.sign(food.x - animal.x);
        const directionToRun = Math.sign(animal.idealPosition.x - animal.x);
        if (Math.abs(food.x - animal.x) < MissionFive.missionData.grabDistance) { // assez proche pour attraper la nourriture
            if (Math.abs(animal.idealPosition.x - animal.x) > MissionFive.missionData.runDistance) { // encore loin du lieu de fuite
                animal.vx = directionToRun * MissionFive.missionData.acceleration[animal.id]; // fuite
            }
            food.x = animal.x; // la bouffe colle à l'animal
        } else {
            animal.vx = directionToFood * MissionFive.missionData.acceleration[animal.id]; // course vers la bouffe
        }
    }
    isAnimal(gameObject) {
        return MissionFive.missionData.animals[gameObject.id] !== undefined;
    }

    startMusic() {
        soundManager.playSound("oldmac", 0.15);
    }

    static missionData = {
        pointsPerCharacterInField: 20,
        pointsPerSuperposition: -5,
        pointsPerOutside: -5,
        pointsIfMoneyGrabbed: 100,
        grabDistance: 10,
        runDistance: 30,
        acceleration: { chicken: 0.06, cow: 0.08, donkey: 0.18, wolf: 0.12 },
        animals: { "chicken": "item3", "cow": "item4", "donkey": "item2", "wolf": "item1" },
        allAnimals: ["chicken", "donkey", "wolf", "cow"],
        objectsData: [{
            "id": "chicken",
            "bounds": {
                "x": 24.954519588860038,
                "y": 414,
                "width": 81,
                "height": 94
            },
            "zIndex": 1,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": false
            },
            "style": {
                "imagePath": "mission_five/Chick.png"
            },
            "idealPosition": {
                "x": 24.954519588860038,
                "y": 414
            },
            "offset": {
                "x": 55,
                "y": 106
            },
            "sounds": [
                "kot", "kot2", "kot3"
            ]
        },
        {
            "id": "cow",
            "bounds": {
                "x": 1098.8502688357225,
                "y": 377,
                "width": 148,
                "height": 148
            },
            "zIndex": 2,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": false
            },
            "style": {
                "imagePath": "mission_five/Cow.png"
            },
            "idealPosition": {
                "x": 1098.8502688357225,
                "y": 377
            },
            "offset": {
                "x": 22,
                "y": 52
            }
        },
        {
            "id": "donkey",
            "bounds": {
                "x": 89.56243824154791,
                "y": 414,
                "width": 127,
                "height": 133
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": false
            },
            "style": {
                "imagePath": "mission_five/Dunkey.png"
            },
            "idealPosition": {
                "x": 89.56243824154791,
                "y": 414
            },
            "offset": {
                "x": 47,
                "y": 56
            }
        },
        {
            "id": "wolf",
            "bounds": {
                "x": 1000.4244777731591,
                "y": 400,
                "width": 113,
                "height": 153
            },
            "zIndex": 4,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": false
            },
            "style": {
                "imagePath": "mission_five/woulf.png"
            },
            "idealPosition": {
                "x": 1000.4244777731591,
                "y": 400
            },
            "offset": {
                "x": 35,
                "y": 45
            }
        },
        {
            "id": "item1",
            "bounds": {
                "x": 1000.4244777731591,
                "y": 498,
                "width": 121,
                "height": 51
            },
            "zIndex": 5,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_five/item_bone4woulf.png"
            },
            "idealPosition": {
                "x": 1000.4244777731591,
                "y": 498
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "sounds": [
                "ouaf", "aouh"
            ]
        },
        {
            "id": "item2",
            "bounds": {
                "x": 404,
                "y": 468,
                "width": 120,
                "height": 90
            },
            "zIndex": 6,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_five/item_money4dunkey.png"
            },
            "idealPosition": {
                "x": 404,
                "y": 468
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "sounds": [
                "han", "hihan", "hii"
            ]
        },
        {
            "id": "item3",
            "bounds": {
                "x": 608.2017271265497,
                "y": 452,
                "width": 122,
                "height": 97
            },
            "zIndex": 7,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_five/item_seeds4chickpng.png"
            },
            "idealPosition": {
                "x": 608.2017271265497,
                "y": 452
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "sounds": [
                "kot", "kot2", "kot3", "kodek"
            ]
        },
        {
            "id": "item4",
            "bounds": {
                "x": 787.7342146050346,
                "y": 449,
                "width": 83,
                "height": 87
            },
            "zIndex": 8,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_five/item_wheat4cow.png"
            },
            "idealPosition": {
                "x": 787.7342146050346,
                "y": 449
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "sounds": [
                "meuh", "meuh2"
            ]
        },
        {
            id: "ground", bounds: { x: -200, y: 550, width: 1980, height: 10 }, zIndex: -2,
            caracs: { isCollidable: true, isGravitable: false, isDraggable: false },
            style: { color: "black" },
            idealPosition: { x: 1000, y: 10 }
        },
        {
            id: "background", bounds: { x: 0, y: 0, width: 0, height: 0 }, zIndex: 0,
            caracs: { isCollidable: false, isGravitable: false, isDraggable: false },
            style: { imagePath: "mission_five/background_farm.png" },
            idealPosition: { x: 1000, y: 10 }
        },
        {
            "id": "right_boundary",
            "bounds": {
                "x": 992,
                "y": -14,
                "width": 500,
                "height": 1000
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": false,
                "isDraggable": false
            },
            "style": {
            },
            "idealPosition": {
                "x": 992,
                "y": -14
            }
        }, {
            "id": "left_boundary",
            "bounds": {
                "x": -11,
                "y": -22,
                "width": 300,
                "height": 1000
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": false,
                "isDraggable": false
            },
            "style": {
            },
            "idealPosition": {
                "x": -11,
                "y": -22
            }
        },
        {
            "id": "field",
            "bounds": {
                "x": 230,
                "y": 113,
                "width": 750,
                "height": 500
            },
            "zIndex": 99,
            "caracs": {
                "isCollidable": false,
                "isGravitable": false,
                "isDraggable": false
            },
            "style": {
                "imagePath": "common/Camera_Overlay.png"
            },
            "idealPosition": {
                "x": 230,
                "y": 113
            },
            "offset": {
                "x": 264,
                "y": 102
            }
        }
        ]
    }
}