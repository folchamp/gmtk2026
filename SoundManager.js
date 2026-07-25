"use strict";

class SoundManager {
    constructor() {
        // Sound
        this.soundMute = false;
        this.sounds = {}
        data.sounds.forEach((name) => {
            this.sounds[name] = new Audio(`sounds/${name}.mp3`);
        });

        this.shutterTop = document.getElementById("shutterTop");
        this.shutterBottom = document.getElementById("shutterBottom");
    }

    //Sound Management
    toggleSoundMute() {
        this.soundMute = !this.soundMute;
    }

    playSound(sound, volume) {
        if (this.soundMute) { return; }
        const audio = this.sounds[sound]; // on utilise la version pré-chargée pour éviter une latence la première fois qu'on joue un son
        if (volume !== undefined) {
            audio.volume = volume;
        }
        audio.play();
        this.sounds[sound] = new Audio(this.sounds[sound].src); // on remplace pour s'assurer de pouvoir jouer le même son (sans devoir attendre la fin du précédent)
        return audio;
    }

    playRandomSound(array) {
        const sound = Util.randomFromArray(array);
        this.playSound(sound);
    }

    shutter() {
        soundManager.playSound("button");
        this.shutterTop.classList.remove("open");
        this.shutterBottom.classList.remove("open");
        setTimeout(() => {
            this.shutterTop.classList.add("open");
            this.shutterBottom.classList.add("open");
        }, 100);
    }

    playWhenReady(sound) {
        this.playSound(sound);
    }
}