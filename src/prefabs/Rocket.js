// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyL, keyR, keyUp) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this); //add to existing, displayList, updateList
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      this.isFiring = false;
      this.moveSpeed = 6;
      this.keyL = keyL;
      this.keyR = keyR;
      this.keyUp = keyUp;
    }
    
    update(){
        //left and right
        if(!this.isFiring){ //when not firing
            if(this.keyL.isDown && this.x >= borderUISize + this.width){ //if LeftKey pressed && position >= left border()
                this.x -= this.moveSpeed;
            }
            else if(this.keyR.isDown && this.x <= game.config.width - borderUISize - this.width){ //if RightKey pressed && position <= right border()
                this.x +=this.moveSpeed;
            }
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(this.keyUp)){
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }

        //move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){ //until rocket reaching goal (border + UI * 3){
            this.y -= this.moveSpeed;
            if(this.keyL.isDown && this.x >= borderUISize + this.width){ //if LeftKey pressed && position >= left border()
                this.x -= this.moveSpeed;
            }
            else if(this.keyR.isDown && this.x <= game.config.width - borderUISize - this.width){ //if RightKey pressed && position <= right border()
                this.x +=this.moveSpeed;
            }
        }

        if(this.y <= borderUISize * 3 + borderPadding){ //cross the goal
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    firing(){
        return this.isFiring;
    }
  }