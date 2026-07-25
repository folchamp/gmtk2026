"use strict";

class SoundManager {
    constructor() {
        // Sound
        this.soundMute = false;
        this.sounds = {}
        data.sounds.forEach((name) => {
            this.sounds[name] = new Audio(`sounds/${name}.mp3`);
        });
    }

    //Sound Management
    toggleSoundMute() {
        this.soundMute = !this.soundMute;
    }

    playSound(sound) {
        if (this.soundMute) { return; }
        const audio = this.sounds[sound]; // on utilise la version pré-chargée pour éviter une latence la première fois qu'on joue un son
        audio.play();
        this.sounds[sound] = new Audio(this.sounds[sound].src); // on remplace pour s'assurer de pouvoir jouer le même son (sans devoir attendre la fin du précédent)
    }

    playRandomSound(array) {
        const sound = Util.randomFromArray(array);
        this.playSound(sound);
    }
}