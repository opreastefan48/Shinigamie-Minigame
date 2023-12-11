export default class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin', 0);
        this.scene.layers.obstacles.add(this);
        this.play('coin');

        this.hsp = 3;
        this.setScale(0.75);

        this.scene.events.emit('add_coin', this);
        this.scene.events.on('update', this.update, this);
        this.scene.events.once('gameover', this.stop, this);
    }

    update() {
        this.x -= this.hsp;
    }

    stop() {
        this.hsp = 0;
    }

    destroy() {
        this.scene.events.off('update', this.update, this);
        this.scene.events.off('gameover', this.stop, this);
        super.destroy();
    }
}
