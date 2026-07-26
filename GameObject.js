"use strict"

class GameObject {
    constructor(id, bounds, zIndex, caracs, style, idealPosition, offset, sounds) {
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
        this.offset = offset;
        this.sounds = sounds;

        this.startPosition = { x: bounds.x, y: bounds.y };
        this.isDragged = false;
        this.vy = 0;
        this.vx = 0;
        this.totalDeltaPos = { x: 0, y: 0 };
        // TODO weigth

        this.highlighted = false;
        this.flashUntil = 0;
        this.popupText = "";
        this.popupStart = 0;

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
        return new GameObject(objectData.id, objectData.bounds, objectData.zIndex, objectData.caracs, objectData.style, objectData.idealPosition, objectData.offset, objectData.sounds);
    }

    drag() {
        this.isDragged = true;
        if (this.sounds) {
            soundManager.playRandomSound(this.sounds);
        }
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

    flash(duration) {
        this.flashUntil = Date.now() + duration;
    }

    popup(text) {
        this.popupText = text;
        this.popupStart = Date.now();
    }

    draw(context) {
        if (this.style.color !== undefined) {
            context.fillStyle = this.style.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.style.image !== undefined) {
            const flashing = Date.now() < this.flashUntil;
            if (flashing) {
                context.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(Date.now() / 100));
            }
            if (this.offset !== undefined) {
                context.drawImage(this.style.image, this.x - this.offset.x, this.y - this.offset.y);
            } else {
                context.drawImage(this.style.image, this.x, this.y);
            }
            if (flashing) {
                context.globalAlpha = 1;
            }
        }
        if (this.highlighted) {
            const arrowAnimationHeight = Math.sin(Date.now() * data.arrowSpeed) * data.arrowAmplitude;
            const offsetY = this.offset ? this.offset.y : 0;
            const spriteTop = this.y - offsetY;
            const arrowY = Math.min(this.y - this.height, spriteTop) - 10;
            context.drawImage(Util.images["arrow"], this.x, arrowY + arrowAnimationHeight);
        }
        const popupDelay = 600;
        const popupDuration = 2400;
        const popupElapsed = Date.now() - this.popupStart - popupDelay;
        if (this.popupText && popupElapsed >= 0 && popupElapsed < popupDuration) {
            const progress = popupElapsed / popupDuration;
            const offsetY = this.offset ? this.offset.y : 0;
            const spriteTop = this.y - offsetY;
            context.font = "28px pirkkala";
            context.textAlign = "center";
            context.strokeStyle = "white";
            context.fillStyle = this.popupText.startsWith("-") ? "red" : "green";
            context.globalAlpha = 1 - progress; // le score disparaît progressivement...
            const popupY = Math.max(28, spriteTop - 8 - 24 * progress); // ...et bouge vers le haut
            context.strokeText(this.popupText, this.x + this.width / 2, popupY);
            context.fillText(this.popupText, this.x + this.width / 2, popupY);
            context.globalAlpha = 1;
        }
    }
}