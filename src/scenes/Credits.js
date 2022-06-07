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

        this.creditsText = this.add.text(game.config.width / 2 , 60, 'Credits: ', moneyConfig).setOrigin(0.5);

        this.keatonText = this.add.text(game.config.width / 2 , 120, 'Keaton Haux - Programming \n -Archer stat randomization \n -Winner, score, and money calculation', moneyConfig).setOrigin(0.5);

        this.seanText = this.add.text(game.config.width / 2 , 220, 'Sean Osborne -  \n - \n -', moneyConfig).setOrigin(0.5);

        this.jenniferText = this.add.text(game.config.width / 2 , 300, 'Jennifer To -  \n - \n -', moneyConfig).setOrigin(0.5);



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