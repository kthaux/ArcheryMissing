class Load extends Phaser.Scene 
{
    constructor() 
    {
        super('loadScene');
    }

    preload() 
    {
        this.load.image('bg', 'assets/titletext.png');
        this.load.image('prepbg', 'assets/test.png');
        this.load.image('done', 'assets/ready.png');
        
        this.load.image('archerHat', 'assets/hat.png');
        this.load.image('upArrow', 'assets/upArrow.png');
        this.load.image('downArrow', 'assets/downArrow.png');
        this.load.image('minus', 'assets/minus.png');
        this.load.image('plus', 'assets/plus.png');

        this.load.image('horn', 'assets/horn.png');
        this.load.image('misbow', 'assets/misbow.png');
        this.load.image('fan', 'assets/fan.png');
        this.load.image('bird', 'assets/crow.png');
        this.load.image('bentarrow', 'assets/brokenarrow.png');
        this.load.image('fight', 'assets/fight.png');
        
        this.load.audio('select', 'assets/selection.wav');                  // made via https://sfbgames.itch.io/chiptone
        this.load.audio('highSelect', 'assets/highselection.wav');
        this.load.audio('hit1', 'assets/hit1.wav');
        this.load.audio('hit2', 'assets/hit2.wav');
        this.load.audio('airhorn', 'assets/airhorn.wav');
    }

    create() 
    {
        this.scene.start("titleScene");
    }
}