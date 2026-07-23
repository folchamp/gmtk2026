"use strict"

class GameObject {
    constructor(x, y, width, height, zIndex, isCollidable, isGravitable, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.zIndex = zIndex;
        this.isCollidable = isCollidable;
        this.isGravitable = isGravitable;
        this.color = color;

        this.startPosition = { x: x, y: y };
        this.isDragged = false;
        this.vy = 0;
        this.vx = 0;
        this.totalDeltaPos = { x: 0, y: 0 };
        // this.lastDeltaPos = { x: 0, y: 0 };
        // this.isOnGround = false;
        // TODO weigth
    }

    displace(deltaPos) {
        // this.x += deltaPos.x;
        // this.y += deltaPos.y;

        this.totalDeltaPos.x += deltaPos.x;
        this.totalDeltaPos.y += deltaPos.y;

        // this.vx = Util.average()
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
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}