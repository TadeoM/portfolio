//this file is for getting all mouse, mouseclick, and keyboard input and events

"use strict";

export {mousePos, mouseClicked, mouseState, getMouseObj, setMouseObj, setupInput, getMousePos, mouseInput}
import {TowerOverlay, uiElements, setSelectedTower, setSelectedTime} from './UIControl.js';
import {getTowers} from './towers.js';
import {getEnemyList, showEnemyHealth} from './enemies.js';
import {setTimeScale} from './main.js';

let mousePos;
let mouseState = 0;
let mouseClicked = false;
let mouseObj;

function getMouseObj(){return mouseObj;}
function setMouseObj(value){mouseObj = value;}

//set default variables
function setupInput()
{
    mousePos = {x:0, y:0};
}

//get the current mouse position on the screen
function getMousePos(e)
{
    let rect = overlayCanvas.getBoundingClientRect();
    return{x: e.clientX - rect.left, y: e.clientY - rect.top};
}

//event listeners for mouse states [also touch states for mobile]
overlayCanvas.addEventListener('mousemove', function(e){
    mousePos = getMousePos(e);
});

overlayCanvas.addEventListener('mousedown', function(e){
    mouseState = 1;
});

overlayCanvas.addEventListener('mouseup', function(e){
    mouseState = 0;
});

overlayCanvas.addEventListener('touchend', function(e){
    mouseState = 1;
});

overlayCanvas.addEventListener('touchstart', function(e){
    mouseState = 0;
});

//event listeners for keyboard input
window.addEventListener('keydown', checkKey, false);
window.addEventListener('keyup', checkKeyUp, false);

//keydown function
function checkKey(e)
{
    let key = e.keyCode;

    if (key == 32)//spacebar clicked
    {
        //show all tower ranges
        let towers = getTowers();
        for (let i = 0; i < towers.length; i++)
        {
            towers[i].selected = true;
        }
    }
    if (key == 16 || key == 17)//shift/control
    {
        //show all enemies health overlays
        showEnemyHealth(true);
    }

    if (key == 27)//escape key pressed
    {
        //set timescale to paused
        setTimeScale(0);
        setSelectedTime(0);
    }
    if (key == 49)//1 key pressed
    {
        //set timescale to 1x
        setTimeScale(1);
        setSelectedTime(1);
    }
    if (key == 50)//2 key pressed
    {
        //set timescale to 2x
        setTimeScale(2);
        setSelectedTime(2);
    }
    if (key == 51)//3 key pressed
    {
        //set timescale to 5x
        setTimeScale(3);
        setSelectedTime(3);
    }

    //hotkeys for tower placement
    if (key == 81)//Q
    {
        mouseObj = new TowerOverlay(uiElements[1].cost, uiElements[1].type);
    }
    else if (key == 87)//W
    {
        mouseObj = new TowerOverlay(uiElements[2].cost, uiElements[2].type);
    }
    else if (key == 69)//E
    {
        mouseObj = new TowerOverlay(uiElements[3].cost, uiElements[3].type);
    }
    else if (key == 83)//S
    {
        mouseObj = null;
    }
}

//keyup function
function checkKeyUp(e)
{
    let key = e.keyCode;

    if (key == 32)//spacebar released
    {
        //deselect all towers
        let towers = getTowers();
        for (let i = 0; i < towers.length; i++)
        {
            towers[i].selected = false;
        }
        setSelectedTower(null);
    }
    if (key == 16 || key == 17)//shift/control released
    {
        //stop showing enemy health overlay
        showEnemyHealth(false);
    }
}

//set mouseclicked
function mouseInput()
{
    if (!mouseClicked && mouseState == 1)
    {
        mouseClicked = true;
    }
    else if (mouseClicked && mouseState == 0)
    {
        mouseClicked = false;
    }
}