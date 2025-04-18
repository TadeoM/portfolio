//File for loading in all the images and sounds

export {loadImages, playSound}
import {init, setImageData} from './main.js';

//image sources

//setup like such:
//variable[key][type/version][animation frame]

const imageSources = { 
		cannonBase:
		[
			['images/Base.png']
		],
		cannonTop: 
		[
			['images/CannonSuperSniper.png'],
			['images/CannonSniper.png'],
			['images/Cannon.png'],
			['images/CannonScatter.png'],
			['images/CannonSuperScatter.png']
		],
		cannonBall: 
		[
			['images/CannonBall.png']
		],
		teslaBase:
		[
			['images/TeslaBase.png']
		],
		teslaTop:
		[
			['images/TeslaSuperMulti.png'],
			['images/TeslaMulti.png'],
			['images/Tesla.png'],
			['images/TeslaLaser.png'],
			['images/TeslaSuperLaser.png']
		],
		missileBase:
		[
			['images/RocketBase.png']
		],
		missileTop:
		[
			['images/RocketSuperMulti.png'],
			['images/RocketMulti.png'],
			['images/Rocket.png'],
			['images/RocketLarge.png'],
			['images/RocketSuperLarge.png']
		],
		missileTopReload:
		[
			['images/RocketStatic.png'],
			['images/RocketStatic.png'],
			['images/RocketStatic.png'],
			['images/RocketBaseSmall.png'],
			['images/RocketBaseSmall.png']
		],
		missileShot:
		[
			['images/Missile.png'],
			['images/Missile.png'],
			['images/Missile.png'],
			['images/MissileLarge.png'],
			['images/MissileSuperLarge.png']
		],
		tileImages:
		[
			['images/Grass.png'],
			['images/Path.png']
		],
		trash:
		[
			['images/trash.png']
		],
		troop:
		[
			['images/TroopAnimation/Troop_0.png'],
			['images/TroopAnimation/Troop_1.png'],
			['images/TroopAnimation/Troop_2.png'],
			['images/TroopAnimation/Troop_3.png']
		],
		jeep:
		[
			['images/Jeep.png']
		],
		tank:
		[
			['images/Tank.png']
		],
		explosion: 
		[
			['images/explosions.png']
		]
};

//sound sources
const soundSources = {
    breaking:  "sounds/breaking.wav",
    click: "sounds/click.wav",
    cannon: "sounds/cannon.wav",
    missle: "sounds/missle.wav",
    electricity: "sounds/electricity.wav"
}

//function to play a sound
function playSound(name) {
    for(let sound in soundSources){
        if(sound == name){
			let audio = new Audio();
			audio.src = soundSources[sound];
			audio.volume = 0.1;
            audio.play();
		}
    }
}

//function for loading in all images based on image sources
function loadImages() {
	let numImages = 0;
	let numLoadedImages = 0;
	
	// load images
	for(let imageName in imageSources) {

		for (let i = 0; i < imageSources[imageName].length; i++)
		{
			numImages += imageSources[imageName][i].length;
		}

		for(let arrayOfSprites in imageSources[imageName])
		{
			for (let sprite in arrayOfSprites)
			{
				let img = new Image();
				img.src = imageSources[imageName][arrayOfSprites][sprite];
				imageSources[imageName][arrayOfSprites][sprite] = img;

				img.onload = function() {
					if(++numLoadedImages >= numImages){
						setImageData(imageSources);
						init();
					}
				}

				img.onerror = function(){
					console.error("ERROR: image named '" + imageName + "' at " + this.src + " did not load!");
				}
			}
		}
	}
}
