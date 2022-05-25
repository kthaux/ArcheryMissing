let config = {
    type: Phaser.CANVAS,
    width: 1200,
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

let optionConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    color: '#FF0000',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let optionConfig2 = {
    fontFamily: 'Courier',
    fontSize: '28px',
    color: '#59FF20',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let tap, spacebar;
let option1Count, option2Count, option3Count, option4Count, option5Count, option6Count;
let money = 1000;
let bought_1 = false;
let bought_2 = false;
let bought_3 = false;
let bought_4 = false;
let bought_5 = false;
let bought_6 = false;

let game = new Phaser.Game(config);
