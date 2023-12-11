import 'phaser/plugins/spine/dist/SpinePlugin';

export default {
    type: Phaser.AUTO,
    width: 384,
    height: 216,
    parent: 'game',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: {
        scene: [{ key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }],
    },
    prefix: 'impossible_run_',
    soundMaxVolume: 1,
    musicMaxVolume: 0.5,
    responsive: false,
    lockOrientation: false, // false, portrait, landscape
};
