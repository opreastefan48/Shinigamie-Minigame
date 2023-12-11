export default class Ground extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);
        this.scene.layers.ground.add(this);

        this.speed = 3;
        this.sprites = [];

        this.setup();
        this.scene.events.on('update', this.update, this);
        this.scene.events.once('gameover', this.stop, this);
    }

    setup() {
        let startX = 0;
        let startY = 170;
        let width = 160;

        for (let i = 0; i < 4; i++) {
            let x = startX + i * width;
            let y = startY;
            let sprite = this.scene.add.sprite(x, y, 'atlas', 'ground/ground');
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
        if (firstSprite.x <= -160) {
            this.sprites.shift();
            firstSprite.x = lastSprite.x + 160;
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
