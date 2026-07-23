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

        this.isDragged = false;
        this.vy = 0;
        // this.isOnGround = false;
        // TODO weigth
    }

    move(otherObjects, dt) {
        if (this.isGravitable && !this.isDragged) { // !this.isOnGround && 
            this.vy += data.gravity * dt;
            this.y += this.vy * dt;
            otherObjects.forEach((object) => {
                if (Util.rectsCollide(this, object) && object.isCollidable) {
                    this.y = object.y - this.height;
                    this.vy = 0;
                    // console.log(this.y);
                }
            });
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}