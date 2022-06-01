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

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg').setOrigin(0);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(spacebar)){
            this.sound.play('select');
            this.scene.start('prepScene');
        }
    }
}