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

        this.totalText = this.add.text(game.config.width / 2 , 30, 'Total money earned: ' + (earned), creditsConfig).setOrigin(0.5);

        this.creditsText = this.add.text(game.config.width / 2 , 100, 'Credits: ', moneyConfig).setOrigin(0.5);

        this.keatonText = this.add.text(game.config.width / 2 , 150, 'Keaton Haux - Programming', moneyConfig).setOrigin(0.5);

        this.seanText = this.add.text(game.config.width / 2 , 200, 'Sean Osborne -  Programming', moneyConfig).setOrigin(0.5);

        this.jenniferText = this.add.text(game.config.width / 2 , 250, 'Jennifer To -  Art & Sound Effects', moneyConfig).setOrigin(0.5);

        this.pressSpace = this.add.text(game.config.width / 2 , 600, 'Press Space to head back to the title screen', moneyConfig).setOrigin(0.5);



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