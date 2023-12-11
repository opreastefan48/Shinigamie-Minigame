const STATE = {
    RUN: 'run',
    JUMP: 'jump',
    DEAD: 'dead',
};

export default class Hero extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 100, 158);
        this.scene.layers.hero.add(this);

        this.movespeed = 2;
        this.jumpspeed = 3;
        this.gravity = 0.15;
        this.vsp = 0;
        this.groundY = this.y;

        this.state = STATE.RUN;
        this.osc = { left: false, right: false, up: false };

        this.setup();
        this.scene.events.on('update', this.update, this);
    }

    static get STATE() {
        return STATE;
    }

    setup() {
        this.anim = this.scene.add.sprite(0, 0, 'char_run', 0);
        this.anim.play('char_run');
        this.add(this.anim);

        this.collider = this.scene.add.sprite(0, 0, 'atlas', 'blank');
        this.collider.setDisplaySize(16, 28);
        this.collider.setVisible(false);
        this.add(this.collider);

        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();

        // on screen controls
        this.oscLeft = this.scene.add.sprite(30, 195, 'atlas', 'left').setScale(0.4);
        this.scene.layers.gui.add(this.oscLeft);

        this.oscRight = this.scene.add.sprite(65, 195, 'atlas', 'right').setScale(0.4);
        this.scene.layers.gui.add(this.oscRight);

        this.oscUp = this.scene.add.sprite(354, 195, 'atlas', 'jump').setScale(0.4);
        this.scene.layers.gui.add(this.oscUp);

        this.oscLeft.setInteractive();
        this.oscRight.setInteractive();
        this.oscUp.setInteractive();

        this.oscLeft.on('pointerdown', () => {
            this.osc.left = true;
        });
        this.oscLeft.on('pointerup', () => {
            this.osc.left = false;
        });

        this.oscRight.on('pointerdown', () => {
            this.osc.right = true;
        });
        this.oscRight.on('pointerup', () => {
            this.osc.right = false;
        });

        this.oscUp.on('pointerdown', () => {
            this.osc.up = true;
        });
        this.oscUp.on('pointerup', () => {
            this.osc.up = false;
        });

        if (this.scene.sys.game.device.os.desktop) {
            this.oscLeft.setVisible(false);
            this.oscLeft.setActive(false);
            this.oscRight.setVisible(false);
            this.oscRight.setActive(false);
            this.oscUp.setVisible(false);
            this.oscUp.setActive(false);
        }
    }

    update() {
        if (this.state === STATE.RUN) {
            if (this.isUp) {
                this.vsp -= this.jumpspeed;
                this.state = STATE.JUMP;
                // this.scene.game.audio.play('sound', 'land');
            } else if (this.isRight) {
                this.x += this.movespeed;
                if (this.x > 350) this.x = 350;
            } else if (this.isLeft) {
                this.x -= this.movespeed;
                if (this.x < 30) this.x = 30;
            }
        } else if (this.state === STATE.JUMP) {
            this.vsp += this.gravity;
            this.y += this.vsp;

            if (this.isRight) {
                this.x += this.movespeed;
                if (this.x > 350) this.x = 350;
            } else if (this.isLeft) {
                this.x -= this.movespeed;
                if (this.x < 30) this.x = 30;
            }

            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.state = STATE.RUN;
            }
        }
    }

    get isLeft() {
        return this.osc.left || this.cursorKeys.left.isDown;
    }

    get isRight() {
        return this.osc.right || this.cursorKeys.right.isDown;
    }

    get isUp() {
        return this.osc.up || this.cursorKeys.up.isDown;
    }

    destroy() {
        this.scene.events.off('update', this.update, this);
    }
}
