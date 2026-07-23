"use strict";

class Util {
    static texts = {};

    static hide(element) {
        element.classList.add("hidden");
    }

    static show(element) {
        element.classList.remove("hidden");
    }

    static saveToLocalStorage(name, data) {
        if (Settings.appName === undefined) {
            throw "Util.js requires an app name";
        }
        localStorage.setItem(`${Settings.appName}_${name}`, JSON.stringify(data));
    }

    static getFromLocalStorage(name) {
        let item;
        try {
            item = JSON.parse(localStorage.getItem(`${Settings.appName}_${name}`));
        } catch (error) {
            console.log(`Error, ${name} in localStorage couldn"t be fetched`);
        }
        return item;
    }

    static deepCopy(something) {
        return JSON.parse(JSON.stringify(something));
    }

    static objectToList(thing) {
        let list = [];
        for (let att in thing) {
            list.push(thing[att]);
        }
        return list;
    }

    static _createElement(name, parent) {
        let elementToReturn = undefined;
        if (name.endsWith("Text")) {
            elementToReturn = Util.createDOMElement(name, "span", parent);
        } else if (name.endsWith("Title")) {
            elementToReturn = Util.createDOMElement(name, "p", parent);
        } else if (name.endsWith("Label")) {
            elementToReturn = Util.createDOMElement(name, "label", parent);
        } else if (name.endsWith("Input")) {
            elementToReturn = Util.createDOMElement(name, "input", parent);
        } else if (name.endsWith("Button")) {
            elementToReturn = Util.createDOMElement(name, "button", parent);
        } else if (name.endsWith("Li")) {
            elementToReturn = Util.createDOMElement(name, "li", parent);
        } else if (name.endsWith("Container")) {
            elementToReturn = Util.createDOMElement(name, "div", parent);
        } else if (name.endsWith("Image")) {
            elementToReturn = Util.createDOMElement(name, "img", parent);
        } else if (name.endsWith("Canvas")) {
            elementToReturn = Util.createDOMElement(name, "canvas", parent);
        } else {
            throw `type ${name} not supported`;
        }
        return elementToReturn;
    }

    static quickStructure(parent, self, structure) {
        if (typeof structure === "string") {
            const name = structure;
            self[name] = Util._createElement(name, parent);
        } else {
            const name = structure.shift();
            self[name] = Util._createElement(name, parent);
            structure.forEach((structurePart) => {
                Util.quickStructure(self[name], self, structurePart);
            });
        }
    }

    static createDOMElement(name, type, parent) {
        const element = document.createElement(type);
        element.classList.add(name);
        parent.appendChild(element);
        if (type === "span" || type === "p" || type === "button") {
            element.innerText = Util.texts[name];
        }
        return element;
    }

    static checkUsername(username) {
        if (username === undefined) {
            throw "error_no_username";
        }
        if (typeof username !== "string") {
            throw "error_username_not_string";
        }
        if (username.length < 4) {
            throw "error_username_too_short";
        }
        if (username.length > 32) {
            throw "error_username_too_long";
        }
    }

    static checkPassword(password) {
        if (password === undefined) {
            throw "error_no_password";
        }
        if (typeof password !== "string") {
            throw "error_password_not_string";
        }
        if (password.length < 8) {
            throw "error_password_too_short";
        }
        if (password.length > 64) {
            throw "error_password_too_long";
        }
    }

    static getNewID() {
        let UUID = Util.randomValue(100000, 999999) + "-not-unique-" + Util.randomValue(100000, 999999) + "-" + Util.randomValue(100000, 999999);
        if (crypto && crypto.randomUUID) {
            UUID = crypto.randomUUID();
        }
        return UUID;
    }

    static randomValue(min, max) {
        const span = max - min + 1;
        const randomNumber = Math.random();
        const rectifiedRandom = Math.floor(min + randomNumber * span);
        return rectifiedRandom;
    }

    static randomFromArray(array) {
        if (array.length === 0) {
            throw new Error("You cannot pick a random element from an empty array.");
        }
        return array[Math.floor(Math.random() * array.length)];
    }

    static fillCircle(context, position, offset, radius) {
        context.beginPath();
        context.arc(position.x + offset.x, position.y + offset.y, radius, 0, Math.PI * 2);
        context.fill();
    }

    static distance(pos1, pos2) {
        return Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y);
    }

    static orthogonalDistance(pos1, pos2) {
        return Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);
    }

    static getMousePosition(element, event) {
        let bounding = element.getBoundingClientRect()
        let position = {
            x: event.clientX - bounding.left,
            y: event.clientY - bounding.top
        }
        return position;
    }

    static isInRect(pos, rect) {
        return (
            pos.x >= rect.x &&
            pos.x <= rect.x + rect.width &&
            pos.y >= rect.y &&
            pos.y <= rect.y + rect.height
        );
    }
    static rectsCollide(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    static average(a, b) {
        return (a + b) / 2;
    }
}