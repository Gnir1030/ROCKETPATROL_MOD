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
let keyA, keyD, keyW, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
localStorage.setItem("highStorage", 0); //beginnermode_HighScoreStorage
localStorage.setItem("highStorage2", 0); //expertmode_HighScoreStorage

/*
Track a high score that persists across scenes and display it in the UI (5), high scores for each mode are saved in separated storages
Implement the 'FIRE' UI text from the original game (5)
Add your own (copyright-free) background music to the Play scene (5) , and restart with playscene
Implement the speed increase that happens after 30 seconds in the original game (5)
Create a new scrolling tile sprite for the background (5)
Allow the player to control the Rocket after it's fired (5)

Create 4 new explosion SFX and randomize which one plays on impact (10)
Display the time remaining (in seconds) on the screen (10)
Create a new title screen (e.g., new artwork, typography, layout) (10)

Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Implement an alternating two-player mode (20)
*/