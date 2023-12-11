import Explosion from '../vfx/Explosion';
import Trace from '../vfx/Trace';

export default class Fireball extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene.layers.obstacles.add(this);

        this.dead = false;
        this.groundY = 168;
        this.hsp = 2;
        this.vsp = 4;

        this.setup();
        this.scene.events.on('update', this.update, this);
    }

    setup() {
        this.sprite = this.scene.add.sprite(0, 0, 'atlas', 'obstacles/fireball');
        this.add(this.sprite);

        this.collider = this.scene.add.sprite(0, 6, 'atlas', 'blank');
        this.collider.setDisplaySize(10, 10);
        this.collider.setVisible(false);
        this.add(this.collider);

        this.scene.events.emit('add_obstacle', this);
    }

    update() {
        if (this.dead) return;

        this.x -= this.hsp;
        this.y += this.vsp;

        if (this.x < -30) {
            this.destroy();
            return;
        }

        if (this.y >= this.groundY) {
            this.explode();
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
