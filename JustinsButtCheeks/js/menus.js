//This file covers all the different game menus - gameover/main menu/ level generation screen

export {setupMainMenu, drawGameOver, drawMainMenu, drawGenerationUI}
import {checkIfMouseOver, fillText, getGradient} from './utilities.js';
import {loadScores} from './dataManager.js';
import {screenWidth, screenHeight, UIOffset, ctx, getGameState, setGameState, restoreGame, score} from './main.js';
import {mouseState, mouseClicked} from './input.js';
import {enemyPath, generateLevel} from './levelGeneration.js';

let highscoreData;
let backgroundGradient;
let fontSize;

function setupMainMenu()
{
    highscoreData = loadScores();
    if (highscoreData == null || highscoreData == undefined || highscoreData.length != 10)
    {
        console.warn("High score data was unable to load, or set -> please make sure you are able to use localStorage");
    }

    backgroundGradient = getGradient();
    fontSize = screenWidth / 70;

}

//draws the game over screen
function drawGameOver()
{
    ctx.save();
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(screenWidth-UIOffset,0,UIOffset, screenHeight);
    ctx.restore();

    //draws 'Game Over' and a main menu button
    drawUIText('Game Over', screenWidth/2, screenHeight/2, 0, 5);
    drawUIText('Score: ' + score, screenWidth/2, screenHeight*0.6, 0, 1);
    drawUIText('Main Menu', screenWidth/2, screenHeight*0.7, 2, 3);
}

//draw the main menu
function drawMainMenu()
{
    ctx.save();
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0,0,screenWidth,screenHeight);
    ctx.restore();

    //draws title and a play button
    drawUIText('Tower Defence', screenWidth*0.5, screenHeight*0.3, 0, 5);

    drawUIText('Play', screenWidth*0.5, screenHeight*0.6, 2, 3);
    
    if (highscoreData != null && highscoreData != undefined && highscoreData.length == 10)
    {
        //draw highscores
        drawUIText('-High Scores-', screenWidth*0.9, screenHeight*0.1, 0, 2);

        for (let i = 0; i < 10; i++)
        {
            drawUIText((i+1) + ": "+highscoreData[i], screenWidth*0.9 - (fontSize*0.7), screenHeight*(0.13 + (0.03 * i)), 0, 0.7);
        }
    }

    drawUIText("Hotkeys", screenWidth*0.89, screenHeight*0.8, 0, 0.5);
    drawUIText("Space- View all turret ranges", screenWidth*0.9, screenHeight*0.83, 0, 0.5);
    drawUIText("Shift/Ctrl- View enemies health", screenWidth*0.9, screenHeight*0.85, 0, 0.5);
    drawUIText("'ESC', 1, 2, and 3 to change speed", screenWidth*0.9, screenHeight*0.87, 0, 0.5);
    drawUIText("QWE are the tower hotkey's", screenWidth*0.895, screenHeight*0.89, 0, 0.5);


    drawUIText("Created by Justin Gourley and Jeb Atkinson", fontSize*5.5, screenHeight-10, 0, 0.5);
    //Implement Save Game functionality
    //[wont get done for this project as it will take a lot more time than anticipated]
    /*ctx.save();
    ctx.globalAlpha = 0.5;
    let action = 0;
    if (checkForGameData()){action = 3;ctx.globalAlpha=1;}
    drawUIText('Continue', screenWidth*0.5, screenHeight*0.7, action, 3);
    ctx.restore();*/
}

//draw 'level pick' ui
function drawGenerationUI()
{
    ctx.save();
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(screenWidth-UIOffset,0,UIOffset, screenHeight);
    ctx.restore();

    //shows two buttons, one to generate a new level and one to play with the current level 'continue' as well as a pathlength text
    let startX = screenWidth - UIOffset + 5;
    drawUIText('[Generate New]', startX + UIOffset/2, screenHeight*0.75, 1, 0.8);

    drawUIText('[Continue]', startX + UIOffset/2, screenHeight*0.8, 2, 1);

    drawUIText('Path Length:\n' + enemyPath.length, startX + UIOffset/2, screenHeight*0.65, 0, 0.75);
    drawUIText('Score Mult: x' + (70 / enemyPath.length).toFixed(2), startX + UIOffset/2, screenHeight*0.7, 0, 0.75);

}

//helper function to draw text/button text
function drawUIText(text, x, y, action, scaleSize)
{
    let color = 'white';
    let fontSizeToUse = fontSize * scaleSize;//gets size of font based on given scale
    //check to see if item is being hovered
    if (checkIfMouseOver(x-((fontSizeToUse/4) * text.length), y-(fontSizeToUse*0.7), fontSizeToUse/2 * text.length, fontSize * scaleSize) && action != 0)
    {
        let gameState = getGameState();
        //set the hover color
        color = 'tan';
        //see if item is selected
        if (mouseState == 1 && !mouseClicked)
        {
            //clicked - do something based on given action
            if (action == 1)//generate a new level
            {
                generateLevel();
            }
            else if (action == 2)//go to next screen
            {
                gameState++;
                if (gameState == 2)
                {
                    restoreGame();
                }
                else if (gameState > 3)//go to main menu
                {
                    gameState = 0;
                    setupMainMenu();
                }
            }
            else if (action == 3)//go straight to game with loaded data
            {
                gameState = 2;
                loadGame();
            }
        }

        setGameState(gameState);
    }
    //draw text
    fillText(text, x-((fontSizeToUse/4) * text.length), y, fontSizeToUse+'px Arimo', color);
}