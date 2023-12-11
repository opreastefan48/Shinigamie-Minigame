import Explosion from '../vfx/Explosion';

export default class FrontBullet extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene.layers.obstacles.add(this);

        this.dead = false;
        this.hsp = 5;

        this.setup();
        this.scene.events.on('update', this.update, this);
    }

    setup() {
        this.sprite = this.scene.add.sprite(0, 0, 'atlas', 'obstacles/bullet');
        this.sprite.setScale(-1, 1);
        this.add(this.sprite);

        this.collider = this.scene.add.sprite(-5, 0, 'atlas', 'blank');
        this.collider.setDisplaySize(12, 12);
        this.collider.setVisible(false);
        this.add(this.collider);

        this.scene.events.emit('add_obstacle', this);
    }

    update() {
        if (this.dead) return;

        this.x -= this.hsp;

        if (this.x < -50) {
            this.scene.events.emit('remove_obstacle', this);
            this.destroy();
            return;
        }
    }

    explode() {
        if (this.dead) return;

        this.dead = true;
        new Explosion(this.scene, this.x + 8, this.y);

        this.scene.events.emit('remove_obstacle', this);

        this.destroy();
    }

    destroy() {
        this.scene.events.off('update', this.update, this);
        super.destroy();
    }
}
