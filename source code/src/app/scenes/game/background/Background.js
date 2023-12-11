import Layer from './Layer';

export default class Background extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);
        this.scene.layers.background.add(this);

        this.setup();
    }

    setup() {
        let speeds = [0.2, 0.4, 0.7, 1.2, 3];
        for (let i = 0; i < 5; i++) {
            let layer = new Layer(this.scene, i, speeds[i]);
            this.add(layer);
        }
    }
}
