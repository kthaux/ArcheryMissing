class Title extends Phaser.Scene 
{
    constructor() 
    {
        super('titleScene');
    }

    create() 
    {
        let menuConfig = {
            fontFamily: 'Minecraft',
            fontSize: '30px',
            backgroundColor: '#CBBEB5',
            color: '#106e55',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 750
        }

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg').setOrigin(0);
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); 

        this.introCheck = false;
        this.intro = this.instructions = this.add.text(game.config.width/2.1, game.config.height / 2.25, "Hey there, I'm Samuel.\n\nHere's the scoop: you're gonna help me rig an\narchery tournament so I can retire with the\nmoney I'll be betting with.\n\nNeed a rundown?\nSure (space)\nNah (enter)", menuConfig).setOrigin(0.5);
        this.intro.setAlpha(0);

        this.introTween = this.tweens.add({
            targets: this.intro,
            scale: {from: 0.1, to: 1},
            alpha: {from: 0, to: 1},
            duration: 300,
            ease: "Sine.easeInOut",
            paused: true 

        });

        this.introOut = this.tweens.add({
            targets: this.intro,
            scale: {from: 1, to: 0},
            duration: 300,
            ease: "Sine.easeInOut",
            paused: true
        });
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(spacebar)){
            if(!this.introCheck){
                this.sound.play('select');
                this.introTween.play();
                this.introCheck = true;
            }
            else{
                this.introOut.play();
                rundownCheck = true;
                this.time.delayedCall(500, () => {
                    this.scene.start('prepScene');
                })
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.enter)){
            if(this.introCheck){
                this.sound.play('select');
                this.introOut.play();
                rundownCheck = false;
                this.time.delayedCall(500, () => {
                    this.scene.start('prepScene');
                })
            }
        }
    }
}