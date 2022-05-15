class Load extends Phaser.Scene 
{
    constructor() 
    {
        super('loadScene');
    }

    preload() 
    {
        this.load.image('archerHat', 'assets/hat.png');
    }

    create() 
    {
        this.scene.start("titleScene");
    }
}