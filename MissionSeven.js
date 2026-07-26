"use strict";

class MissionSeven extends Mission {
    constructor() {
        super();
        this.countdownY = -47;
    }
    missionMove(dt, gameObjects) {
        // gameObjects.forEach((gameObject) => {
        // });
    }
    getScore(gameObjects) {
        // const field = this.getField(gameObjects);
        // let charactersInField = [];
        // gameObjects.forEach((gameObject) => {
        //     if (this.isCat(gameObject) && Util.rectsCollide(gameObject, field)) {
        //         charactersInField.push(gameObject);
        //     }
        // });
        // const charactersSuperposed = this.getSuperposedSubjects(gameObjects, this.isCat);

        return [
            {
                points: MissionSeven.missionData.pointsPerCharacterInField,
                text: `Cats in field 🙂`,
                total: MissionSeven.missionData.characters.length,
                value: charactersInField.length,
                highlights: charactersInField
            }
        ];
    }
    getMissionData() {
        // copie des données de mission
        const missionData = Util.deepCopy(MissionSeven.missionData);
        // missionData.objectsData.forEach((objectData) => {
        //     if (MissionSeven.missionData.characters.includes(objectData.id)) {
        //         objectData.bounds.x = Util.randomValue(0 + objectData.bounds.width, data.gameWidth - objectData.bounds.width);
        //         objectData.bounds.y = Util.randomValue(0 + objectData.bounds.height, data.gameHeight - objectData.bounds.height);
        //     }
        // });
        return missionData;
    }

    // isCat(gameObject) {
    //     return MissionSeven.missionData.characters.includes(gameObject.id);
    // }

    startMusic() {
        // soundManager.playSound("cancan", 0.15);
    }

    static missionData = {
        // pointsPerCharacterInField: 5,
        // pointsPerSuperposition: -2,
        characters: [
            // "cat1"
        ],
        objectsData: [{
            "id": "person1",
            "bounds": {
                "x": 540.2249299292527,
                "y": 437,
                "width": 142,
                "height": 234
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_seven/person.png"
            },
            "idealPosition": {
                "x": 540.2249299292527,
                "y": 437
            },
            "offset": {
                "x": 102,
                "y": 35
            }
        }, {
            "id": "panel",
            "bounds": {
                "x": 801,
                "y": 263,
                "width": 298,
                "height": 239
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_seven/pizza_panel.png"
            },
            "idealPosition": {
                "x": 801,
                "y": 263
            },
            "offset": {
                "x": 20,
                "y": 10
            }
        },
        {
            "id": "tower",
            "bounds": {
                "x": 309.33370068570764,
                "y": 123,
                "width": 247,
                "height": 423
            },
            "zIndex": 3,
            "caracs": {
                "isCollidable": false,
                "isGravitable": true,
                "isDraggable": true
            },
            "style": {
                "imagePath": "mission_seven/tower.png"
            },
            "idealPosition": {
                "x": 221,
                "y": 137
            },
            "offset": {
                "x": 20,
                "y": 10
            }
        },
        {
            "id": "field",
            "bounds": {
                "x": 237,
                "y": 114,
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
                "x": 237,
                "y": 114
            },
            "offset": {
                "x": 264,
                "y": 102
            }
        },
        {
            "id": "background",
            "bounds": {
                "x": 0,
                "y": 0,
                "width": 50,
                "height": 50
            },
            "zIndex": -2,
            "caracs": {
                "isCollidable": false,
                "isGravitable": false,
                "isDraggable": false
            },
            "style": {
                "imagePath": "mission_seven/pisa_background.png"
            },
            "idealPosition": {
                "x": 0,
                "y": 0
            },
            "offset": {
                "x": 0,
                "y": 0
            }
        },
        {
            "id": "ground3",
            "bounds": {
                "x": -112,
                "y": 546,
                "width": 1600,
                "height": 1000
            },
            "zIndex": 0,
            "caracs": {
                "isCollidable": true,
                "isGravitable": false,
                "isDraggable": false
            },
            "style": {
            },
            "idealPosition": {
                "x": -91,
                "y": 549
            },
            "offset": {
                "x": 0,
                "y": 0
            }
        }
        ]
    }
}