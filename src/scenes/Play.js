//Louis Lim
//Rocket-Patrol-modification
//04182022
class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load imaages/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
        //this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield', './assets/space.jpg');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        this.music = this.sound.add('peco');
        this.music.play();

        this.backgroundSpeed = 4;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
             top: 5,
             bottom: 5,
            },
            fixedWidth: 100
        }

        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
             top: 5,
             bottom: 5,
            },
            fixedWidth: 100
        }

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey("A");
        keyD = this.input.keyboard.addKey("D");
        keyW = this.input.keyboard.addKey("W");
        
        //this.sound.play('peco');
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // initialize score
        this.p2Score = 0;
        this.p1Score = 0;
        this.highScore = localStorage.getItem("highStorage");
        this.highScore2 = localStorage.getItem("highStorage2");

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        //this.p1Rocket = new Rocket(this, game.config.width/4, game.config.height - borderUISize - borderPadding, 'rocket', 0, keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
        if(game.settings.players){
            this.p2Rocket = new Rocket(this, game.config.width*3/4, game.config.height - borderUISize - borderPadding, 'rocket', 0, keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
            this.p1Rocket = new Rocket(this, game.config.width/4, game.config.height - borderUISize - borderPadding, 'rocket', 0, keyA, keyD, keyW).setOrigin(0.5, 0);
            this.scoreRight = this.add.text(game.config.width - borderUISize*4 - borderPadding*3/2, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
            this.FireUI2 = this.add.text(game.config.width/2 + borderPadding*3/2, borderUISize + borderPadding*2, "FIRE", fireConfig);
        }
        else{
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
            //this.scoreHigh = this.add.text(borderUISize, borderUISize*3 + borderPadding);//high score
            this.scoreHigh = this.add.text(borderUISize, borderUISize*3 + borderPadding);//high score
            if(!game.settings.hard){
                this.scoreHigh.text = "High Score: "+this.highScore;
            }
            else{
                this.scoreHigh.text = "High Score: "+this.highScore2;
            }
        }
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*10, borderUISize*4, 'spaceship2', 0, 40).setOrigin(0,0);
        this.ship04.moveSpeed *= 1.5; 

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); //upper border(width * UISize)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); //down border
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0); //left
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0); //right

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        //this.scoreRight = this.add.text(game.config.width - borderUISize*4 - borderPadding*3/2, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        this.FireUI1 = this.add.text(game.config.width/2 - borderUISize*4 + borderPadding*3/2, borderUISize + borderPadding*2, "FIRE", fireConfig);
        //this.FireUI2 = this.add.text(game.config.width/2 + borderPadding*3/2, borderUISize + borderPadding*2, "FIRE", scoreConfig);
        this.timer = this.add.text(game.config.width - borderUISize*5, borderUISize*3 + borderPadding);

        this.time.delayedCall(30000, () => {
            this.ship01.speedUp();
            this.ship02.speedUp();
            this.ship03.speedUp();
            this.ship04.speedUp();
            this.backgroundSpeed *= 1.5;
            this.add.text(game.config.width/2, borderUISize*3 + borderPadding, 'SPEED UP');
        }, null, this); //speed up spaceships after 30 seconds 

        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 8, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            scoreConfig.backgroundColor = '#00FF00';
            this.add.text(game.config.width/2, game.config.height/2 + 72, 'Press L/R arrows to return Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.backgroundSpeed = 0;
            this.timer.setVisible(false); //erase timer
            this.music.stop();
        }, null, this);
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT))) {
            this.scene.start('menuScene');
        }

        this.starfield.tilePositionX -= this.backgroundSpeed;

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            if(game.settings.players){
                this.p2Rocket.update();
            }
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        } 

        // check p1 collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.shipExplode(this.ship03, this.p1Rocket);
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.shipExplode(this.ship02, this.p1Rocket);
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.shipExplode(this.ship01, this.p1Rocket);
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.shipExplode(this.ship04, this.p1Rocket);
            this.p1Rocket.reset();
        }
        if(this.p1Rocket.isFiring){
            this.FireUI1.setVisible(true);
        }
        else{
            this.FireUI1.setVisible(false);
        }

        if(game.settings.players){
            //check p2 collisions
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.shipExplode(this.ship03, this.p2Rocket);
                this.p2Rocket.reset();
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.shipExplode(this.ship02, this.p2Rocket);
                this.p2Rocket.reset();
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.shipExplode(this.ship01, this. p2Rocket);
                this.p2Rocket.reset();
            }
            if (this.checkCollision(this.p1Rocket, this.ship04)) {
                this.shipExplode(this.ship04, this.p1Rocket);
                this.p1Rocket.reset();
            }
            if(this.p2Rocket.isFiring){
                this.FireUI2.setVisible(true);
            }
            else{
                this.FireUI2.setVisible(false);
            }
        }
        

        if(!game.settings.players){
            if(!game.settings.hard){
                if (this.p1Score >= this.highScore){
                localStorage.setItem("highStorage", this.p1Score);
                this.scoreHigh.text = "High Score: " + localStorage.getItem("highStorage");
                }
            }
            else{
                if( this.p1Score >= this.highScore2){
                localStorage.setItem("highStorage2", this.p1Score);
                this.scoreHigh.text = "High Score: " + localStorage.getItem("highStorage2");
                }
            }
        }

        this.timer.setText('Timer: '+ (game.settings.gameTimer/1000 - game.settings.gameTimer/1000*this.clock.getProgress()).toString().substr(0, 5)); //update timer
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, rocket) {
        let randomizer = Phaser.Math.Between(0, 3); //randomize 4 sfx
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        if(rocket == this.p1Rocket) {this.p1Score += ship.points; this.scoreLeft.text = this.p1Score;}
        if(rocket == this.p2Rocket){this.p2Score +=ship.points; this.scoreRight.text = this.p2Score;}
        if(randomizer == 0){
            this.sound.play('sfx_explosion');
        }
        else if(randomizer == 1){
            this.sound.play('explosion');
        }
        else if(randomizer == 2){
            this.sound.play('explosion2');
        }
        else{
            this.sound.play('explosion3');
        }
    }

}