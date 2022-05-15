class Prep extends Phaser.Scene 
{
    constructor() 
    {
        super('prepScene');
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
        }

        option1Count = 0;
        option2Count = 0;
        option3Count = 0;
        option4Count = 0;
        option5Count = 0;
        option6Count = 0;

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.rectangle(0, game.config.height - 70, game.config.width, game.config.height / 8, 0xFF7400).setOrigin(0, 0);
        this.title = this.add.text(game.config.width/2, game.config.height / 10, 'Choose Your Sabotages', menuConfig).setOrigin(0.5);
        this.instructions = this.add.text(game.config.width/2, game.config.height / 6, 'Click an Option to Increase its Count', menuConfig).setOrigin(0.5);
        this.instructions.setFontSize(20);
        this.ready = this.add.text(game.config.width - 200, game.config.height + - 35, 'Press Space When Ready', menuConfig).setOrigin(0.5);
        this.option1 = this.add.text(game.config.width / 5, game.config.height / 3, 'Option 1', menuConfig).setOrigin(0.5);
        this.option2 = this.add.text(game.config.width / 2, game.config.height / 3, 'Option 2', menuConfig).setOrigin(0.5);
        this.option3 = this.add.text(game.config.width / 1.25, game.config.height / 3, 'Option 3', menuConfig).setOrigin(0.5);
        this.option4 = this.add.text(game.config.width / 5, game.config.height / 1.5, 'Option 4', menuConfig).setOrigin(0.5);
        this.option5 = this.add.text(game.config.width / 2, game.config.height / 1.5, 'Option 5', menuConfig).setOrigin(0.5);
        this.option6 = this.add.text(game.config.width / 1.25, game.config.height / 1.5, 'Option 6', menuConfig).setOrigin(0.5);

        this.option1.setInteractive();
        this.option2.setInteractive();
        this.option3.setInteractive();
        this.option4.setInteractive();
        this.option5.setInteractive();
        this.option6.setInteractive();
        this.ready.setInteractive();

        this.option1.on('pointerdown', function (checking) {
            option1Count += 1;
            console.log(option1Count);
        });
        this.option2.on('pointerdown', function (checking) {
            option2Count++;
            console.log(option2Count);
        });
        this.option3.on('pointerdown', function (checking) {
            option3Count++;
            console.log(option3Count);
        });
        this.option4.on('pointerdown', function (checking) {
            option4Count++;
            console.log(option4Count);
        });
        this.option5.on('pointerdown', function (checking) {
            option5Count++;
            console.log(option5Count);
        });
        this.option6.on('pointerdown', function (checking) {
            option6Count++;
            console.log(option6Count);
        });

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(spacebar)){
            this.scene.start('tourneyScene');
        }
    }

    swapScene(){
    }
}