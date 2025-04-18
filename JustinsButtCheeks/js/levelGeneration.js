//File for level generation, drawing level, and utility functions for getting grid positions

"use strict";

export {level, enemyPath, tileHeight, tileWidth, generateLevel, findTilePos, getTilePos, getRadiusFromGridSize, drawLevel, resetLevel}
import {screenHeight, screenWidth, UIOffset, ctx, imageData} from './main.js';
import {getRandom, drawHighlightSquare} from './utilities.js';
import {getMouseObj} from './input.js';

let level = [];//0 - open spot, 1- path for enemies, 2- blocker
let enemyPath = [];

const gridWidth = 30;
const gridHeight = 20;

const maxStops = 7, minStops = 4;
let tileWidth;
let tileHeight;

//generate a random path for the enemy
function generatePath()
{
    let path = [];
    let startPos, endPos;
    let pickTop = false;
    //get start and end position [start will always be on left side or top, and the end will always be on the opposite side]
    if (getRandom(0, 1) >= 0.5)
    {
        startPos = {x: Math.floor(getRandom(0, gridWidth-1)), y: 0};
        endPos = {x: Math.floor(getRandom(0, gridWidth-1)), y: gridHeight-1}
        pickTop = true;
    }
    else
    {
        startPos = {x: 0, y: Math.floor(getRandom(0, gridHeight-1))}
        endPos = {x: gridWidth-1, y: Math.floor(getRandom(0, gridHeight-1))}
    }
    
    //get 'stops' for path to follow
    let numOfStops = Math.floor(getRandom(minStops, maxStops));
    let space = gridHeight / (numOfStops+2);
    let stopSpacing = (pickTop) ? {x: 0, y: Math.floor(space)} : {x: Math.floor(space), y: 0};
    let stops = [];
    for (let i = 0; i < numOfStops; i++)
    {
        let distance = (pickTop) ? {x: Math.floor(getRandom(0, gridWidth)), y: 0} : {x: 0, y: Math.floor(getRandom(0, gridHeight))};

        stops.push({x: distance.x + ((i+1) * stopSpacing.x), y: distance.y + ((i+1) * stopSpacing.y)});
    }
    
    if (pickTop)
    {
        stops.push({x: endPos.x, y:endPos.y-2});
    }
    else
    {
        stops.push({x: endPos.x-2, y:endPos.y});        
    }

    //get full path from start to stops to end
    let curPos = startPos;
    let target = null;
    let stopTargetIndex = 0;

    path.push({x:startPos.x, y:startPos.y});

    do{
        if (target == null)
        {
            if (stopTargetIndex >= stops.length)
            {
                target = endPos;
            }
            else {
                target = stops[stopTargetIndex];
                stopTargetIndex++;
            }
        }

        if (pickTop)
        {
            if (curPos.y != target.y)
            {
                if (curPos.y < target.y)
                {
                    curPos.y ++;
                }
                else if (curPos.y > target.y)
                {
                    curPos.y --;
                }
            }
            else if (curPos.x != target.x)
            {
                if (curPos.x < target.x)
                {
                    curPos.x ++;
                }
                else if (curPos.x > target.x)
                {
                    curPos.x --;
                }
            }
        }
        else
        {
            if (curPos.x != target.x)
            {
                if (curPos.x < target.x)
                {
                    curPos.x ++;
                }
                else if (curPos.x > target.x)
                {
                    curPos.x --;
                }
            }
            else if (curPos.y != target.y)
            {
                if (curPos.y < target.y)
                {
                    curPos.y ++;
                }
                else if (curPos.y > target.y)
                {
                    curPos.y --;
                }
            }
        }

        if (curPos.x == target.x && curPos.y == target.y)
        {
            target = null;
        }

        path.push({x:curPos.x, y:curPos.y});

    }while(curPos.x != endPos.x || curPos.y != endPos.y);

    return path;
}

//generate the level
function generateLevel()
{
    //set the size of the level
    tileWidth = (screenWidth - UIOffset) / gridWidth;
    tileHeight = (screenHeight) / gridHeight;

    //get the path
    enemyPath = [];
    level = [];
    enemyPath = generatePath();

    //setup the level based on the path
    for (let i = 0; i < gridWidth; i++)
    {
        let row = [];
        for (let j = 0; j < gridHeight; j++)
        {
            let pick = 0;

            for (let a = 0; a < enemyPath.length; a++)
            {
                if (enemyPath[a].x == i && enemyPath[a].y == j)
                {
                    pick = 1;
                    if (a == 0)
                    {
                        pick = 2;
                    }
                    if (a == enemyPath.length-1)
                    {
                        pick = 3;
                    }
                }
            }
            
            row.push(pick);
            
        }
        level.push(row);
    }
}

//utility functions

//function to get the tile position in the array + the x, y positions on the screen from a given x, y, position
function findTilePos(x, y)
{
    for (let i = 0; i < gridWidth; i++)
    {
        for (let j = 0; j < gridHeight; j++)
        {
            let xPos = (i * tileWidth);
            let yPos = (j * tileHeight);
            if ((x >= xPos && x <= xPos + tileWidth) && (y >= yPos && y <= yPos + tileHeight))
            {
                return {x:xPos+tileWidth/2, y:yPos+tileHeight/2, tileType: level[i][j], gridX: i, gridY: j};
            }
        }
    }

    return null;
}

//function to get a distance based on a given number of grid cells
function getRadiusFromGridSize(gridCount)
{
    let gridSize = (tileHeight < tileWidth) ? tileWidth : tileHeight;
    return gridCount * gridSize;
}

//get a tile's x, y position based on given indicies
function getTilePos(x, y)
{
    return {x: (x * tileWidth) + tileWidth/2, y: (y * tileHeight) + tileHeight/2};
}

//reset the level (change all tower placment spots back to open spots)
function resetLevel()
{
    for (let i = 0; i < gridWidth; i++)
    {
        for (let j = 0; j < gridHeight; j++)
        {
            if (level[i,j] == 4){
                level[i,j] = 0;
            }
        }
    }
}

//draw the level
function drawLevel()
{
    for (let i = 0; i < gridWidth; i++)
    {
        for (let j = 0; j < gridHeight; j++)
        {
            let levelNum = (level[i][j] == 0 || level[i][j] == 4) ? 0 : 1;
            let image = imageData['tileImages'][levelNum][0];

            ctx.save();
            ctx.drawImage(image, (i * tileWidth), (j * tileHeight), tileWidth, tileHeight);
            
            if (level[i][j] == 2 || level[i][j] == 3)
            {
                let color = (level[i][j] == 2) ? 'blue' : 'red';
                drawHighlightSquare((i * tileWidth), (j * tileHeight), tileWidth, tileHeight, color, 0.3);
            }
            
            //draw outlines around the squares if the player is placing a tower
            if (levelNum == 0 && getMouseObj() != null)
            {
                ctx.beginPath();
                ctx.strokeStlye = 'black';
                ctx.lineWidth = 1;
                ctx.rect((i * tileWidth), (j * tileHeight), tileWidth, tileHeight);
                ctx.stroke();
                ctx.closePath();
            }
            ctx.restore();
        }
    }
}