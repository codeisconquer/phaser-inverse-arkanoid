import { G } from "../../index";
import Singleton from "./Singleton";

export default class Controller {

    constructor(config) {

        this.emitter = config.emitter;
        this.emitter.on(G.SET_SCORE, this.setScore);
        this.emitter.on(G.UP_POINTS, this.upPoints);
        this.emitter.on(G.TOGGLE_SOUND, this.toggleSound);
        this.emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
    }


    toggleSound(val) {
        const s = new Singleton();
        s.model.soundOn = val;
    }

    toggleMusic(val) {
        const s = new Singleton();
        s.model.musicOn = val;
    }

    setScore(score) {
        const s = new Singleton();
        s.model.score = score;
    }

    upPoints(points) {
        const s = new Singleton();
        const model = s.model;
        var score = model.getScore();
        score += points;
        model.setScore(score);
    }
}
