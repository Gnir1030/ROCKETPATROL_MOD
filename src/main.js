//const { Phaser } = require("../lib/phaser.min");
//Louis Lim
//Rocket-Patrol-modification
//04182022
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
<<<<<<< HEAD
let keyA, keyD, keyW, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN; //key variable
localStorage.setItem("highStorage", 0);
localStorage.setItem("highStorage2", 0);
=======
let keyA, keyD, keyW, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
localStorage.setItem("highStorage", 0); //beginnermode_HighScoreStorage
localStorage.setItem("highStorage2", 0); //expertmode_HighScoreStorage
>>>>>>> 94e8f7b80f48bdff7be78a95adbfc05925da71e2
