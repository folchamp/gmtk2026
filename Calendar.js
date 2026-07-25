"use strict";

class Calendar {
    constructor(calendarScreen, startTheDayMissionCallback) {
        this.calendarScreen = calendarScreen;
        this.startTheDayMissionCallback = startTheDayMissionCallback;
        this.day = 1;

        this.money = data.startingMoney;

        this.smartphone = Util.createDOMElement("smartphone", "div", calendarScreen.mainContainer);

        this.createCircle();
        this.createStartDayButton();
        this.createMoneyDisplay();

        this.smartphone.addEventListener("click", (event) => {
            this.smartphone.classList.toggle("showSmartphone");
        });
    }

    start() {
        this.welcomeAudio = soundManager.playSound("evele", 0.15);
        this.circle.classList.add("circleAnimation");
        this.smartphone.classList.add("showSmartphone");
    }

    createMoneyDisplay() {
        this.moneyDisplay = Util.createDOMElement("moneyDisplay", "span", this.smartphone);
        this.updateMoneyDisplay();
    }

    updateMoneyDisplay() {
        this.moneyDisplay.innerText = `${this.money}€`;
    }

    createStartDayButton() {
        this.startDayButton = Util.createDOMElement("startDayButton", "div", this.calendarScreen.mainContainer);
        this.startDayButton.innerText = "";

        this.startDayButton.addEventListener("click", (event) => {
            this.welcomeAudio.pause();
            soundManager.shutter();
            this.startTheDayMissionCallback();
            this.circle.classList.remove("circleAnimation");
        });
    }

    createCircle() {
        this.circle = Util.createDOMElement(`circleImage`, "img", this.calendarScreen.mainContainer);
        this.circle.src = "images/calendar/circle2.png";
        this.circle.style.top = `${data.calendarTopBaseOffset}px`;
        this.circle.style.left = `${data.calendarLeftBaseOffset}px`;
    }

    createCross() {
        const newCross = Util.createDOMElement(`crossImage`, "img", this.calendarScreen.mainContainer);
        newCross.style.position = "absolute";
        newCross.src = "images/calendar/cross.png";
        newCross.style.top = this.circle.style.top;
        newCross.style.left = this.circle.style.left;
        return newCross;
    }

    moveCircle() {
        const circlePos = this.getPos(this.day);
        this.circle.style.left = `${circlePos.left}px`;
        this.circle.style.top = `${circlePos.top}px`;
    }

    nextDay(moneyWon) {
        this.start();
        this.money += moneyWon;
        this.updateMoneyDisplay();
        if (this.day > 0) {
            const cross = this.createCross();
            // setTimeout(() => {
            cross.classList.add("crossAnimation");
            // }, 250);
        }
        this.day += 1;
        this.moveCircle();
        setTimeout(
            () => {
                this.circle.classList.add("circleAnimation");
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
