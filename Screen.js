"use strict";

class Screen {
    constructor(name) {
        this.name = name;

        Util.quickStructure(document.body, this,
            [`${name}Container`]
        );

        this.mainContainer = this[`${name}Container`];
        this.stop();
    }

    start() {
        this.active = true;
        Util.show(this.mainContainer);
    }

    stop() {
        this.active = false;
        Util.hide(this.mainContainer);
    }
}
