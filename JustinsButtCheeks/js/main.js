"use strict";

export {init, setImageData, getGameState, setGameState, restoreGame, addScore, score, UIOffset, getMoney, spendMoney, getHealth, takeDamage, getTimeScale, setTimeScale, imageData, screenHeight, screenWidth, ctx, overlayCtx}
import {setupUI, updateUI} from './UIControl.js';
import {generateLevel, drawLevel, resetLevel} from './levelGeneration.js';
import {setupMainMenu, drawGameOver, drawMainMenu, drawGenerationUI} from './menus.js';
import {setupInput, mouseInput} from './input.js';
import {setBullets, setTowers, updateTowers, drawTowers} from './towers.js';
import {setEnemyList, updateEnemies, drawEnemies} from './enemies.js';
import {setupWaveControl, spawnEnemies} from './waveControl.js';
import {saveScore} from './dataManager.js';

const canvas = document.querySelector("#mainCanvas");
const ctx = canvas.getContext("2d");
const overlayCanvas = document.querySelector('#overlayCanvas')
const overlayCtx = overlayCanvas.getContext("2d");
let screenWidth, screenHeight;
let UIOffset;
let money;
let health;
let gameState = 0;//0- main menu, 1- level gen, 2- game, 3- gameover
let timeScale = 1;
let imageData;
let score;
let music;
let haveResetLevel;

//getters and setters for all the variables that need it
function takeDamage(value){health-=value;}
function getHealth(){return health;}
function getMoney(){return Math.floor(money);}
function spendMoney(cost){money-=cost;}
function getTimeScale(){return timeScale;}
function setTimeScale(value){timeScale = value;}
function addScore(value){score += value;}
function getGameState(){return gameState;}
function setGameState(value){gameState = value;}

function setImageData(data){imageData=data;}

function init(){
    //set-up everything
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;
    overlayCanvas.width = screenWidth;
    overlayCanvas.height = screenHeight;

    UIOffset = screenWidth/10;

    money = 15000;
    health = 100;
    score = 0;

    //setup background music
    music = new Audio("sounds/bensound-extremeaction.mp3");
    music.loop = true;
    music.volume = 0.05;

    generateLevel();

    setupInput();
    setupUI();

    setupWaveControl();
    setupMainMenu();
    loop();
}

//main loop
//runs every other file
function loop(){
	requestAnimationFrame(loop);
    
    //clear top and bottom screen
    ctx.clearRect(0,0, screenWidth, screenHeight);
    overlayCtx.clearRect(0,0, screenWidth, screenHeight);

    //start by filling the screen with black
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, screenWidth, screenHeight);
    ctx.restore();

    if (gameState == 0)//in the main menu
    {
        drawMainMenu();
    }
    else if (gameState == 1)//in the generate level screen
    {
        drawGenerationUI();
        drawLevel();
    }
    else if (gameState == 2 || gameState == 3)//in the game (either playing or game over)
    {
        if (health <= 0 && gameState != 3){gameState = 3;saveScore();setBullets([]);resetLevel();}//game over - ran out of health
        music.play();
        drawLevel();
        
        if (gameState == 2)//only spawn enemies if the game is continuing
        {
            spawnEnemies();
        }

        //update towers and enemies based on the time scale
        for (let i = 0; i < timeScale; i++)
        {
            updateEnemies();
            if (gameState == 2)
            {
                updateTowers();
            }
        }
        //updates towers if timescale is 0 so you can select them, but they will not shoot
        if (timeScale == 0 && gameState == 2)
        {
            updateTowers();
        }

        drawTowers();    
        drawEnemies();

        if (gameState == 2)
        {
            updateUI();
        }
        if (gameState == 3)
        {
            drawGameOver();
        }

    }

    mouseInput();    
}

//restores all game data, resets everything to the starting values
function restoreGame()
{
    //removeData(); - for save game functionality
    setEnemyList([]);
    setTowers([]);
    setBullets([]);
    money = 1500;
    health = 100;
    score = 0;

    setupUI();
    setupWaveControl();
    resetLevel();
}