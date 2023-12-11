export default class Layer extends Phaser.GameObjects.Container {
    constructor(scene, id, speed) {
        super(scene, 0, 0);

        this.id = id;
        this.speed = speed;
        this.sprites = [];

        this.setup();
        this.scene.events.on('update', this.update, this);
        this.scene.events.once('gameover', this.stop, this);
    }

    setup() {
        let texture = `background/bg_${this.id}`;

        let width = 384;
        for (let i = 0; i < 3; i++) {
            let x = i * width;
            let y = 0;
            let sprite = this.scene.add.image(x, y, 'atlas', texture);
            sprite.setOrigin(0);
            this.add(sprite);

            this.sprites.push(sprite);
        }
    }

    update() {
        this.sprites.forEach((sprite) => {
            sprite.x -= this.speed;
        });

        let firstSprite = this.sprites[0];
        let lastSprite = this.sprites[this.sprites.length - 1];
        if (firstSprite.x <= -384) {
            this.sprites.shift();
            firstSprite.x = lastSprite.x + 384;
            this.sprites.push(firstSprite);
        }
    }

    stop() {
        this.speed = 0;
    }

    destroy() {
        this.scene.events.off('update', this.update, this);
        this.scene.events.off('gameover', this.stop, this);
        super.destroy();
    }
}
