class Title extends Phaser.Scene 
{
    constructor() 
    {
        super('titleScene');
    }

    create() 
    {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.title = this.add.text(game.config.width/2, game.config.height/2, 'TITLE SCREEN TEXT', menuConfig).setOrigin(0.5);
        this.space = this.add.text(game.config.width/2, game.config.height/1.5, 'PRESS SPACE', menuConfig).setOrigin(0.5);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(spacebar)){
            this.sound.play('select');
            this.scene.start('prepScene');
        }
    }
}