//const { Phaser } = require("../lib/phaser.min");

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3; 

// reserve keyboard vars
let keyA, keyD, keyW, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
localStorage.setItem("highStorage", 0); //beginnermode_HighScoreStorage
localStorage.setItem("highStorage2", 0); //expertmode_HighScoreStorage
