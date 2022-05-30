class Prep extends Phaser.Scene 
{
    constructor() 
    {
        super('prepScene');
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
        


        
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            this.sound.play('select');
            this.scene.start('tourneyScene');
        }


        //keep money count up do date every frame
        this.moneyText.text = "Money: " + money;
        
    }

    swapScene()
    {

    }

    createOptions()
    {

        this.option1Count = 0;
        this.option2Count = 0;
        this.option3Count = 0;
        this.option4Count = 0;
        this.option5Count = 0;
        this.option6Count = 0;

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
        let box1filled = false;
        let box2filled = false;
        let box3filled = false;
        let box4filled = false;
        let box5filled = false;
        let box6filled = false;

        //instruction text
        this.title = this.add.text(game.config.width/4.3, 40, 'Choose Your Sabotages', menuConfig).setOrigin(0.5);
        this.instructions = this.add.text(game.config.width/4, 60, 'Click the name to buy it for the next round', menuConfig).setOrigin(0.5);
        this.instructions.setFontSize(20);

        //ready prompt
        this.ready = this.add.text(game.config.width - 200, game.config.height + - 35, 'Press Space When Ready', menuConfig).setOrigin(0.5);

        this.moneyText = this.add.text(game.config.width / 2, game.config.height - 50, 'Money:', menuConfig).setOrigin(0.5);
        
        //add option text
        let option1 = this.add.text(game.config.width / 8, game.config.height / 6, 'Air Horn', optionConfig).setOrigin(0.5);
        let option2 = this.add.text(game.config.width / 8, game.config.height / 2.5, 'Giant Fan', optionConfig).setOrigin(0.5);
        let option3 = this.add.text(game.config.width / 8, game.config.height / 1.5, 'Lead Arrows', optionConfig).setOrigin(0.5);
        let option4 = this.add.text(game.config.width / 3, game.config.height / 6, 'Tampered Bow', optionConfig).setOrigin(0.5);
        let option5 = this.add.text(game.config.width / 3, game.config.height / 2.5, 'Bird Flock', optionConfig).setOrigin(0.5);
        let option6 = this.add.text(game.config.width / 3, game.config.height / 1.5, 'Rumble', optionConfig).setOrigin(0.5);

        let option1des = this.add.text(game.config.width / 8.25, game.config.height / 3.75, 'The good ole fashioned.\nDisturbing the peace since \n19-whenever this thing \nwas invented.\n\nCost: 50', optionDes).setOrigin(0.5);
        let option2des = this.add.text(game.config.width / 8.25, game.config.height / 1.95, "They'll think it's for air\nconditioning. It probably\nwould be if it wasn't\nthe middle of winter.\n\nCost: 50", optionDes).setOrigin(0.5);
        let option3des = this.add.text(game.config.width / 8.25, game.config.height * 0.78, "The nice thing about\nsupplying arrows for the\narchers is that they can't\ncomplain when the\narrows are made of lead.\n\nCost: 50", optionDes).setOrigin(0.5);
        let option4des = this.add.text(game.config.width / 3, game.config.height / 3.6, "I considered having archers\nuse crossbows since they're\ntechnically still bows, but I\ndecided that flimsy and unreliable\nbows would be funnier.\n\nCost: 50", optionDes).setOrigin(0.5);
        let option5des = this.add.text(game.config.width / 3, game.config.height / 1.99, "My pal Sammy has massive bird\ncoop. Let's just say they'll\nbe flying south for the winter.\n\nCost: 50", optionDes).setOrigin(0.5);
        let option6des = this.add.text(game.config.width / 3, game.config.height * 0.77, "I have a friend. His name is\nDennis. Dennis tends to start\nfights. You can see where I'm\ngoing with this.\n\nCost: 50", optionDes).setOrigin(0.5);
        
        //set them to interactable
        option1.setInteractive();
        option2.setInteractive();
        option3.setInteractive();
        option4.setInteractive();
        option5.setInteractive();
        option6.setInteractive();
        this.ready.setInteractive();

        option1.on('pointerdown', function (checking) {
            if(bought_1 == false)
            {
                bought_1 = true;
                option1.setStyle(optionConfig2);
                money -= 50;
            }

            else if(bought_1 == true)
            {
                bought_1 = false;
                option1.setStyle(optionConfig);
                money += 50;
            }
        });

        option2.on('pointerdown', function (checking) {
            if(bought_2 == false)
            {
                bought_2 = true;
                option2.setStyle(optionConfig2);
                money -= 50;
            }
            else if(bought_2 == true)
            {
                bought_2 = false;
                option2.setStyle(optionConfig);
                money += 50;
            }
            
        });
        option3.on('pointerdown', function (checking) {
            if(bought_3 == false)
            {
                bought_3 = true;
                option3.setStyle(optionConfig2);
                money -= 50;
            }
            else if(bought_3 == true)
            {
                bought_3 = false;
                option3.setStyle(optionConfig);
                money += 50;
            }

        });
        option4.on('pointerdown', function (checking) {
            if(bought_4 == false)
            {
                bought_4 = true;
                option4.setStyle(optionConfig2);
                money -= 50;
            }
            else if(bought_4 == true)
            {
                bought_4 = false;
                option4.setStyle(optionConfig);
                money += 50;
            }

        });
        option5.on('pointerdown', function (checking) {
            if(bought_5 == false)
            {
                bought_5 = true;
                option5.setStyle(optionConfig2);
                money -= 50;
            }
            else if(bought_5 == true)
            {
                bought_5 = false;
                option5.setStyle(optionConfig);
                money += 50;
            }

        });
        option6.on('pointerdown', function (checking) {
            if(bought_6 == false)
            {
                bought_6 = true;
                option6.setStyle(optionConfig2);
                money -= 50;
            }
            else if(bought_6 == true)
            {
                bought_6 = false;
                option6.setStyle(optionConfig);
                money += 50;
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
                (Math.random() * 2 + 1).toFixed(3), 
                this.getRandHexColor(), 
                Math.floor(Math.random() * 6), 
                Math.floor(Math.random() * 6));
            
            //add the archer to our group
            this.archerGroup.add(archer);
            //archer.setTint(archer.myColor);
            
        }

        //crate an array from our group of archers
        let archerArr = this.archerGroup.getChildren();

        //attempt to tint each archer hat
        for(let i = 0; i < 5; i++)
        {
            let sprite = archerArr[i];
            sprite.tint = archerArr[i].myColor;
        }

        //position each archerhat sprite in the corner of each stat block
        archerArr[0].x = 800;
        archerArr[0].y = 50;
        archerArr[1].x = 1000;
        archerArr[1].y = 50;
        archerArr[2].x = 800;
        archerArr[2].y = 225;
        archerArr[3].x = 1000;
        archerArr[3].y = 225;
        archerArr[4].x = 900;
        archerArr[4].y = 400;

        //debug print the stats of each archer
        for(let i = 0; i < 5; i++)
        {
            console.log('Archer' + i + ' ratio: ' + archerArr[i].myRatio);
            console.log('Archer' + i + ' color: ' + archerArr[i].myColor);
            console.log('Archer' + i + ' pos trait: ' + archerArr[i].myPosTrait);
            console.log('Archer' + i + ' neg trait: ' + archerArr[i].myNegTrait);
        }
        console.log('created archers:');

        //print stats  in the stat block
        for(let i = 0; i < 5; i++)
        {
            this.add.text(archerArr[i].x + 75, archerArr[i].y + 25, 'Ratio: ' + archerArr[i].myRatio, statsConfig).setOrigin(0.5);


            this.add.sprite(archerArr[i].x + 30, archerArr[i].y + 60, 'upArrow');
            this.add.sprite(archerArr[i].x + 30, archerArr[i].y + 120, 'downArrow');

            switch(archerArr[i].myPosTrait)
            {
                case 0:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 60, 'horn').setScale(0.3);
                    break;
                case 1:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 60, 'misbow').setScale(0.3);
                    break;
                case 2:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 60, 'fan').setScale(0.3);
                    break;
                case 3:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 60, 'bird').setScale(0.4);
                    break;
                case 4:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 60, 'bentarrow').setScale(0.4);
                    break;
                case 5:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 60, 'fight').setScale(0.3);
                    break;
            }

            switch(archerArr[i].myNegTrait)
            {
                case 0:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 120, 'horn').setScale(0.3);
                    break;
                case 1:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 120, 'misbow').setScale(0.3);
                    break;
                case 2:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 120, 'fan').setScale(0.3);
                    break;
                case 3:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 120, 'bird').setScale(0.4);
                    break;
                case 4:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 120, 'bentarrow').setScale(0.4);
                    break;
                case 5:
                    this.add.sprite(archerArr[i].x + 100, archerArr[i].y + 120, 'fight').setScale(0.3);
                    break;
            }
        }
    }

    getRandHexColor()
    {
        return Math.floor(Math.random()*16777215).toString(16);
    }

}