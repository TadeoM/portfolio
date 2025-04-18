//this file keeps track of all towers, updating and drawing, as well as all bullets/tower shots

"use strict";

export {getTowers, setTowers, setBullets, updateTowers, drawTowers, Tower, TeslaTower, MissileTower}
import {getRandom, getRandomInt, rotateObject, checkIfMouseOver, normalizeVector, getDistance} from './utilities.js';
import {getEnemyList, setEnemyList} from './enemies.js';
import {ctx, getTimeScale, imageData} from './main.js';
import {tileHeight, tileWidth, getRadiusFromGridSize, getTilePos, findTilePos} from './levelGeneration.js';
import {towerData, missileShotRadius} from './towerData.js';
import {mouseState, mouseClicked} from './input.js';
import {setSelectedTower, selectedTower } from './UIControl.js';
import {playSound} from './loader.js';

let towers = [];    //array of all the placed towers
let bullets = [];   //array of all the bullets on screen

//getters and setters for towers and bullets
function getTowers(){return towers;}
function setTowers(value){towers=value;}

function setBullets(value){bullets=value;}

//function to update towers bullets/shots
function updateTowers()
{
    //towers
    for (let i = 0; i < towers.length; i++)
    {
        towers[i].update();
    }

    //bullets
    for (let i = 0; i < bullets.length; i++)
    {
        bullets[i].update();
    }
}

//function to draw all towers and bullets/shots
function drawTowers()
{
    for (let i = 0; i < bullets.length; i++)
    {
        bullets[i].draw();
    }
    for (let i = 0; i < towers.length; i++)
    {
        towers[i].draw();
    }
}

//tower class [keeps track of all tower data, and functionality]
class Tower
{
    constructor(x, y, type)
    {
        //values for base tower [some data is grabbed from 'towerData']
        let data = towerData[0][2];
        this.x = x;
        this.y = y;
        this.range = getRadiusFromGridSize(data.defaultValues.range);
        this.damage = data.defaultValues.damage;
        this.speed = data.defaultValues.speed; //shots per second
        this.canShoot = true;
        this.shootTime;
        this.hover = false;
        let rad = (tileHeight < tileWidth) ? tileHeight : tileWidth;
        this.radius = rad /2;
        this.selected = false;
        this.upgrades = [0, 0, 0];//damage / range / speed
        this.version = 0;
        this.type = type;
        this.topRotation = 0;
        this.sellAmount = data.defaultValues.sellAmount;
    }

    //check if mouse is hovering over tower or if mouse has clicked on tower
    checkHover()
    {
        if (checkIfMouseOver(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2))
        {
            this.hover = true;
            if (mouseState == 1 && !mouseClicked)
            {
                this.selected = true;
                if (selectedTower != null){selectedTower.selected = false;}
                setSelectedTower(this);
            }
        }
        else
        {
            this.hover = false;
        }
    }

    //update tower
    update()
    {
        this.checkHover();
        //if game is not paused
        if (getTimeScale() != 0)
        {
            //cant shoot / see when tower can
            if (!this.canShoot)
            {
                if (Date.now() - this.shootTime >= 1000 / (this.speed * getTimeScale()))
                {
                    this.canShoot = true;
                }
            }
            //can shoot
            else
            {
                let enemyList = getEnemyList();

                let availableTargets = [];
                let distances = [];
                //find all enemies in range
                for (let i = 0; i < enemyList.length; i++)
                {
                    let distanceAway = getDistance({x: this.x, y: this.y}, {x: enemyList[i].x, y: enemyList[i].y});
                    if (distanceAway <= this.range)
                    {
                        if (this.canShoot)
                        {
                            availableTargets.push(enemyList[i]);
                            distances.push(distanceAway);
                        }
                    }
                }

                //find the enemy farthest along the path
                let farthestTarget = 0;
                let farthestEnemy = null;
                let distance = null;
                for (let i = 0; i < availableTargets.length; i++)
                {
                    if (farthestEnemy == null || availableTargets[i].pathNodePosition > farthestTarget)
                    {
                        farthestTarget = availableTargets[i].pathNodePosition;
                        farthestEnemy = availableTargets[i];
                        distance = distances[i];
                    }
                }

                //fire at the found farthest enemy
                if (farthestEnemy != null)
                {
                    this.shoot({x: farthestEnemy.x, y: farthestEnemy.y, lastX: farthestEnemy.lastX, lastY: farthestEnemy.lastY, distance: distance});
                }
            }
        }
    }

    //shoot function based on given data
    shoot(data)
    {
        //find the position on where the enemy will be by the time the bullet hits
        let bulletSpeed = 10;
        let distanceTraveled = data.distance / bulletSpeed;
        let guessPos = {x: data.x + ((data.x - data.lastX) * distanceTraveled), y: data.y + ((data.y - data.lastY) * distanceTraveled)};

        //create a new bullet object based on guessed position
        let dir = {x: guessPos.x - this.x, y: guessPos.y - this.y};
        dir = normalizeVector(dir);
        bullets.push(new Bullet(this.x, this.y, this.damage, dir, this.range, bulletSpeed));
        playSound("cannon");

        //rotate cannon based on shot direction
        this.topRotation = Math.atan2(dir.x, -dir.y);

        //shoot extra bullets based on cannon varient
        if (this.version == 1 || this.version == 2)
        {
            if (this.version == 2)
            {
                let angle2 = Math.PI/6;
                let newDirCW2 = {x: (dir.x * Math.cos(angle2) -(dir.y * Math.sin(angle2))),y: (dir.x * Math.sin(angle2) + (dir.y * Math.cos(angle2)))};
                bullets.push(new Bullet(this.x, this.y, this.damage, newDirCW2, this.range, bulletSpeed));
                let newDirCCW2 = {x: (dir.x * Math.cos(-angle2) -(dir.y * Math.sin(-angle2))),y: (dir.x * Math.sin(-angle2) + (dir.y * Math.cos(-angle2)))};
                bullets.push(new Bullet(this.x, this.y, this.damage, newDirCCW2, this.range, bulletSpeed));
            }
            let angle = Math.PI/4;
            let newDirCW = {x: (dir.x * Math.cos(angle) -(dir.y * Math.sin(angle))),y: (dir.x * Math.sin(angle) + (dir.y * Math.cos(angle)))};
            bullets.push(new Bullet(this.x, this.y, this.damage, newDirCW, this.range, bulletSpeed));
            let newDirCCW = {x: (dir.x * Math.cos(-angle) -(dir.y * Math.sin(-angle))),y: (dir.x * Math.sin(-angle) + (dir.y * Math.cos(-angle)))};
            bullets.push(new Bullet(this.x, this.y, this.damage, newDirCCW, this.range, bulletSpeed));
        }



        this.canShoot = false;
        this.shootTime = Date.now();

    }

    //destroy tower from list
    destroySelf()
    {
        let index = 0;
        for(let i = 0; i < towers.length; i++)
        {
            if (this == towers[i])
            {
                index = i;
            }
        }

        towers.splice(index, 1);
    }

    //draw tower
    draw()
    {
        ctx.save();

        //see if tower is selected
        if (this.hover || this.selected)
        {
            ctx.save();
            ctx.fillStyle = 'grey';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.range, 0, Math.PI*2, false);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

        ctx.restore();
        //draw tower based on type
        let imageString = 'cannon';
        if (this.type == 1) {imageString = 'tesla';}

        ctx.drawImage(imageData[imageString+'Base'][0][0], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.save();
        //rotate top of tower based on given rotation
        rotateObject(this.topRotation, {x: this.x, y: this.y});
        ctx.drawImage(imageData[imageString+'Top'][this.version + 2][0], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }
}

//tesla tower class
class TeslaTower extends Tower
{
    constructor(x, y, type)
    {
        //setup data based on tesla tower data
        super(x, y, type);
        let data = towerData[1][2];
        this.range = getRadiusFromGridSize(data.defaultValues.range);
        this.damage = data.defaultValues.damage;
        this.speed = data.defaultValues.speed; //shots per second
        this.targetAmount = data.defaultValues.targetAmount;
        this.sellAmount = data.defaultValues.sellAmount;
    }

    //update tower
    update()
    {
        this.checkHover();
        //make sure game isnt paused
        if (getTimeScale() != 0)
        {
            //check if it can shoot, if not check when it can
            if (!this.canShoot)
            {
                if (Date.now() - this.shootTime >= 1000 / (this.speed * getTimeScale()))
                {
                    this.canShoot = true;
                }
            }
            //it can shoot
            else
            {
                let shootCount = 0;
                if (this.canShoot)
                {
                    //shoot at as many enemies as it is able to (based on [targetAmount] gotten from towerData)
                    let enemyList = getEnemyList();

                    for (let i = 0; i < enemyList.length; i++)
                    {
                        let distanceAway = getDistance({x: this.x, y: this.y}, {x: enemyList[i].x, y: enemyList[i].y});
                        if (distanceAway <= this.range)
                        {
                            shootCount++;
                            this.shoot({x: enemyList[i].x, y: enemyList[i].y, index: i}, (this.targetAmount == 1));
                            if (shootCount >= this.targetAmount)
                            {
                                i = enemyList.length;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    //shoot a electric shot
    shoot(data, laser)
    {
        //get color of shot based on targetAmount (is it a laser tower or not)
        let color = (laser) ? 'red' : 'lightblue';
        bullets.push(new ElectricShot(this.x, this.y, {x: data.x, y: data.y}, color));
        playSound("electricity");
        let enemyList = getEnemyList();

        //instantly damage enemy (no collision detection for lightning bolt)
        enemyList[data.index].health -= this.damage;

        this.canShoot = false;
        this.shootTime = Date.now();
    }
    
}

//class for missile tower
class MissileTower extends Tower
{
    constructor(x,y,type)
    {
        //get data for missile tower (a few extra data points specific to missile tower as well)
        super(x, y, type);
        let data = towerData[2][2];
        this.range = getRadiusFromGridSize(data.defaultValues.range);
        this.damage = data.defaultValues.damage;
        this.speed = data.defaultValues.speed;
        this.missiles = data.defaultValues.missiles;
        this.curMissiles = this.missiles;
        this.reloadTimeStart = null;
        this.blastRadius = data.defaultValues.blastRadius;
        this.sellAmount = data.defaultValues.sellAmount;
        this.waitShootTime = Date.now();
    }

    //update tower
    update()
    {
        this.checkHover();

        //check if game is paused
        if (getTimeScale() != 0)
        {
            //check to see if tower is reloading
            if(this.canShoot && this.curMissiles != this.missiles)
            {
                if (Date.now() - this.waitShootTime >= 4000 / getTimeScale())
                {
                    this.curMissiles = this.missiles;//reloaded
                }
            }
            //check to see if a missile can shoot out
            if (!this.canShoot && this.curMissiles > 0)
            {
                if (Date.now() - this.shootTime >= 1000 / (5 * getTimeScale()))
                {
                    this.canShoot = true;
                }
            }
            //check to see if tower is out of missiles[needs to reload]
            else if (this.curMissiles <= 0)
            {
                if (Date.now() - this.reloadTimeStart >= (this.speed * 1000) / getTimeScale())
                {
                    this.curMissiles = this.missiles;
                    this.canShoot = true;
                    this.reloadTimeStart = null;
                }
            }
            //can shoot
            else
            {
                if (this.canShoot)
                {
                    //shoot at as many enemies in range as you can, up to the amount of missiles left you have
                    let enemyList = getEnemyList();

                    for (let i = 0; i < enemyList.length; i++)
                    {
                        let distanceAway = getDistance({x: this.x, y: this.y}, {x: enemyList[i].x, y: enemyList[i].y});
                        if (distanceAway <= this.range)
                        {
                            this.waitShootTime = Date.now();
                            this.curMissiles--;
                            this.shoot({x: enemyList[i].x, y: enemyList[i].y, index: i});
                            if (this.curMissiles <= 0)
                            {
                                this.reloadTimeStart = Date.now();
                                this.canShoot = false;
                                i = enemyList.length;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    //shoot a missile
    shoot(data)
    {
        //get position of enemy, as well as index of enemy
        let bulletSpeed = 8;
        if (this.version < 0){bulletSpeed=16;}
        let dir = {x: data.x - this.x, y: data.y - this.y};
        dir = normalizeVector(dir);

        //fire a missile
        bullets.push(new Missile(this.x, this.y, this.damage, dir, this.range, bulletSpeed, this.blastRadius, data.index, this.type));

        playSound("missle");

        //get rotation for top of tower
        this.topRotation = Math.atan2(dir.x, -dir.y);

        this.shootTime = Date.now();
        this.canShoot = false;
    }

    //draw missile tower
    draw()
    {
        ctx.save();

        //draw range of tower if selected/highlighted
        if (this.hover || this.selected)
        {
            ctx.save();
            ctx.fillStyle = 'grey';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.range, 0, Math.PI*2, false);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

        ctx.restore();

        ctx.drawImage(imageData['missileBase'][0][0], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.save();
        rotateObject(this.topRotation, {x: this.x, y: this.y});

        //draw normal tower if not reloading, otherwise draw reloading varient
        if (this.reloadTimeStart == null)
        {
            ctx.drawImage(imageData['missileTop'][this.version + 2][0], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
        else
        {
            ctx.drawImage(imageData['missileTopReload'][this.version + 2][0], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);            
        }
        ctx.restore();
    }
}

//bullet class [keeps track of the bullets data, and detects if it has hit something]
class Bullet
{
    constructor (x, y, damage, dir, range, speed)
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.range = range * 1.5;
        this.damage = damage;
        this.radius = 5;
        this.distance = 0;
        this.dir = dir;
    }

    //update/move bullet
    update()
    {
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
        this.distance += Math.abs((this.dir.x * this.speed) + (this.dir.y * this.speed));

        let check = this.checkCollisions();
        //see if bullet is past range
        if (this.distance >= this.range && !check)
        {
            this.destroySelf();
        }
    }

    //check to see if bullet has collided with any enemies
    checkCollisions()
    {
        let enemyList = getEnemyList();

        for (let j = 0; j < enemyList.length; j++)
        {
            if (getDistance({x: this.x, y: this.y}, {x: enemyList[j].x, y: enemyList[j].y}) < this.radius + enemyList[j].radius)
            {
                enemyList[j].health -= this.damage;
                this.destroySelf();
                return true;
            }
        }

        return false;
    }

    //remove self from bullet array
    destroySelf()
    {
        let index = 0;
        for(let i = 0; i < bullets.length; i++)
        {
            if (this == bullets[i])
            {
                index = i;
            }
        }

        bullets.splice(index, 1);
    }

    //draw bullet
    draw()
    {
        ctx.save();
        ctx.drawImage(imageData['cannonBall'][0][0], this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
        ctx.restore();
    }
}

//missile class
class Missile extends Bullet
{
    constructor(x, y, damage, dir, range, speed, blastRadius, enemyIndex, type)
    {
        super(x, y, damage, dir, range, speed);

        this.blastRadius = blastRadius;
        this.enemyIndex = enemyIndex;
        this.type = type;
        this.radius = missileShotRadius[type];
        this.rotation = 0;
        this.getDirectionToEnemy();
    }

    //get direction to targeted enemy
    getDirectionToEnemy()
    {
        let enemyList = getEnemyList();

        if (enemyList.length <= this.enemyIndex || enemyList[this.enemyIndex] == undefined){this.destroySelf();return;}
        let dirToEnemy = {x: enemyList[this.enemyIndex].x - this.x, y: enemyList[this.enemyIndex].y - this.y};
        this.dir = normalizeVector(dirToEnemy);
        this.rotation = Math.atan2(this.dir.x, -this.dir.y);
    }

    //move towards targeted enemy
    update()
    {
        this.getDirectionToEnemy();

        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
        this.distance += Math.abs((this.dir.x * this.speed) + (this.dir.y * this.speed));

        let check = this.checkCollisions();
        //see if past max range
        if (this.distance >= this.range && !check)
        {
            this.destroySelf();
        }
    }

    //check to see if missile has collided with enemy
    checkCollisions()
    {
        let enemyList = getEnemyList();

        for (let j = 0; j < enemyList.length; j++)
        {
            if (getDistance({x: this.x, y: this.y}, {x: enemyList[j].x, y: enemyList[j].y}) < this.radius + enemyList[j].radius)
            {
                this.destroySelf(enemyList[j].x, enemyList[j].y);
                return true;
            }
        }

        return false;
    }

    //spawn in an explosion
    spawnExplosion(x, y)
    {
        bullets.push(new Explosion(x, y, this.blastRadius, this.damage));
    }

    //remove self from bullet array
    destroySelf(x, y)
    {
        this.spawnExplosion(x, y);
        let index = 0;
        for(let i = 0; i < bullets.length; i++)
        {
            if (this == bullets[i])
            {
                index = i;
            }
        }

        bullets.splice(index, 1);
    }

    //draw self with rotation
    draw()
    {
        ctx.save();
        rotateObject(this.rotation, {x: this.x, y: this.y});
        ctx.drawImage(imageData['missileShot'][this.type][0], this.x - this.radius/4, this.y - this.radius, this.radius/4, this.radius);
        ctx.restore();
    }
}

//electric shot class
class ElectricShot
{
    constructor(x, y, enemyPos, color)
    {
        this.x = x;
        this.y = y;
        this.endPoint = enemyPos;
        this.startTime = Date.now();
        this.endAfter = 50;
        this.points = [];
        this.color = color;
        this.setUpPoints();
    }

    //setup random points to simulate a 'lightning bolt'
    setUpPoints()
    {
        let pointCount = getRandomInt(3, 5);

        for (let i = 0; i < pointCount; i++)
        {
            let x, y;
            if (this.x < this.endPoint.x){ x = getRandom(this.x, this.endPoint.x); }
            else{ x = getRandom(this.endPoint.x, this.x);}

            if (this.y < this.endPoint.y){ y = getRandom(this.y, this.endPoint.y); }
            else{ y = getRandom(this.endPoint.y, this.y);}

            this.points.push({x: x, y: y});
        }
    }

    //see if it is time to remove itself
    update()
    {
        if (Date.now() - this.startTime >= this.endAfter)
        {
            this.destroySelf();
        }
    }

    //remove self from bullet array
    destroySelf()
    {
        let index = 0;
        for(let i = 0; i < bullets.length; i++)
        {
            if (this == bullets[i])
            {
                index = i;
            }
        }

        bullets.splice(index, 1);
    }

    //draw lightning bolt
    draw()
    {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < this.points.length; i++)
        {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

//explosion class
class Explosion
{
    constructor(x, y, blastSize, damage)
    {
        this.x = x;
        this.y = y;
        this.radius = getRadiusFromGridSize(blastSize);
        this.damage = damage;
        this.frame = 0;
        this.frameStep = 0;
        this.damageEnemies();
    }

    //damage all enemies within range of the explosion
    damageEnemies()
    {
        let enemyList = getEnemyList();

        for (let i = 0; i < enemyList.length; i++)
        {
            if (getDistance({x: this.x, y: this.y}, {x: enemyList[i].x, y: enemyList[i].y}) < this.radius + enemyList[i].radius)
            {
                enemyList[i].health -= this.damage;
                return true;
            }
        }
    }

    //update explosion animation
    update()
    {
        this.frameStep++;
        if (this.frameStep >= 5)
        {
            this.frame++;
            if (this.frame >= 25)
            {
                this.destroySelf();
            }
        }
    }

    //remove self from array
    destroySelf()
    {
        let index = 0;
        for(let i = 0; i < bullets.length; i++)
        {
            if (this == bullets[i])
            {
                index = i;
            }
        }

        bullets.splice(index, 1);
    }
    
    //draw current explosion frame
    draw()
    {
        let image = imageData.explosion[0][0];
        
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(image, this.frame * (image.width/24), 0, image.width/24, image.height, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
        ctx.restore();
    }
}