class Tourney extends Phaser.Scene 
{
    constructor() 
    {
        super('tourneyScene');
    }

    init(data)
    {
        //archers passed into this scene's archerArr
        this.archerArr = [data.a1, data.a2, data.a3, data.a4, data.a5];
        //console.log(this.archer1.myColor);

        
        for(let i = 0; i < 5; i++)
        {
            console.log('Archer' + i + ' ratio: ' + this.archerArr[i].myRatio);
            console.log('Archer' + i + ' color: ' + this.archerArr[i].myColor);
            console.log('Archer' + i + ' pos trait: ' + this.archerArr[i].myPosTrait);
            console.log('Archer' + i + ' neg trait: ' + this.archerArr[i].myNegTrait);
        }
        

    }

    create() 
    {

        this.title = this.add.text(game.config.width/2, game.config.height/2, 'TOURNEY SCREEN TEXT', menuConfig).setOrigin(0.5);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.add.rectangle(0, game.config.height - 70, game.config.width, game.config.height / 8, 0xFF7400).setOrigin(0, 0);


        


    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            //reset purchases back to false after the tourney is over
            bought_1 = false;
            bought_2 = false;
            bought_3 = false;
            bought_4 = false;
            bought_5 = false;
            bought_6 = false;
            
            this.sound.play('select');
            this.scene.start('prepScene');
            
        }
    }
}