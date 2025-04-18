//this file is for keeping track of, updating, and drawing all the enemies

"use strict";

export {Enemy, EnemyJeep, EnemyTank, getEnemyList, setEnemyList, updateEnemies, drawEnemies, showEnemyHealth}
import {rotateObject, drawHighlightSquare, checkIfMouseOver} from './utilities.js';
import {screenWidth, ctx, getTimeScale, imageData, addScore, spendMoney, takeDamage} from './main.js';
import {wave} from './waveControl.js';
import {getTilePos, enemyPath} from './levelGeneration.js';
import { playSound } from './loader.js';

//list of every enemy on screen
let enemyList = [];
function getEnemyList(){return enemyList;}
function setEnemyList(value){enemyList = value;}

let visibleHealth = false;

function showEnemyHealth(value){visibleHealth = value;}

//updates all enemies
function updateEnemies()
{
    for (let i = 0; i < enemyList.length; i++)
    {
        enemyList[i].update();
    }
}

//draws all enemies
function drawEnemies()
{
    for (let i = 0; i < enemyList.length; i++)
    {
        enemyList[i].draw();
    }
}

//base enemy class
class Enemy
{
    constructor(type, index)
    {
        //tons of variables for everything that goes on in the enemies
        this.pathNodePosition = 0;        
        let pos = getTilePos(enemyPath[this.pathNodePosition].x, enemyPath[this.pathNodePosition].y);
        this.x = pos.x;
        this.y = pos.y;
        this.lastX = 0;
        this.lastY = 0;
        this.type = type;
        this.index = index;
        this.speed = 2;
        this.health = 10 + ((wave*0.2) * (enemyPath.length*0.01));
        this.radius = screenWidth/111;
        this.worth = 2;
        this.damage = 2;
        this.frames = 0;
        this.frame = 0;
        this.frameCount = 3;
        this.selected = false;
        this.maxHealth = this.health;
        this.imageString = 'troop';
    }

    //check if the enemy is selected
    checkSelected()
    {
        this.selected = checkIfMouseOver(this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
    }

    //update the enemy
    update()
    {
        //update enemy animation [only applies to base enemy]
        this.frames+=getTimeScale();
        if(this.frames > 15){
            this.animate();
            this.frames = 0;
        }

        //check if enemy is dead
        if (this.health <= 0)
        {
            addScore(this.worth * 5);
            spendMoney(-this.worth);
            this.destroySelf();
        }

        //move enemy
        let pos = getTilePos(enemyPath[this.pathNodePosition+1].x, enemyPath[this.pathNodePosition+1].y);
        this.moveToNode(pos);


        //check to see if it should be removed
        if (Math.abs(this.x - pos.x) < 2 && Math.abs(this.y - pos.y) < 2)
        {
            this.pathNodePosition++;
            if (this.pathNodePosition >= enemyPath.length-1)
            {
                takeDamage(this.damage);
                playSound("breaking");
                this.destroySelf();
            }
        }
    }

    //function to move enemy
    moveToNode(pos)
    {
        //sets last position
        this.lastX = this.x;
        this.lastY = this.y;
        //moves enemy forward towards next node position based on speed
        if (this.x < pos.x)
        {
            if (this.x + this.speed >= pos.x)
            {
                this.x = pos.x;
            }
            else
            {
                this.x += this.speed;
            }
        }
        else if (this.x > pos.x)
        {
            if (this.x - this.speed <= pos.x)
            {
                this.x = pos.x;
            }
            else
            {
                this.x -= this.speed;
            }
        }

        if (this.y < pos.y)
        {
            if (this.y + this.speed >= pos.y)
            {
                this.y = pos.y;
            }
            else
            {
                this.y += this.speed;
            }
        }
        else if (this.y > pos.y)
        {
            if (this.y - this.speed <= pos.y)
            {
                this.y = pos.y;
            }
            else
            {
                this.y -= this.speed;
            }
        }
    }

    //destroy this from the enemy list
    destroySelf()
    {
        let index = 0;
        for(let i = 0; i < enemyList.length; i++)
        {
            if (this == enemyList[i])
            {
                index = i;
            }
        }

        enemyList.splice(index, 1);
    }

    //draw enemy based on type
    draw()
    {
        //rotate enemy to direction its going
        ctx.save();
        let rot = Math.atan2((this.x-this.lastX), -(this.y-this.lastY));
        let point = {x: this.x, y:this.y};
        rotateObject(rot, point); 
        
        //set image to correct type
        if (this.imageString == 'jeep' || this.imageString == 'tank'){this.frame = 0;}
        ctx.drawImage(imageData[this.imageString][this.frame][0], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();

        //draw highlighted square if the enemy is selected or key is pressed to show health
        this.checkSelected();
        if (this.selected || visibleHealth)
        {
            let width = (this.radius*2) * (this.health / this.maxHealth);
            drawHighlightSquare(this.x- this.radius, this.y - this.radius, width, this.radius*2, 'red', 0.5);
        }
    }

    //animate the enemy
    animate(){
        if(this.frame < this.frameCount){
            this.frame++;
        }
        else{
            this.frame = 0;
        }
    }
}

//Jeep Enemy class
class EnemyJeep extends Enemy
{
    constructor(type, index)
    {
        //setup jeep stats
        super(type, index);
        this.radius = screenWidth/85;
        this.health = 50 + ((wave*0.3) * (enemyPath.length*0.01));
        this.speed = 0.8;
        this.worth = 5;
        this.damage = 5;
        this.imageString = 'jeep';
    }

    //spawns four enemies when the jeep dies
    spawnContents()
    {
        for (let i = 0; i < 4; i++)
        {
            let enemy = new Enemy(0, enemyList[enemyList.length]);
            enemy.pathNodePosition = this.pathNodePosition
            let pos = getTilePos(enemyPath[enemy.pathNodePosition].x, enemyPath[enemy.pathNodePosition].y);
            enemy.x = pos.x - (i * this.radius/2);
            enemy.y = pos.y;

            enemyList.push(enemy);
        }
    }

    //destroy this from enemy list [and spawn new enemies if jeep was destroyed from towers]
    destroySelf()
    {
        if (this.pathNodePosition < enemyPath.length-1)
        {
            this.spawnContents();
        }

        let index = 0;
        for(let i = 0; i < enemyList.length; i++)
        {
            if (this == enemyList[i])
            {
                index = i;
            }
        }

        enemyList.splice(index, 1);
    }
}

//Tank boss enemy
class EnemyTank extends Enemy
{
    constructor(type, index)
    {
        //setup stats
        super(type, index);
        this.radius = screenWidth/55;
        this.health = 100 + ((wave*0.5) * (enemyPath.length*0.01));
        this.speed = 0.5;
        this.worth = 100;
        this.damage = 25;
        this.imageString = 'tank';
    }
}