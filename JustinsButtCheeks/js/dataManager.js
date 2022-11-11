//This file is for loading and saving all data

export {saveScore, loadScores, setHighscoreData}
import {getTowers} from './towers.js';
import {score} from './main.js';
import {enemyPath} from './levelGeneration.js';

//saves the score to local data
function saveScore()
{
    let data = localStorage.getItem('TDJJ-HIGHSCORES');
    if (data == null || data.length <= 0 || data == undefined){setHighscoreData();}
    data = localStorage.getItem('TDJJ-HIGHSCORES');
    data = getDataAsArray(data);

    let scoreSet = score * (70 / enemyPath.length);
    for(let i = 0; i < data.length; i++)
    {
        if (scoreSet > data[i])
        {
            for (let j = i; j < data.length-1; j++)
            {
                data[j] = data[j+1];
            }
            data[i] = scoreSet;
            break;
        }
    }

    localStorage.setItem('TDJJ-HIGHSCORES', getDataString(data));
}

//loads scores from local data
function loadScores()
{
    let data = localStorage.getItem('TDJJ-HIGHSCORES');
    if (data == null || data.length <= 0 || data == undefined){setHighscoreData();data = localStorage.getItem('TDJJ-HIGHSCORES');}
    return getDataAsArray(data);
}

//sets the highscore data to default values
function setHighscoreData()
{
    localStorage.removeItem('TDJJ-HIGHSCORES');
    let data = [0,0,0,0,0,0,0,0,0,0];
    localStorage.setItem('TDJJ-HIGHSCORES', getDataString(data));
}

//turns array of data into a string
function getDataString(data)
{
    let string = "";
    for (let i = 0; i < data.length; i++)
    {
        string += data[i]+",";
    }
    return string;
}
//turns string of data into an array of ints
function getDataAsArray(data)
{
    let newData = [];
    let string = "";
    
    for(let i = 0; i < data.length; i++)
    {
        if (data[i] == ',')
        {
            let dataInput = parseInt(string);
            newData.push(dataInput);
            string = "";
        }
        else
        {
            string += data[i];
        }
    }

    return newData;
}
//None of this is in the game as of yet [and won't be upon turning this in, however there are plans to continue working on this later]

//saves the game
function saveGame()
{
    let saveData = 
    {
        money: money,
        health: health,
        wave: wave,
        enemyPath: enemyPath,
        level: level,
        towers: towers,
        uiElements: uiElements,
        score: score
    }
    localStorage.setItem('TDJJ-SAVEDATA', saveData);
}

//loads the game
function loadGame()
{
    let data = localStorage.getItem('TDJJ-SAVEDATA');
    console.log("LOADING DATA");
    console.log(data);
    money = money;
    health = health;
    wave = wave;
    enemyPath = enemyPath;
    level = level;
    towers = towers;
    uiElements = uiElements;
    score = score;
}

//removes local storage data
function removeData()
{
    localStorage.removeItem('TDJJ-SAVEDATA');
}

//checks if data exists for the game
function checkForGameData()
{
    let data = localStorage.getItem('TDJJ-SAVEDATA-SAVE');
    console.log(data);
    return (data);
}