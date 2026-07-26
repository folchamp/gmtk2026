"use strict";

class Calendar {
    constructor(calendarScreen, startTheDayMissionCallback, openOutroCallback) {
        this.calendarScreen = calendarScreen;
        this.startTheDayMissionCallback = startTheDayMissionCallback;
        this.openOutroCallback = openOutroCallback;
        this.day = 1;

        this.money = data.startingMoney;

        this.smartphone = Util.createDOMElement("smartphone", "div", calendarScreen.mainContainer);

        this.createCircle();
        this.createStartDayButton();
        this.createPayTaxesButton();
        this.createMoneyDisplay();

        this.smartphone.addEventListener("click", (event) => {
            this.smartphone.classList.toggle("showSmartphone");
        });

        this.crosses = [];
    }

    start() {
        this.welcomeAudio = soundManager.playSound("evele", 0.15);
        this.circle.classList.add("circleAnimation");
        this.smartphone.classList.add("showSmartphone");
        if (this.day >= data.totalGameDays){
            console.log("outro time");  // TODO changer l'appareil en portefeuille
        }
    }

    reset() {
        this.day = 1;
        this.moveCircle();
        this.money = data.startingMoney;
        this.updateMoneyDisplay();
        Util.hide(this.payTaxesButton);
        Util.show(this.startDayButton);
        for (const cross of this.crosses) {
            Util.hide(cross);
        }
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
            if (this.day <= data.totalGameDays) {
                this.startTheDayMissionCallback();
            } else {
                this.openOutroCallback(this.money > 0);
            }
            this.circle.classList.remove("circleAnimation");
        });
    }

    createPayTaxesButton() {
        this.payTaxesButton = Util.createDOMElement("payTaxesButton", "div", this.calendarScreen.mainContainer);
        this.payTaxesButton.innerText = "";

        this.payTaxesButton.addEventListener("click", (event) => {
            this.welcomeAudio.pause();
            soundManager.shutter();
            if (this.day <= data.totalGameDays) {
                this.startTheDayMissionCallback();
            } else {
                this.openOutroCallback(this.money > 0);
            }
            this.circle.classList.remove("circleAnimation");
        });

        Util.hide(this.payTaxesButton);
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
            this.crosses.push(cross);
        }
        this.day += 1;
        if (this.day > data.totalGameDays) {
            Util.show(this.payTaxesButton);
            Util.hide(this.startDayButton);
        }
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
