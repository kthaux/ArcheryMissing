class Prep extends Phaser.Scene 
{
    constructor() 
    {
        super('prepScene');
    }

    //TODO: function to handle money adjustments to verify that enough money is available
    adjustMoney(amount, sign)
    {
        if(sign > 0)
        {
            money = money + amount;
        }
        else if(sign < 0)
        {
            if((money - amount) < 0)
            {
                //flash red text maybe?
                console.log('not enough money to make purchase/bet');
            }
            else if((money - amount) >= 0)
            {
                money = money - amount;
            }
        }
    }

    create() 
    {        
        //set up ui text and info for the prep scene
        this.createOptions();

        //create the archer group
        this.archerGroup = this.add.group({
            classType: Phaser.GameObjects.Sprite
        });

        //create archers with randomized stats
        this.createArchers();

        let menuConfig = {
            fontFamily: 'Copperplate',
            fontSize: '30px',
            color: '#3ae0c5',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 750
        }

        if(rundownCheck){
            this.moneyText.setAlpha(0);
            this.spaceCount = 0;
            this.leftInstruct = this.add.rectangle(0, 0, game.config.width / 1.9, game.config.height, 0x525252).setOrigin(0, 0);
            this.rightInstruct = this.add.rectangle(game.config.width / 1.7, 0, game.config.width / 2, game.config.height, 0x525252).setOrigin(0, 0);
            this.rundown = this.add.text(game.config.width/1.25, game.config.height / 2.25, "So here's the deal,\nI'm tryna leave this tourney\nwith as much money as I can.\n\nI'm starting this with $1,000.\n\nPress Space", menuConfig).setOrigin(0.5);

            this.LeftOut = this.tweens.add({
                targets: this.leftInstruct,
                alpha: {from: 1, to: 0},
                duration: 500,
                ease: "Sine.easeInOut",
                paused: true,

            });

            this.LeftIn = this.tweens.add({
                targets: this.leftInstruct,
                alpha: {from: 0, to: 1},
                duration: 500,
                ease: "Sine.easeInOut",
                paused: true,

            });

            this.RightOut = this.tweens.add({
                targets: this.rightInstruct,
                alpha: {from: 1, to: 0},
                duration: 500,
                ease: "Sine.easeInOut",
                paused: true,

            });

            this.rundownOut = this.tweens.add({
                targets: this.rundown,
                scale: {from: 1, to: 0},
                duration: 100,
                ease: "Sine.easeInOut",
                paused: true
            });

            this.rundownIn = this.tweens.add({
                targets: this.rundown,
                scale: {from: 0, to: 1},
                duration: 100,
                ease: "Sine.easeInOut",
                paused: true
            });

        }
    }

    

    update()
    {
        
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            if(rundownCheck){
                if(this.spaceCount == 4){
                    this.LeftOut.play();
                    this.rundownOut.play();
                    this.time.delayedCall(500, () => {
                        this.leftInstruct.destroy();
                        this.rundown.destroy();
                        rundownCheck = false;
                    })
                }
                if(this.spaceCount == 3){
                    this.spaceCount += 1;
                    this.rundown.text = "That's all I got for ya.\n\nNow let's sabotage!\n\nPress Space to begin playing"
                }
                if(this.spaceCount == 2){
                    this.spaceCount += 1;
                    this.rundown.text = "Press space once you're done\nbetting and purchasing\nsabotages.\n\nYou'll see who won and\nhow much money we got.\n\nPress Space"
                }
                if (this.spaceCount == 1) {
                    this.spaceCount += 1;
                    this.leftInstruct.y -= 70;
                    this.LeftIn.play();
                    this.RightOut.play();
                    this.rundownOut.play();
                    this.time.delayedCall(500, () => {
                        this.rightInstruct.destroy();
                        this.rundown.x = 300;
                        this.rundown.text = "These are stats on the\narchers we're sabotaging.\n\nSabotages affect them\ndifferently, which we're gonna\ncapitalize on.\n\nClicking the orange plus next\nto any archer will put $50 into\nyour bet, and pressing minus\ntakes $50 out.\n\nPress Space"
                        this.rundownIn.play();
                        
                    })
                }
                if(this.spaceCount == 0){
                    this.spaceCount += 1;
                    this.LeftOut.play();
                    this.time.delayedCall(500, () => {
                        this.rundown.text = "These here are the sabotages.\n\nHover the mouse over one\nto get some info on it,\nlike how much it costs.\n\nClick it to add it to your\ninventory, click it again to\nremove it.\n\nPress Space"
                        this.moneyText.setAlpha(1);
                    })
                }
                
            } else{
                this.sound.play('select');
                //pass archer array into the tourney scene
                this.scene.start('tourneyScene', {
                    a1: this.archerArr[0], 
                    a2: this.archerArr[1],
                    a3: this.archerArr[2],
                    a4: this.archerArr[3],
                    a5: this.archerArr[4]});
            }
            //console.log('in update: archerArr[0].myColor: ' + this.archerArr[0].myColor);
 
        }


        //keep money and bet count up do date every frame
        this.moneyText.text = money;
        this.bet1text.text = 'Bet:\n' + this.archerArr[0].myBet;
        this.bet2text.text = 'Bet:\n' + this.archerArr[1].myBet;
        this.bet3text.text = 'Bet:\n' + this.archerArr[2].myBet;
        this.bet4text.text = 'Bet:\n' + this.archerArr[3].myBet;
        this.bet5text.text = 'Bet:\n' + this.archerArr[4].myBet;
        
    }

    createOptions()
    {

        this.option1Count = 0;
        this.option2Count = 0;
        this.option3Count = 0;
        this.option4Count = 0;
        this.option5Count = 0;
        this.option6Count = 0;

        //background and text
        this.prepbg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'prepbg').setOrigin(0);
        

        //spacebar key input
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //bottom status bar
        this.add.rectangle(0, game.config.height - 70, game.config.width, game.config.height / 8, 0xCBBEB5).setOrigin(0, 0);

        //archer cardbacks
        this.add.rectangle(800, 50, 150, 150, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(1000, 50, 150, 150, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(800, 225, 150, 150, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(1000, 225, 150, 150, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(900, 400, 150, 150, 0xFFFFFF).setOrigin(0, 0);

        //inventory slots
        this.add.rectangle(10, game.config.height / 1.105, 55, 55, 0x545454).setOrigin(0, 0);
        this.add.rectangle(80, game.config.height / 1.105, 55, 55, 0x545454).setOrigin(0, 0);
        this.add.rectangle(150, game.config.height / 1.105, 55, 55, 0x545454).setOrigin(0, 0);
        this.add.rectangle(220, game.config.height / 1.105, 55, 55, 0x545454).setOrigin(0, 0);
        this.add.rectangle(290, game.config.height / 1.105, 55, 55, 0x545454).setOrigin(0, 0);
        this.add.rectangle(360, game.config.height / 1.105, 55, 55, 0x545454).setOrigin(0, 0);
        let box1 = this.add.sprite(40, game.config.height / 1.055, 'horn');
        let box2 = this.add.sprite(110, game.config.height / 1.055, 'horn');
        let box3 = this.add.sprite(180, game.config.height / 1.055, 'horn');
        let box4 = this.add.sprite(250, game.config.height / 1.055, 'horn');
        let box5 = this.add.sprite(320, game.config.height / 1.055, 'horn');
        let box6 = this.add.sprite(390, game.config.height / 1.055, 'horn');
        let box1filled = "none";
        let box2filled = "none";
        let box3filled = "none";
        let box4filled = "none";
        let box5filled = "none";
        let box6filled = "none";
        box1.setScale(0.4,0.275);
        box2.setScale(0.4,0.275);
        box3.setScale(0.4,0.275);
        box4.setScale(0.4,0.275);
        box5.setScale(0.4,0.275);
        box6.setScale(0.4,0.275);
        box1.setAlpha(0);
        box2.setAlpha(0);
        box3.setAlpha(0);
        box4.setAlpha(0);
        box5.setAlpha(0);
        box6.setAlpha(0);

        
        //this.title = this.add.text(game.config.width/4.3, 40, 'Choose Your Sabotages', menuConfig).setOrigin(0.5);
        //this.instructions = this.add.text(game.config.width/4, 60, 'Click the name to buy it for the next round', menuConfig).setOrigin(0.5);
        //this.instructions.setFontSize(20);

        //ready prompt
        this.ready = this.add.text(game.config.width - 10000, game.config.height + - 35000, 'Ready to Go', menuConfig).setOrigin(0.5);

        this.moneyText = this.add.text(game.config.width / 2 + 50, game.config.height - 35, 'Money:', moneyConfig).setOrigin(0.5);

        this.done = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'done').setOrigin(0);
        
        //add option text
        let option1 = this.add.text(game.config.width / 8, game.config.height / 6, 'Air Horn', optionConfig).setOrigin(0.5);
        let option2 = this.add.text(game.config.width / 8, game.config.height / 2.5, 'Giant Fan', optionConfig).setOrigin(0.5);
        let option3 = this.add.text(game.config.width / 8, game.config.height / 1.5, 'Lead Arrows', optionConfig).setOrigin(0.5);
        let option4 = this.add.text(game.config.width / 3, game.config.height / 6, 'Tampered Bow', optionConfig).setOrigin(0.5);
        let option5 = this.add.text(game.config.width / 3, game.config.height / 2.5, 'Bird Flock', optionConfig).setOrigin(0.5);
        let option6 = this.add.text(game.config.width / 3, game.config.height / 1.5, 'Rumble', optionConfig).setOrigin(0.5);

        let option1des = this.add.text(game.config.width / 8.25, game.config.height / 3.75, 'The good ole fashioned.\nDisturbing the peace since \n19-whenever this thing \nwas invented.\n\nCost: $' + sab1p, optionDes).setOrigin(0.5);
        let option2des = this.add.text(game.config.width / 8.25, game.config.height / 1.95, "They'll think it's for air\nconditioning. They don't know\nit's as strong as a jet\nturbine. Probably still\ngood for air conditioning.\n\nCost: $"+ sab2p, optionDes).setOrigin(0.5);
        let option3des = this.add.text(game.config.width / 8.25, game.config.height * 0.78, "The nice thing about\nsupplying arrows for the\narchers is that they can't\ncomplain when the\narrows are made of lead.\n\nCost: $"+ sab3p, optionDes).setOrigin(0.5);
        let option4des = this.add.text(game.config.width / 3, game.config.height / 3.6, "I considered having archers\nuse crossbows since they're\ntechnically still bows, but I\ndecided that flimsy and unreliable\nbows would be funnier.\n\nCost: $"+ sab4p, optionDes).setOrigin(0.5);
        let option5des = this.add.text(game.config.width / 3, game.config.height / 1.99, "My pal Darrell has a massive bird\ncoop. Let's just say they'll\nbe flying south for the winter.\n\nCost: $"+ sab5p, optionDes).setOrigin(0.5);
        let option6des = this.add.text(game.config.width / 3, game.config.height * 0.77, "I have a friend. His name is\nDennis. Dennis tends to start\nfights. You can see where I'm\ngoing with this.\n\nCost: $"+ sab6p, optionDes).setOrigin(0.5);
        
        //set them to interactable
        option1.setInteractive();
        option2.setInteractive();
        option3.setInteractive();
        option4.setInteractive();
        option5.setInteractive();
        option6.setInteractive();
        this.ready.setInteractive();
        
        //Air horn
        option1.on('pointerdown', function (checking) {
            if(bought_1 == false && money >= sab1p)
            {
                if(box1filled == "none"){
                    box1filled = "horn";
                    box1.setTexture('horn');
                    box1.setAlpha(1);
                    
                }
                else if(box2filled == "none"){
                    box2filled = "horn";
                    box2.setTexture('horn');
                    box2.setAlpha(1);
                }
                else if(box3filled == "none"){
                    box3filled = "horn";
                    box3.setTexture('horn');
                    box3.setAlpha(1);
                }
                else if(box4filled == "none"){
                    box4filled = "horn";
                    box4.setTexture('horn');
                    box4.setAlpha(1);
                }
                else if(box5filled == "none"){
                    box5filled = "horn";
                    box5.setTexture('horn');
                    box5.setAlpha(1);
                }
                else if(box6filled == "none"){
                    box6filled = "horn";
                    box6.setTexture('horn');
                    box6.setAlpha(1);
                }
                bought_1 = true;
                option1.setStyle(optionConfig2);
                this.scene.adjustMoney(sab1p, -1)
                //money -= sab1p;
            }

            else if(bought_1 == true){
                if(box1filled == "horn"){
                    box1filled = "none";
                    box1.setAlpha(0);
                }
                else if(box2filled == "horn"){
                    box2filled = "none";
                    box2.setAlpha(0);
                }
                else if(box3filled == "horn"){
                    box3filled = "none";
                    box3.setAlpha(0);
                }
                else if(box4filled == "horn"){
                    box4filled = "none";
                    box4.setAlpha(0);
                }
                else if(box5filled == "horn"){
                    box5filled = "none";
                    box5.setAlpha(0);
                }
                else if(box6filled == "horn"){
                    box6filled = "none";
                    box6.setAlpha(0);
                }

                bought_1 = false;
                option1.setStyle(optionConfig);
                money += sab1p;
            }
        });
        //Giant Fan
        option2.on('pointerdown', function (checking) {
            if(bought_2 == false && money >= sab2p)
            {
                if(box1filled == "none"){
                    box1filled = "fan";
                    box1.setTexture('fan');
                    box1.setAlpha(1);
                }
                else if(box2filled == "none"){
                    box2filled = "fan";
                    box2.setTexture('fan');
                    box2.setAlpha(1);
                }
                else if(box3filled == "none"){
                    box3filled = "fan";
                    box3.setTexture('fan');
                    box3.setAlpha(1);
                }
                else if(box4filled == "none"){
                    box4filled = "fan";
                    box4.setTexture('fan');
                    box4.setAlpha(1);
                }
                else if(box5filled == "none"){
                    box5filled = "fan";
                    box5.setTexture('fan');
                    box5.setAlpha(1);
                }
                else if(box6filled == "none"){
                    box6filled = "fan";
                    box6.setTexture('fan');
                    box6.setAlpha(1);
                }

                bought_2 = true;
                option2.setStyle(optionConfig2);
                money -= sab2p;
            }
            else if(bought_2 == true)
            {
                if(box1filled == "fan"){
                    box1filled = "none";
                    box1.setAlpha(0);
                }
                else if(box2filled == "fan"){
                    box2filled = "none";
                    box2.setAlpha(0);
                }
                else if(box3filled == "fan"){
                    box3filled = "none";
                    box3.setAlpha(0);
                }
                else if(box4filled == "fan"){
                    box4filled = "none";
                    box4.setAlpha(0);
                }
                else if(box5filled == "fan"){
                    box5filled = "none";
                    box5.setAlpha(0);
                }
                else if(box6filled == "fan"){
                    box6filled = "none";
                    box6.setAlpha(0);
                }

                bought_2 = false;
                option2.setStyle(optionConfig);
                money += sab2p;
            }
            
        });
        //Bent Arrows
        option3.on('pointerdown', function (checking) {
            if(bought_3 == false && money >= sab3p)
            {
                if(box1filled == "none"){
                    box1filled = "bentarrow";
                    box1.setTexture('bentarrow');
                    box1.setAlpha(1);
                }
                else if(box2filled == "none"){
                    box2filled = "bentarrow";
                    box2.setTexture('bentarrow');
                    box2.setAlpha(1);
                }
                else if(box3filled == "none"){
                    box3filled = "bentarrow";
                    box3.setTexture('bentarrow');
                    box3.setAlpha(1);
                }
                else if(box4filled == "none"){
                    box4filled = "bentarrow";
                    box4.setTexture('bentarrow');
                    box4.setAlpha(1);
                }
                else if(box5filled == "none"){
                    box5filled = "bentarrow";
                    box5.setTexture('bentarrow');
                    box5.setAlpha(1);
                }
                else if(box6filled == "none"){
                    box6filled = "bentarrow";
                    box6.setTexture('bentarrow');
                    box6.setAlpha(1);
                }
                
                bought_3 = true;
                option3.setStyle(optionConfig2);
                money -= sab3p;
            }
            else if(bought_3 == true)
            {
                if(box1filled == "bentarrow"){
                    box1filled = "none";
                    box1.setAlpha(0);
                }
                else if(box2filled == "bentarrow"){
                    box2filled = "none";
                    box2.setAlpha(0);
                }
                else if(box3filled == "bentarrow"){
                    box3filled = "none";
                    box3.setAlpha(0);
                }
                else if(box4filled == "bentarrow"){
                    box4filled = "none";
                    box4.setAlpha(0);
                }
                else if(box5filled == "bentarrow"){
                    box5filled = "none";
                    box5.setAlpha(0);
                }
                else if(box6filled == "bentarrow"){
                    box6filled = "none";
                    box6.setAlpha(0);
                }
                
                bought_3 = false;
                option3.setStyle(optionConfig);
                money += sab3p;
            }

        });
        //misaligned bow
        option4.on('pointerdown', function (checking) {
            if(bought_4 == false && money >= sab4p)
            {
                if(box1filled == "none"){
                    box1filled = "misbow";
                    box1.setTexture('misbow');
                    box1.setAlpha(1);
                }
                else if(box2filled == "none"){
                    box2filled = "misbow";
                    box2.setTexture('misbow');
                    box2.setAlpha(1);
                }
                else if(box3filled == "none"){
                    box3filled = "misbow";
                    box3.setTexture('misbow');
                    box3.setAlpha(1);
                }
                else if(box4filled == "none"){
                    box4filled = "misbow";
                    box4.setTexture('misbow');
                    box4.setAlpha(1);
                }
                else if(box5filled == "none"){
                    box5filled = "misbow";
                    box5.setTexture('misbow');
                    box5.setAlpha(1);
                }
                else if(box6filled == "none"){
                    box6filled = "misbow";
                    box6.setTexture('misbow');
                    box6.setAlpha(1);
                }
                
                bought_4 = true;
                option4.setStyle(optionConfig2);
                money -= sab4p;
            }
            else if(bought_4 == true)
            {
                if(box1filled == "misbow"){
                    box1filled = "none";
                    box1.setAlpha(0);
                }
                else if(box2filled == "misbow"){
                    box2filled = "none";
                    box2.setAlpha(0);
                }
                else if(box3filled == "misbow"){
                    box3filled = "none";
                    box3.setAlpha(0);
                }
                else if(box4filled == "misbow"){
                    box4filled = "none";
                    box4.setAlpha(0);
                }
                else if(box5filled == "misbow"){
                    box5filled = "none";
                    box5.setAlpha(0);
                }
                else if(box6filled == "misbow"){
                    box6filled = "none";
                    box6.setAlpha(0);
                }
                
                bought_4 = false;
                option4.setStyle(optionConfig);
                money += sab4p;
            }

        });
        //release birds
        option5.on('pointerdown', function (checking) {
            if(bought_5 == false && money >= sab5p)
            {
                if(box1filled == "none"){
                    box1filled = "bird";
                    box1.setTexture('bird');
                    box1.setAlpha(1);
                }
                else if(box2filled == "none"){
                    box2filled = "bird";
                    box2.setTexture('bird');
                    box2.setAlpha(1);
                }
                else if(box3filled == "none"){
                    box3filled = "bird";
                    box3.setTexture('bird');
                    box3.setAlpha(1);
                }
                else if(box4filled == "none"){
                    box4filled = "bird";
                    box4.setTexture('bird');
                    box4.setAlpha(1);
                }
                else if(box5filled == "none"){
                    box5filled = "bird";
                    box5.setTexture('bird');
                    box5.setAlpha(1);
                }
                else if(box6filled == "none"){
                    box6filled = "bird";
                    box6.setTexture('bird');
                    box6.setAlpha(1);
                }
                
                bought_5 = true;
                option5.setStyle(optionConfig2);
                money -= sab5p;
            }
            else if(bought_5 == true)
            {
                if(box1filled == "bird"){
                    box1filled = "none";
                    box1.setAlpha(0);
                }
                else if(box2filled == "bird"){
                    box2filled = "none";
                    box2.setAlpha(0);
                }
                else if(box3filled == "bird"){
                    box3filled = "none";
                    box3.setAlpha(0);
                }
                else if(box4filled == "bird"){
                    box4filled = "none";
                    box4.setAlpha(0);
                }
                else if(box5filled == "bird"){
                    box5filled = "none";
                    box5.setAlpha(0);
                }
                else if(box6filled == "bird"){
                    box6filled = "none";
                    box6.setAlpha(0);
                }

                bought_5 = false;
                option5.setStyle(optionConfig);
                money += sab5p;
            }

        });
        //cause a fight
        option6.on('pointerdown', function (checking) {
            if(bought_6 == false && money >= sab6p)
            {
                if(box1filled == "none"){
                    box1filled = "fight";
                    box1.setTexture('fight');
                    box1.setAlpha(1);
                }
                else if(box2filled == "none"){
                    box2filled = "fight";
                    box2.setTexture('fight');
                    box2.setAlpha(1);
                }
                else if(box3filled == "none"){
                    box3filled = "fight";
                    box3.setTexture('fight');
                    box3.setAlpha(1);
                }
                else if(box4filled == "none"){
                    box4filled = "fight";
                    box4.setTexture('fight');
                    box4.setAlpha(1);
                }
                else if(box5filled == "none"){
                    box5filled = "fight";
                    box5.setTexture('fight');
                    box5.setAlpha(1);
                }
                else if(box6filled == "none"){
                    box6filled = "fight";
                    box6.setTexture('fight');
                    box6.setAlpha(1);
                }
                
                bought_6 = true;
                option6.setStyle(optionConfig2);
                money -= sab6p;
            }
            else if(bought_6 == true)
            {
                bought_6 = false;
                option6.setStyle(optionConfig);
                money += sab6p;

                if(box1filled == "fight"){
                    box1filled = "none";
                    box1.setAlpha(0);
                }
                else if(box2filled == "fight"){
                    box2filled = "none";
                    box2.setAlpha(0);
                }
                else if(box3filled == "fight"){
                    box3filled = "none";
                    box3.setAlpha(0);
                }
                else if(box4filled == "fight"){
                    box4filled = "none";
                    box4.setAlpha(0);
                }
                else if(box5filled == "fight"){
                    box5filled = "none";
                    box5.setAlpha(0);
                }
                else if(box6filled == "fight"){
                    box6filled = "none";
                    box6.setAlpha(0);
                }
            }
            
        });

        option1.on('pointerover', function (descript) {
            option1des.setColor('#FFFFFF')
        });
        option1.on('pointerout', function (descript) {
            option1des.setColor('#000000')
        });
        option2.on('pointerover', function (descript) {
            option2des.setColor('#FFFFFF')
        });
        option2.on('pointerout', function (descript) {
            option2des.setColor('#000000')
        });
        option3.on('pointerover', function (descript) {
            option3des.setColor('#FFFFFF')
        });
        option3.on('pointerout', function (descript) {
            option3des.setColor('#000000')
        });
        option4.on('pointerover', function (descript) {
            option4des.setColor('#FFFFFF')
        });
        option4.on('pointerout', function (descript) {
            option4des.setColor('#000000')
        });
        option5.on('pointerover', function (descript) {
            option5des.setColor('#FFFFFF')
        });
        option5.on('pointerout', function (descript) {
            option5des.setColor('#000000')
        });
        option6.on('pointerover', function (descript) {
            option6des.setColor('#FFFFFF')
        });
        option6.on('pointerout', function (descript) {
            option6des.setColor('#000000')
        });
    }

    createArchers()
    {
        //create 5 archer objects
        for(let i = 0; i < 5; i++)
        {
            // archer params: scene, ratio, color, positive trait, negative trait
            let archer = new Archer(this, 
                (Math.random() * 2 + 1).toFixed(2), 
                this.getRandHexColor(), 
                Math.floor(Math.random() * 6), 
                Math.floor(Math.random() * 6));
            
            //add the archer to our group
            this.archerGroup.add(archer);
            //archer.setTint(archer.myColor);
            
        }

        //crate an array from our group of archers
        this.archerArr = this.archerGroup.getChildren();

        //attempt to tint each archer hat
        for(let i = 0; i < 5; i++)
        {
            let sprite = this.archerArr[i];
            sprite.tint = this.archerArr[i].myColor;
        }

        //position each archerhat sprite in the corner of each stat block
        this.archerArr[0].x = 800;
        this.archerArr[0].y = 50;
        this.archerArr[1].x = 1000;
        this.archerArr[1].y = 50;
        this.archerArr[2].x = 800;
        this.archerArr[2].y = 225;
        this.archerArr[3].x = 1000;
        this.archerArr[3].y = 225;
        this.archerArr[4].x = 900;
        this.archerArr[4].y = 400;

        //debug print the stats of each archer
        /*
        for(let i = 0; i < 5; i++)
        {
            console.log('Archer' + i + ' ratio: ' + archerArr[i].myRatio);
            console.log('Archer' + i + ' color: ' + archerArr[i].myColor);
            console.log('Archer' + i + ' pos trait: ' + archerArr[i].myPosTrait);
            console.log('Archer' + i + ' neg trait: ' + archerArr[i].myNegTrait);
        }
        console.log('created archers:');
        */

        //print stats  in the stat block
        for(let i = 0; i < 5; i++)
        {
            //print the betting ratio of each archer
            this.add.text(this.archerArr[i].x + 75, this.archerArr[i].y + 25, 'Ratio: ' + this.archerArr[i].myRatio, statsConfig).setOrigin(0.5);
            //display the arrows for each archer's pos and neg trait
            this.add.sprite(this.archerArr[i].x + 30, this.archerArr[i].y + 60, 'upArrow');
            this.add.sprite(this.archerArr[i].x + 30, this.archerArr[i].y + 120, 'downArrow');
            
            //display each archer's pos trait icon
            switch(this.archerArr[i].myPosTrait)
            {
                case 0:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 60, 'horn').setScale(0.3);
                    break;
                case 1:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 60, 'misbow').setScale(0.3);
                    break;
                case 2:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 60, 'fan').setScale(0.3);
                    break;
                case 3:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 60, 'bird').setScale(0.4);
                    break;
                case 4:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 60, 'bentarrow').setScale(0.4);
                    break;
                case 5:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 60, 'fight').setScale(0.3);
                    break;
            }
            //display each archer's neg trait icon
            switch(this.archerArr[i].myNegTrait)
            {
                case 0:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 120, 'horn').setScale(0.3);
                    break;
                case 1:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 120, 'misbow').setScale(0.3);
                    break;
                case 2:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 120, 'fan').setScale(0.3);
                    break;
                case 3:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 120, 'bird').setScale(0.4);
                    break;
                case 4:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 120, 'bentarrow').setScale(0.4);
                    break;
                case 5:
                    this.add.sprite(this.archerArr[i].x + 100, this.archerArr[i].y + 120, 'fight').setScale(0.3);
                    break;
            }

        }

        //display the plus and minus icons for increasing and decreasing betting values
        //archer 1
        this.plus1 = this.add.sprite(this.archerArr[0].x - 30, this.archerArr[0].y + 20, 'plus');
        this.plus1.setInteractive({
            useHandCursor: true
        });
        this.plus1.on('pointerdown', function (pointer){
            if((money - 50) >= 0)
                this.scene.archerArr[0].myBet += 50;
            this.scene.adjustMoney(50, -1);
            //money -= 50;
        });

        this.minus1 = this.add.sprite(this.archerArr[0].x - 30, this.archerArr[0].y + 70, 'minus');
        this.minus1.setInteractive({
            useHandCursor: true
        });
        this.minus1.on('pointerdown', function (pointer){
            //keep bet from going negative
            if(this.scene.archerArr[0].myBet > 0)
            {
                this.scene.archerArr[0].myBet -= 50;
                this.scene.adjustMoney(50, 1);
                //money += 50;
            }
        });

        this.bet1text = this.add.text(this.archerArr[0].x - 30, this.archerArr[0].y + 110, 'Bet:\n' + this.archerArr[0].myBet, betConfig).setOrigin(0.5);

        //archer 2
        this.plus2 = this.add.sprite(this.archerArr[1].x - 30, this.archerArr[1].y + 20, 'plus');
        this.plus2.setInteractive({
            useHandCursor: true
        });
        this.plus2.on('pointerdown', function (pointer){
            if((money - 50) >= 0)
                this.scene.archerArr[1].myBet += 50;
            this.scene.adjustMoney(50, -1);
            //money -= 50;
        });

        this.minus2 = this.add.sprite(this.archerArr[1].x - 30, this.archerArr[1].y + 70, 'minus');
        this.minus2.setInteractive({
            useHandCursor: true
        });
        this.minus2.on('pointerdown', function (pointer){
            //keep bet from going negative
            if(this.scene.archerArr[1].myBet > 0)
            {
                this.scene.archerArr[1].myBet -= 50;
                this.scene.adjustMoney(50, 1);
                //money += 50;
            }
        });

        this.bet2text = this.add.text(this.archerArr[1].x - 30, this.archerArr[1].y + 110, 'Bet:\n' + this.archerArr[1].myBet, betConfig).setOrigin(0.5);

        //archer 3
        this.plus3 = this.add.sprite(this.archerArr[2].x - 30, this.archerArr[2].y + 20, 'plus');
        this.plus3.setInteractive({
            useHandCursor: true
        });
        this.plus3.on('pointerdown', function (pointer){
            if((money - 50) >= 0)
                this.scene.archerArr[2].myBet += 50;
            this.scene.adjustMoney(50, -1);
            //money -= 50;
        });

        this.minus3 = this.add.sprite(this.archerArr[2].x - 30, this.archerArr[2].y + 70, 'minus');
        this.minus3.setInteractive({
            useHandCursor: true
        });
        this.minus3.on('pointerdown', function (pointer){
            //keep bet from going negative
            if(this.scene.archerArr[2].myBet > 0)
            {
                this.scene.archerArr[2].myBet -= 50;
                this.scene.adjustMoney(50, 1);
                //money += 50;
            }
        });

        this.bet3text = this.add.text(this.archerArr[2].x - 30, this.archerArr[2].y + 110, 'Bet:\n' + this.archerArr[2].myBet, betConfig).setOrigin(0.5);

        //archer 4
        this.plus4 = this.add.sprite(this.archerArr[3].x - 30, this.archerArr[3].y + 20, 'plus');
        this.plus4.setInteractive({
            useHandCursor: true
        });
        this.plus4.on('pointerdown', function (pointer){
            if((money - 50) >= 0)
                this.scene.archerArr[3].myBet += 50;
            this.scene.adjustMoney(50, -1);
            //money -= 50;
        });

        this.minus4 = this.add.sprite(this.archerArr[3].x - 30, this.archerArr[3].y + 70, 'minus');
        this.minus4.setInteractive({
            useHandCursor: true
        });
        this.minus4.on('pointerdown', function (pointer){
            //keep bet from going negative
            if(this.scene.archerArr[3].myBet > 0)
            {
                this.scene.archerArr[3].myBet -= 50;
                this.scene.adjustMoney(50, 1);
                //money += 50;
            }
        });

        this.bet4text = this.add.text(this.archerArr[3].x - 30, this.archerArr[3].y + 110, 'Bet:\n' + this.archerArr[3].myBet, betConfig).setOrigin(0.5);

        //archer 5
        this.plus5 = this.add.sprite(this.archerArr[4].x - 30, this.archerArr[4].y + 20, 'plus');
        this.plus5.setInteractive({
            useHandCursor: true
        });
        this.plus5.on('pointerdown', function (pointer){
            if((money - 50) >= 0)
                this.scene.archerArr[4].myBet += 50;
            this.scene.adjustMoney(50, -1);
            //money -= 50;
        });

        this.minus5 = this.add.sprite(this.archerArr[4].x - 30, this.archerArr[4].y + 70, 'minus');
        this.minus5.setInteractive({
            useHandCursor: true
        });
        this.minus5.on('pointerdown', function (pointer){
            //keep bet from going negative
            if(this.scene.archerArr[4].myBet > 0)
            {
                this.scene.archerArr[4].myBet -= 50;
                this.scene.adjustMoney(50, 1);
                //money += 50;
            }
        });

        this.bet5text = this.add.text(this.archerArr[4].x - 30, this.archerArr[4].y + 110, 'Bet:\n' + this.archerArr[4].myBet, betConfig).setOrigin(0.5);
    }



    getRandHexColor()
    {
        return Math.floor(Math.random()*16777215).toString(16);
    }
}