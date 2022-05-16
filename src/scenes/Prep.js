class Prep extends Phaser.Scene 
{
    constructor() 
    {
        super('prepScene');
    }

    create() 
    {
        

        this.createOptions();

        this.archerGroup = this.add.group({
            classType: Phaser.GameObjects.Sprite
        });

        this.createArchers();
        let archerArr = this.archerGroup.getChildren();
        for(let i = 0; i < 5; i++)
        {
            console.log('Archer' + i + ' ratio: ' + archerArr[i].myRatio);
            console.log('Archer' + i + ' color: ' + archerArr[i].myColor);
            console.log('Archer' + i + ' pos trait: ' + archerArr[i].myPosTrait);
            console.log('Archer' + i + ' neg trait: ' + archerArr[i].myNegTrait);
        }
        

    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            this.scene.start('tourneyScene');
        }

        
    }

    swapScene()
    {

    }

    createOptions()
    {
        this.bought_1 = false;
        this.bought_2 = false;
        this.bought_3 = false;
        this.bought_4 = false;
        this.bought_5 = false;
        this.bought_6 = false;

        this.option1Count = 0;
        this.option2Count = 0;
        this.option3Count = 0;
        this.option4Count = 0;
        this.option5Count = 0;
        this.option6Count = 0;

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
            
        });
        this.option2.on('pointerdown', function (checking) {
            option2Count++;
            
        });
        this.option3.on('pointerdown', function (checking) {
            option3Count++;
            
        });
        this.option4.on('pointerdown', function (checking) {
            option4Count++;
            
        });
        this.option5.on('pointerdown', function (checking) {
            option5Count++;
            
        });
        this.option6.on('pointerdown', function (checking) {
            option6Count++;
            
        });
    }

    createArchers()
    {
        for(let i = 0; i < 5; i++)
        {
            // archer params: scene, ratio, color, positive trait, negative trait
            let archer = new Archer(this, 
                Math.random() * 2, 
                this.getRandHexColor(), 
                Math.floor(Math.random() * 6), 
                Math.floor(Math.random() * 6));
            
            this.archerGroup.add(archer);
            archer.tint = archer.myColor;
            
        }
        console.log('created archers:');
    }

    getRandHexColor()
    {
        return Math.floor(Math.random()*16777215).toString(16);
    }

}