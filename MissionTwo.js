"use strict";

class MissionTwo extends Mission {
    constructor() {
        super();
    }
    checkScore(gameObjects) {
        // TODO
    }
    getMissionData() {
        const missionData = Util.deepCopy(MissionTwo.missionData);
        return missionData;
    }
    missionMove(dt, gameObjects) {
        
    }

    static missionData = {
        animals: ["cow", "goat", "dog", "horse"],
        items: ["item1", "item2", "item3", "item4"],
        objectsData: [
            {
                id: "cow", bounds: { x: 10, y: 10, width: 194, height: 136 }, zIndex: 1,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/cow.png", color: undefined }
            },
            {
                id: "goat", bounds: { x: 30, y: 30, width: 192, height: 158 }, zIndex: 2,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/goat.png", color: undefined }
            },
            {
                id: "dog", bounds: { x: 20, y: 20, width: 136, height: 169 }, zIndex: 3,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/dog.png", color: undefined }
            },
            {
                id: "horse", bounds: { x: 20, y: 20, width: 136, height: 151 }, zIndex: 4,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: false },
                style: { imagePath: "mission_two/horse.png", color: undefined }
            },
            {
                id: "item1", bounds: { x: 10, y: 10, width: 146, height: 52 }, zIndex: 5,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item1.png", color: undefined }
            },
            {
                id: "item2", bounds: { x: 30, y: 30, width: 82, height: 82 }, zIndex: 6,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item2.png", color: undefined }
            },
            {
                id: "item3", bounds: { x: 20, y: 20, width: 137, height: 52 }, zIndex: 7,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item3.png", color: undefined }
            },
            {
                id: "item4", bounds: { x: 20, y: 20, width: 101, height: 71 }, zIndex: 8,
                caracs: { isCollidable: false, isGravitable: true, isDraggable: true },
                style: { imagePath: "mission_two/item4.png", color: undefined }
            },
            {
                id: "ground", bounds: { x: -200, y: 500, width: 1980, height: 300 }, zIndex: 0,
                caracs: { isCollidable: true, isGravitable: false, isDraggable: false },
                style: { imagePath: "mission_two/ground.png", color: undefined }
            },
        ]
    }
}