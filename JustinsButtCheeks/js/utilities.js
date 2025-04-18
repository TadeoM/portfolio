//This file holds a few helper functions

"use strict";

export {getRandom, getRandomInt, rotateObject, checkIfMouseOver, drawHighlightSquare, fillText, normalizeVector, getDistance, getGradient}
import {screenWidth, ctx, screenHeight} from './main.js';
import {mousePos} from './input.js';

//rotates ctx, without changing the position of the rotated object
function rotateObject(degree, point)
{
	ctx.translate(point.x, point.y);
	ctx.rotate(degree);
	ctx.translate(-point.x, -point.y);
}

//check if the mouse is over a given box
function checkIfMouseOver(x, y, width, height)
{
    let over = false;
    if ((mousePos.x >= x && mousePos.x <= x + width) && (mousePos.y >= y && mousePos.y <= y + height))
    {
        over = true;
    }

    return over;
}

//draw a square with a given opacity
function drawHighlightSquare(x, y, width, height, color, alpha, stroke=false, strokeColor='black', lineWidth=1)
{
	ctx.save();
	ctx.globalAlpha = alpha;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fill();
	if (stroke)
	{
		ctx.strokeColor = strokeColor;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}
	ctx.closePath();
	ctx.restore();
}

//draw text based on given values
function fillText(string, x, y, css, color, maxWidth = screenWidth)
{
	ctx.save();
	ctx.font = css;
	ctx.fillStyle = color;
	ctx.fillText(string, x, y, maxWidth);
	ctx.restore();
}

//normalize a given vector
function normalizeVector(vec)
{
	let magnitude = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
	vec.x /= magnitude;
	vec.y /= magnitude;
		
	return vec;
}

//get a distance between two vectors
function getDistance(pos1, pos2)
{
	return (Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)));
}

//get a random number [float] between a given max and min
function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

//get a random number [int] between a given max and min
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

//get a gradient
function getGradient()
{
    let grad = ctx.createRadialGradient(screenWidth/2, screenHeight/2, 5, screenWidth/2, screenHeight/2, screenWidth/2);
    grad.addColorStop(0, "#595959");
    grad.addColorStop(2/4, "#7a7a7a");
    grad.addColorStop(3/4, "#7a7a7a");
    grad.addColorStop(1, "#595959");
    
    return grad;
}