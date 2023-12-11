import { sample } from 'lodash';

export default class Trace extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene.layers.vfx.add(this);

        this.setup();
    }

    setup() {
        let colors = [0xdf3e23, 0xfffc40, 0xffffff];
        let sizes = [1, 2, 3, 4];

        let tint = sample(colors);
        let size = sample(sizes);
        // let alpha = Math.random() + 0.2;
        // let life = Math.random() * 0.5 + 20;

        let alpha = 1;
        let life = 150;

        // console.log(alpha, life);

        this.sprite = this.scene.add.sprite(0, 0, 'atlas', 'blank');
        this.sprite.setDisplaySize(size, size);
        this.sprite.setAlpha(alpha);
        this.sprite.setTint(tint);
        this.add(this.sprite);

        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            duration: life,
            ease: Phaser.Math.Easing.Linear,
            onComplete: () => {
                this.destroy();
            },
        });
    }
}
