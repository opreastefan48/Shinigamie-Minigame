import Hero from '../hero/Hero';

export default class Controller {
    constructor(scene) {
        this.scene = scene;

        this.hero = null;
        this.obstacles = [];
        this.coins = [];

        this.score = 0;

        this.setup();
    }

    setup() {
        this.scene.events.on('add_obstacle', this.onAddObstacle, this);
        this.scene.events.on('remove_obstacle', this.onRemoveObstacle, this);
        this.scene.events.on('add_coin', this.onAddCoin, this);
        this.scene.events.on('update', this.update, this);
        this.scene.events.once('shutdown', this.destroy, this);
    }

    start(hero) {
        this.hero = hero;
    }

    update() {
        if (!this.hero) return;

        this.colllide();
        this.pickCoin();

        if (!this.hero) return;
        this.score++;
        this.scene.events.emit('update_score', this.score);
    }

    colllide() {
        if (!this.hero) return;

        for (let i = 0; i < this.obstacles.length; i++) {
            let heroColliderRect = this.hero.collider.getBounds();
            let obstacleColliderRect = this.obstacles[i].collider.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(heroColliderRect, obstacleColliderRect)) {
                this.obstacles[i].explode();
                // console.log('dead');
                this.onGameOver();
                break;
            }
        }
    }

    pickCoin() {
        if (!this.hero) return;

        let coinsToPick = [];

        for (let i = 0; i < this.coins.length; i++) {
            let coin = this.coins[i];
            let heroColliderRect = this.hero.collider.getBounds();
            let coinRect = coin.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(heroColliderRect, coinRect)) {
                let index = this.coins.indexOf(coin);
                this.coins.splice(index, 1);
                coinsToPick.push(coin);

                this.score += 1000;
                this.scene.events.emit('update_score', this.score);
                this.scene.game.audio.play('sound', 'coin');
            }
        }

        while (coinsToPick.length > 0) coinsToPick.pop().destroy();
    }

    onAddObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }

    onRemoveObstacle(obstacle) {
        let index = this.obstacles.indexOf(obstacle);
        this.obstacles.splice(index, 1);
    }

    onAddCoin(coin) {
        this.coins.push(coin);
    }

    onGameOver() {
        while (this.obstacles.length > 0) this.obstacles.pop().destroy();
        this.obstacles = [];

        while (this.coins.length > 0) this.coins.pop().destroy();
        this.coins = [];

        this.scene.events.emit('gameover');
        this.scene.events.emit('show_score', this.score);

        this.hero.state = Hero.STATE.DEAD;
        this.hero.setActive(false);
        this.hero.setVisible(false);
        this.hero = null;
    }

    destroy() {
        this.scene.events.off('add_obstacle', this.onAddObstacle, this);
        this.scene.events.off('remove_obstacle', this.onRemoveObstacle, this);
        this.scene.events.off('add_coin', this.onAddCoin, this);
    }
}
