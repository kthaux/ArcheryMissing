class Load extends Phaser.Scene 
{
    constructor() 
    {
        super('loadScene');
    }

    preload() 
    {
        //old ones saved for easy reference
        //load images
        //this.load.image('runnerBack', 'assets/runnerBack.png');

        /*
        //load spritesheets
        this.load.spritesheet('walk', 'assets/robo_walk.png', {
            frameWidth: 320,
            frameHeight: 256
        });
        */
        
        //load audio
        //this.load.audio('gethit', './assets/hit.wav');
    }

    create() 
    {
        this.scene.start('menuScene');
    }
}