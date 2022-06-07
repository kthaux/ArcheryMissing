let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 640,
    autoCenter: true,
    scene: [Load, Title, Prep, Tourney],
};

let menuConfig = {
    fontFamily: 'Minecraft',
    fontSize: '28px',
    color: '#1FEA18',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let moneyConfig = {
    fontFamily: 'Minecraft',
    fontSize: '28px',
    color: '#44891a',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let optionConfig = {
    fontFamily: 'Minecraft',
    fontSize: '24px',
    color: '#FF0000',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let optionConfig2 = {
    fontFamily: 'Minecraft',
    fontSize: '24px',
    color: '#59FF20',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let optionDes = {
    fontFamily: 'Minecraft',
    fontSize: '16px',
    color: '#000000',
    align: 'center',
    padding: {
    top: 5,
    bottom: 5,
    fixedWidth: 10,
    },
}

let statsConfig = {
    fontFamily: 'Minecraft',
    fontSize: '18px',
    color: '#FF0000',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let betConfig = {
    fontFamily: 'Minecraft',
    fontSize: '15px',
    color: '#FF0000',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
}

let tap, spacebar;
let rundownCheck = false;
let option1Count, option2Count, option3Count, option4Count, option5Count, option6Count;
let money = 1000;
let bought_1 = false;
let bought_2 = false;
let bought_3 = false;
let bought_4 = false;
let bought_5 = false;
let bought_6 = false;

//sabotage prices
let sab1p = 25;
let sab2p = 100;
let sab3p = 50;
let sab4p = 75;
let sab5p = 60;
let sab6p = 30;

//sabotage multipliers
let sab1r = 1.1;
let sab2r = 1.2;
let sab3r = 1.3;
let sab4r = 1.4;
let sab5r = 1.5;
let sab6r = 1.6;



let game = new Phaser.Game(config);
