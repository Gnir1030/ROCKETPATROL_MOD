//Louis Lim
//Rocket-Patrol-modification
//04182022
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update(){
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width){ // when crossing the frame(not border)
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width; //reset position
    }

    speedUp(){
        this.moveSpeed *= 1.5;
    }
}