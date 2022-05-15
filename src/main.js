let config = {
    type: Phaser.CANVAS,
    width: 1136,
    height: 640,
    autoCenter: true,
    scene: [Load, Title, Prep, Tourney],
};

let menuConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    color: '#1FEA18',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let tap, spacebar;
let option1Count, option2Count, option3Count, option4Count, option5Count, option6Count;
let money = 1000;
let game = new Phaser.Game(config);
