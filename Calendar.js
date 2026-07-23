"use strict";

const WEEK_LENGTH = 5;
const WEEK_AMOUNT = 1;

const TOP_BASE_OFFSET = 100;
const TOP_SHIFT = 160;
const LEFT_BASE_OFFSET = 100;
const LEFT_SHIFT = 190;

class Calendar {
    constructor(calendarScreen) {
        this.screen = calendarScreen;
        this.screen.mainContainer.style.width = `${data.gameWidth}px`;
        this.screen.mainContainer.style.height = `${data.gameHeight}px`;
        this.screen.mainContainer.style.position = "relative";
        this.day = 1;

        this.circle = Util._createElement(`circleImage`, this.screen.mainContainer);
        this.circle.style.position = "absolute";
        this.circle.src = "images/calendar/placeholderCircle.png";
        this.circle.style.top = `${TOP_BASE_OFFSET}px`;
        this.circle.style.left = `${LEFT_BASE_OFFSET}px`;
    }

    nextDay() {
        Util.hide(this.circle);

        if(this.day > 0) {
            const newCross = Util._createElement(`crossImage`, this.screen.mainContainer);
            newCross.style.position = "absolute";
            newCross.src = "images/calendar/placeholderCross.png";

            newCross.style.top = this.circle.style.top;
            newCross.style.left = this.circle.style.left;
        }

        this.day += 1;

        setTimeout(
            () => {

                const circlePos = this.getPos(this.day);
                this.circle.style.top = `${circlePos.top}px`;
                this.circle.style.left = `${circlePos.left}px`;
                Util.show(this.circle);
            },
            500
        )

    }

    getPos(offset) {
        const top = TOP_BASE_OFFSET + Math.floor((offset - 1) / WEEK_LENGTH) * TOP_SHIFT;
        const left = LEFT_BASE_OFFSET + ((offset - 1) % WEEK_LENGTH) * LEFT_SHIFT;
        return {top, left};
    }
}
