"use strict"

class GameObject {
    constructor(id, bounds, zIndex, caracs, style, idealPosition) {
        this.id = id;
        this.x = bounds.x;
        this.y = bounds.y;
        this.width = bounds.width;
        this.height = bounds.height;
        this.zIndex = zIndex;
        this.isCollidable = caracs.isCollidable;
        this.isGravitable = caracs.isGravitable;
        this.isDraggable = caracs.isDraggable;
        this.style = style;
        this.idealPosition = idealPosition;

        this.startPosition = { x: bounds.x, y: bounds.y };
        this.isDragged = false;
        this.vy = 0;
        this.vx = 0;
        this.totalDeltaPos = { x: 0, y: 0 };
        // TODO weigth

        GameObject.loadImage(this);
    }

    static loadImage(objectData) {
        if (objectData.style.imagePath !== undefined && objectData.style.image === undefined) {
            const img = new Image();
            img.src = `${data.imagesPath}${objectData.style.imagePath}`;
            objectData.style.image = img;

            Util.hide(img);
            document.body.appendChild(img);
        }
    }

    static load(objectData) {
        GameObject.loadImage(objectData);
        return new GameObject(objectData.id, objectData.bounds, objectData.zIndex, objectData.caracs, objectData.style, objectData.idealPosition);
    }

    displace(deltaPos) {
        this.totalDeltaPos.x += deltaPos.x;
        this.totalDeltaPos.y += deltaPos.y;
    }

    reset() {
        this.x = this.startPosition.x;
        this.y = this.startPosition.y;
        this.vy = 0;
        this.vx = 0;
    }

    move(otherObjects, dt) {
        if (Math.abs(this.totalDeltaPos.x) > 0 || Math.abs(this.totalDeltaPos.y) > 0) {
            this.x += this.totalDeltaPos.x;
            this.y += this.totalDeltaPos.y;
            this.vy = this.totalDeltaPos.y / dt;
            this.vx = this.totalDeltaPos.x / dt;
            this.totalDeltaPos = { x: 0, y: 0 };
        }
        if (this.isGravitable && !this.isDragged) {
            this.vy += data.gravity * dt;
            this.vx *= data.friction;
            this.y += this.vy * dt;
            this.x += this.vx * dt;
            otherObjects.forEach((object) => {
                if (Util.rectsCollide(this, object) && object.isCollidable) {
                    this.y = object.y - this.height;
                    this.vy = 0;
                }
            });
        }
    }

    draw(context) {
        if (this.style.color !== undefined) {
            context.fillStyle = this.style.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.style.image !== undefined) {
            context.drawImage(this.style.image, this.x, this.y);
        }
    }
}