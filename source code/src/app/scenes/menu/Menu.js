import Music from './gui/Music';
import Sound from './gui/Sound';

export default class extends Phaser.Scene {
    constructor(name) {
        super(name);
    }

    create() {
        this.events.once('update', this.start, this);
    }

    start() {
        this.createLayers();
        this.createBackground();
        this.createHero();
        this.createTitle();
        this.createButton();
        this.createGUI();

        // this.scene.start('Game');
    }

    createLayers() {
        let names = ['background', 'ground', 'hero', 'obstacles', 'vfx', 'gui'];
        this.layers = {};
        names.forEach((name) => {
            this.layers[name] = this.add.container(0, 0);
        });
    }

    createBackground() {
        for (let i = 0; i < 5; i++) {
            let bg = this.add.sprite(0, 0, 'atlas', `background/bg_${i}`).setOrigin(0);
            this.layers.background.add(bg);
        }

        for (let i = 0; i < 4; i++) {
            let ground = this.add.sprite(i * 160, 170, 'atlas', 'ground/ground').setOrigin(0);
            this.layers.ground.add(ground);
        }
    }

    createHero() {
        this.hero = this.add.sprite(150, 158, 'char_idle', 0);
        this.hero.play('char_idle');
        this.layers.hero.add(this.hero);
    }

    createTitle() {
        let title = this.add.sprite(220, 20, 'atlas', 'title');
        this.layers.gui.add(title);

        this.tweens.add({
            targets: title,
            y: 25,
            duration: 500,
            yoyo: true,
            repeat: -1,
        });
    }

    createButton() {
        let x = this.cameras.main.centerX;
        let y = 195;
        let play = this.add.bitmapText(x, y, 'exo_extra_bold', 'START GAME', 24, 0);
        play.setOrigin(0.5);
        this.layers.gui.add(play);

        play.setInteractive({ useHandCursor: true });
        play.once('pointerdown', () => {
            this.game.audio.play('sound', 'click');
            play.setVisible(false);
            this.startGame();
        });

        this.tweens.add({
            targets: play,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1,
        });
    }

    createGUI() {
        let sound = new Sound(this, 20, 20).setScale(0.5);
        let music = new Music(this, 50, 20).setScale(0.5);
        let controls = this.add.sprite(305, 100, 'atlas', 'controls').setScale(0.35);
        this.layers.gui.add(controls);
    }

    async startGame() {
        await this.showHeroAnim();
        this.scene.start('Game');
    }

    showHeroAnim() {
        this.hero.play('char_run');

        return new Promise((resolve) => {
            this.tweens.add({
                targets: this.hero,
                duration: 1000,
                x: 400,
                onComplete: () => resolve(),
            });
        });
    }
}
