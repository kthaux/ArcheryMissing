class Archer extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, ratio, color, posTrait, negTrait)
    {
        super(scene, game.config.width/2, game.config.height/2, 'archerHat');
        this.myColor = '0x' + color;
        this.myRatio = ratio;
        this.myPosTrait = posTrait;
        this.myNegTrait = negTrait;



        scene.add.existing(this);
    }

}