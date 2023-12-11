import Music from '../menu/gui/Music';
import Sound from '../menu/gui/Sound';
import Background from './background/Background';
import Controller from './controller/Controller';
import Ground from './ground/Ground';
import Score from './gui/Score';
import Hero from './hero/Hero';
import Spawner from './spawner/Spawner';

export default class extends Phaser.Scene {
    constructor(name) {
        super(name);
    }

    create() {
        this.events.once('update', this.start, this);
    }

    start() {
        this.createLayers();
        this.createGUI();

        this.background = new Background(this);
        this.ground = new Ground(this);
        this.hero = new Hero(this);

        this.spawner = new Spawner(this);

        this.score = new Score(this);

        this.controller = new Controller(this);
        this.controller.start(this.hero);
    }

    createLayers() {
        let names = ['background', 'ground', 'hero', 'obstacles', 'vfx', 'gui'];
        this.layers = {};
        names.forEach((name) => {
            this.layers[name] = this.add.container(0, 0);
        });
    }

    createGUI() {
        let sound = new Sound(this, 335, 20).setScale(0.5);
        let music = new Music(this, 365, 20).setScale(0.5);
    }
}
