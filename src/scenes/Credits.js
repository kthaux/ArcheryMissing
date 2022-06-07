class Credits extends Phaser.Scene 
{
    constructor() 
    {
        super('creditsScene');
    }

    create() 
    {
       
        //this.bgMusic = this.sound.add('bgm', { volume: 0.20, loop: true });
        //this.bgMusic.play();

        //this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg').setOrigin(0);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 

        this.totalText = this.add.text(game.config.width / 2 , game.config.height / 2 , 'Total money earned: ' + (earned), moneyConfig).setOrigin(0.5);


    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            this.sound.removeAll();
            this.sound.play('select');
            this.scene.start('titleScene');
        }
    }
}