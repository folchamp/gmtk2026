"use strict";

class Screen {
    constructor(name) {
        this.name = name;

        Util.quickStructure(document.body, this,
            [`${name}Container`]
        );

        this.mainContainer = this[`${name}Container`];
    }

    // TODO
    // start, stop, hide, show
}