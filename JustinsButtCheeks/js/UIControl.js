//file for all things UI related

"use strict";
export {setupUI, updateUI, TowerOverlay, selectedTower, setSelectedTower, uiElements, setSelectedTime}
import {checkIfMouseOver, drawHighlightSquare, fillText, getGradient} from './utilities.js';
import {getMouseObj, setMouseObj, mouseState, mouseClicked, mousePos} from './input.js';
import {addScore, UIOffset, getHealth, getMoney, spendMoney, setTimeScale, imageData, screenHeight, screenWidth, ctx, overlayCtx, getTimeScale} from './main.js';
import {getTowers, setTowers, Tower, MissileTower, TeslaTower} from './towers.js';
import {wave, enemiesForWave, timeRemaining} from './waveControl.js';
import {tileHeight, tileWidth, getRadiusFromGridSize, getTilePos, findTilePos, level} from './levelGeneration.js';
import {towerData} from './towerData.js';


let uiElements = [];     //keeps track of the main tower ui elements
let timeElements = [];   //keeps track of the 'time' related ui elements
let fontSize;            //keeps track of the scaled font size
let selectedTime;        //keeps track of the current time that is selected
let drawCost = false;    //tells the ui whether to draw the cost of a tower to the mouse (for the tower overlay)
let selectedTower = null;//tells the ui what the selected tower is currently
let backgroundGradient;

function setSelectedTower(value){selectedTower=value;}
function setSelectedTime(value){selectedTime = value;}

//init for UI, sets up all the basics
function setupUI()
{
    //setup vars
    selectedTime = 1;
    fontSize = screenWidth / 70;

    uiElements = [];

    //setup uiElements
    let towerButton = new TowerUI(screenWidth - UIOffset + ((UIOffset/2) - UIOffset / 4), screenHeight * 0.25, UIOffset/2, UIOffset/2, 500, 1.25, false, 0, "Cannon", 'Q');
    let teslaButton = new TowerUI(screenWidth - UIOffset + ((UIOffset/2) - UIOffset / 4), screenHeight * 0.45, UIOffset/2, UIOffset/2, 850, 1.25, false, 1, "Tesla", 'W');
    let rocketButton = new TowerUI(screenWidth - UIOffset + ((UIOffset/2) - UIOffset / 4), screenHeight * 0.65, UIOffset/2, UIOffset/2, 1200, 1.25, false, 2, "Missile", 'E');
    let trashButton = new TowerUI(screenWidth - UIOffset + ((UIOffset/2) - UIOffset / 4), screenHeight * 0.8, UIOffset/2, UIOffset/2, 0, 0, true, 0, "", 'S');
    
    uiElements.push(trashButton);
    uiElements.push(towerButton);
    uiElements.push(teslaButton);
    uiElements.push(rocketButton);

    timeElements = [];

    //setup timeElements
    let timeUISize = screenWidth / 50;
    let timeText = [' P', '1x','2x','5x'];
    let timeScaleNum = [0, 1, 2, 5];
    for (let i = 0; i < 4; i++)
    {
        let timeElement = new TimeUI(screenWidth - UIOffset + (timeUISize/4) + (i * (timeUISize * 1.2)), screenHeight * 0.95, timeUISize, timeText[i], i, timeScaleNum[i]);
        timeElements.push(timeElement);
    }

    setMouseObj(null);

    backgroundGradient = getGradient();
}

//update all UI
function updateUI()
{
    //main UI
    if (selectedTower == null)
    {
        //uielements
        for (let i = 0; i < uiElements.length; i++)
        {
            //if mouse clicked setup tower overlay
            if (uiElements[i].checkClicked() && !mouseClicked)
            {
                setMouseObj(new TowerOverlay(uiElements[i].cost, uiElements[i].type));
            }
        }
    
        //time elements
        for (let i = 0; i < timeElements.length; i++)
        {
            //update which time is selected
            if (timeElements[i].checkClicked() && !mouseClicked)
            {
                selectedTime = timeElements[i].num;
                setTimeScale(timeElements[i].timeScaleNum);
            }
        }
        
        let mouseObj = getMouseObj();
        //update tower overlay obj
        if (mouseObj != null)
        {
            mouseObj.update();
            if (mouseObj != null)
            {
                mouseObj.draw();
            }
        }
    }
    //tower UI
    else
    {
        //deslect tower
        if ((checkIfMouseOver(selectedTower.x - selectedTower.radius, selectedTower.y - selectedTower.radius, selectedTower.radius * 2, selectedTower.radius * 2) == false && checkIfMouseOver(screenWidth-UIOffset, 0, UIOffset, screenHeight) == false) && mouseState == 1 && !mouseClicked)
        {
            selectedTower.selected = false;
            selectedTower = null;
        }
        else
        {
            if (selectedTower.selected == false){selectedTower.selected = true;}
        }

    }

    
    drawUI();
    
}

//draw timeElements
function drawTimeUI()
{
    for (let i = 0; i < 4; i++)
    {
        timeElements[i].draw();
    }
}

//draw UI
function drawUI()
{
    //draw background
    ctx.save();
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(screenWidth-UIOffset,0,UIOffset, screenHeight);
    ctx.restore();

    //decide drawing main UI or tower UI
    if (selectedTower == null)
    {
        drawMainUI();
    }
    else
    {
        drawTowerUI();
    }
    
    //draw health and money
    let startX = screenWidth - UIOffset + 5;
    fillText("Health "+getHealth(), startX, fontSize + 5, fontSize+"px Arimo", 'red', UIOffset);
    fillText("$ "+getMoney(), startX, 2 * fontSize + 5, fontSize+"px Arimo", 'yellow', UIOffset);
}

//draw tower UI [for when selecting a tower]
function drawTowerUI()
{
    let startX = screenWidth - UIOffset + 5;
    let towerString = towerData[selectedTower.type][selectedTower.version+2].defaultValues.name;
    fillText(towerString, startX, screenHeight * 0.1, fontSize*1.2+'px Arimo', 'white');

    //draw upgrade buttons
    drawTowerUIUpgradeButton('Damage lv ' + (selectedTower.upgrades[0] + 1), startX, screenHeight * 0.15, 0);
    drawTowerUIUpgradeButton('Range lv ' + (selectedTower.upgrades[1] + 1), startX, screenHeight * 0.23 + 10, 1);
    drawTowerUIUpgradeButton('Speed lv ' + (selectedTower.upgrades[2] + 1), startX, screenHeight * 0.31 + 20, 2);

    drawUpgradeOptions();

    //close button
    let closeColor = 'white';
    if (checkIfMouseOver(startX, screenHeight * 0.95, UIOffset, fontSize * 3))
    {
        closeColor = 'darkgrey';
        if (mouseState == 1 && !mouseClicked)
        {
            selectedTower.selected = false;
            selectedTower = null;
        }
    }
    fillText('CLOSE', startX + UIOffset/5, screenHeight * 0.98, fontSize * 1.2+'px Arimo', closeColor);

    
    //sell button
    let sellColor = 'yellow';
    if (checkIfMouseOver(startX, screenHeight * 0.87, UIOffset, fontSize * 2))
    {
        sellColor = 'darkyellow';
        if (mouseState == 1 && !mouseClicked)
        {
            selectedTower.destroySelf();
            uiElements[selectedTower.type+1].cost /= uiElements[selectedTower.type+1].costScale;
            spendMoney(-Math.floor(selectedTower.sellAmount));
            let pos = findTilePos(selectedTower.x, selectedTower.y);
            level[pos.gridX][pos.gridY] = 0;
            selectedTower = null;
        }
    }
    if (selectedTower != null)
    {
        fillText('Sell - $' + selectedTower.sellAmount, startX, screenHeight * 0.9, fontSize+'px Arimo', sellColor);
    }
}

//draw upgrade options for the tower [tower upgrades to new types of towers]
function drawUpgradeOptions()
{
    let data = towerData[selectedTower.type][selectedTower.version + 2];
    if (data.upgradeOptions != null)
    {
        for (let i = 0; i < data.upgradeOptions.num; i++)
        {
            let image = imageData[data.image + 'Base'][0][0];
            let x = screenWidth - UIOffset + 5;
            let y = screenHeight * (0.5 + (0.2 * i));

            fillText(data.upgradeOptions.text[i], x, y - fontSize - 5, fontSize+'px Arimo', 'white');
            let color = (getMoney() >= data.upgradeOptions.cost[i]) ? 'yellow' : 'red';
            fillText('$' + data.upgradeOptions.cost[i], x, y - 5, fontSize+'px Arimo', color);
            ctx.drawImage(image, x - 5 + ((UIOffset/2) - UIOffset / 4), y, UIOffset/2, UIOffset/2);
            image = imageData[data.image + 'Top'][selectedTower.version + 2 + data.upgradeOptions.value[i]][0];
            ctx.drawImage(image, x -5 + ((UIOffset/2) - UIOffset / 4), y, UIOffset/2, UIOffset/2);

            if (checkIfMouseOver(x, y - fontSize * 2 - 5, UIOffset-10, UIOffset))
            {
                drawHighlightSquare(x, y - fontSize * 2 - 5, UIOffset-10, UIOffset, color, 0.4);
                if (mouseState == 1 && !mouseClicked && color == 'yellow')
                {
                    spendMoney(data.upgradeOptions.cost[i]);
                    addScore(data.upgradeOptions.cost[i]);
                    selectedTower.upgrades = [0, 0, 0];
                    selectedTower.version += data.upgradeOptions.value[i];
                    data = towerData[selectedTower.type][selectedTower.version+2];
                    selectedTower.damage = data.defaultValues.damage;
                    selectedTower.speed = data.defaultValues.speed;
                    selectedTower.range = getRadiusFromGridSize(data.defaultValues.range);

                    //if tesla tower
                    if (selectedTower.type == 1) {
                        selectedTower.targetAmount = data.defaultValues.targetAmount;
                    }
                    //if missile tower
                    if (selectedTower.type == 2) {
                        selectedTower.missiles = data.defaultValues.missiles; 
                        selectedTower.blastRadius = data.defaultValues.blastRadius;
                    }
                    
                    selectedTower.sellAmount = data.defaultValues.sellAmount;
                    if (towerData[selectedTower.type][selectedTower.version+2].upgradeOptions == null){break;}
                }
            }
        }
    }
}

//helper function to draw upgrade buttons
function drawTowerUIUpgradeButton(string, x, y, upgradeNum)
{
    let height = screenHeight * 0.08;
    let width = UIOffset - 10;
    let selected = false;

    //get data for specific tower from towerData.js
    let data = towerData[selectedTower.type][selectedTower.version + 2];
    let cost = data.upgradeCost[upgradeNum][selectedTower.upgrades[upgradeNum]];
    let value = data.upgradeValue[upgradeNum][selectedTower.upgrades[upgradeNum]];
    //updating/checking for mouse input
    if (checkIfMouseOver(x, y, width, height) && selectedTower.upgrades[upgradeNum] != 4)
    {
        selected = true;
        if (mouseState == 1 && !mouseClicked)
        {
            if (getMoney() >= cost)
            {
                switch(upgradeNum)
                {
                    case 0://damage
                        selectedTower.damage = value;
                        break;
                    case 1://range
                        selectedTower.range = getRadiusFromGridSize(value);
                        break;
                    case 2://speed
                        selectedTower.speed = value;
                        break;
                }
                
                selectedTower.upgrades[upgradeNum]++;
                spendMoney(cost);
                selectedTower.sellAmount += cost/2;
            }
        }
    }

    //draw button
    let color = 'white';
    if (selected){color = 'tan';}
    if (selectedTower.upgrades[upgradeNum] == 4){color = 'grey';}
    
    drawHighlightSquare(x, y, width, height, color, 1, true, 'black', 1);
    fillText(string, x + fontSize/2, y + height/2 + fontSize/4, fontSize+'px Arimo', 'black');
    if (selectedTower.upgrades[upgradeNum] != 4)
    {
        let color = 'green';
        if (getMoney() < cost){color = 'red';}
        fillText('$' + cost, x + fontSize/2, (y + height/2 + fontSize/4) + fontSize, fontSize+'px Arimo', color);
    }
}

//draw main UI [nothing selected]
function drawMainUI()
{
    //draw tower ui elements
    for (let i = 0; i < uiElements.length; i++)
    {
        uiElements[i].draw();
    }

    //draw time ui elements
    drawTimeUI();

    //draw text ui elements
    let startX = screenWidth - UIOffset + 5;
    fillText("Wave "+wave, startX, 4 * fontSize + 5, fontSize+"px Arimo", 'white', UIOffset);
    fillText("E - "+enemiesForWave.length, startX, 5 * fontSize + 5, fontSize+"px Arimo", 'white', UIOffset);
    let waitString = (timeRemaining == null) ? "Defeat Enemies" : "Wait: " + (timeRemaining/1000).toFixed(0) + "s";
    if (getTimeScale() == 0) {waitString = "-Paused-";}
    fillText(waitString, startX, 6 * fontSize + 5, fontSize*0.8+"px Arimo", 'white', UIOffset);
}

//class for tower overlay obj [shown before placing a tower]
class TowerOverlay
{
    constructor(cost, type)
    {
        //setup
        let rad = (tileHeight < tileWidth) ? tileHeight : tileWidth;
        this.radius = rad /2;
        this.x = mousePos.x;
        this.y = mousePos.y;
        this.placement = true;
        this.cost = cost;
        this.type = type;
        this.towerRadius = getRadiusFromGridSize(towerData[this.type][2].defaultValues.range);
    }

    update(){
        this.updatePos();
        this.checkPlaceDown();

        
        if (getMoney() - this.cost < 0) {this.placement = false;}
    }

    //update pos to mouse position, also decide if you are able to place it down or not
    updatePos(){
        let pos = findTilePos(mousePos.x, mousePos.y);
        if (pos == null)
        {
            this.x = mousePos.x;
            this.y = mousePos.y;
            this.placement = false;
        }
        else
        {
            if (pos.tileType == 0)
            {
                this.placement = true;
            }
            else
            {
                this.placement = false;
            }
            this.x = pos.x;
            this.y = pos.y;
        }
    }

    //draw the overlay
    draw()
    {
        overlayCtx.save();
        
        //draw range
        overlayCtx.fillStyle = 'grey';
        overlayCtx.strokeStyle = 'black';
        overlayCtx.lineWidth = 2;
        overlayCtx.globalAlpha = 0.4;
        if (!this.placement){overlayCtx.globalAlpha=0.1;}
        overlayCtx.beginPath();
        overlayCtx.arc(this.x, this.y, this.towerRadius, 0, Math.PI * 2, false);
        overlayCtx.fill();
        overlayCtx.stroke();
        overlayCtx.closePath();

        overlayCtx.globalAlpha = 1;

        let imageKey = 'cannon';
        if (this.type == 1){imageKey = 'tesla';}
        else if (this.type == 2){imageKey = 'missile';}
        overlayCtx.drawImage(imageData[imageKey + 'Base'][0][0], this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
        overlayCtx.drawImage(imageData[imageKey + 'Top'][2][0], this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);

        overlayCtx.globalAlpha = 0.4;
        if (!this.placement)
        {
            overlayCtx.beginPath();
            overlayCtx.fillStyle = 'red';
            overlayCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            overlayCtx.fill();
            overlayCtx.closePath();
        }

        overlayCtx.restore();

        let color = (this.cost <= getMoney()) ? "yellow" : "red";
        let string = "$ " + this.cost;
        fillText(string, this.x - (string.length * (fontSize/4)), this.y + fontSize * 2, fontSize + 'px Arimo', color);
    }

    //helper function to see if you are able to place the tower down at the current position
    checkPlaceDown(){
        if (mouseState == 1 && !mouseClicked)
        {
            if (this.placement && getMoney() >= this.cost)
            {
                let towers = getTowers();
                if(this.type == 0) //spawn normal tower
                {
                    towers.push(new Tower(this.x, this.y, this.type));
                }
                else if (this.type == 1) //spawn tesla tower
                {
                    towers.push(new TeslaTower(this.x, this.y, this.type));
                }
                else if (this.type == 2) //spawn missile tower
                {
                    towers.push(new MissileTower(this.x, this.y, this.type));
                }
                setMouseObj(null);
                spendMoney(this.cost);
                addScore(this.cost);
                uiElements[this.type+1].cost *= uiElements[this.type+1].costScale;
                uiElements[this.type+1].cost = Math.floor(uiElements[this.type+1].cost);
                
                let data = findTilePos(this.x, this.y);
                level[data.gridX][data.gridY] = 4;
                setTowers(towers);
            }
            else if (uiElements[0].selecting())
            {
                setMouseObj(null);
            }
        }
    }
}

//class for a time UI element
class TimeUI
{
    constructor(x, y, size, text, num, timeScaleNum)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.text = text;
        this.num = num;
        this.timeScaleNum = timeScaleNum;
    }

    //see if you are hovering over the obj
    selecting(){
        return checkIfMouseOver(this.x, this.y, this.size, this.size);
    }

    //see if you are clicking the obj
    checkClicked(){
        return (checkIfMouseOver(this.x, this.y, this.size, this.size) && mouseState == 1);
    }
    
    //draw the obj
    draw(){
        ctx.save();
        ctx.fillStyle = 'black';
        if (this.num == selectedTime) {ctx.fillStyle = 'gold';}
        if (this.selecting()){ctx.fillStyle = 'yellow';}
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
        fillText(this.text, this.x + (fontSize/8), this.y + this.size/2 + (fontSize/4), fontSize+"px Arimo", 'white');
    }
}

//class for the tower UI element
class TowerUI
{
    constructor(x, y, width, height, cost, costScale, trash, type, string, hotKey)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.trash = trash;
        this.cost = cost;
        this.costScale = costScale;
        this.type = type;
        this.text = string;
        this.hotKey = hotKey;
    }

    //see if you are hovering over the obj
    selecting(){
        return checkIfMouseOver(this.x, this.y, this.width, this.height);
    }

    //see if you are clicking the obj (and the obj is not the trash obj)
    checkClicked(){
        if (this.trash){return false;}
        return (checkIfMouseOver(this.x, this.y, this.width, this.height) && mouseState == 1);
    }

    //draw the obj
    draw(){
        let color = "white";
        if (this.selecting()) {color = "tan";}

        if (this.trash == false)
        {
            drawHighlightSquare(this.x, this.y, this.width, this.height, color, 1, true, 'black', 1);

            let imageKey = 'cannon';
            if (this.type == 1){imageKey = 'tesla';}
            else if (this.type == 2){imageKey = 'missile';}
            
            ctx.drawImage(imageData[imageKey + 'Base'][0][0], this.x, this.y, this.width, this.height);
            ctx.drawImage(imageData[imageKey + 'Top'][2][0], this.x, this.y, this.width, this.height);
        }
        else
        {
            //draw trashcan
            ctx.drawImage(imageData['trash'][0][0], this.x, this.y, this.width, this.height);
            if (this.selecting())
            {
                drawHighlightSquare(this.x, this.y, this.width, this.height, 'tan', 0.4);
            }
        }
        ctx.restore();

        if (!this.trash)
        {
            color = (this.cost <= getMoney()) ? "yellow" : "red";
            let string = "$" + this.cost;
            fillText(string, this.x, this.y + fontSize + this.height, fontSize + 'px Arimo', color);
        }

        fillText(this.text, this.x, this.y - fontSize/2, (fontSize*1.2)+'px Arimo', 'white');
        fillText(this.hotKey, this.x-fontSize, this.y+fontSize, fontSize+'px Arimo', 'lightblue');
    }
}