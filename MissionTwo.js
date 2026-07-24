"use strict";

class MissionTwo extends Mission {
    constructor() {
        super();
    }
    checkScore(gameObjects) {
        let animalsInField = 0;
        let superpositions = 0;
        let partiallyOutside = 0;
        const field = this.getField(gameObjects);
        // checker si tous les animaux sont dans le cadre
        // checker si les animaux sont bien éparpillés et ne se superposent pas
        gameObjects.forEach((gameObject) => {
            if (this.isAnimal(gameObject) && Util.rectsCollide(gameObject, field)) {
                animalsInField++;
                gameObjects.forEach((gameObject2) => {
                    if (this.isAnimal(gameObject2) && gameObject.id !== gameObject2.id && Util.rectsCollide(gameObject, gameObject2)) {
                        superpositions++;
                    }
                    if (((gameObject2.id === "left_boundary") || (gameObject2.id === "right_boundary")) && Util.rectsCollide(gameObject, gameObject2)) {
                        partiallyOutside++;
                    }
                });
            }
        });
        // afficher le score en pourcentage
        // TODO
        alert(`Animals in field 😊 : ${animalsInField}\nSuperpositions ☹️ : ${superpositions / 2}\nAnimals partially outside ☹️ : ${partiallyOutside}`);
    }
    getMissionData() {
        const missionData = Util.deepCopy(MissionTwo.missionData);
        return missionData;
    }
    missionMove(dt, gameObjects) {
        gameObjects.forEach((gameObject) => {
            if (this.isAnimal(gameObject)) {
                const favoriteFood = MissionTwo.missionData.animals[gameObject.id];
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
        if (Math.abs(food.x - animal.x) < MissionTwo.missionData.grabDistance) { // assez proche pour attraper la nourriture
            if (Math.abs(animal.idealPosition.x - animal.x) > MissionTwo.missionData.runDistance) { // encore loin du lieu de fuite
                animal.vx = directionToRun * MissionTwo.missionData.acceleration[animal.id] * dt; // fuite
            }
            food.x = animal.x; // la bouffe colle à l'animal
        } else {
            animal.vx = directionToFood * MissionTwo.missionData.acceleration[animal.id] * dt; // course vers la bouffe
        }
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
    isAnimal(gameObject) {
        return MissionTwo.missionData.animals[gameObject.id] !== undefined;
    }

    static missionData = {
        grabDistance: 10,
        runDistance: 30,
        acceleration: { cow: 0.006, goat: 0.008, dog: 0.018, horse: 0.012 },
        animals: { "cow": "item1", "goat": "item2", "dog": "item3", "horse": "item4" },
        objectsData: [
            {
                id: "cow", bounds: { x: 10, y: 10, width: 194, height: 136 }, zIndex: 1,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/cow.png", color: undefined },
                idealPosition: { x: 10, y: 10 }
            },
            {
                id: "goat", bounds: { x: 30, y: 30, width: 192, height: 158 }, zIndex: 2,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/goat.png", color: undefined },
                idealPosition: { x: 1100, y: 10 }
            },
            {
                id: "dog", bounds: { x: 1000, y: 20, width: 136, height: 169 }, zIndex: 3,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/dog.png", color: undefined },
                idealPosition: { x: 100, y: 10 }
            },
            {
                id: "horse", bounds: { x: 1000, y: 20, width: 136, height: 151 }, zIndex: 4,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/horse.png", color: undefined },
                idealPosition: { x: 1215, y: 10 }
            },
            {
                id: "item1", bounds: { x: 10, y: 10, width: 146, height: 52 }, zIndex: 5,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item1.png", color: undefined },
                idealPosition: { x: 1000, y: 10 }
            },
            {
                id: "item2", bounds: { x: 1090, y: 30, width: 82, height: 82 }, zIndex: 6,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item2.png", color: undefined },
                idealPosition: { x: 1000, y: 10 }
            },
            {
                id: "item3", bounds: { x: 1000, y: 20, width: 137, height: 52 }, zIndex: 7,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item3.png", color: undefined },
                idealPosition: { x: 1000, y: 10 }
            },
            {
                id: "item4", bounds: { x: 10, y: 20, width: 101, height: 71 }, zIndex: 8,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item4.png", color: undefined },
                idealPosition: { x: 1000, y: 10 }
            },
            {
                id: "ground", bounds: { x: -200, y: 500, width: 1980, height: 300 }, zIndex: 0,
                caracs: { isCollidable: true, isGravitable: false, isDraggable: false },
                style: { imagePath: "mission_two/ground.png", color: undefined },
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
            }
        ]
    }
}