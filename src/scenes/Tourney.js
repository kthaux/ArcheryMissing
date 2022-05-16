class Tourney extends Phaser.Scene 
{
    constructor() 
    {
        super('tourneyScene');
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

        this.title = this.add.text(game.config.width/2, game.config.height/2, 'TOURNEY SCREEN TEXT', menuConfig).setOrigin(0.5);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.add.rectangle(0, game.config.height - 70, game.config.width, game.config.height / 8, 0xFF7400).setOrigin(0, 0);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(spacebar)){
            this.sound.play('select');
            this.scene.start('titleScene');
        }
    }
}