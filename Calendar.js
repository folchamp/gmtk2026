"use strict";

class Calendar {
    constructor(calendarScreen, startTheDayMissionCallback) {
        this.calendarScreen = calendarScreen;
        this.startTheDayMissionCallback = startTheDayMissionCallback;
        this.day = 1;

        this.createCircle();
        this.createStartDayButton();
    }

    createStartDayButton() {
        this.startDayButton = Util.createDOMElement("startDayButton", "button", this.calendarScreen.mainContainer);
        this.startDayButton.innerText = "";

        this.startDayButton.addEventListener("click", (event) => {
            this.startTheDayMissionCallback();
        });
    }

    createCircle() {
        this.circle = Util.createDOMElement(`circleImage`, "img", this.calendarScreen.mainContainer);
        this.circle.style.position = "absolute";
        this.circle.src = "images/calendar/circle.png";
        this.circle.style.top = `${data.calendarTopBaseOffset}px`;
        this.circle.style.left = `${data.calendarLeftBaseOffset}px`;
    }

    createCross() {
        const newCross = Util.createDOMElement(`crossImage`, "img", this.calendarScreen.mainContainer);
        newCross.style.position = "absolute";
        newCross.src = "images/calendar/placeholderCross.png";

        newCross.style.top = this.circle.style.top;
        newCross.style.left = this.circle.style.left;
        return newCross;
    }

    moveCircle() {
        const circlePos = this.getPos(this.day);
        this.circle.style.left = `${circlePos.left}px`;
        this.circle.style.top = `${circlePos.top}px`;
    }

    nextDay() {
        if (this.day > 0) {
            this.createCross();
        }
        this.day += 1;
        Util.hide(this.circle);
        this.moveCircle();
        setTimeout(
            () => {
                Util.show(this.circle);
            },
            500
        );
    }

    getPos(offset) {
        const top = data.calendarTopBaseOffset + Math.floor((offset - 1) / data.weekLength) * data.calendarTopShift;
        const left = data.calendarLeftBaseOffset + ((offset - 1) % data.weekLength) * data.calendarLeftShift;
        return { top, left };
    }
}
