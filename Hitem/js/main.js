// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application(800,600);
document.getElementById("game").appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	


// aliases
let stage;

// game variables
let startScene;
let instructionScene;
let recordsScene, recordLosses, recordWins;
let gameScene,player1, player2, timerLabel, score1Label, score2Label, lifeLabel, hitSound;
let gameOverScene, gameOverText, winner;
let player1Scene, player1Name, player1String;
let player2Scene, player2Name, player2String;

// spawn squares between 150 and 640
let p1Up,p1Down,p2Up,p2Down;

let scores = [,];
let playerWins, playerLosses;
let bricks = [];
let circles = [];
let player1Score;
let player2Score;
let shootTimer = 60;
let timer = 3600; //3600;
let paused = true;

function setup() {
    
    //localStorage.clear();
	stage = app.stage;
	// #1 - Create the `start` scene
	startScene = new PIXI.Container();
    stage.addChild(startScene);
    
    // make instructions scene
    instructionScene = new PIXI.Container();
    instructionScene.visible = false
    stage.addChild(instructionScene);
    
    // make records scene
    recordsScene = new PIXI.Container();
    recordsScene.visible = false;
    stage.addChild(recordsScene);
    
	// #2 - Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);
    
	// #3 - Create the `gameOver` scene and make it invisible
	gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);
    
    player1Scene = new PIXI.Container();
    player1Scene.visible = false;
    stage.addChild(player1Scene);
    
    player2Scene = new PIXI.Container();
    player2Scene.visible = false;
    stage.addChild(player2Scene);
    
	// #4 - Create labels for all 3 scenes
	createLabelsAndButtons();
    
	// #5 - Create ship
    player1 = new Paddle(1, 20, 300);
    player2 = new Paddle(2, 770, 300);

    gameScene.addChild(player1);
    gameScene.addChild(player2);
    
    // set up,down and player strings
    p1Up = false;
    p1Down = false;
    p2Up = false;
    p2Down = false;
    player1String = "";
    player2String = "";
	
	// #6 - Load Sounds
    hitSound = new Howl({
        src: ['sounds/pongHit.wav'],
        volume: 1
    });
    //hitSound = PIXI.sound.Sound.from('sounds/pongHit.wav');
    
    // add eventListener for inputs
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    
	// #8 - Start update loop
    app.ticker.add(gameLoop);

}

function createLabelsAndButtons(){
    
    let winsRecorded = "";
    let lossesRecorded = "";
    // grabs all the wins and losses, and stores it in a big string
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i).includes("Wins")){
            winsRecorded += "\n" + localStorage.key(i)+ ": " + localStorage.getItem(localStorage.key(i));
        }
        if(localStorage.key(i).includes("Losses")){
            lossesRecorded += "\n" + localStorage.key(i)+ ": " +  localStorage.getItem(localStorage.key(i));
        }
        
    }
    //console.log(winsRecorded);
    
    // determine what buttonstyle is
    let buttonStyle = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 48,
        fontFamily: "Bungee"
    });
    
    // title of game
    let startLabel1 = new PIXI.Text("Hit 'Em");
    startLabel1.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 96,
        fontFamily: 'Bungee',
        strokeThickness: 6
    });
    startLabel1.x = 200;
    startLabel1.y = 30;
    startScene.addChild(startLabel1);
    
    // button to go to instuction
    let instructionsButton = new PIXI.Text("instructions");
    instructionsButton.style = buttonStyle;
    instructionsButton.x = 200;
    instructionsButton.y = sceneHeight - 300;
    instructionsButton.interactive = true;
    instructionsButton.buttonMode = true;
    instructionsButton.on("pointerup", Instructions); 
    instructionsButton.on('pointerover', e => e.target.alpha = 0.7);
    instructionsButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    startScene.addChild(instructionsButton);
    
    // instruction title
    let instructionText = new PIXI.Text("instructions");
    instructionText.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 44,
        fontFamily: 'Bungee',
        strokeThickness: 6
    });
    instructionText.x = 100;
    instructionText.y = 30;
    instructionScene.addChild(instructionText);
    
    // all the instructions for the game
    let instructionDescText = new PIXI.Text("Player 1: W and S to move. \n\nPlayer 2: Up and down arrow keys to move.    \n\nHit bricks to score 1 point, and get ball \npast other player's side to score 5 points.");
    instructionDescText.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 24,
        fontFamily: 'Bungee',
        strokeThickness: 6,
        width: 300
    });
    instructionDescText.x = 100;
    instructionDescText.y = 200;
    instructionScene.addChild(instructionDescText);
    
    
    // button to go to the records
    let recordsButton = new PIXI.Text("Records");
    recordsButton.style = buttonStyle;
    recordsButton.x = 200;
    recordsButton.y = sceneHeight - 200;
    recordsButton.interactive = true;
    recordsButton.buttonMode = true;
    recordsButton.on("pointerup", Records); 
    recordsButton.on('pointerover', e => e.target.alpha = 0.7);
    recordsButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    startScene.addChild(recordsButton);
    
    // button to play game
    let startButton = new PIXI.Text("play");
    startButton.style = buttonStyle;
    startButton.x = 200;
    startButton.y = sceneHeight - 100;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", startGame); 
    startButton.on('pointerover', e => e.target.alpha = 0.7);
    startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);
    
    // one button to back
    let back1Button = new PIXI.Text("Back");
    back1Button.style = buttonStyle;
    back1Button.x = sceneWidth/3;
    back1Button.y = sceneHeight - 100;
    back1Button.interactive = true;
    back1Button.buttonMode = true;
    back1Button.on("pointerup",startMenu); // startGame is a function reference
    back1Button.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    back1Button.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    instructionScene.addChild(back1Button);
    
    // record title
    let recordsText = new PIXI.Text("Record");
    recordsText.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 44,
        fontFamily: 'Bungee',
        strokeThickness: 6
    });
    recordsText.x = 100;
    recordsText.y = 30;
    recordsScene.addChild(recordsText);
    
    // display record wins
    recordWins = new PIXI.Text("Wins\n" + winsRecorded);
    recordWins.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 34,
        fontFamily: 'Bungee',
        strokeThickness: 6
    });
    recordWins.x = 100;
    recordWins.y = 100;
    recordsScene.addChild(recordWins);
    
    // shows recorded losses of players
    recordLosses = new PIXI.Text("Losses\n" + lossesRecorded);
    recordLosses.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 34,
        fontFamily: 'Bungee',
        strokeThickness: 6
    });
    recordLosses.x = 400;
    recordLosses.y = 100;
    recordsScene.addChild(recordLosses);
    
    // another button to go back
    let anotherBackButton = new PIXI.Text("Back");
    anotherBackButton.style = buttonStyle;
    anotherBackButton.x = sceneWidth/3;
    anotherBackButton.y = sceneHeight - 100;
    anotherBackButton.interactive = true;
    anotherBackButton.buttonMode = true;
    anotherBackButton.on("pointerup",startMenu); // startGame is a function reference
    anotherBackButton.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    anotherBackButton.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    recordsScene.addChild(anotherBackButton);
    
    // game over text
    gameOverText = new PIXI.Text("Game Over!\n");
    gameOverText.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 48,
        fontFamily: 'Bungee',
        strokeThickness: 6,
        width: 300
    });
    gameOverText.x = 100;
    gameOverText.y = 100;
    gameOverScene.addChild(gameOverText);
    
    // tell player to enter their name
    let player1Text = new PIXI.Text("Player 1: Enter your name");
    player1Text.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 36,
        fontFamily: 'Bungee',
        strokeThickness: 6,
        width: 300
    });
    player1Text.x = 100;
    player1Text.y = 200;
    player1Scene.addChild(player1Text);
    
    // empty until player 1 types something
    player1Name = new PIXI.Text("Empty");
    player1Name.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 30,
        fontFamily: 'Bungee',
        strokeThickness: 6,
        width: 300
    });
    player1Name.x = 300;
    player1Name.y = 300;
    player1Scene.addChild(player1Name);
    
    // player 1 button to go to player 2
    let player1Next = new PIXI.Text("Next");
    player1Next.style = buttonStyle;
    player1Next.x = sceneWidth/3;
    player1Next.y = sceneHeight - 100;
    player1Next.interactive = true;
    player1Next.buttonMode = true;
    player1Next.on("pointerup",secondPlayer); // startGame is a function reference
    player1Next.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    player1Next.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    player1Scene.addChild(player1Next);
    
    // enter button for GameOver
    let enter1Button = new PIXI.Text("Next");
    enter1Button.style = buttonStyle;
    enter1Button.x = sceneWidth/3;
    enter1Button.y = sceneHeight - 100;
    enter1Button.interactive = true;
    enter1Button.buttonMode = true;
    enter1Button.on("pointerup", firstPlayer); // startGame is a function reference
    enter1Button.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    enter1Button.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    gameOverScene.addChild(enter1Button);
    
    let player2Text = new PIXI.Text("Player 2: Enter your name");
    player2Text.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 36,
        fontFamily: 'Bungee',
        strokeThickness: 6,
        width: 300
    });
    player2Text.x = 100;
    player2Text.y = 200;
    player2Scene.addChild(player2Text);
    
    player2Name = new PIXI.Text("Empty");
    player2Name.style = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 30,
        fontFamily: 'Bungee',
        strokeThickness: 6,
        width: 300
    });
    player2Name.x = 300;
    player2Name.y = 300;
    player2Scene.addChild(player2Name);
    
    let enter2Button = new PIXI.Text("Menu");
    enter2Button.style = buttonStyle;
    enter2Button.x = sceneWidth/3;
    enter2Button.y = sceneHeight - 100;
    enter2Button.interactive = true;
    enter2Button.buttonMode = true;
    enter2Button.on("pointerup", startMenu); // startGame is a function reference
    enter2Button.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    enter2Button.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    player2Scene.addChild(enter2Button);
    
    
    let textStyle = new PIXI.TextStyle({
        fill: 0x8E8F94,
        fontSize: 18,
        fontFamily: "Bungee",
        strokeThickness: 4
    });
    
    // 2A
    score1Label = new PIXI.Text();
    score1Label.style = textStyle;
    score1Label.x = 5;
    score1Label.y = 5;
    gameScene.addChild(score1Label);
    increaseScoreBy(1, 0);
    
    score2Label = new PIXI.Text();
    score2Label.style = textStyle;
    score2Label.x = 650;
    score2Label.y = 5;
    gameScene.addChild(score2Label);
    increaseScoreBy(2, 0);
    
    timerLabel = new PIXI.Text();
    timerLabel.style = textStyle;
    timerLabel.x = sceneWidth/2;
    timerLabel.y = 5;
    gameScene.addChild(timerLabel);
    
    // 2B
    lifeLabel = new PIXI.Text();
    lifeLabel.style = textStyle;
    lifeLabel.x = 5;
    lifeLabel.y = 26;
    gameScene.addChild(lifeLabel);
    //decreaseLifeBy(0);
    
    // 3 - set up `gameOverScene`
    // 3A - make game over text
    
}

// refresh page
function refresh(){
    location.reload()
}

// display start menu and save player 2 win/loss
function startMenu(){
    if(player2Scene.visible === true){
        // change player 1 record
        if(localStorage.getItem(player2String+'Wins') != null){
            let wins = parseInt(localStorage.getItem(player2String+'Wins'), 10);
            wins += 1;
            let losses = parseInt(localStorage.getItem(player2String+'Losses'), 10);
            losses += 1;
            
            console.log(wins);
            console.log(losses);     
            if(winner === 1){
                
                localStorage.setItem(player2String+'Wins',wins);
            }
            else if(winner === 2){
                localStorage.setItem(player2String+'Losses',losses);
            }
        }
        else{
            if(winner === 1){
                localStorage.setItem(player2String+'Wins', 0);
                localStorage.setItem(player2String+'Losses',1);
            }
            else if(winner === 2){
                localStorage.setItem(player2String+'Wins', 1);
                localStorage.setItem(player2String+'Losses',0);
            }
        }
        
        console.log(player2String + " " + localStorage.getItem(player2String+'Wins'));
        console.log(player2String + " " + localStorage.getItem(player2String+'Losses'));

    }
    startScene.visible = true;
    gameOverScene.visible = false;
    gameScene.visible = false;
    recordsScene.visible = false;
    instructionScene.visible = false;
    player1Scene.visible = false;
    player2Scene.visible = false;
}

// instructions on how to play
function Instructions(){
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = false;
    recordsScene.visible = false;
    instructionScene.visible = true;
    player1Scene.visible = false;
    player2Scene.visible = false;

}

// display the local records of win/losses
function Records(){
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = false;
    recordsScene.visible = true;
    instructionScene.visible = false;
    player1Scene.visible = false;
    player2Scene.visible = false;
    
    let winsRecorded = "";
    let lossesRecorded = "";
    // grabs all the wins and losses, and stores it in a big string
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i).includes("Wins")){
            winsRecorded += "\n" + localStorage.key(i)+ ": " + localStorage.getItem(localStorage.key(i));
        }
        if(localStorage.key(i).includes("Losses")){
            lossesRecorded += "\n" + localStorage.key(i)+ ": " +  localStorage.getItem(localStorage.key(i));
        }
        
    }
    
    recordWins.text = "Wins\n" + winsRecorded;
    recordLosses.text = "Losses\n" + lossesRecorded;
}

// reset everything and start new game
function startGame(){
    startScene.visible = false;
    gameOverScene.visible = false;
    recordsScene.visible = false;
    instructionScene.visible = false;
    gameScene.visible = true;
    player1Scene.visible = false;
    player2Scene.visible = false;
    timer = 3600;
    
    player1Score = 0;
    player2Score = 0;
    increaseScoreBy(1, 0);
    increaseScoreBy(2,0);
    let fill = new Fill();
    gameScene.addChild(fill);
    gameScene.removeChild(fill);
    gameScene.addChildAt(fill, gameScene.children.length -gameScene.children.length);
    
    bricks = [];
    circles =[];
    
    loadLevel();
}

// decide who won and load gameOver scene
function gameOver(){
    startScene.visible = false;
    gameOverScene.visible = true;
    gameScene.visible = false;
    recordsScene.visible = false;
    instructionScene.visible = false;
    player1Scene.visible = false;
    player2Scene.visible = false;
    
    player1String = "";
    player2String = "";
    
    let difference = player1Score - player2Score;
    
    if(difference > 0){
        winner = 1;
        gameOverText.text = "Player 2 couldn't \n handle all the \n    balls";
    }
    if(difference < 0){
        winner = 2;
        gameOverText.text = "Player 1 couldn't \n\thandle all the \n\t\t\t\t\tballs";
    }
    console.log(winner);

}

function firstPlayer(){
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = false;
    recordsScene.visible = false;
    instructionScene.visible = false;
    player1Scene.visible = true;
    player2Scene.visible = false;
    
    player1Name.text = "Empty";
}

// change scene to player 2, and save player 1's inputs
function secondPlayer(){
    // change player 1 record
    if(localStorage.getItem(player1String+'Wins') != null){
        let wins = parseInt(localStorage.getItem(player1String+'Wins'), 10);
            wins += 1;
            let losses = parseInt(localStorage.getItem(player1String+'Losses'), 10);
            losses += 1;
        console.log(losses);
        
        if(winner === 1){
            localStorage.setItem(player1String+'Wins',wins);
        }
        else if(winner === 2){
            localStorage.setItem(player1String+'Losses',losses);
        }
    }
    else{
        if(winner === 1){
            localStorage.setItem(player1String+'Wins', 1);
            localStorage.setItem(player1String+'Losses',0);
        }
        else if(winner === 2){
            localStorage.setItem(player1String+'Wins', 0);
            localStorage.setItem(player1String+'Losses',1);
        }
    }
    //console.log(localStorage.getItem(player1String+'Wins'));
    //console.log(localStorage.getItem(player1String+'Losses'));

    
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = false;
    recordsScene.visible = false;
    instructionScene.visible = false;
    player1Scene.visible = false;
    player2Scene.visible = true;
    
    player2Name.text = "Empty";
}

// increase score
function increaseScoreBy(player, value){
    if(player === 1){
        player1Score += value;
        score1Label.text = `Score     ${player1Score}`;
    }
    if(player === 2){
        player2Score += value;
        score2Label.text = `Score     ${player2Score}`;
    }
}

// decrease time as the timer gets lower
function UpdateTime(){
    timer--;
    let secondsLeft = timer/60
    timerLabel.text = Math.round( secondsLeft * 10/10);
}

// calls every fram, and calls everything in the game
function gameLoop(){
	if (paused) return;
    
    UpdateTime();
	
	// #1 - Calculate "delta time"
	let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt=1/12;
	
    let amt = 6 *dt;
    
    // lerp (linear interpolate) the x & y values with lerp()
    let newPlayer1X = lerp(player1.x, 20, amt);
    let newPLayer1Y = lerp(player1.y, sceneWidth/2, amt);
    
    let newPlayer2X = lerp(player2.x, sceneWidth-30, amt);
    let newPlayer2Y = lerp(player2.y, sceneWidth/2, amt);
    
    shootTimer--;
    if(shootTimer <= 0){
        spawnBall();
        shootTimer = 60;
    }
    
    MovePlayers();
    OperateBalls();
    
    if(timer <= 0){
        end();
    }
}

// spawn a ball of normal size
function spawnBall(){
    if(circles.length <= 10){
      let b1 = new Circle(1, 1, 1, player1.x+30, player1.y+45);
      let b2 = new Circle(2, 1, -1, player2.x-15, player2.y+45);
      circles.push(b1);
      circles.push(b2);
      gameScene.addChild(b1);
      gameScene.addChild(b2);
    }
}

// make a grid of bricks 
function createGrid(){
    let distance =  ((sceneWidth/10) + (sceneWidth/80));
    let yStart = sceneHeight/100;
    
    for(let x = sceneWidth /4; x < sceneWidth-150; x += distance){
        for(let y = sceneHeight/yStart; y < sceneHeight; y +=distance){
            let b = new Brick(x,y);
            bricks.push(b);
            gameScene.addChild(b);
        }
    }
}

// unpause and create grid
function loadLevel(){
    createGrid();
	paused = false;
}

// reset everything
function end(){
    paused = true;
    circles.forEach(c => gameScene.removeChild(c)); 
    circles = [];
    
    bricks.forEach(b => gameScene.removeChild(b));
    bricks = [];
    
    
    gameOver();
}

// when key is pressed, set the corresponding player's movement to true
// this will make the players move smoothly
function onKeyDown(key) {
    // W Key is 87
    // Up arrow is 87
    if (key.keyCode === 87) {
        p1Up = true;
    }
    if(key.keyCode === 38){
        p2Up = true;
    }
    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83){
        p1Down = true;
    }
    if( key.keyCode === 40){
        p2Down = true;
    }
    
    // keyboard inputs for player 1
    if(player1Scene.visible === true){
        if( key.keyCode === 81){
            player1String += "q";
        }
        if( key.keyCode === 87){
            player1String += "w";
        }
        if( key.keyCode === 69){
            player1String += "e";
        }
        if( key.keyCode === 82){
            player1String += "r";
        }
        if( key.keyCode === 84){
           player1String += "t";
        }
        if( key.keyCode === 89){
           player1String += "y";
        }
        if( key.keyCode === 85){
            player1String += "u";
        }
        if( key.keyCode === 73){
            player1String += "i";      
        }
        if( key.keyCode === 79){
            player1String += "o";
        }
        if( key.keyCode === 80){
            player1String += "p";
        }
        if( key.keyCode === 65){
            player1String += "a";  
        }
        if( key.keyCode === 83){
            player1String += "s";    
        }
        if( key.keyCode === 68){
            player1String += "d";
        }
        if( key.keyCode === 70){
            player1String += "f";  
        }
        if( key.keyCode === 71){
            player1String += "g";    
        }
        if( key.keyCode === 72){
            player1String += "h";  
        }
        if( key.keyCode === 74){
            player1String += "j";
        }
        if( key.keyCode === 75){
            player1String += "k";
        }
        if( key.keyCode === 76){
            player1String += "l";
        }
        if( key.keyCode === 90){
            player1String += "z";
        }
        if( key.keyCode === 88){
            player1String += "x";
        }
        if( key.keyCode === 67){
            player1String += "c";
        }
        if( key.keyCode === 86){
            player1String += "v";
        }
        if( key.keyCode === 66){
            player1String += "b";
        }
        if( key.keyCode === 78){
            player1String += "n";
        }
        if( key.keyCode === 77){
            player1String += "m";
        }
        if(key.keyCode === 32){
            player1String += " ";
        }
        if(key.keyCode === 8){
            player1String = player1String.substring(0, player1String.length-1);
        }
        player1Name.text = player1String;
        
        console.log(player1String);
    }
    
    // keyboard inputs for player 2
    else if(player2Scene.visible === true){
        if( key.keyCode === 81){
            player2String += "q";
        }
        if( key.keyCode === 87){
            player2String += "w";
        }
        if( key.keyCode === 69){
            player2String += "e";
        }
        if( key.keyCode === 82){
            player2String += "r";
        }
        if( key.keyCode === 84){
            player2String += "t";
        }
        if( key.keyCode === 89){
            player2String += "y";
        }
        if( key.keyCode === 85){
            player2String += "u";
        }
        if( key.keyCode === 73){
            player2String += "i";      
        }
        if( key.keyCode === 79){
            player2String += "o";
        }
        if( key.keyCode === 80){
            player2String += "p";
        }
        if( key.keyCode === 65){
            player2String += "a";  
        }
        if( key.keyCode === 83){
            player2String += "s";    
        }
        if( key.keyCode === 68){
            player2String += "d";
        }
        if( key.keyCode === 70){
            player2String += "f";  
        }
        if( key.keyCode === 71){
            player2String += "g";    
        }
        if( key.keyCode === 72){
            player2String += "h";  
        }
        if( key.keyCode === 74){
            player2String += "j";
        }
        if( key.keyCode === 75){
            player2String += "k";
        }
        if( key.keyCode === 76){
            player2String += "l";
        }
        if( key.keyCode === 90){
            player2String += "z";
        }
        if( key.keyCode === 88){
            player2String += "x";
        }
        if( key.keyCode === 67){
            player2String += "c";
        }
        if( key.keyCode === 86){
            player2String += "v";
        }
        if( key.keyCode === 66){
            player2String += "b";
        }
        if( key.keyCode === 78){
            player2String += "n";
        }
        if( key.keyCode === 77){
            player2String += "m";
        }
        if(key.keyCode === 32){
            player2String += " ";
        }
        if(key.keyCode === 8){
            player2String = player2String.substring(0, player2String.length-1);
        }
        player2Name.text = player2String;
        console.log(player2String);
    }
    /* don't need these but it's nice to have them :D
    // A Key is 65
    // Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {}
    // D Key is 68
    // Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {}       
    */ 
}

// when key is pressed, set the corresponding player's movement to false
// stops players from movign when not hitting keys
function onKeyUp(key){
    // W Key is 87
    // Up arrow is 87
    if (key.keyCode === 87) {
        p1Up = false;
    }
    if (key.keyCode === 38){
        p2Up = false;
    }
    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83){
        p1Down = false;
    }
    if( key.keyCode === 40){
        p2Down = false;
    }
}

// move the players when their up/down bools are true
function MovePlayers(){
    if(p1Up === true){ player1.move(-5); }
     if(p1Down === true){ player1.move(5); }
     if(p2Up === true){ player2.move(-5); }
     if(p2Down === true){ player2.move(5); }
}

/// do all collisions and actions for balls
function OperateBalls(){
    let hasTurned = false;
    for(let i = 0; i < circles.length; i++){
        //console.log(player1Text.text);
        
        // move ball and check if its on screen or at the max y position
        circles[i].move();

        circles[i].CheckBounds();
        
        // if circle is at max y positions, make ball move down
        if((circles[i].y < 65 || circles[i].y > sceneHeight-20) && hasTurned === false){
            hasTurned = true;
            circles[i].speedY = -circles[i].speedY;
        }
        
        /// if balls collide with player, reflect in x direction and move in y direction depending on where the ball hit
        if(rectsIntersect(circles[i], player1) && hasTurned === false){
            hitSound.play();
            hasTurned = true;
            circles[i].speedX = -circles[i].speedX;
            
            let newSpeedY = ((circles[i].y+10) - (player1.y+50))*15;
            
            
            if(((circles[i].y+10) - (player1.y+50) <= 5) && ((circles[i].y+10) - (player1.y+50)) >= -5) {newSpeedY = 0;}
            
            if(newSpeedY > 500) {newSpeedY = 500;}
            if(newSpeedY < -500){newSpeedY = -500;}
            
            circles[i].speedY = newSpeedY;
            circles[i].x = player1.x + 24;
        }
        
        // if paddle intersect with ball, reflect and move in y direction depending on where the ball hit
        if(rectsIntersect(circles[i], player2) && hasTurned === false){
            hitSound.play();
            hasTurned = true;

            circles[i].speedX = -circles[i].speedX;
            
            let newSpeedY = ((circles[i].y+10) - (player2.y+50))*15;
            
            
            if(((circles[i].y+10) - (player2.y+50) <= 5) && ((circles[i].y+10) - (player2.y+50)) >= -5) {newSpeedY = 0;}
            
            if(newSpeedY > 500){ newSpeedY = 500; }
            if(newSpeedY < -500){ newSpeedY = -500; }
            
            //console.log(newSpeedY);

            
            // adjust speed and location 
            circles[i].speedY = newSpeedY;
            circles[i].x = player2.x - 10;
        }
        
        // check collisions with bricks
        // play sound if a hit, decrease brick life 
        for(let j = 0; j < bricks.length; j++){
            if(rectsIntersect(circles[i], bricks[j]) && hasTurned === false){
                hitSound.play();
                increaseScoreBy(circles[i].playerBall, 1);
                hasTurned = true;
                
                circles[i].speedX = -circles[i].speedX;
                circles[i].move();
                //
                bricks[j].decreaseHealth();
                if(bricks[j].life <=0){
                    
                    gameScene.removeChild(bricks[j]);
                    
                    // get rid of dead circles
                    bricks = bricks.filter(b=> b.isAlive);
                }

            }
        }
        
        if(circles[i].x < 0){
            circles[i].OnScreen = false;
            gameScene.removeChild(circles[i]);
            //console.log("scored a point and deleted ball");
            increaseScoreBy(2,5);
        }
        if(circles[i].x > sceneWidth){
            circles[i].OnScreen = false;
            gameScene.removeChild(circles[i]);
            //console.log("scored a point and deleted ball");
            increaseScoreBy(1,5);
        }
        
        circles = circles.filter(c=> c.isOnScreen);        
        hasTurned = false;
    }
}