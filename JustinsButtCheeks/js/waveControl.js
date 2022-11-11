//This file deals with the spawning of enemies, as well as generating waves, and keeping track of time before, and after a wave

"use strict";
export {setupWaveControl, getEnemiesForWave, spawnEnemies, wave, enemiesForWave, timeRemaining}
import {getRandom, getRandomInt} from './utilities.js';
import {Enemy, EnemyJeep, EnemyTank, setEnemyList, getEnemyList} from './enemies.js';
import {getTimeScale, spendMoney, addScore} from './main.js';

let wave;
let enemiesForWave = [];
let enemyNumForWave;
let waveTime;
let waveState;
let waveWaitStart;
let waveWaitEnd;
let waveFirst;
let timeRemaining;

//init for setting up wave controller
function setupWaveControl()
{
    wave = 1;
    waveWaitStart = 30000;//set to 30000 after done testing
    waveWaitEnd = 10000;
    waveState = 0;
    timeRemaining = 0;
    waveFirst = true;

    getEnemiesForWave();
    waveTime = Date.now();
}


//looping function
function spawnEnemies()
{
    //start of wave
    if (waveState == 0)
    {
        if (Date.now() - waveTime >= (waveWaitStart / getTimeScale()))
        {
            waveState++;
            waveTime = Date.now();
            timeRemaining = null;
            if (waveFirst)
            {
                waveFirst = false;
                waveWaitStart = 5000;
            }
        }
        else
        {
            timeRemaining = (waveWaitStart / getTimeScale()) - (Date.now() - waveTime);
        }
    }
    //during wave [spawning enemies in]
    else if (waveState == 1)
    {
        if (enemiesForWave.length > 0)
        {
            //spawn in enemy
            if (Date.now() - waveTime >= (enemiesForWave[0].time / getTimeScale()))
            {
                addEnemy(enemiesForWave[0].enemyType);
                enemiesForWave.splice(0, 1);
                waveTime = Date.now();
            }
        }
        //no more enemies - end wave
        else if (getEnemyList().length == 0)
        {
            wave++;
            getEnemiesForWave();
            waveState++;
            waveTime = Date.now();
            spendMoney(-400);
            addScore(wave*10);
        }
    }
    //end of wave
    else if (waveState == 2)
    {
        if (Date.now() - waveTime >= (waveWaitEnd / getTimeScale()))
        {
            waveState = 0;
            waveTime = Date.now();
            //saveGame(); -- for save game functionality
        }
        else
        {
            timeRemaining = ((waveWaitEnd + waveWaitStart) / getTimeScale()) - (Date.now() - waveTime);
        }
    }
}

//helper function to add an enemy to the list
function addEnemy(type)
{
    let enemyList = getEnemyList();
    //get the chance based on the type of enemy, generate enemy as well
    let diminishChance = 1;
    if (type == 0)
    {
        enemyList.push(new Enemy(0, enemyList.length));
        diminishChance = (wave/20);
        if (wave >= 20){diminishChance=1;}
    }
    else if (type == 1)
    {
        enemyList.push(new EnemyJeep(0, enemyList.length));
        diminishChance = (wave/60);
        if (wave >= 60){diminishChance=1;}
    }
    else if (type == 2)
    {
        enemyList.push(new EnemyTank(0, enemyList.length));
        diminishChance = (wave/100);
        if (wave >= 100){diminishChance=1;}
    }

    //random chance to double health and half speed, or double speed and have health [or neither]
    let ranChance = getRandom(0, 1);
    //tank spawn
    if (ranChance <= 0.1 * diminishChance)
    {
        enemyList[enemyList.length-1].health *= 2;
        enemyList[enemyList.length-1].maxHealth *= 2;
        enemyList[enemyList.length-1].speed *= 0.5;
        enemyList[enemyList.length-1].worth *= 1.5;
        enemyList[enemyList.length-1].damage *= 1.5;
    }
    //runner spawn
    else if (ranChance <= 0.3 * diminishChance)
    {
        enemyList[enemyList.length-1].health *= 0.5;
        enemyList[enemyList.length-1].maxHealth *= 0.5;
        enemyList[enemyList.length-1].speed *= 2;
        enemyList[enemyList.length-1].worth *= 1.5;
        enemyList[enemyList.length-1].damage *= 0.5;
    }
    setEnemyList(enemyList);
}

//get enemies for wave
function getEnemiesForWave()
{
    //get random number of enemies based on wave
    let enemyNum = 10 + (wave * 2) + (getRandomInt(wave, wave * 5));
    //get random spacing betweenenemies based on wave
    let waveSpacing = (2 / ((wave / 8) + 1) + (getRandom(1/wave, 2/wave))) * 1000;
    enemyNumForWave = enemyNum;
    
    //spawn enemies
    for (let i = 0; i < enemyNum; i++)
    {
        //spawn enemies in based on wave [jeeps wont spawn until wave 20, no tanks until wave 30]
        let enemyNum = 0;
        let diminishJeepChance = wave/60;
        if (wave < 20){diminishJeepChance = 0;}
        let diminishTankChance = wave/120;
        if (wave < 30){diminishTankChance = 0;}
        let spawnChance = getRandom(0, 1);
        if (spawnChance <= 0.02 * diminishTankChance)
        {
            enemyNum = 2;
        }
        if (spawnChance <= 0.15 * diminishJeepChance)
        {
            enemyNum = 1;
        }
        else if (spawnChance <= 1.0)
        {
            enemyNum = 0;
        }

        enemiesForWave.push({enemyType: enemyNum, time: waveSpacing});
    }
    //spawn a tank at the end of a wave if its a multiple of 20
    if (wave % 20 == 0){
        enemiesForWave.push({enemyType: 2, time: waveSpacing*2});
    }
}