export default class extends Phaser.Scene {
    constructor(name) {
        super(name);
    }

    init() {
        let cx = this.cameras.main.centerX;
        let cy = this.cameras.main.centerY;

        let x = cx;
        let y = cy - 30;
        let logo = new Phaser.GameObjects.Sprite(this, x, y, 'preload_logo').setScale(0.3);
        this.add.existing(logo);

        x = cx;
        y = logo.getBounds().bottom + 20;
        let bar = new Phaser.GameObjects.Sprite(this, x, y, 'preload_bar').setScale(0.3);
        this.add.existing(bar);

        let width = bar.displayWidth;
        let height = bar.displayHeight;

        this.load.on('progress', (value) => {
            let scale = width * value;
            bar.setCrop(0, 0, scale, height);
        });
    }

    preload() {
        // fonts
        let fonts = ['roboto', 'exo_extra_bold'];
        fonts.forEach((font) => this.load.bitmapFont(font, `assets/fonts/${font}_0.png`, `assets/fonts/${font}.fnt`));

        // audiosprites
        this.game.audio.load(this, ['sound', 'music']);

        // spritesheets
        this.load.spritesheet('char_run', 'assets/images/char_run.png', {
            frameWidth: 23,
            frameHeight: 34,
        });

        this.load.spritesheet('char_idle', 'assets/images/char_idle.png', {
            frameWidth: 21,
            frameHeight: 35,
        });

        this.load.spritesheet('explosion', 'assets/images/explosion.png', {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet('coin', 'assets/images/coin.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

        // atlases
        this.load.setPath(`assets/images`);
        this.load.multiatlas('atlas', `atlas.json?v=${Math.random()}`);

        // spine
        // this.load.setPath('assets/spine');
        // this.load.spine('hero', 'hero.json', 'hero.atlas', true);
    }

    createAnimations() {
        this.anims.create({
            key: 'char_run',
            frames: this.anims.generateFrameNumbers('char_run'),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'char_idle',
            frames: this.anims.generateFrameNumbers('char_idle'),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin'),
            frameRate: 12,
            repeat: -1,
        });
    }

    create() {
        this.createAnimations();
        this.game.audio.play('music', 'ost');
        // this.scene.start('Game');
        this.scene.start('Menu');
    }
}
