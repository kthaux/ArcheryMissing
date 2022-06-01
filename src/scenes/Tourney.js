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
        

    }

    create() 
    {

        this.title = this.add.text(game.config.width/2, game.config.height/2, 'TOURNEY SCREEN TEXT', menuConfig).setOrigin(0.5);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.add.rectangle(0, game.config.height - 70, game.config.width, game.config.height / 8, 0xFF7400).setOrigin(0, 0);


        this.findWinner();

    }

    findWinner()
    {
        this.a1score = this.archerArr[0].myRatio * (Math.floor(Math.random() * 100) + 1);
        this.a2score = this.archerArr[1].myRatio * (Math.floor(Math.random() * 100) + 1);
        this.a3score = this.archerArr[2].myRatio * (Math.floor(Math.random() * 100) + 1);
        this.a4score = this.archerArr[3].myRatio * (Math.floor(Math.random() * 100) + 1);
        this.a5score = this.archerArr[4].myRatio * (Math.floor(Math.random() * 100) + 1);
        this.scoreArr = [this.a1score, this.a2score, this.a3score, this.a4score, this.a5score];
        for(let i = 0; i < 5; i++)
        {
            //check each archer and verify if the right sabotage is bought, then apply multiplier to their score
            switch(this.archerArr[i].myPosTrait)
            {
                case 0:
                    if(bought_1 == true)
                        this.scoreArr[i] = this.scoreArr[i] * sab1r;
                    //these should also eventually check to see if the sabotage has been bought and assigned 
                    break;
                case 1:
                    if(bought_2 == true)
                        this.scoreArr[i] = this.scoreArr[i] * sab2r;
                    break;
                case 2:
                    if(bought_3 == true)
                        this.scoreArr[i] = this.scoreArr[i] * sab3r;
                    break;
                case 3:
                    if(bought_4 == true)
                        this.scoreArr[i] = this.scoreArr[i] * sab4r;
                    break;
                case 4:
                    if(bought_5 == true)
                        this.scoreArr[i] = this.scoreArr[i] * sab5r;
                    break;
                case 5:
                    if(bought_6 == true)
                        this.scoreArr[i] = this.scoreArr[i] * sab6r;
                    break;
            }
        }
        //set winner to archer 1 until lowest score is found
        //winner holds the array index #
        let winner = 0;
        console.log('Archer ' + 1 + ' score: ' + this.scoreArr[0]);
        for(let i = 1; i < 5; i++)
        {
            
            console.log('Archer ' + (i + 1) + ' score: ' + this.scoreArr[i]);
            if(this.scoreArr[i] < this.scoreArr[winner])
            {
                console.log('archer' + (i+1) + ' score: ' + this.scoreArr[i] + ' is less than archer' + i + ' score: ' + this.scoreArr[winner]);
                winner = i;
            }
                

            
        }
        this.title.text = 'Winner: Archer #' + (winner + 1);
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