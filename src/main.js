let config = {
    type: Phaser.CANVAS,
    width: 1136,
    height: 640,
    autoCenter: true,
    scene: [Load, Title, Prep, Tourney],
};

let tap, spacebar, option1Count, option2Count, option3Count, option4Count, option5Count, option6Count;

let game = new Phaser.Game(config);
