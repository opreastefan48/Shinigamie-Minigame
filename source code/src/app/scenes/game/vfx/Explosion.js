export default class Explosion extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene.layers.vfx.add(this);

        this.movespeed = 3;

        this.setup();
        this.scene.events.on('update', this.update, this);
        this.scene.events.once('gameover', this.stop, this);
    }

    setup() {
        this.sprite = this.scene.add.sprite(0, 0, 'explosion', 0);
        this.add(this.sprite);

        this.sprite.play('explosion');
        this.sprite.once('animationcomplete', () => {
            this.destroy();
        });

        this.scene.cameras.main.shake(300, 0.005);
        this.scene.game.audio.play('sound', 'explosion');
    }

    update() {
        this.x -= this.movespeed;
    }

    stop() {
        this.movespeed = 0;
    }

    destroy() {
        this.scene.events.off('update', this.update, this);
        this.scene.events.off('gameover', this.stop, this);
        super.destroy();
    }
}
