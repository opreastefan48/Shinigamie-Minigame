import { random, sample } from 'lodash';
import BackBullet from '../obstacles/BackBullet';
import Coin from '../obstacles/Coin';
import Fireball from '../obstacles/Fireball';
import FrontBullet from '../obstacles/FrontBullet';

export default class Spawner {
    constructor(scene) {
        this.scene = scene;

        this.live = true;

        this.spawnFireball();
        this.spawnFrontBullet();
        this.spawnBackBullet();
        this.spawnCoin();

        this.scene.events.once('gameover', this.stop, this);
        this.scene.events.once('shutdown', this.destroy, this);
    }

    async spawnFireball() {
        let cooldown = random(1000, 2000);
        let x = random(150, 450);
        let y = -50;

        await this.scene.game.utils.wait(cooldown);

        if (!this.live) return;
        new Fireball(this.scene, x, y);

        this.spawnFireball();
    }

    async spawnFrontBullet() {
        let cooldown = random(1000, 2000);
        let x = 420;
        let y = Math.random() < 0.5 ? 165 : 130;

        await this.scene.game.utils.wait(cooldown);

        if (!this.live) return;
        new FrontBullet(this.scene, x, y);

        this.spawnFrontBullet();
    }

    async spawnBackBullet() {
        let cooldown = random(3000, 6000);
        let x = -30;
        let y = Math.random() < 0.5 ? 165 : 130;

        await this.scene.game.utils.wait(cooldown);

        if (!this.live) return;
        new BackBullet(this.scene, x, y);

        this.spawnBackBullet();
    }

    async spawnCoin() {
        let cooldown = random(500, 2000);
        let yy = [165, 150, 135, 120];

        let x = 400;
        let y = sample(yy);

        await this.scene.game.utils.wait(cooldown);

        if (!this.live) return;
        new Coin(this.scene, x, y);

        this.spawnCoin();
    }

    stop() {
        this.live = false;
    }

    destroy() {
        this.scene.events.off('gameover', this.stop, this);
    }
}
