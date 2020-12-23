(function() {
"use strict";
		
		window.onload = init;
		
		// SCRIPT SCOPED VARIABLES
				
		// 1- here we are faking an enumeration - we'll look at another way to do this soon 
		const SOUND_PATH = Object.freeze({
			sound1: "media/ComfortablyNumb.mp3",
			sound2: "media/DoneDying.mp3",
			sound3:  "media/ItsCalledFreefal.mp3"
		});
		
        var TRACKS = [{
    id: 0,
    name: 'music1',
    src: 'media/ComfortablyNumb.mp3',
  },{
    id: 1,
    name: 'music2',
    src: 'media/DoneDying.mp3',
  },
                      {
    id: 2,
    name: 'music3',
    src: 'media/ItsCalledFreefal.mp3',
  }, {
    id: 3,
    name: 'music4',
    src: 'media/1979.mp3',
  }, {
    id: 4,
    name: 'music5',
    src: 'media/ComeAlong.mp3',
  }, {
    id: 5,
    name: 'music6',
    src: 'media/GreatDepression.mp3',
  }, {
    id: 6,
    name: 'music7',
    src: 'media/Miracle.mp3',
  }, {
    id: 7,
    name: 'music8',
    src: 'media/OutOfSight.mp3',
  }, {
    id: 8,
    name: 'music9',
    src: 'media/SharkAttack.mp3',
  }, {
    id: 9,
    name: 'music10',
    src: 'media/Homage.mp3',
  }
                     ];
		// 2 - elements on the page
		let audioElement,canvasElement;
        
        
		
		// UI
		let playButton, nextTrack, prevTrack,playIcon;
		
		// 3 - our canvas drawing context
		let drawCtx
		
        //Our gradient drawing context
        
        let gradCtx; 
		// 4 - our WebAudio context
		let audioCtx;
		
		// 5 - nodes that are part of our WebAudio audio routing graph
		let sourceNode, analyserNode, gainNode,delayNode ;
		
		// 6 - a typed array to hold the audio frequency data
		const NUM_SAMPLES = 256;
		// create a new array of 8-bit integers (0-255)
		let audioData = new Uint8Array(NUM_SAMPLES/2); 
		
        //Our Eye Count
        let eyeCount;
        //Our Delay Amout
        
        let delayAmount = 0.5;
        //Our eye color
        let selectedColor;
        let eyeColor;
        //Our gradient input
        let ifGrad;
        //
        let barEyeColor;
        //Our Alpha Variable
        let alphaForBars;
        //Our Pixel Variables
        let invert,noise,delay;
        let circleRotation, change, timer;
       let maxSize;
        let useReference;
		
		// FUNCTIONS
		function init(){
			setupWebaudio();
			setupCanvas();
            M.AutoInit();
			setupUI();
			update();
            

        
		}
		
		function setupWebaudio(){
			// 1 - The || is because WebAudio has not been standardized across browsers yet
			const AudioContext = window.AudioContext || window.webkitAudioContext;
			audioCtx = new AudioContext();
			
			// 2 - get a reference to the <audio> element on the page
			audioElement = document.querySelector("audio");
			audioElement.src = SOUND_PATH.sound3;
			
			// 3 - create an a source node that points at the <audio> element
			sourceNode = audioCtx.createMediaElementSource(audioElement);
            
            delayNode = audioCtx.createDelay();
            
            delayNode.delayTime.value = delayAmount;
			
			// 4 - create an analyser node
			analyserNode = audioCtx.createAnalyser();
			
			/*  
			We will request NUM_SAMPLES number of samples or "bins" spaced equally 
			across the sound spectrum.
			
			If NUM_SAMPLES (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
			the third is 344Hz. Each bin contains a number between 0-255 representing 
			the amplitude of that frequency.
			*/ 
			
			// fft stands for Fast Fourier Transform
			analyserNode.fftSize = NUM_SAMPLES;
			
			// 5 - create a gain (volume) node
			gainNode = audioCtx.createGain();
			gainNode.gain.value = 1;
			
			// 6 - connect the nodes - we now have an audio graph
			sourceNode.connect(analyserNode);
			analyserNode.connect(gainNode);
			gainNode.connect(audioCtx.destination);
		}
		
		function setupCanvas(){
			canvasElement = document.querySelector('canvas');
            canvasElement.width = window.innerWidth-5;
            canvasElement.height = window.innerHeight-5;
			drawCtx = canvasElement.getContext("2d");
            eyeCount = 10;
            eyeColor = "#6FB9D6";
            invert = false;
            delay = false;
            noise = false;
            alphaForBars = 0.4;
            selectedColor = 'purple';
            ifGrad = false;
           circleRotation = 0;
            change = 0.5;
            timer = 120;
            maxSize = (canvasElement.width * canvasElement.height) / 10000;
            useReference = true;
		}
		
		function setupUI()
        {
            document.querySelector("#reference").onchange = e =>
            {
                useReference = !useReference;
                console.log(useReference);
                
            };
            document.querySelector("#waveform").onchange = e =>
            {
                useReference = !useReference;
                console.log(useReference);
                
            };
            
             document.querySelector("#gradientColors").onchange = e =>
            {
                if(ifGrad)
                    {
                        solidSelect();
                        
                    }
                else
                    {
                        gradientSelect();
                    }
                
            };
             document.querySelector("#solidColors").onchange = e =>
            {
                 if(ifGrad)
                    {
                        solidSelect();
                        
                    }
                else
                    {
                        gradientSelect();
                    }
                
            };
            
            playIcon = document.getElementById('playIcon')
			playButton = document.querySelector("#playButton");
			playButton.onclick = e => {
				
				// check if context is in suspended state (autoplay policy)
				if (audioCtx.state == "suspended") {
					audioCtx.resume();
				}

				if (e.target.dataset.playing == "no") {
					audioElement.play();
                      playIcon.innerHTML = 'pause_circle_outline';
                  
					e.target.dataset.playing = "yes";
				// if track is playing pause it
				} else if (e.target.dataset.playing == "yes") {
					audioElement.pause();
                   playIcon.innerHTML = 'play_circle_outline';
					e.target.dataset.playing = "no";
				}
	
			};
			
            //volume slider
			let volumeSlider = document.querySelector("#volumeSlider");
			volumeSlider.oninput = e => {
				gainNode.gain.value = e.target.value;
				volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
			};
			volumeSlider.dispatchEvent(new InputEvent("input"));
			
            // how many eyes to draw
            let eyeSlider = document.querySelector("#eyeSlider");
			eyeSlider.oninput = e => {
				eyeCount = e.target.value;
				eyeLabel.innerHTML = e.target.value;
			};
			eyeSlider.dispatchEvent(new InputEvent("input"));
			
            // change alpha of audio bars in eyes
            let alphaSlider = document.querySelector("#alphaSlider");
            alphaSlider.oninput = e =>
            {
                alphaForBars = e.target.value;
                alphaLabel.innerHTML = e.target.value;
                if(ifGrad)
                    gradientSelect();
                else
                    solidSelect();
                
            };
            alphaSlider.dispatchEvent(new InputEvent("input"));
            
              //Color Selection
            	document.querySelector("#colorSelect").onchange = e =>{
                    
				selectedColor = e.target.value;
				if(ifGrad)
                    gradientSelect();
                else
                    solidSelect();
				
			};
            //Track Selection
			document.querySelector("#trackSelect").onchange = e =>{
				audioElement.src = e.target.value;
				// pause the current track if it is playing
				playButton.dispatchEvent(new MouseEvent("click"));
			};
         
		
                /// this is the attempt we made at making the next and previous buttons next to the pause/resume button
                /*if(audioElement.src=="media/DoneDying.mp3")
                    {
                        audioElement.src = "media/ItsCalledFreefal.mp3";
                        playButton.dispatchEvent(new MouseEvent("click"));
                    }
                else if(audioElement.src=="media/ItsCalledFreefal.mp3")
                    {
                        audioElement.src = "media/ComfortablyNumb.mp3";
                        playButton.dispatchEvent(new MouseEvent("click"));
                    }
                else if(audioElement.src == "media/ComfortablyNumb.mp3")
                    {
                        audioElement.src="media/DoneDying.mp3";
                        playButton.dispatchEvent(new MouseEvent("click"));
                    }
           
			  
                if(audioElement.src=="media/DoneDying.mp3")
                    {
                        audioElement.src = "media/ComfortablyNumb.mp3";
                        playButton.dispatchEvent(new MouseEvent("click"));
                    }
                else if(audioElement.src=="media/ItsCalledFreefal.mp3")
                    {
                        audioElement.src = "media/DoneDying.mp3";
                        playButton.dispatchEvent(new MouseEvent("click"));
                    }
                else if(audioElement.src == "media/ComfortablyNumb.mp3")
                    {
                        audioElement.src=="media/ItsCalledFreefal.mp3";
                        playButton.dispatchEvent(new MouseEvent("click"));
                    }*/
           
			// if track ends
			audioElement.onended =  _ => {
				playButton.dataset.playing = "no";
			};
			
			document.querySelector("#fsButton").onclick = _ =>{
				requestFullscreen(canvasElement);
			};
        
			document.getElementById('delay').onchange = function(e){
			
                if(e.target.checked)
                    {
			sourceNode.connect(delayNode);
                delayNode.connect(analyserNode);
                analyserNode.connect(audioCtx.destination);
                    }
                else
                    {
                        sourceNode.disconnect(delayNode);
                        delayNode.disconnect(analyserNode);
                    }
               
                
		};	
		
		// invert colors
		document.getElementById('invert').onchange = function(e){
			
			invert = e.target.checked;
		
			if( e.target.checked){
				 invert = true;
			}
		};	
		document.getElementById('noise').onchange = function(e){
			
			noise = e.target.checked;
		
			if( e.target.checked){
				 noise = true;
			}
		};	
        
            
        
            
        }
        
       
		
        
		function update() { 
            // this schedules a call to the update() method in 1/60 seconds
            requestAnimationFrame(update);

            /*
                Nyquist Theorem
                The array of data we get back is 1/2 the size of the sample rate 
            */

            // populate the audioData with the frequency data
            // notice these arrays are passed "by reference" 
            if(useReference)
                analyserNode.getByteFrequencyData(audioData);
            else
                analyserNode.getByteTimeDomainData(audioData); // waveform data

            // DRAW!
            drawCtx.clearRect(0,0,canvasElement.width,canvasElement.height);
            let barWidth = 4;
            let barSpacing = 1;
            let barHeight = 100;
            let topSpacing = 50;
            // loop through the data and draw!
            for(let i=0; i < audioData.length; i++) {
                drawCtx.save();
                ////rotate( i / 360, 190, 240);
                drawCtx.translate(canvasElement.width/3.3,canvasElement.height/2.2);
                drawCtx.rotate(((2*Math.PI) * i)/ 90);
                drawCtx.rotate(((2*Math.PI) * circleRotation)/ 128);
                let percentage = audioData[i] / 255;
                drawRectangle(0, 0, lerp(200, 400, percentage), 4, "rgba(166,28,92)");
                drawCtx.restore();
            }
            
            // nested if to get how many eyes need to be drawn
            if(eyeCount  > 0){
                drawEye(canvasElement.width/3.3, canvasElement.height/2.2,100 , 6, 1.5);
                
                //done
                if(eyeCount > 1){
                    drawEye(canvasElement.width/8.3, canvasElement.height / 4 , 50, 12);
                    
                    //done
                    if(eyeCount > 2){
                        drawBackwardEye(canvasElement.width/ 2.05, canvasElement.height / 4 , 50, 12);
                        
                        // done
                        if(eyeCount > 3){
                            drawEye(canvasElement.width/8.3, canvasElement.height / 1.5 , 60, 10);
                            
                            //done
                            if(eyeCount > 4){
                                drawBackwardEye(canvasElement.width/ 2.05, canvasElement.height / 1.5 , 60, 10)
                                
                                //done
                                if(eyeCount > 5){
                                    drawEye(canvasElement.width/4.2, canvasElement.height / 7 , 40, 15);
                                    
                                    // done
                                    if(eyeCount > 6){
                                        drawBackwardEye(canvasElement.width/ 3, canvasElement.height / 7 , 40, 20)
                                        
                                        // done
                                        if(eyeCount > 7){
                                            drawEye(canvasElement.width/5, canvasElement.height / 1.6 , 20, 40);
                                            
                                            if(eyeCount > 8){
                                                drawBackwardEye(canvasElement.width/ 2.5, canvasElement.height / 1.6 , 20, 40)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            //drawRectangle(0,100, canvasElement.width/2, canvasElement.height/1.6, barEyeColor);
            
             manipulatePixels(drawCtx);
            
            circleRotation += change;
            if(timer > 0)
                timer--;
            if(averageWave() > 100 && timer <= 0)
            {
                change = -change;
                timer = 120;
            }
        }
        
        // draws an eye using the variables given
        function drawEye(x, y, size, secondSize, lineWidth=0.01){
            let circleRadius = averageWave() / (secondSize / 2);
            drawArcv2(x - (size * 2.3), y, size * 4, 0, size * 2.8, size * 2.4, size* 2.8, -size * 2.4,"white");

            drawCircle(x,y, size,eyeColor);
            drawCtx.restore(); // there's one

            // loop through the data and draw!
            for(let i=0; i < audioData.length; i++) { 
                drawCtx.save();
                drawCtx.translate(x,y);
                drawCtx.rotate(((2*Math.PI) * i)/ 89);
                //// the division on the audioData should be the same
                let temp = audioData[i] / secondSize;
                drawRectangle(size - temp, 0, temp, lineWidth, barEyeColor); // "rgba(169,224,232, 0.4)"
                drawCtx.restore();
            }

            drawCircle(x,y, circleRadius, "rgba(0,0,0,1)");
            drawCircle(x,y, circleRadius * 0.9, "rgba(50,50,50,0.8)");
        }
        // // draws a backwards eye using the variables given
        function drawBackwardEye(x, y, size, secondSize, lineWidth=0.01){
            let circleRadius = averageWave() / (secondSize / 2);
            drawCtx.save();
            drawArcv2(x - (size * 1.8),y,size * 4,0,size *1.5,size * 2.4,size*1.5,-size*2.4,"white");
            drawCircle(x,y, size,eyeColor);
            drawCtx.restore(); // there's one

            // loop through the data and draw!
            for(let i=0; i < audioData.length; i++) { 
                drawCtx.save();
                drawCtx.translate(x,y);
                drawCtx.rotate(((2*Math.PI) * i)/ 89);
                //// the division on the audioData should be the same
                let temp =audioData[i] / (secondSize);
                
                drawRectangle(size - temp, 0, temp, lineWidth, barEyeColor); // "rgba(169,224,232, 0.4)"
                drawCtx.restore();
            }

            drawCircle(x,y, circleRadius, "rgba(0,0,0,1)");
            drawCircle(x,y, circleRadius * 0.9, "rgba(50,50,50,0.8)");
        }
        
        // draws a closed oval-ish shape (used for eye) using the variables given
        function drawArcv2(x1, y1, x2,y2, heightX1, heightY1,heightX2, heightY2, fill, stroke=fill, line=2){
            drawCtx.save();
            drawCtx.strokeStyle = stroke;
            drawCtx.fillStyle = fill;
            drawCtx.lineWidth = line;

            drawCtx.translate(x1,y1);
            drawCtx.beginPath();
            drawCtx.moveTo(0, 0);
            drawCtx.quadraticCurveTo(heightX1, heightY1, x2, y2);
            drawCtx.quadraticCurveTo(heightX2, heightY2, 0, 0);
            drawCtx.closePath();
            drawCtx.fill();
            drawCtx.stroke();
            drawCtx.restore();
        }
        
        // draws a circle using the variables given
        function drawCircle(x,y,radius,fill, stroke=fill, line=2){
            drawCtx.save();
            drawCtx.strokeStyle = stroke;
            drawCtx.fillStyle = fill;
            drawCtx.lineWidth = line;

            drawCtx.translate(x,y);
            //paths
            drawCtx.beginPath();
            drawCtx.arc(0,0,radius,0 , Math.PI * 2);
            drawCtx.closePath();
            drawCtx.fill();
            drawCtx.stroke();

            drawCtx.restore();
        }
		

		// HELPER FUNCTIONS
		function makeColor(red, green, blue, alpha){
   			var color='rgba('+red+','+green+','+blue+', '+alpha+')';
   			return color;
		}
        // draws a rectangle using the variables given
		function drawRectangle(x,y,width,height, fill,stroke=fill,line=2){
            drawCtx.save();
            drawCtx.strokeStyle = stroke;
            drawCtx.fillStyle = fill;
            drawCtx.lineWidth = 2;
            drawCtx.translate(x,y);
            //paths
            drawCtx.beginPath();
            drawCtx.rect(0,0,width,height);
            drawCtx.closePath();
            drawCtx.fill();
            drawCtx.stroke();

            drawCtx.restore();
        }
        // draws a triangle using the variables given
        function drawTriangle(x,y,size,width,rotation,stroke,fill=stroke,line=2){
            drawCtx.save();
            drawCtx.strokeStyle = stroke;
            drawCtx.fillStyle = fill;
            drawCtx.lineWidth = width;

            drawCtx.translate(x,y);
            drawCtx.rotate(rotation * Math.PI/180);
            drawCtx.beginPath();
            drawCtx.moveTo(0, (size/2));
            drawCtx.lineTo(size/2, -size/2);
            drawCtx.lineTo(-size/2, -size/2);
            drawCtx.closePath();
            drawCtx.stroke();
            drawCtx.fill();
            drawCtx.restore();
        }
        // draws a line using the variables given
function drawLine(startX,startY, endX, endY,lineWidth,fill, stroke=fill,){
            drawCtx.save();
            drawCtx.strokeStyle = stroke;
            drawCtx.lineWidth = lineWidth;
            drawCtx.translate(startX,startY); // AND THE FOURTH
            //paths
            drawCtx.beginPath();
            drawCtx.moveTo(0, 0);
            drawCtx.lineTo(endX, endY);

            drawCtx.closePath();
            drawCtx.fill();
            drawCtx.stroke();

            drawCtx.restore();
        }
        function backingScale(context) {
            if ('devicePixelRatio' in window) {
                if (window.devicePixelRatio > 1) {
                    return window.devicePixelRatio;
                }
            }
            return 1;
        }
        function manipulatePixels(drawCtx)
        {
            //Grabbing all RGBA pixel data on canvas
            let imageData = drawCtx.getImageData(0,0,drawCtx.canvas.width,drawCtx.canvas.height);
            
            //imageData.data is 8 bit integer type array values: 0-255
            //4 values per pixel
            let data = imageData.data;
            
            let length = data.length;
            
            let width = data.width;
            
            //Iterating through each pixel
            //Stepping by 4 to manipulate each value in a pixel 
            
            let i;
            for(i = 0; i<length; i+=4)
                {
                   
                    if(invert)
                        {
                            let red = data[i], green = data[i+1], blue = data[i+2];
                            
                            //Setting red,green and blue values data[i+3]= alpha
                            data[i] = 255-red; 
                            data[i+1] = 255-green;
                            data[i+2]=255-blue;
                        }
                    if(noise && Math.random()<0.1)
                        {
                            //gray noise
                            data[i] = data[i+1]=data[i+2]=128;
                            
                            //White Noise
                            //data[i] = data[i+1]=data[i+2]=255;
                            
                            //Black Noise
                            //data[i] = data[i+1]=data[i+2]=0;
                            
                            //Alpha
                            //data[i+3]=255;
                        }
                }
            drawCtx.putImageData(imageData,0,0);
        }
        
        function averageWave(){
            let total = 0;
            for(let i=0; i < audioData.length; i++) {
                total += audioData[i];
                // if you want to see all the audioData arcs, then uncomment these, I just took the average of all of them.
                //drawArc(0,300,canvasElement.width, 0, canvasElement.width/2, audioData[i], 100,100, 'orange');
                //drawArc(0,100,canvasElement.width, 0, canvasElement.width/2, -audioData[i], 100,100, 'orange');
            }

            total = total / audioData.length;
            return total;
        }
        // look at nexttrack stuff and see if you can fix it 
        
        
        /// Changes the colors to be gradient based on what the current selected color is
        function gradientSelect()
        {
            ifGrad = true;
            eyeColor = drawCtx.createLinearGradient(50, 240, 400, 0);
            barEyeColor = drawCtx.createLinearGradient(0,0,10,30);
            
            // blue gradient
           if(ifGrad && selectedColor=='blue')
                {
                    eyeColor.addColorStop(0, "rgba(82,165,255)");
                    eyeColor.addColorStop(1 / 2, "rgba(178,121,22)");
                    eyeColor.addColorStop(1, "rgba(255,191,82)");
                    
                    barEyeColor.addColorStop(0,"rgba(147,202,255, " + alphaForBars + ")");
                    barEyeColor.addColorStop(1/2, "rgba(178,137,67," + alphaForBars + ")");
                    barEyeColor.addColorStop(1, "rgba(255,214,147, " + alphaForBars + ")");
                }
            // red gradient
             else if(ifGrad && selectedColor=='red')
                {
                    eyeColor.addColorStop(0, "rgba(122 ,25,20)");
                    eyeColor.addColorStop(1 / 2, "rgba(0, 198,75)");
                    eyeColor.addColorStop(1, "rgba(20,122,59)");
                    
                    barEyeColor.addColorStop(0, "rgba(41,8,7, " + alphaForBars + ")");
                    barEyeColor.addColorStop(1/2, "rgba(0,117,40," + alphaForBars + ")");
                    barEyeColor.addColorStop(1, "rgba(7,41,19, " + alphaForBars + ")");
                }
            // purple gradient
             else if(ifGrad && selectedColor=='purple')
                {
                    eyeColor.addColorStop(0, "rgba(102,55,163)");
                    eyeColor.addColorStop(1 / 2, "rgba(86,85,12)");
                    eyeColor.addColorStop(1, "rgba(163,161,55)");
                    
                    
                    
                    barEyeColor.addColorStop(0, "rgba(167,112,239," + alphaForBars + ")");
                    barEyeColor.addColorStop(1/2, "rgba(162,160,44," + alphaForBars + ")");
                    barEyeColor.addColorStop(1, "rgba(239,236,112," + alphaForBars + ")");
                }
            // green gradient
             else if(ifGrad && selectedColor=='green')
                {
                    eyeColor.addColorStop(0, "rgba(46,122,30)");
                    eyeColor.addColorStop(1 / 2, "rgba(198,9,151)");
                    eyeColor.addColorStop(1, "rgba(122,30,99)");
                    
                    barEyeColor.addColorStop(0, "rgba(77,166,61, " + alphaForBars + ")");
                    barEyeColor.addColorStop(1/2, "rgba(89,15,69," + alphaForBars + ")");
                    barEyeColor.addColorStop(1, "rgba(166,61,136, " + alphaForBars + ")");
                }
            // hazel gradient
            else if(ifGrad && selectedColor=='hazel')
                {
                    eyeColor.addColorStop(0, "rgba(85,56,0)");
                    eyeColor.addColorStop(4 / 5, "rgba(110,175,255)");
                    eyeColor.addColorStop(1, "rgba(82,165,255)");
                    
                    barEyeColor.addColorStop(0, "rgba(51,33,0, " + alphaForBars + ")");
                    barEyeColor.addColorStop(1/2, "rgba(0,57,127," + alphaForBars + ")");
                    barEyeColor.addColorStop(1, "rgba(0,23,51, " + alphaForBars + ")");
                }
            
            
        }

        /// changes the color to a solid color based on selected color
        function solidSelect()
        {

            ifGrad = false;
            switch (selectedColor) {
                case 'blue':
                    eyeColor = "rgba(82,165,255)";
                    barEyeColor = "rgba(147,202,255, " + alphaForBars + ")";
                    break;
                case 'red':
                    eyeColor = "rgba(122,25,20)";
                    barEyeColor = "rgba(41,8,7, " + alphaForBars + ")";
                    break;
                case 'purple':
                    eyeColor = "rgba(102, 55,163)";
                    barEyeColor = "rgba(167,112,239, " + alphaForBars + ")";
                    break;
                case 'green':
                    eyeColor = "rgba(46,122,30)";
                    barEyeColor = "rgba(77,166,61, " + alphaForBars + ")";
                    break;
                case 'hazel':
                    eyeColor = "rgba(85,56,0)";
                    barEyeColor = "rgba(51,33,0, " + alphaForBars + ")";
                    break;
               
            }
        }
        function goToNextTrack()
        {
            
        }
        function goToPrevTrack()
        {
            
        }
        
        function lerp (value1, value2, amount) {
            amount = amount < 0 ? 0 : amount;
            amount = amount > 1 ? 1 : amount;
            return value1 + (value2 - value1) * amount;
        }
        
		function requestFullscreen(element) {
			if (element.requestFullscreen) {
			  element.requestFullscreen();
			} else if (element.mozRequestFullscreen) {
			  element.mozRequestFullscreen();
			} else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
			  element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
			  element.webkitRequestFullscreen();
			}
			// .. and do nothing if the method is not supported
		}
}());