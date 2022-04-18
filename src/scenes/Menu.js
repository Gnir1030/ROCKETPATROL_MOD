//Louis Lim
//Rocket-Patrol-modification
//04182022
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('peco', './assets/peco.mp3');
        this.load.audio('explosion', './assets/explosion.mp3');
        this.load.audio('explosion2', './assets/explosion2.mp3');
        this.load.audio('explosion3', './assets/explosion3.mp3');
        this.load.image('starfield', './assets/space.jpg');
    }

    create(){
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        let titleConfig = {
          fontFamily: 'Copperplate',
          fontSize: '56px',
          //backgroundColor: '#F3B141',
          color: '#FFFFFF',
          align: 'right',
          padding:{
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#FFFFFF',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2 - borderPadding, 'ROCKET PATROL', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize, 'Use arrows to move & fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press Left arrow for beginner', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press Right arrow for expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 'Press Up arrow for 2P mode', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // beginner mode
          game.settings = {
            spaceshipSpeed: 6,
            gameTimer: 60000,
            players: false,
            hard: false
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // expert mode
          game.settings = {
            spaceshipSpeed: 8,
            gameTimer: 45000,
            players: false,
            hard: true
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          // 2player mode
          game.settings = {
            spaceshipSpeed: 6,
            gameTimer: 60000,
            players: true
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');   
        }
      }
}
