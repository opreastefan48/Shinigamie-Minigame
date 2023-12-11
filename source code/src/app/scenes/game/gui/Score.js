export default class extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 10, 6);
        this.scene.layers.gui.add(this);

        this.setup();
        this.scene.events.on('update_score', this.update, this);
        this.scene.events.once('show_score', this.showScore, this);
    }

    setup() {
        this.label = this.scene.add.bitmapText(0, 0, 'exo_extra_bold', 'SCORE: 0', 16, 0);
        this.add(this.label);
    }

    update(score) {
        this.label.setText(`SCORE: ${score}`);
    }

    async showScore(score) {
        await this.moveScore();
        this.showHighscore(score);
        this.showPlayAgain();
    }

    moveScore() {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: this.label,
                duration: 200,
                x: this.scene.cameras.main.centerX - this.label.getTextBounds().local.width / 1.5,
                y: this.scene.cameras.main.centerY - 50,
                delay: 500,
                ease: Phaser.Math.Easing.Linear,
                onComplete: () => resolve(),
            });
        });
    }

    showHighscore(score) {
        let hs = this.scene.game.storage.initItem('hs', 0);
        hs = Math.max(hs, score);

        let x = this.label.x;
        let y = this.label.y + 20;
        let labelHS = this.scene.add.bitmapText(x, y, 'exo_extra_bold', `HIGH SCORE: ${hs}`, 16, 0);
        labelHS.setOrigin(0, 0.5);
        labelHS.setTint(0xfffc40);
        this.add(labelHS);

        this.scene.game.storage.setItem('hs', hs);
    }

    showPlayAgain() {
        let x = this.label.x;
        let y = 190;
        let playAgain = this.scene.add.bitmapText(x, y, 'exo_extra_bold', 'PLAY AGAIN', 24, 0);
        playAgain.setOrigin(0, 0.5);
        this.add(playAgain);

        playAgain.setInteractive({ useHandCursor: true });
        playAgain.once('pointerdown', () => {
            this.scene.game.audio.play('sound', 'click');
            this.scene.scene.start('Game');
        });

        this.scene.tweens.add({
            targets: playAgain,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1,
        });
    }

    destroy() {
        this.scene.events.off('update_score', this.update, this);
        this.scene.events.off('show_score', this.showScore, this);
        super.destroy();
    }
}
