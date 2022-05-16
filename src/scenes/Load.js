class Load extends Phaser.Scene 
{
    constructor() 
    {
        super('loadScene');
    }

    preload() 
    {
        this.load.image('archerHat', 'assets/hat.png');
        this.load.image('faan', 'assets/ffan.png');

        this.load.audio('select', 'assets/Select.mp3');
    }

    create() 
    {
        this.scene.start("titleScene");
    }
}